"use client"
import React, { useState, useEffect } from 'react';

function Strava() {
  
  const [isLoading, setIsLoading] = useState(false)
  const [activities, setActivities] = useState([])

  //Strava Credentials
  let clientID = "126947";
  let clientSecret = "bff8b2ea088158c7c8e118ee8f3cfc32957724f6";
  // refresh token and call address
  const refreshToken = "8048c9f9ab88ae2f2a50d1cd9ac0933571bc32b9";
  const refreshEndpoint = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
  // endpoint for read-all activities. temporary token is added in getActivities()
  const activitiesEndpoint = `https://www.strava.com/api/v3/athlete/activities?access_token=`

  // Use refresh token to get current access token
  useEffect(() => {
    fetch(refreshEndpoint, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(result => getActivities(result.access_token))
  }, [refreshEndpoint])

  function getActivities(accessToken){
    console.log(activitiesEndpoint + accessToken)
      fetch(activitiesEndpoint + accessToken)
      .then(res => res.json())
      .then(data => {setActivities(data); setIsLoading(prev => !prev)})
      .catch(e => console.log(e))
  }


  function showActivities(){
    if(isLoading) return <>LOADING</>
    if(!isLoading) {
      return activities.map((activity) => {
        return (
        <div> 
        {activity.name} - {(activity.distance / 1000).toFixed(2) } KM - {(activity.moving_time * 0.0166667).toFixed() } Minute
        </div>
      )})
    }
  }
  return (
    <div className="App">
      {showActivities()}
    </div>
  );
}

export default Strava;