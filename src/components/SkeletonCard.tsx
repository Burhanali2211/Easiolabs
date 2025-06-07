'use client';

interface SkeletonCardProps {
  className?: string;
  showImage?: boolean;
}

const SkeletonCard = ({ className = '', showImage = true }: SkeletonCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse ${className}`}>
      {showImage && (
        <div className="flex justify-center mb-4">
          <div className="w-24 h-16 bg-gray-200 rounded-lg"></div>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="flex space-x-2">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-5 bg-gray-200 rounded w-12"></div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      <div className="bg-gray-100 rounded-lg p-3 mb-4">
        <div className="h-3 bg-gray-200 rounded w-1/4 mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
      </div>

      <div className="flex items-center justify-between">
        <div className="h-3 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
