"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    if (res?.ok) {
      setSuccess("Hoş geldin! Ana sayfaya yönlendiriliyorsun...");
      setTimeout(() => router.push("/"), 1000);
    } else {
      setError("E-posta veya şifre hatalı!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
      <form onSubmit={handleLogin} className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-purple-100 dark:border-purple-800">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">Giriş Yap</h2>
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900 dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900 dark:text-white"
          required
        />
        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center animate-pulse">{success}</div>}
        <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">Giriş Yap</button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">veya</span>
          </div>
        </div>
        
        <button 
          type="button"
          onClick={() => signIn('spotify', { callbackUrl: '/' })}
          className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
        >
          <span>🎵</span>
          <span>Spotify ile Giriş Yap</span>
        </button>
        
        <div className="text-center text-sm mt-2">
          Hesabın yok mu? <a href="/register" className="text-purple-600 hover:underline">Kayıt Ol</a>
        </div>
      </form>
    </div>
  );
} 