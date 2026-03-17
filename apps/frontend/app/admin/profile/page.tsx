'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Input from '@/components/admin/FormComponents/Input';
import Button from '@/components/admin/FormComponents/Button';
import FileUpload from '@/components/admin/FormComponents/FileUpload';
import { profileService, UserProfile } from '@/lib/services/profileService';
import { getStorageUrl } from '@/lib/api';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pictureLoading, setPictureLoading] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await profileService.get();
      const userData = response.data;
      if (userData) {
        setProfile(userData);
        setProfileForm({
          name: userData.name,
          email: userData.email,
        });
        if (userData.profile_picture) {
          setPreviewUrl(getStorageUrl(userData.profile_picture));
        }
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      alert('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);

    try {
      await profileService.updateProfile(profileForm);
      alert('Profile updated successfully!');
      fetchProfile();
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      if (error?.message) {
        alert('Error: ' + error.message);
      } else if (error?.errors) {
        const errorMessages = Object.values(error.errors).flat().join('\n');
        alert('Validation Error:\n' + errorMessages);
      } else {
        alert('Failed to update profile');
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    setPasswordLoading(true);

    try {
      await profileService.updatePassword({
        current_password: passwordForm.currentPassword,
        new_password: passwordForm.newPassword,
        new_password_confirmation: passwordForm.confirmPassword,
      });
      alert('Password updated successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      console.error('Failed to update password:', error);
      if (error?.message) {
        alert('Error: ' + error.message);
      } else if (error?.errors) {
        const errorMessages = Object.values(error.errors).flat().join('\n');
        alert('Validation Error:\n' + errorMessages);
      } else {
        alert('Failed to update password');
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePictureUpload = async () => {
    if (!profilePicture) {
      alert('Please select a picture first');
      return;
    }

    setPictureLoading(true);

    try {
      const formData = new FormData();
      formData.append('profile_picture', profilePicture);

      await profileService.updateProfilePicture(formData);
      alert('Profile picture updated successfully!');
      setProfilePicture(null);
      fetchProfile();
    } catch (error: any) {
      console.error('Failed to update profile picture:', error);
      if (error?.message) {
        alert('Error: ' + error.message);
      } else {
        alert('Failed to update profile picture');
      }
    } finally {
      setPictureLoading(false);
    }
  };

  const handleDeletePicture = async () => {
    if (!confirm('Are you sure you want to delete your profile picture?')) {
      return;
    }

    setPictureLoading(true);

    try {
      await profileService.deleteProfilePicture();
      alert('Profile picture deleted successfully!');
      setPreviewUrl(null);
      fetchProfile();
    } catch (error: any) {
      console.error('Failed to delete profile picture:', error);
      alert('Failed to delete profile picture');
    } finally {
      setPictureLoading(false);
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
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Picture</h2>

          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-4xl text-gray-400">
                  {profile?.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                className="mb-3 text-sm text-gray-600"
              />

              <div className="flex gap-2">
                <Button
                  onClick={handlePictureUpload}
                  variant="primary"
                  disabled={!profilePicture || pictureLoading}
                >
                  {pictureLoading ? 'Uploading...' : 'Upload Picture'}
                </Button>

                {previewUrl && (
                  <Button
                    onClick={handleDeletePicture}
                    variant="secondary"
                    disabled={pictureLoading}
                  >
                    Delete Picture
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Information</h2>

          <form onSubmit={handleProfileUpdate}>
            <Input
              label="Name"
              name="name"
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              placeholder="Your name"
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              placeholder="your.email@example.com"
              required
            />

            <Button type="submit" variant="primary" disabled={profileLoading}>
              {profileLoading ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Change Password</h2>

          <form onSubmit={handlePasswordUpdate}>
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              placeholder="Enter current password"
              required
            />

            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              placeholder="Enter new password (min 8 characters)"
              required
            />

            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              placeholder="Confirm new password"
              required
            />

            <Button type="submit" variant="primary" disabled={passwordLoading}>
              {passwordLoading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
