'use client';

import React, { useState, useEffect } from 'react';
import DashboardCard from '@/components/admin/DashboardCard';
import { contactService } from '@/lib/services/contactService';
import { clientService } from '@/lib/services/clientService';
import { projectService } from '@/lib/services/projectService';
import { serviceService } from '@/lib/services/serviceService';
import { testimonialService } from '@/lib/services/testimonialService';
import { formatDate } from '@/lib/utils';
import { ContactSubmission } from '@/types/admin';

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [stats, setStats] = useState({ contacts: 0, clients: 0, projects: 0, services: 0, testimonials: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactsRes, clientsRes, projectsRes, servicesRes, testimonialsRes] = await Promise.all([
          contactService.getAll(),
          clientService.getAll(),
          projectService.getAll(),
          serviceService.getAll(),
          testimonialService.getAll(),
        ]);

        setContacts(contactsRes.data || []);
        setStats({
          contacts: contactsRes.data?.length || 0,
          clients: clientsRes.data?.length || 0,
          projects: projectsRes.data?.length || 0,
          services: servicesRes.data?.length || 0,
          testimonials: testimonialsRes.data?.length || 0,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statsCards = [
    {
      title: 'Total Contacts',
      value: stats.contacts,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: '#267275',
    },
    {
      title: 'Total Clients',
      value: stats.clients,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bgColor: '#1f5a5c',
    },
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: '#2a8285',
    },
    {
      title: 'Total Services',
      value: stats.services,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bgColor: '#10b981',
    },
    {
      title: 'Total Testimonials',
      value: stats.testimonials,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      bgColor: '#8b5cf6',
    },
  ];

  const unreadContacts = contacts.filter((contact) => !contact.is_read);

  // Group by email into threads
  const threadMap = new Map<string, ContactSubmission[]>();
  for (const c of contacts) {
    const key = c.email.toLowerCase();
    if (!threadMap.has(key)) threadMap.set(key, []);
    threadMap.get(key)!.push(c);
  }
  const threads = Array.from(threadMap.values())
    .map((msgs) => {
      const sorted = [...msgs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return {
        name: sorted[0].name,
        email: sorted[0].email,
        lastMessage: sorted[0],
        totalMessages: msgs.length,
        unreadCount: msgs.filter((m) => !m.is_read).length,
      };
    })
    .sort((a, b) => new Date(b.lastMessage.created_at).getTime() - new Date(a.lastMessage.created_at).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
          />
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Recent Conversations</h2>
            <p className="text-xs text-gray-400 mt-0.5">{threadMap.size} unique contacts</p>
          </div>
          <div className="flex items-center gap-3">
            {unreadContacts.length > 0 && (
              <span className="px-3 py-1 bg-red-50 text-red-500 border border-red-200 rounded-full text-xs font-semibold">
                {unreadContacts.length} unread
              </span>
            )}
            <a
              href="/admin/contacts"
              className="text-xs text-[#267275] hover:underline font-medium"
            >
              View all →
            </a>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {threads.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-400 text-sm">No messages yet</p>
            </div>
          )}
          {threads.map((thread) => (
            <a
              key={thread.email}
              href="/admin/contacts"
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 bg-[#267275] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {thread.name.charAt(0).toUpperCase()}
                </div>
                {thread.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {thread.unreadCount}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-sm truncate ${thread.unreadCount > 0 ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                    {thread.name}
                  </span>
                  {thread.totalMessages > 1 && (
                    <span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full flex-shrink-0">
                      {thread.totalMessages} msgs
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-1 truncate">{thread.email}</p>
                <p className={`text-xs truncate ${thread.unreadCount > 0 ? 'text-gray-700' : 'text-gray-400'}`}>
                  {thread.lastMessage.message}
                </p>
              </div>

              {/* Time */}
              <div className="flex-shrink-0 text-right">
                <p className="text-xs text-gray-400">{formatDate(thread.lastMessage.created_at)}</p>
                {thread.unreadCount > 0 && (
                  <div className="w-2 h-2 bg-[#267275] rounded-full ml-auto mt-1" />
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
