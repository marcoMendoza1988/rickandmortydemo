import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col items-center p-4 border rounded shadow-md space-y-4">
      <div className="bg-gray-300 h-32 w-32 rounded-full"></div>
      <div className="bg-gray-300 h-6 w-3/4"></div>
      <div className="bg-gray-300 h-4 w-1/2"></div>
    </div>
  );
};

export default SkeletonCard;
