"use client";
import React, { useState } from 'react';

const MusicPlayer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // URL'yi YouTube Music embed formatına dönüştür ve sadece ses olarak ayarla
    const videoId = playlistUrl.split('v=')[1]?.split('&')[0] || '';
    if (videoId) {
      setPlaylistUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&theme=dark&color=white&disablekb=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
        Müzik Çalar
      </button>

      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-80">
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              placeholder="YouTube Music URL'si yapıştırın"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            />
            <button
              type="submit"
              className="w-full mt-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
            >
              Oynat
            </button>
          </form>

          {playlistUrl && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={playlistUrl}
                title="YouTube Music Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
                style={{ display: 'none' }}
              ></iframe>
              <audio
                src={playlistUrl}
                controls
                className="w-full"
                autoPlay
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MusicPlayer; 