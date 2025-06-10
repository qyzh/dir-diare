import { NextResponse } from 'next/server';
import { getAccessToken } from '../../../lib/spotify';

const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(PLAYLISTS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get playlists: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch Spotify playlists',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 