import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const env = {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
    NEXT_PUBLIC_SPOTIFY_CLIENT_ID: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    NEXT_PUBLIC_SPOTIFY_REDIRECT_URI: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
  };

  const config = {
    clientId: env.SPOTIFY_CLIENT_ID ? 'Set' : 'Missing',
    clientSecret: env.SPOTIFY_CLIENT_SECRET ? 'Set' : 'Missing',
    redirectUri: env.SPOTIFY_REDIRECT_URI ? 'Set' : 'Missing',
    publicClientId: env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ? 'Set' : 'Missing',
    publicRedirectUri: env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI ? 'Set' : 'Missing',
  };

  // Debug (mask secrets)
  const debugValues = {
    clientId: env.SPOTIFY_CLIENT_ID || 'undefined',
    clientSecret: env.SPOTIFY_CLIENT_SECRET ? '***HIDDEN***' : 'undefined',
    redirectUri: env.SPOTIFY_REDIRECT_URI || 'undefined',
    publicClientId: env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || 'undefined',
    publicRedirectUri: env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || 'undefined',
  };

  return NextResponse.json({
    message: 'Spotify Configuration Status',
    config,
    debugValues,
    timestamp: new Date().toISOString(),
  });
}
