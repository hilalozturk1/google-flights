import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className=" px-4 py-2 bg-blue-400 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 transition mt-4"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
