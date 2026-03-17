'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface FileUploadProps {
  label: string;
  name: string;
  accept?: string;
  required?: boolean;
  onChange: (file: File | null, preview: string | null) => void;
  currentImage?: string;
  className?: string;
}

export default function FileUpload({
  label,
  name,
  accept = 'image/*',
  required = false,
  onChange,
  currentImage,
  className = '',
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(file, result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      onChange(null, null);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="flex items-start gap-4">
        {preview && (
          <div className="relative w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            id={name}
            name={name}
            accept={accept}
            required={required && !preview}
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor={name}
            className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            Choose File
          </label>
          <p className="mt-2 text-sm text-gray-500">
            Accepted formats: JPG, PNG, SVG (Max 5MB)
          </p>
        </div>
      </div>
    </div>
  );
}
