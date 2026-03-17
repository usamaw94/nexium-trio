import { api } from '../api';
import { Project } from '@/types/admin';

export const projectService = {
  getAll: () => api.get<Project[]>('projects'),

  getById: (id: string) => api.get<Project>(`projects/${id}`),

  create: (formData: FormData) => api.post<Project>('projects', formData),

  update: (id: string, formData: FormData) => api.put<Project>(`projects/${id}`, formData),

  delete: (id: string) => api.delete(`projects/${id}`),
};
