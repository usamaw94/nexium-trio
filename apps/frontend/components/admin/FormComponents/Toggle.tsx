import React from 'react';

interface ToggleProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export default function Toggle({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  className = '',
}: ToggleProps) {
  return (
    <div className={`flex items-center mb-4 ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${checked ? 'bg-[#267275]' : 'bg-gray-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
      <label htmlFor={name} className="ml-3 text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
}
