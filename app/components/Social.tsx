'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'focusing';
  focusTime: number;
}

interface StudyRoom {
  id: number;
  name: string;
  participants: number;
  topic: string;
}

export default function Social() {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: 1,
      name: 'Ahmet',
      avatar: '👨',
      status: 'online',
      focusTime: 120,
    },
    {
      id: 2,
      name: 'Ayşe',
      avatar: '👩',
      status: 'focusing',
      focusTime: 45,
    },
  ]);

  const [studyRooms, setStudyRooms] = useState<StudyRoom[]>([
    {
      id: 1,
      name: 'Matematik Çalışma Grubu',
      participants: 5,
      topic: 'Kalkülüs',
    },
    {
      id: 2,
      name: 'Programlama Odası',
      participants: 3,
      topic: 'React',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Arkadaşlar</h3>
        <div className="space-y-4">
          {friends.map((friend) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{friend.avatar}</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{friend.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {friend.status === 'focusing' ? 'Odaklanıyor' : friend.status === 'online' ? 'Çevrimiçi' : 'Çevrimdışı'}
                  </p>
                </div>
              </div>
              {friend.status === 'focusing' && (
                <span className="text-sm text-indigo-600 dark:text-indigo-400">
                  {friend.focusTime} dk
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Çalışma Odaları</h3>
        <div className="space-y-4">
          {studyRooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{room.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{room.topic}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {room.participants} katılımcı
                  </span>
                  <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Katıl
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 