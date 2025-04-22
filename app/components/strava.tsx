"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import runningIcon from '/public/svg/running.svg';
import stopwatchIcon from '/public/svg/stopwatch.svg';
import lengthIcon from '/public/svg/length.svg';

interface StravaProps {}
interface ActivityType {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  average_speed: number;
  kudos_count: number;
  type: string;
  start_date: string;
  photos: {
    primary: {
      urls: {
        '100': string;
        '600': string;
      };
    };
  };
}

const Strava: React.FC<StravaProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<ActivityType[]>([]);

  const fetchActivities = useCallback(async () => {
    try {
      const response = await fetch('/api/strava');
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      const data = await response.json();
      setActivities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500 rounded-md">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchActivities}
          className="mt-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-md hover:bg-red-500/30 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return <Activities activities={activities} isLoading={isLoading} />;
};

interface ActivitiesProps {
  activities: ActivityType[];
  isLoading: boolean;
}

const Activities: React.FC<ActivitiesProps> = React.memo(({ activities, isLoading }) => {
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }, []);

  const formatTime = useCallback((minutes: number) => {
    return `${minutes.toFixed(1)} min`;
  }, []);

  const formatDistance = useCallback((meters: number) => {
    return `${(meters / 1000).toFixed(1)} km`;
  }, []);

  const latestActivity = useMemo(() => activities[0], [activities]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="p-4 bg-white/5 border border-transparent rounded-md">
          <div className="space-y-2">
            <div className="h-8 bg-white/10 rounded w-3/4" />
            <div className="space-y-1">
              <div className="h-4 bg-white/10 rounded w-1/2" />
              <div className="h-4 bg-white/10 rounded w-1/3" />
              <div className="h-4 bg-white/10 rounded w-1/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!activities.length) return null;

  return (
    <Link
    href={`https://strava.com/activities/${latestActivity.id}`}
    target="_blank"
    rel="noopener noreferrer"
    className="block transition-transform"
  >
    <div className="bg-white/5 border border-transparent rounded duration-200 cursor-pointer
      hover:bg-orange-600/10 hover:border-orange-600">
      <div className="flex flex-col bg-orange-600/10 hover:bg-orange-600 sm:flex-row items-center ">
        <div className="flex-1 p-2 space-y-2 ">

          <div className="flex items-center flex-wrap gap-2">
            <Image
              src={runningIcon}
              alt="Activity"
              width={26}
              height={26}
            />
            <span className="text-neutral-300 text-xl sm:text-3xl font-semibold truncate">
              {latestActivity.name}
            </span>
            <span className="text-xs font-mono content-end">• {formatDate(latestActivity.start_date)}</span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-neutral-300">

            <div className="flex items-center gap-1">
              <Image
                src={stopwatchIcon}
                alt="Time"
                width={20}
                height={20}
              />
              <span>{formatTime(latestActivity.moving_time * 0.0166667)}</span>
            </div>

            <div className="flex items-center gap-1">
              <Image
                src={lengthIcon}
                alt="Distance"
                width={20}
                height={20}
              />
              <span>{formatDistance(latestActivity.distance)}</span>
            </div>

          </div>

        </div>

        <div className="relative w-full sm:w-32 h-32 rounded overflow-hidden bg-white/5 flex items-center justify-center">
          {latestActivity.photos?.primary ? (
            <Image
              src={latestActivity.photos.primary.urls['600']}
              alt={latestActivity.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          ) : (
            <Image
              src={runningIcon}
              alt="Activity"
              width={24}
              height={24}
            />
          )}
        </div>


      </div>
    </div>
  </Link>
  );
});

Activities.displayName = 'Activities';

export default Strava;
