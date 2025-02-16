import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ icon, ...props }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
      {icon && <span className="text-gray-500 mr-2">{icon}</span>}
      <input
        className="w-full outline-none bg-transparent text-gray-700"
        {...props}
      />
    </div>
  );
};

export default Input;
