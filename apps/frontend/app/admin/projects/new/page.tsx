'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/admin/FormComponents/Input';
import Textarea from '@/components/admin/FormComponents/Textarea';
import FileUpload from '@/components/admin/FormComponents/FileUpload';
import ColorPicker from '@/components/admin/FormComponents/ColorPicker';
import Button from '@/components/admin/FormComponents/Button';
import { projectService } from '@/lib/services/projectService';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    link: '',
    bgColor: '#267275',
    image: null as File | null,
    imagePreview: null as string | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert('Please upload a project image');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('bg_color', formData.bgColor);
      formDataToSend.append('link', formData.link);

      await projectService.create(formDataToSend);
      alert('Project created successfully!');
      router.push('/admin/projects');
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Add New Project</h1>
        <p className="text-gray-500 mt-1">Create a new portfolio project</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <Input
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter project title"
            required
          />

          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="e.g., WordPress Development, Shopify Development"
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter project description"
            rows={4}
          />

          <FileUpload
            label="Project Image"
            name="image"
            required
            onChange={(file, preview) => setFormData({ ...formData, image: file, imagePreview: preview })}
          />

          <ColorPicker
            label="Background Color"
            name="bgColor"
            value={formData.bgColor}
            onChange={(color) => setFormData({ ...formData, bgColor: color })}
            required
          />

          <Input
            label="Project Link (Optional)"
            name="link"
            type="url"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            placeholder="https://example.com"
          />

          <div className="flex gap-3 mt-6">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
            <Link href="/admin/projects">
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
