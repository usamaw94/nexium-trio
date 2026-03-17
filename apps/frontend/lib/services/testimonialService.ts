import { api } from '../api';
import { Testimonial } from '@/types/admin';

export const testimonialService = {
  getAll: () => api.get<Testimonial[]>('testimonials'),

  getById: (id: string) => api.get<Testimonial>(`testimonials/${id}`),

  create: (data: { quote: string; author: string; title: string; display_order: number; is_active: boolean }) =>
    api.post<Testimonial>('testimonials', data),

  update: (id: string, data: { quote: string; author: string; title: string; display_order: number; is_active: boolean }) =>
    api.put<Testimonial>(`testimonials/${id}`, data),

  delete: (id: string) => api.delete(`testimonials/${id}`),
};
