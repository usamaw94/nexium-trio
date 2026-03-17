import React from 'react';

interface ColorPickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (color: string) => void;
  required?: boolean;
  className?: string;
}

export default function ColorPicker({
  label,
  name,
  value,
  onChange,
  required = false,
  className = '',
}: ColorPickerProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="flex items-center gap-3">
        <input
          type="color"
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-20 cursor-pointer rounded border border-gray-300"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#267275] text-gray-900 placeholder-gray-400 bg-white"
        />
      </div>
    </div>
  );
}
