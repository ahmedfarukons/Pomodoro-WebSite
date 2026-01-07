import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers/Providers';
import Taskbar from './components/Taskbar';
import ThemeToggle from './components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pomodoro Zamanlayıcı',
  description: 'Modern ve kullanıcı dostu pomodoro zamanlayıcı uygulaması',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-300`}>
        <Providers>
          <ThemeToggle />
          <div className="pb-16">
            {children}
          </div>
          <Taskbar />
        </Providers>
      </body>
    </html>
  );
} 