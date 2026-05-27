"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { loginUser } from "@/services/auth.service";

import { useAuthStore } from "@/store/auth.store";

export default function LoginPage() {
  const router = useRouter();

  const login =
    useAuthStore((state) => state.login);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      login(data.user, data.token);

      toast.success("Login successful");

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
        onSubmit={handleLogin}
        className="w-full max-w-md glass p-10 rounded-[32px] space-y-6"
      >
        <div>
          <h1 className="text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-3">
            Login to your account
          </p>
        </div>

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
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#1356d0] via-[#9A1951] to-[#FA5303] text-white font-semibold"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}

          <span
            onClick={() =>
              router.push("/register")
            }
            className="text-purple-500 hover:text-purple-400 cursor-pointer font-medium transition"
          >
            Create one
          </span>
        </p>
      </form>
    </section>
  );
}