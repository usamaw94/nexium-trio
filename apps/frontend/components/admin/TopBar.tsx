'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { profileService, UserProfile } from '@/lib/services/profileService';
import { getStorageUrl } from '@/lib/api';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await profileService.get();
      if (response.data) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Admin Dashboard</span>
          </div>
        </div>

        <div className="relative flex items-center gap-4">
          {profile && (
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-700">{profile.name}</p>
              <p className="text-xs text-gray-500">{profile.email}</p>
            </div>
          )}
          <button
            onClick={() => {
              if (!dropdownOpen) {
                fetchProfile();
              }
              setDropdownOpen(!dropdownOpen);
            }}
            className="w-10 h-10 bg-[#267275] rounded-full flex items-center justify-center text-white font-medium hover:bg-[#1f5a5c] transition-colors overflow-hidden relative"
          >
            {profile?.profile_picture ? (
              <Image
                src={getStorageUrl(profile.profile_picture)}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <span>{profile?.name.charAt(0).toUpperCase() || 'A'}</span>
            )}
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                <Link
                  href="/admin/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile Settings
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
