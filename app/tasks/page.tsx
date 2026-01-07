'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TasksPage() {
  const router = useRouter();

  useEffect(() => {
    // Tasks are already on the main page, so redirect there
    router.push('/');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Yönlendiriliyor...
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Görevler ana sayfada bulunmaktadır.
        </p>
      </div>
    </div>
  );
} 