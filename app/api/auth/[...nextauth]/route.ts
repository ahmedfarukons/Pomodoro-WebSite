import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import SpotifyProvider from 'next-auth/providers/spotify';
import fs from 'fs';
import path from 'path';
import { scopes } from '../../../../lib/spotify';

const usersFile = path.join(process.cwd(), 'users.json');

function getUsers() {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile, 'utf-8');
  return JSON.parse(data);
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "mail@site.com" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        const users = getUsers();
        const user = users.find(
          u => u.email === credentials?.email && u.password === credentials?.password
        );
        if (user) {
          return { id: user.id, name: user.name, email: user.email };
        }
        return null;
      }
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: scopes.join(' ')
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST }; 