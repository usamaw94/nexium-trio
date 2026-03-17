import { api } from '../api';
import { Service } from '@/types/admin';

export const serviceService = {
  getAll: () => api.get<Service[]>('services'),

  getById: (id: string) => api.get<Service>(`services/${id}`),

  create: (data: { title: string; description: string; display_order: number; icon?: string; items: string[] }) =>
    api.post<Service>('services', data),

  update: (id: string, data: { title: string; description: string; display_order: number; icon?: string; items: string[] }) =>
    api.put<Service>(`services/${id}`, data),

  delete: (id: string) => api.delete(`services/${id}`),
};
