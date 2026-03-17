'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projectService } from '@/lib/services/projectService';
import { Project } from '@/types/admin';
import { formatDate } from '@/lib/utils';
import { getStorageUrl } from '@/lib/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAll();
      setProjects(response.data || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (project: Project) => {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      try {
        await projectService.delete(String(project.id));
        setProjects((prev) => prev.filter((p) => p.id !== project.id));
      } catch (error) {
        console.error('Failed to delete project:', error);
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
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
          <p className="text-gray-500 mt-1">Manage your portfolio projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-[#267275] hover:bg-[#1f5a5c] text-white rounded-lg font-medium"
        >
          + Add Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48" style={{ backgroundColor: project.bg_color }}>
              <Image
                src={getStorageUrl(project.image)}
                alt={project.title}
                fill
                className="object-cover opacity-80"
              />
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
                <div
                  className="w-6 h-6 rounded border-2 border-gray-300"
                  style={{ backgroundColor: project.bg_color }}
                  title={project.bg_color}
                />
              </div>

              <p className="text-sm text-[#267275] font-medium mb-2">{project.category}</p>

              {project.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
              )}

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline mb-3 block"
                >
                  View Project →
                </a>
              )}

              <p className="text-xs text-gray-500 mb-4">
                Added: {formatDate(project.created_at)}
              </p>

              <div className="flex gap-2">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="flex-1 px-3 py-2 bg-[#267275] hover:bg-[#1f5a5c] text-white rounded text-sm text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project)}
                  className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
          No projects yet. Add your first project!
        </div>
      )}
    </div>
  );
}
