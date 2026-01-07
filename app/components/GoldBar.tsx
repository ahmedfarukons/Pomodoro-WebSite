'use client';

import { useTaskStore } from '../../lib/taskStore';

export default function GoldBar() {
  const { gold, totalGoldEarned } = useTaskStore();

  return (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 z-50 border border-yellow-200 dark:border-yellow-800">
      <div className="flex items-center space-x-2">
        <div className="text-2xl">🪙</div>
        <div className="flex flex-col">
          <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
            {gold}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Toplam: {totalGoldEarned}
          </div>
        </div>
      </div>
    </div>
  );
} 