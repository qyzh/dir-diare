"use client"
import React, { useState, useEffect } from 'react';

interface StravaProps {}
interface ActivityType {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
}
const Strava: React.FC<StravaProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [activities, setActivities] = useState<ActivityType[]>([])

  const clientID = "126947";
  const clientSecret = "bff8b2ea088158c7c8e118ee8f3cfc32957724f6";
<<<<<<< HEAD
  const refreshToken = "7145871b6d26bf3a64e9bcd09dde18a4597bf7b7";
=======
  const refreshToken = "668e70ef938ed5929a8187f45b3864b9d0c2b3f7";
>>>>>>> 95fd7fd49f57a9dc758a37b1b1fbb7af850ad3bc
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

  const showActivities = () => {
    if (isLoading) return <>LOADING</>
    if (!isLoading) {
      return activities.map((activity) => (
        <div key={activity.id}>
          {activity.name} - {(activity.distance / 1000).toFixed(2)} KM - {(activity.moving_time * 0.0166667).toFixed()} Minute
        </div>
      ))
    }
  }

  return (
    <div className="App">
      {showActivities()}
    </div>
  );
}

export default Strava;
