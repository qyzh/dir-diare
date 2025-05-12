import { NextResponse } from 'next/server';

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

interface StravaTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  average_speed: number;
  max_speed: number;
  total_elevation_gain: number;
  kudos_count: number;
  type: string;
  start_date: string;
  achievement_count?: number;
  average_heartrate?: number;
  max_heartrate?: number;
  calories?: number;
  description?: string;
  map?: {
    summary_polyline: string;
  };
  location_city?: string;
  location_country?: string;
  photos: {
    primary?: {
      urls?: {
        '100': string;
        '600': string;
      };
    };
  };
}

type ActivityType = 'Run' | 'Ride' | 'Swim' | 'Walk' | 'Hike' | 'AlpineSki' | 'BackcountrySki' |
  'Canoeing' | 'Crossfit' | 'EBikeRide' | 'Elliptical' | 'Golf' | 'Handcycle' | 'IceSkate' |
  'InlineSkate' | 'Kayaking' | 'Kitesurf' | 'NordicSki' | 'RockClimbing' | 'RollerSki' |
  'Rowing' | 'Sail' | 'Skateboard' | 'Snowboard' | 'Snowshoe' | 'Soccer' | 'StairStepper' |
  'StandUpPaddling' | 'Surfing' | 'Velomobile' | 'VirtualRide' | 'VirtualRun' | 'WeightTraining' |
  'Wheelchair' | 'Windsurf' | 'Workout' | 'Yoga';

interface ActivityCache {
  [key: string]: {
    activities: StravaActivity[];
    timestamp: number;
  };
}


let cachedToken: string | null = null;
let tokenExpiration: number | null = null;


let activitiesCache: ActivityCache = {};
const ACTIVITIES_CACHE_DURATION = 5 * 60 * 1000;

async function getAccessToken(): Promise<string> {

  if (cachedToken && tokenExpiration && Date.now() < tokenExpiration) {
    return cachedToken;
  }

  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    throw new Error('Missing Strava credentials');
  }

  const tokenResponse = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      refresh_token: STRAVA_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  });

  if (!tokenResponse.ok) {
    throw new Error('Failed to refresh Strava token');
  }

  const data: StravaTokenResponse = await tokenResponse.json();


  cachedToken = data.access_token;
  tokenExpiration = data.expires_at * 1000 - 5 * 60 * 1000;

  return data.access_token;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const forceRefresh = url.searchParams.get('refresh') === 'true';
  const activityType = url.searchParams.get('type') as ActivityType | null;
  const count = parseInt(url.searchParams.get('count') || '5', 10);
  const cacheKey = activityType || 'all';


  if (!forceRefresh &&
      activitiesCache[cacheKey] &&
      Date.now() - activitiesCache[cacheKey].timestamp < ACTIVITIES_CACHE_DURATION) {
    return NextResponse.json(activitiesCache[cacheKey].activities);
  }

  try {
    const accessToken = await getAccessToken();


    const queryParams = new URLSearchParams({
      per_page: count.toString()
    });

    const activitiesResponse = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }
    );

    if (!activitiesResponse.ok) {
      throw new Error('Failed to fetch Strava activities');
    }

    let activities: StravaActivity[] = await activitiesResponse.json();


    if (activityType) {
      activities = activities.filter(activity => activity.type === activityType);
    }


    activitiesCache[cacheKey] = {
      activities,
      timestamp: Date.now()
    };

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Strava API error:', error);


    if (activitiesCache[cacheKey]) {
      console.log(`Returning cached ${cacheKey} activities due to API error`);
      return NextResponse.json(activitiesCache[cacheKey].activities);
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch Strava activities' },
      { status: 500 }
    );
  }
}
