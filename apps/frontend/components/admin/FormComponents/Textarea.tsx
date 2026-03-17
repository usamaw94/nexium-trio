import React from 'react';

interface TextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  rows?: number;
  className?: string;
}

export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  rows = 4,
  className = '',
}: TextareaProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`
          w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
          text-gray-900 placeholder-gray-400
          ${error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-[#267275]'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
