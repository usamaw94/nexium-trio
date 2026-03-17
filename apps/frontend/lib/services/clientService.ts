import { api } from '../api';
import { Client } from '@/types/admin';

export const clientService = {
  getAll: () => api.get<Client[]>('clients'),

  getById: (id: string) => api.get<Client>(`clients/${id}`),

  create: (formData: FormData) => api.post<Client>('clients', formData),

  update: (id: string, formData: FormData) => api.put<Client>(`clients/${id}`, formData),

  delete: (id: string) => api.delete(`clients/${id}`),
};
