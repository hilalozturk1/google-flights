import React from 'react';
interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-slate-200 shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg mb-4">
      {children}
    </div>
  );
};

export default Card;
