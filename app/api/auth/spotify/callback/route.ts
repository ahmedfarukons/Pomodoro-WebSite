import { NextRequest, NextResponse } from 'next/server';
import spotifyApi from '../../../../../lib/spotify';

export async function GET(req: NextRequest) {
  try {
    console.log('Spotify callback started');

    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    console.log('URL parameters:', { code: code ? 'Present' : 'Missing', error });

    if (error) {
      console.error('Spotify OAuth error:', error);
      return NextResponse.redirect(new URL('/settings?error=spotify_auth_failed', req.url));
    }

    if (!code) {
      console.error('No authorization code received');
      return NextResponse.redirect(new URL('/settings?error=no_code', req.url));
    }

    console.log('Authorization code received, proceeding with token exchange...');

    try {
      console.log('Exchanging code for tokens...');
      
      const data = await spotifyApi.authorizationCodeGrant(code);
      console.log('Token exchange successful:', {
        hasAccessToken: !!data.body.access_token,
        hasRefreshToken: !!data.body.refresh_token,
        expiresIn: data.body.expires_in
      });
      
      const { access_token, refresh_token } = data.body;

      // Store tokens in localStorage for client-side access
      const tokenData = {
        spotifyAccessToken: access_token,
        spotifyRefreshToken: refresh_token,
        timestamp: Date.now()
      };

      console.log('Token data prepared, redirecting to settings...');

      // Redirect to settings with success and token data
      const successUrl = new URL('/settings?success=spotify_connected', req.url);
      successUrl.searchParams.set('tokens', JSON.stringify(tokenData));
      
      return NextResponse.redirect(successUrl);
    } catch (tokenError) {
      console.error('Error exchanging code for tokens:', tokenError);
      console.error('Token error details:', {
        message: tokenError instanceof Error ? tokenError.message : 'Unknown error',
        stack: tokenError instanceof Error ? tokenError.stack : undefined
      });
      return NextResponse.redirect(new URL('/settings?error=token_exchange_failed', req.url));
    }

  } catch (error) {
    console.error('Spotify callback error:', error);
    console.error('General error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.redirect(new URL('/settings?error=callback_failed', req.url));
  }
}
