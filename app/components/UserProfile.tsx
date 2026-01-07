'use client';

import { useUser } from '../contexts/UserContext';

export default function UserProfile() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-40">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
          {user.name?.[0] || user.email?.[0] || '?'}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user.name || 'Kullanıcı'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
} 