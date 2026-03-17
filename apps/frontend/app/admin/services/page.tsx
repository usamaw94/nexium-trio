'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { serviceService } from '@/lib/services/serviceService';
import { Service } from '@/types/admin';
import { formatDate } from '@/lib/utils';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await serviceService.getAll();
      setServices(response.data || []);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (service: Service) => {
    if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
      try {
        await serviceService.delete(String(service.id));
        setServices((prev) => prev.filter((s) => s.id !== service.id));
      } catch (error) {
        console.error('Failed to delete service:', error);
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
          <h1 className="text-3xl font-bold text-gray-800">Our Services</h1>
          <p className="text-gray-500 mt-1">Manage your service offerings</p>
        </div>
        <Link
          href="/admin/services/new"
          className="px-4 py-2 bg-[#267275] hover:bg-[#1f5a5c] text-white rounded-lg font-medium"
        >
          + Add Service
        </Link>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                    Order: {service.display_order}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{service.description}</p>

                {service.items && service.items.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {service.items.map((item) => (
                        <li key={item.id} className="text-sm text-gray-600">
                          {item.item_text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="text-xs text-gray-500">
                  Created: {formatDate(service.created_at)}
                </p>
              </div>

              <div className="flex gap-2 ml-4">
                <Link
                  href={`/admin/services/${service.id}/edit`}
                  className="px-4 py-2 bg-[#267275] hover:bg-[#1f5a5c] text-white rounded text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(service)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
          No services yet. Add your first service!
        </div>
      )}
    </div>
  );
}
