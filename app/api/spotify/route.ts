import { NextResponse } from 'next/server';
import { getNowPlaying, getTopTracks } from '../../lib/spotify';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    let response;
    if (type === 'top-tracks') {
      response = await getTopTracks();
    } else {
      response = await getNowPlaying();
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
} 