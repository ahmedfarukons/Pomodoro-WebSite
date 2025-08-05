'use client';

import { useSession } from 'next-auth/react';

export default function UserProfile() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-40">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
          {session.user?.name?.[0] || session.user?.email?.[0] || '?'}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {session.user?.name || 'Kullanıcı'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {session.user?.email}
          </p>
        </div>
      </div>
    </div>
  );
} 