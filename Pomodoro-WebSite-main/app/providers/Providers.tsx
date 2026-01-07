'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from './ThemeProvider';
import { UserProvider } from '../contexts/UserContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </ThemeProvider>
    </SessionProvider>
  );
} 