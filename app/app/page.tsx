import PomodoroTimer from '../components/PomodoroTimer';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Pomodoro Zamanlayıcı
        </h1>
        <PomodoroTimer />
      </div>
    </main>
  );
} 