'use client';

import { useState, useEffect } from 'react';

export default function SpotifyDebug() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkConfig = async () => {
      try {
        const response = await fetch('/api/test-spotify-config');
        if (response.ok) {
          const data = await response.json();
          setConfig(data);
        }
      } catch (error) {
        console.error('Error checking Spotify config:', error);
      } finally {
        setLoading(false);
      }
    };

    checkConfig();
  }, []);

  if (loading) {
    return <div className="p-4">Yükleniyor...</div>;
  }

  if (!config) {
    return <div className="p-4 text-red-600">Yapılandırma kontrol edilemedi.</div>;
  }

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Spotify Yapılandırma Durumu</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Client ID (Server):</span>
          <span className={config.config.clientId === 'Set' ? 'text-green-600' : 'text-red-600'}>
            {config.config.clientId}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Client Secret:</span>
          <span className={config.config.clientSecret === 'Set' ? 'text-green-600' : 'text-red-600'}>
            {config.config.clientSecret}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Redirect URI (Server):</span>
          <span className={config.config.redirectUri === 'Set' ? 'text-green-600' : 'text-red-600'}>
            {config.config.redirectUri}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Client ID (Client):</span>
          <span className={config.config.publicClientId === 'Set' ? 'text-green-600' : 'text-red-600'}>
            {config.config.publicClientId}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Redirect URI (Client):</span>
          <span className={config.config.publicRedirectUri === 'Set' ? 'text-green-600' : 'text-red-600'}>
            {config.config.publicRedirectUri}
          </span>
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-500">
        Son kontrol: {new Date(config.timestamp).toLocaleString()}
      </div>
    </div>
  );
}
