import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="bg-[#35c9dd] text-white p-1 rounded-2xl">
      {children}
    </button>
  );
};

export default Button;
