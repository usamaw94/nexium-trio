'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { testimonialService } from '@/lib/services/testimonialService';
import { Testimonial } from '@/types/admin';
import { formatDate } from '@/lib/utils';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialService.getAll();
      setTestimonials(response.data || []);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (testimonial: Testimonial) => {
    if (confirm(`Are you sure you want to delete testimonial by "${testimonial.author}"?`)) {
      try {
        await testimonialService.delete(String(testimonial.id));
        setTestimonials((prev) => prev.filter((t) => t.id !== testimonial.id));
      } catch (error) {
        console.error('Failed to delete testimonial:', error);
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
          <h1 className="text-3xl font-bold text-gray-800">Testimonials</h1>
          <p className="text-gray-500 mt-1">Manage customer testimonials</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="px-4 py-2 bg-[#267275] hover:bg-[#1f5a5c] text-white rounded-lg font-medium"
        >
          + Add Testimonial
        </Link>
      </div>

      <div className="space-y-4">
        {testimonials.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 mb-4">No testimonials yet</p>
            <Link
              href="/admin/testimonials/new"
              className="text-[#267275] hover:underline"
            >
              Add your first testimonial
            </Link>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{testimonial.author}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                      Order: {testimonial.display_order}
                    </span>
                    {testimonial.is_active ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium">
                        Inactive
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 italic mb-2">"{testimonial.quote}"</p>

                  <p className="text-sm text-gray-500 mb-3">
                    {testimonial.title}
                  </p>

                  <p className="text-xs text-gray-500">
                    Created: {formatDate(testimonial.created_at)}
                  </p>
                </div>

                <div className="flex gap-2 ml-4">
                  <Link
                    href={`/admin/testimonials/${testimonial.id}/edit`}
                    className="px-4 py-2 bg-[#267275] hover:bg-[#1f5a5c] text-white rounded text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(testimonial)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
