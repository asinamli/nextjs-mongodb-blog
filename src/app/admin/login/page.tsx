"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { useAuthStore } from '@/store/authStore';

export default function AdminLoginPage() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, setLoading: setAuthLoading } = useAuthStore();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    setError("");
    
    try {
      
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.user.role !== 'admin') {
          toast.error("Bu sayfaya erişim yetkiniz yok. Sadece adminler giriş yapabilir! 🚫");
          return;
        }
      
        console.log("Giriş başarılı:", result);
        // Zustand store'u güncelle
        login(result.user);
        toast.success("Giriş başarılı! Hoşgeldiniz! 👋");
        router.push("/admin/dashboard");
      } else {
        toast.error(result.message || "Giriş başarısız! ❌");
        setError(result.message || "Giriş başarısız");
      }
    } catch (error) {
      console.error("Hata:", error);
      toast.error("Bir hata oluştu. Tekrar deneyin! ⚠️");
      setError("Bir hata oluştu. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-black p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Admin Girişi
        </h2>

      
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          placeholder="Şifre"
          {...register("password")}
          className="w-full mb-6 p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}