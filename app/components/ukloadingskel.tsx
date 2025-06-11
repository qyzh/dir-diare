import React from 'react';

interface LoadingSkeletonProps {
  type: 'track' | 'playlist' | 'now-playing';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type }) => {
  if (type === 'track') {
    return (
      <div className="flex p-2 gap-1.5 items-center font-mono border border-neutral-700 dark:bg-neutral-950 rounded hover:bg-neutral-900 transition-colors duration-200">
        <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
          <div className="h-4 w-48 bg-neutral-800 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-neutral-800 rounded animate-pulse"></div>
        </div>
        <span className="text-sm text-neutral-500 animate-pulse">00.00</span>
      </div>
    );
  }

  if (type === 'playlist') {
    return (
      <div className="flex p-2 gap-1.5 items-center font-mono border border-neutral-700 dark:bg-neutral-950 rounded hover:bg-neutral-900 transition-colors duration-200">
        <div className="w-18 h-18 relative rounded overflow-hidden">
          <div className='w-18 h-18 bg-neutral-900 animate-pulse'/>
        </div> 
        <div className="overflow-hidden flex-1">
          <div className="h-4 w-24 bg-neutral-800 mb-2 rounded animate-pulse"></div>
          <div className="h-4 w-28 bg-neutral-800 mb-2 rounded animate-pulse"></div>
          <div className="flex justify-between items-center">
            <span className="h-4 w-12 bg-neutral-800 rounded animate-pulse"></span>
            <span className="h-4 w-12 bg-neutral-800 rounded animate-pulse"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full bg-neutral-800 animate-pulse"></div>
      </div>
      <div className="space-y-3">
        <div className="h-6 w-48 bg-neutral-800 rounded animate-pulse"></div>
        <div className="h-4 w-32 bg-neutral-800 rounded animate-pulse"></div>
        <div className="h-4 w-40 bg-neutral-800 rounded animate-pulse"></div>
      </div>
    </div>
  );
}; 