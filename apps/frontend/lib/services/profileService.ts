import { api } from '../api';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  profile_picture?: string;
  created_at: string;
  updated_at: string;
}

export const profileService = {
  get: () => api.get<UserProfile>('profile'),

  updateProfile: (data: { name: string; email: string }) =>
    api.put<UserProfile>('profile', data),

  updatePassword: (data: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string
  }) =>
    api.put('profile/password', data),

  updateProfilePicture: (formData: FormData) =>
    api.post<UserProfile>('profile/picture', formData),

  deleteProfilePicture: () =>
    api.delete('profile/picture'),
};
