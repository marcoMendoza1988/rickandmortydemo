import React from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border p-2 rounded text-[#000] rounded-2xl border-[#35c9dd] active:border-[#35c9dd] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
    />
  );
};

export default Input;
