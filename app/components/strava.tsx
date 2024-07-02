"use client";
import { CalendarIcon, RulerHorizontalIcon, TimerIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

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
}
const Strava: React.FC<StravaProps> = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [activities, setActivities] = useState<ActivityType[]>([])
    const clientID = "126947";
    const clientSecret = "908f5c9986fe0b882683aa6fd1d2367e872507d7";
    const refreshToken = "8048c9f9ab88ae2f2a50d1cd9ac0933571bc32b9";
    const refreshEndpoint = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
    const activitiesEndpoint = `https://www.strava.com/api/v3/athlete/activities?access_token=`;

  useEffect(() => {
    fetch(refreshEndpoint, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(result => getActivities(result.access_token))
  }, [refreshEndpoint])
  const getActivities = (accessToken: string) => {
    fetch(activitiesEndpoint + accessToken)
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        setIsLoading(prev => !prev)
      })
      .catch(e => console.log(e))
  }

interface ActivitiesProps {
  activities: ActivityType[];
  isLoading: boolean;
}

const Activities = ({ activities, isLoading }: ActivitiesProps) => {
  if (isLoading) return (
    <div>
    <div className='flex p-4 mb-4 bg-white/5 border animate-pulse border-transparent rounded-md duration-200 cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200'>
    <div className='flex flex-col justify-center space-y-2'>
      <div className='text-neutral-300 text-3xl font-semibold'>
        <span className=''>Loading...✨</span>
      </div>
      <div className='text-sm text-neutral-300 rounded block'>
      <span className='text-neutral-300 block'><CalendarIcon className='inline mr-2' /></span>
       <span className='text-neutral-300 block'><TimerIcon className='inline mr-2' /></span>
       <span className='text-neutral-300 block'><RulerHorizontalIcon className='inline mr-2' /></span>
      </div>
    </div>
    </div>
    </div>
  
  );
  if (!activities.length) return null;

  return (
    
    <>
      {activities.slice(0,1).map((activity) => (
        <Link href={`https://strava.com/activities/${activity.id}`} target="_blank" key={activity.id}>
        <div key={activity.id}>
        <div className='flex p-4 mb-4 bg-white/5 border border-transparent rounded-md duration-200 cursor-pointer 
        hover:bg-orange-600/10 hover:border-orange-600'>
        <div className='flex flex-col justify-center space-y-2'>
          <div className='text-neutral-300 text-3xl font-semibold'>
            <span className=''>{activity.name}</span>
          </div>
          <div className='text-sm text-neutral-300 rounded block'>
          <span className='text-neutral-300 block'><CalendarIcon className='inline mr-2' /><strong>Date : </strong>{(activity.start_date).toString().substring(0,10).replace(/-/g, "/").match(/(\d{4})\/(\d{2})\/(\d{2})/)?.[0]}</span>
           <span className='text-neutral-300 block'><TimerIcon className='inline mr-2' /><strong>Time : </strong>{(activity.moving_time * 0.0166667).toPrecision(3).toString()} Minute</span>
           <span className='text-neutral-300 block'><RulerHorizontalIcon className='inline mr-2' /><strong>Distance : </strong>{(activity.distance / 1000).toPrecision(3)} KM</span>
          </div>
        </div>
        </div>
        </div>
        </Link>
      ))}
    </>
  );
};

  return (
      <Activities activities={activities} isLoading={isLoading} />
  );
}

export default Strava;