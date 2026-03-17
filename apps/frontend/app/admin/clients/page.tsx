'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { clientService } from '@/lib/services/clientService';
import { Client } from '@/types/admin';
import { formatDate } from '@/lib/utils';
import { getStorageUrl } from '@/lib/api';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await clientService.getAll();
      setClients(response.data || []);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (client: Client) => {
    if (confirm(`Are you sure you want to delete ${client.name}?`)) {
      try {
        await clientService.delete(String(client.id));
        setClients((prev) => prev.filter((c) => c.id !== client.id));
      } catch (error) {
        console.error('Failed to delete client:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Our Clients</h1>
          <p className="text-gray-500 mt-1">Manage client logos and information</p>
        </div>
        <Link
          href="/admin/clients/new"
          className="px-4 py-2 bg-[#267275] hover:bg-[#1f5a5c] text-white rounded-lg font-medium"
        >
          + Add Client
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {clients.map((client) => (
            <div key={client.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {client.is_active ? 'Active' : 'Inactive'}
                </span>
                <span className="text-xs text-gray-500">Order: {client.display_order}</span>
              </div>

              <div className="relative h-32 mb-3 bg-gray-50 rounded flex items-center justify-center">
                <Image
                  src={getStorageUrl(client.logo)}
                  alt={client.name}
                  width={120}
                  height={80}
                  className="object-contain"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-1">{client.name}</h3>
              <p className="text-sm text-gray-500 mb-4">
                Added: {formatDate(client.created_at)}
              </p>

              <div className="flex gap-2">
                <Link
                  href={`/admin/clients/${client.id}/edit`}
                  className="flex-1 px-3 py-2 bg-[#267275] hover:bg-[#1f5a5c] text-white rounded text-sm text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(client)}
                  className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {clients.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No clients yet. Add your first client!
          </div>
        )}
      </div>
    </div>
  );
}
