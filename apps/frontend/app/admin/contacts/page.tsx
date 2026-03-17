'use client';

import React, { useState, useEffect, useRef } from 'react';
import { contactService } from '@/lib/services/contactService';
import { ContactSubmission } from '@/types/admin';
import { formatDateTime } from '@/lib/utils';

interface Thread {
  email: string;
  name: string;
  messages: ContactSubmission[];
  unreadCount: number;
  lastMessage: ContactSubmission;
}

function buildThreads(contacts: ContactSubmission[]): Thread[] {
  const map = new Map<string, ContactSubmission[]>();
  for (const c of contacts) {
    const key = c.email.toLowerCase();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(c);
  }
  const threads: Thread[] = [];
  map.forEach((messages) => {
    const sorted = [...messages].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    threads.push({
      email: sorted[0].email.toLowerCase(),
      name: sorted[sorted.length - 1].name,
      messages: sorted,
      unreadCount: sorted.filter((m) => !m.is_read).length,
      lastMessage: sorted[sorted.length - 1],
    });
  });
  return threads.sort(
    (a, b) =>
      new Date(b.lastMessage.created_at).getTime() -
      new Date(a.lastMessage.created_at).getTime()
  );
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return new Date(dateStr).toLocaleDateString();
}

function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-12 h-12 text-lg' : 'w-10 h-10 text-sm';
  return (
    <div className={`${sizeClass} rounded-full bg-[#267275] flex items-center justify-center text-white font-semibold flex-shrink-0`}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { fetchContacts(); }, []);

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, [selectedEmail]);

  const fetchContacts = async () => {
    try {
      const response = await contactService.getAll();
      setContacts(response.data || []);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (contact: ContactSubmission) => {
    if (contact.is_read) return;
    try {
      await contactService.markAsRead(String(contact.id));
      setContacts((prev) => prev.map((c) => c.id === contact.id ? { ...c, is_read: true } : c));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleDelete = async (contact: ContactSubmission) => {
    if (!confirm(`Delete this message from ${contact.name}?`)) return;
    setDeletingId(contact.id);
    try {
      await contactService.delete(String(contact.id));
      setContacts((prev) => prev.filter((c) => c.id !== contact.id));
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSelectThread = (thread: Thread) => {
    setSelectedEmail(thread.email);
    thread.messages.forEach(handleMarkAsRead);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#267275] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading inbox...</p>
        </div>
      </div>
    );
  }

  const threads = buildThreads(contacts);
  const totalUnread = contacts.filter((c) => !c.is_read).length;
  const filteredThreads = threads.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  );
  const selectedThread = threads.find((t) => t.email === selectedEmail) || null;

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inbox</h1>
          <p className="text-gray-400 text-sm mt-0.5">{threads.length} conversations</p>
        </div>
        {totalUnread > 0 && (
          <span className="px-3 py-1.5 bg-red-50 text-red-500 border border-red-200 rounded-full text-sm font-medium">
            {totalUnread} unread
          </span>
        )}
      </div>

      {/* ── Main Panel ── */}
      <div className="flex flex-1 rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white min-h-0">

        {/* ══ LEFT: Thread List ══ */}
        <div className="w-80 flex-shrink-0 flex flex-col border-r border-gray-100">

          {/* Search */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full"
              />
            </div>
          </div>

          {/* Thread items */}
          <div className="flex-1 overflow-y-auto">
            {filteredThreads.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 gap-2">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-gray-400 text-sm">No conversations</p>
              </div>
            )}
            {filteredThreads.map((thread) => {
              const isSelected = selectedEmail === thread.email;
              return (
                <button
                  key={thread.email}
                  onClick={() => handleSelectThread(thread)}
                  className={`w-full text-left px-4 py-3.5 flex items-start gap-3 transition-colors relative ${
                    isSelected
                      ? 'bg-[#267275]/10'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#267275]" />
                  )}
                  <Avatar name={thread.name} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-sm truncate ${thread.unreadCount > 0 ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {thread.name}
                      </span>
                      <span className="text-[11px] text-gray-400 flex-shrink-0 ml-2">
                        {timeAgo(thread.lastMessage.created_at)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate mb-1">{thread.email}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs truncate flex-1 ${thread.unreadCount > 0 ? 'text-gray-700' : 'text-gray-400'}`}>
                        {thread.lastMessage.message}
                      </p>
                      {thread.unreadCount > 0 && (
                        <span className="flex-shrink-0 w-5 h-5 bg-[#267275] text-white text-[10px] rounded-full flex items-center justify-center font-semibold">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══ RIGHT: Chat View ══ */}
        <div className="flex-1 flex flex-col min-w-0">
          {!selectedThread ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Select a conversation</p>
                <p className="text-gray-400 text-sm mt-1">Choose from your inbox to read messages</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-3 bg-white">
                <Avatar name={selectedThread.name} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{selectedThread.name}</p>
                  <p className="text-xs text-gray-400 truncate">{selectedThread.email}</p>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                  {selectedThread.messages.length} message{selectedThread.messages.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 bg-gray-50">
                {selectedThread.messages.map((msg, i) => {
                  const isFirst = i === 0;
                  const prevMsg = i > 0 ? selectedThread.messages[i - 1] : null;
                  const showDate =
                    isFirst ||
                    new Date(msg.created_at).toDateString() !==
                      new Date(prevMsg!.created_at).toDateString();

                  return (
                    <React.Fragment key={msg.id}>
                      {showDate && (
                        <div className="flex items-center gap-3 my-2">
                          <div className="flex-1 h-px bg-gray-200" />
                          <span className="text-xs text-gray-400 px-2">
                            {new Date(msg.created_at).toLocaleDateString('en-US', {
                              weekday: 'short', month: 'short', day: 'numeric',
                            })}
                          </span>
                          <div className="flex-1 h-px bg-gray-200" />
                        </div>
                      )}

                      <div className="flex items-start gap-3 group">
                        <Avatar name={msg.name} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 mb-1.5">
                            <span className="text-xs font-semibold text-gray-700">{msg.name}</span>
                            <span className="text-[11px] text-gray-400">{formatDateTime(msg.created_at)}</span>
                            {!msg.is_read && (
                              <span className="text-[10px] bg-[#267275]/10 text-[#267275] px-1.5 py-0.5 rounded-full font-medium">
                                New
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-gray-800 whitespace-pre-wrap shadow-sm max-w-2xl leading-relaxed">
                              {msg.message}
                            </div>
                            <button
                              onClick={() => handleDelete(msg)}
                              disabled={deletingId === msg.id}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600 disabled:opacity-50"
                              title="Delete message"
                            >
                              {deletingId === msg.id ? (
                                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                <div ref={bottomRef} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
