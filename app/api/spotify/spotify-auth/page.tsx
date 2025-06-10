'use client';

import { useEffect, useState } from 'react';

export default function SpotifyAuth() {
  const [tokens, setTokens] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch(`/api/auth/callback/spotify?code=${code}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setTokens(data);
          }
        })
        .catch(err => setError(err.message));
    }
  }, []);

  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = 'https://dir-diare-git-spotify-qyzhs-projects.vercel.app/api/auth/callback/spotify';
    const scope = 'user-read-currently-playing user-top-read';
    
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Spotify Authentication</h1>
        
        {!tokens && !error && (
          <button
            onClick={handleLogin}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            Login with Spotify
          </button>
        )}

        {error && (
          <div className="text-red-500 mb-4">
            Error: {error}
          </div>
        )}

        {tokens && (
          <div className="space-y-2">
            <p className="font-semibold">Authentication Successful!</p>
            <p>Access Token: {tokens.access_token.substring(0, 10)}...</p>
            <p>Refresh Token: {tokens.refresh_token.substring(0, 10)}...</p>
            <p>Expires in: {tokens.expires_in} seconds</p>
          </div>
        )}
      </div>
    </div>
  );
} 