'use client';

import { useState } from 'react';

export default function SpotifyMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  return (
    <div className="fixed bottom-20 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-40">
      <div className="flex items-center space-x-4">
        <button
          onClick={handlePlayPause}
          className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
            className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          🎵 Müzik Çalar
        </div>
      </div>
    </div>
  );
} 