"use client";
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  preferences: {
    theme: string;
    pomodoroSettings: {
      workDuration: number;
      shortBreakDuration: number;
      longBreakDuration: number;
      longBreakInterval: number;
    };
  };
  stats: {
    totalPomodoros: number;
    totalFocusTime: number;
    totalBreakTime: number;
    currentStreak: number;
    longestStreak: number;
  };
  createdAt: string;
}

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini al
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Kullanıcı bilgileri okunamadı:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}







