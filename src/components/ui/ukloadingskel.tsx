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
    <div className="now-play-container">
      <main className="now-play-content mt-4">
        <div className="group flex items-center border border-transparent gap-2 sm:gap-4 p-2 sm:p-4 hover:bg-neutral-900 hover:border-neutral-800 transition-colors rounded">
          <div className="flex items-center justify-center group-hover:border-r group-hover:border-neutral-800 w-32 h-32">
            <div className="bg-neutral-800 w-28 h-28 rounded object-cover animate-pulse shadow-lg" />
          </div>

          <div className="track-details flex-1 min-w-0 space-y-1 font-mono">
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-5 sm:h-6 w-32 sm:w-48 bg-neutral-800 rounded animate-pulse"></div>
              <div className="h-5 w-20 bg-neutral-800 rounded animate-pulse"></div>
            </div>
            <div className="h-4 sm:h-5 w-24 sm:w-32 bg-neutral-800 rounded animate-pulse"></div>
            <div className="h-3 sm:h-4 w-32 sm:w-40 bg-neutral-800 rounded animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  );
}; 