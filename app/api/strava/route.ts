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

// Cache the access token and its expiration
let cachedToken: string | null = null;
let tokenExpiration: number | null = null;

async function getAccessToken(): Promise<string> {
  // Return cached token if it's still valid
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
  });

  if (!tokenResponse.ok) {
    throw new Error('Failed to refresh Strava token');
  }

  const data: StravaTokenResponse = await tokenResponse.json();

  // Cache the new token and set expiration (subtract 5 minutes for safety margin)
  cachedToken = data.access_token;
  tokenExpiration = data.expires_at * 1000 - 5 * 60 * 1000;

  return data.access_token;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const activitiesResponse = await fetch(
      'https://www.strava.com/api/v3/athlete/activities?per_page=1',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 6 }, // Cache for 5 minutes
      }
    );

    if (!activitiesResponse.ok) {
      throw new Error('Failed to fetch Strava activities');
    }

    const activities: StravaActivity[] = await activitiesResponse.json();
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Strava API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch Strava activities' },
      { status: 500 }
    );
  }
}
