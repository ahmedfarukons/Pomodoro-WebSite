import { NextResponse } from 'next/server';
import { scopes } from '../../../../../lib/spotify';

export async function GET() {
  try {
    // Prefer server-side envs, but fall back to public envs if needed (for dev convenience)
    const clientId = process.env.SPOTIFY_CLIENT_ID || process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI || process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || 'http://localhost:3000/api/auth/spotify/callback';

    if (!clientId) {
      console.error('Spotify client ID missing. Set SPOTIFY_CLIENT_ID or NEXT_PUBLIC_SPOTIFY_CLIENT_ID.');
      return NextResponse.redirect(new URL('/settings?error=spotify_config_missing', redirectUri));
    }

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scopes.join(' '),
      show_dialog: 'true',
      state: Math.random().toString(36).slice(2)
    });

    return NextResponse.redirect('https://accounts.spotify.com/authorize?' + params.toString());
  } catch (error) {
    console.error('Spotify login init error:', error);
    return NextResponse.redirect('https://accounts.spotify.com');
  }
}


