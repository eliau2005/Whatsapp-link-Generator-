import React from 'react';

interface FloatingInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  icon?: React.ReactNode;
}

export const FloatingInput: React.FC<FloatingInputProps> = ({ 
  id, 
  label, 
  value, 
  onChange, 
  type = 'text', 
  required = false,
  multiline = false,
  icon
}) => {
  // Logic to determine label styling based on value and focus is handled by CSS peer class
  
  return (
    <div className="relative group">
      {/* Icon Container - Positioned Absolutely */}
      {icon && (
        <div className="absolute right-4 top-4 text-secondary group-focus-within:text-primary transition-colors pointer-events-none z-10">
          {icon}
        </div>
      )}

      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          className={`
            peer block w-full rounded-2xl border bg-transparent 
            border-gray-300 text-[#111b21]
            placeholder-transparent 
            focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none
            min-h-[120px] resize-none transition-all duration-200
            py-4 text-base
            ${icon ? 'pr-12 pl-4' : 'px-4'}
          `}
          placeholder=" "
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`
            peer block w-full rounded-2xl border bg-transparent 
            border-gray-300 text-[#111b21]
            placeholder-transparent 
            focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none 
            h-[56px] transition-all duration-200
            text-base
            ${icon ? 'pr-12 pl-4' : 'px-4'}
          `}
          placeholder=" "
          required={required}
          autoComplete="off"
        />
      )}
      
      {/* Floating Label */}
      <label
        htmlFor={id}
        className={`
          absolute pointer-events-none bg-white px-1 transition-all duration-200 ease-out origin-right
          text-secondary
          peer-focus:text-primary peer-focus:text-xs peer-focus:font-medium peer-focus:-top-2.5 peer-focus:right-4
          peer-placeholder-shown:text-base peer-placeholder-shown:top-4
          ${value ? 'text-xs font-medium -top-2.5 right-4' : ''}
          ${icon && !value ? 'peer-placeholder-shown:right-12' : 'peer-placeholder-shown:right-4'}
        `}
      >
        {label}
      </label>
    </div>
  );
};