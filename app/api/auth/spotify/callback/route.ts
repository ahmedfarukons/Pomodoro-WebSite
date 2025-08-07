import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '../../../../../lib/mongodb';
import User from '../../../../../models/User';
import { authOptions } from '../../[...nextauth]/route';
import spotifyApi from '../../../../../lib/spotify';

export async function GET(req: NextRequest) {
  try {
    // Temporary hardcoded values for testing
    const tempEnv = {
      SPOTIFY_CLIENT_ID: 'eff198ef671f4786be5c0cb27cd2dfa8',
      SPOTIFY_CLIENT_SECRET: '3b90062413a445bd9e11e6ea1f3239a7',
      SPOTIFY_REDIRECT_URI: 'http://127.0.0.1:3001/api/auth/spotify/callback',
    };

    // Check if required environment variables are set
    if (!tempEnv.SPOTIFY_CLIENT_ID || !tempEnv.SPOTIFY_CLIENT_SECRET || !tempEnv.SPOTIFY_REDIRECT_URI) {
      console.error('Missing Spotify environment variables');
      return NextResponse.redirect(new URL('/settings?error=spotify_config_missing', req.url));
    }

    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      console.error('No session found, redirecting to auth');
      return NextResponse.redirect(new URL('/auth', req.url));
    }

    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Spotify OAuth error:', error);
      return NextResponse.redirect(new URL('/settings?error=spotify_auth_failed', req.url));
    }

    if (!code) {
      console.error('No authorization code received');
      return NextResponse.redirect(new URL('/settings?error=no_code', req.url));
    }

    await connectDB();

    try {
      // Configure Spotify API with credentials
      spotifyApi.setClientId(tempEnv.SPOTIFY_CLIENT_ID);
      spotifyApi.setClientSecret(tempEnv.SPOTIFY_CLIENT_SECRET);
      spotifyApi.setRedirectUri(tempEnv.SPOTIFY_REDIRECT_URI);

      console.log('Exchanging code for tokens...');
      const data = await spotifyApi.authorizationCodeGrant(code);
      const { access_token, refresh_token } = data.body;

      console.log('Tokens received, updating user...');
      
      // Update user with Spotify tokens in preferences
      const UserModel = User as any;
      await UserModel.findByIdAndUpdate(
        session.user.id,
        {
          $set: {
            'preferences.spotifyAccessToken': access_token,
            'preferences.spotifyRefreshToken': refresh_token,
            updatedAt: new Date()
          }
        },
        { new: true }
      );

      console.log('User updated successfully');
      return NextResponse.redirect(new URL('/settings?success=spotify_connected', req.url));
    } catch (tokenError) {
      console.error('Error exchanging code for tokens:', tokenError);
      return NextResponse.redirect(new URL('/settings?error=token_exchange_failed', req.url));
    }

  } catch (error) {
    console.error('Spotify callback error:', error);
    return NextResponse.redirect(new URL('/settings?error=callback_failed', req.url));
  }
}
