import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Temporary hardcoded values for testing
  const tempEnv = {
    SPOTIFY_CLIENT_ID: 'eff198ef671f4786be5c0cb27cd2dfa8',
    SPOTIFY_CLIENT_SECRET: '3b90062413a445bd9e11e6ea1f3239a7',
    SPOTIFY_REDIRECT_URI: 'http://127.0.0.1:3001/api/auth/spotify/callback',
    NEXT_PUBLIC_SPOTIFY_CLIENT_ID: 'eff198ef671f4786be5c0cb27cd2dfa8',
    NEXT_PUBLIC_SPOTIFY_REDIRECT_URI: 'http://127.0.0.1:3001/api/auth/spotify/callback',
  };

  const config = {
    clientId: tempEnv.SPOTIFY_CLIENT_ID ? 'Set' : 'Missing',
    clientSecret: tempEnv.SPOTIFY_CLIENT_SECRET ? 'Set' : 'Missing',
    redirectUri: tempEnv.SPOTIFY_REDIRECT_URI ? 'Set' : 'Missing',
    publicClientId: tempEnv.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ? 'Set' : 'Missing',
    publicRedirectUri: tempEnv.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI ? 'Set' : 'Missing',
  };

  // Debug: Show actual values (be careful with secrets in production)
  const debugValues = {
    clientId: tempEnv.SPOTIFY_CLIENT_ID || 'undefined',
    clientSecret: tempEnv.SPOTIFY_CLIENT_SECRET ? '***HIDDEN***' : 'undefined',
    redirectUri: tempEnv.SPOTIFY_REDIRECT_URI || 'undefined',
    publicClientId: tempEnv.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || 'undefined',
    publicRedirectUri: tempEnv.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || 'undefined',
  };

  return NextResponse.json({
    message: 'Spotify Configuration Status (Using Hardcoded Values)',
    config,
    debugValues,
    timestamp: new Date().toISOString()
  });
}
