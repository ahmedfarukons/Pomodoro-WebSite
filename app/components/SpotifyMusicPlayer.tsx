'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

interface Track {
  id: string;
  name: string;
  artists: string[];
  album: string;
  albumArt: string;
  duration: number;
  uri: string;
}

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

export default function SpotifyMusicPlayer() {
  const { data: session } = useSession();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [volume, setVolume] = useState(50);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock data for demonstration
  const mockPlaylists: Playlist[] = [
    {
      id: '1',
      name: 'Çalışma Müzikleri',
      tracks: [
        {
          id: '1',
          name: 'Lofi Beats',
          artists: ['Chillhop Music'],
          album: 'Lofi Study Session',
          albumArt: 'https://via.placeholder.com/60x60/6366f1/ffffff?text=L',
          duration: 180,
          uri: 'spotify:track:1'
        },
        {
          id: '2',
          name: 'Focus Flow',
          artists: ['Study Music'],
          album: 'Productivity Mix',
          albumArt: 'https://via.placeholder.com/60x60/22c55e/ffffff?text=F',
          duration: 240,
          uri: 'spotify:track:2'
        }
      ]
    },
    {
      id: '2',
      name: 'Motivasyon',
      tracks: [
        {
          id: '3',
          name: 'Energy Boost',
          artists: ['Motivation Mix'],
          album: 'Workout Beats',
          albumArt: 'https://via.placeholder.com/60x60/ec4899/ffffff?text=E',
          duration: 200,
          uri: 'spotify:track:3'
        }
      ]
    }
  ];

  useEffect(() => {
    setPlaylists(mockPlaylists);
  }, []);

  const handlePlayPause = () => {
    if (!session) {
      signIn('spotify');
      return;
    }
    setIsPlaying(!isPlaying);
    // Burada gerçek Spotify API çağrısı yapılacak
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    // Spotify API ile ses seviyesi ayarlanacak
  };

  const handlePlaylistSelect = (playlistId: string) => {
    setSelectedPlaylist(playlistId);
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist && playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0]);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      // Mock search results
      setSearchResults([
        {
          id: 'search1',
          name: query + ' - Search Result',
          artists: ['Search Artist'],
          album: 'Search Album',
          albumArt: 'https://via.placeholder.com/60x60/3b82f6/ffffff?text=S',
          duration: 180,
          uri: 'spotify:track:search1'
        }
      ]);
    } else {
      setSearchResults([]);
    }
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  if (!session) {
    return (
      <div className="fixed bottom-20 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-40">
        <button
          onClick={() => signIn('spotify')}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <span>🎵</span>
          <span>Spotify ile Bağlan</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-40 transition-all duration-300"
         style={{ width: isExpanded ? '400px' : 'auto' }}>
      
      {/* Compact View */}
      {!isExpanded && (
        <div className="p-4">
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
            <button
              onClick={() => setIsExpanded(true)}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              ⚙️
            </button>
          </div>
        </div>
      )}

      {/* Expanded View */}
      {isExpanded && (
        <div className="p-4 w-96">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🎵 Spotify Player</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
            >
              ✕
            </button>
          </div>

          {/* Current Track */}
          {currentTrack && (
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <img src={currentTrack.albumArt} alt={currentTrack.album} className="w-12 h-12 rounded" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">{currentTrack.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{currentTrack.artists.join(', ')}</div>
                </div>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Müzik ara..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {searchResults.length > 0 && (
              <div className="mt-2 max-h-32 overflow-y-auto">
                {searchResults.map(track => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer"
                  >
                    <img src={track.albumArt} alt={track.album} className="w-8 h-8 rounded" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{track.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">{track.artists.join(', ')}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Playlists */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Playlist'ler
            </label>
            <select
              value={selectedPlaylist}
              onChange={(e) => handlePlaylistSelect(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Playlist seçin</option>
              {playlists.map(playlist => (
                <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
              ))}
            </select>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePlayPause}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {isPlaying ? '⏸️ Duraklat' : '▶️ Çal'}
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
          </div>
        </div>
      )}
    </div>
  );
} 