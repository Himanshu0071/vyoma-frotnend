"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { registerUser } from "@/services/auth.service";

import { useAuthStore } from "@/store/auth.store";

export default function RegisterPage() {
  const router = useRouter();

  const login =
    useAuthStore((state) => state.login);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await registerUser({
        name,
        email,
        password,
      });

      login(data.user, data.token);

      toast.success(
        "Account created successfully"
      );

      router.push("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">

      <form
        onSubmit={handleRegister}
        className="w-full max-w-md glass p-10 rounded-[32px] space-y-6"
      >
        <div>
          <h1 className="text-4xl font-bold">
            Create Account
          </h1>

          <p className="text-gray-500 mt-3">
            Join Vyoma today
          </p>
        </div>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full h-14 px-5 rounded-2xl bg-transparent border border-gray-300 dark:border-white/10 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full h-14 px-5 rounded-2xl bg-transparent border border-gray-300 dark:border-white/10 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full h-14 px-5 rounded-2xl bg-transparent border border-gray-300 dark:border-white/10 outline-none"
        />

        <button
          disabled={loading}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#7C8CFF] via-[#C084FC] to-[#FFB38A] text-white font-semibold"
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>
      </form>
    </section>
  );
}