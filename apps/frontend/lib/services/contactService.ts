import { api } from '../api';
import { ContactSubmission } from '@/types/admin';

export const contactService = {
  getAll: () => api.get<ContactSubmission[]>('contacts'),

  getById: (id: string) => api.get<ContactSubmission>(`contacts/${id}`),

  create: (data: { name: string; email: string; message: string }) =>
    api.post<ContactSubmission>('contacts', data),

  markAsRead: (id: string) => api.patch<ContactSubmission>(`contacts/${id}/mark-read`),

  delete: (id: string) => api.delete(`contacts/${id}`),
};
