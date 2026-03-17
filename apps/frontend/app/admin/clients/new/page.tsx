'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/admin/FormComponents/Input';
import Toggle from '@/components/admin/FormComponents/Toggle';
import FileUpload from '@/components/admin/FormComponents/FileUpload';
import Button from '@/components/admin/FormComponents/Button';
import { clientService } from '@/lib/services/clientService';

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    displayOrder: 1,
    isActive: true,
    logo: null as File | null,
    logoPreview: null as string | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.logo) {
      alert('Please upload a logo');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('logo', formData.logo);
      formDataToSend.append('display_order', String(formData.displayOrder));
      formDataToSend.append('is_active', formData.isActive ? '1' : '0');

      await clientService.create(formDataToSend);
      alert('Client created successfully!');
      router.push('/admin/clients');
    } catch (error) {
      console.error('Failed to create client:', error);
      alert('Failed to create client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Add New Client</h1>
        <p className="text-gray-500 mt-1">Create a new client entry</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <Input
            label="Client Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter client name"
            required
          />

          <FileUpload
            label="Client Logo"
            name="logo"
            required
            onChange={(file, preview) => setFormData({ ...formData, logo: file, logoPreview: preview })}
          />

          <Input
            label="Display Order"
            name="displayOrder"
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
            placeholder="Enter display order (1, 2, 3...)"
            required
          />

          <Toggle
            label="Active"
            name="isActive"
            checked={formData.isActive}
            onChange={(checked) => setFormData({ ...formData, isActive: checked })}
          />

          <div className="flex gap-3 mt-6">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Client'}
            </Button>
            <Link href="/admin/clients">
              <Button variant="secondary">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
