"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    if (res.ok) {
      setSuccess("Kayıt başarılı! Ana sayfaya yönlendiriliyorsunuz...");
      setTimeout(() => router.push("/"), 1000);
    } else {
      const data = await res.json();
      setError(data.error || "Bir hata oluştu");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
      <form onSubmit={handleRegister} className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-purple-100 dark:border-purple-800">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">Kayıt Ol</h2>
        <input
          type="text"
          placeholder="İsim"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900 dark:text-white"
          required
        />
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
        <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">Kayıt Ol</button>
        <div className="text-center text-sm mt-2">
          Zaten hesabın var mı? <a href="/login" className="text-purple-600 hover:underline">Giriş Yap</a>
        </div>
      </form>
    </div>
  );
} 