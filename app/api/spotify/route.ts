import { NextResponse } from 'next/server';
import { getNowPlaying, getTopTracks, getAccessToken } from '../../lib/spotify';

const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const playlistId = searchParams.get('playlist_id');

  try {
    console.log('Checking environment variables...');
    console.log('SPOTIFY_CLIENT_ID:', process.env.SPOTIFY_CLIENT_ID ? 'Set' : 'Not set');
    console.log('SPOTIFY_CLIENT_SECRET:', process.env.SPOTIFY_CLIENT_SECRET ? 'Set' : 'Not set');
    console.log('SPOTIFY_REFRESH_TOKEN:', process.env.SPOTIFY_REFRESH_TOKEN ? 'Set' : 'Not set');

    let response;
    if (type === 'top-tracks') {
      response = await getTopTracks();
    } else if (type === 'playlists') {
      const { access_token } = await getAccessToken();
      response = await fetch(PLAYLISTS_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } else if (type === 'playlist-tracks' && playlistId) {
      const { access_token } = await getAccessToken();
      response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } else {
      response = await getNowPlaying();
    }

    // Handle empty response (204 No Content)
    if (!response || (response.status && response.status === 204)) {
      return NextResponse.json({ is_playing: false });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch Spotify data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 