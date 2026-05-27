"use client";

import {
  Bell,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuthStore } from "@/store/auth.store";

import toast from "react-hot-toast";

export default function AdminHeader() {
  const { user, logout } =
    useAuthStore();

  return (
    <header className="h-16 border-b border-white/10 bg-[#111827] px-6 flex items-center justify-between sticky top-0 z-40">
      {/* LEFT */}
      <div>
        <h2 className="text-lg font-semibold">
          Dashboard
        </h2>

        <p className="text-xs text-gray-400 mt-0.5">
          Welcome back, {user?.name}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* NOTIFICATION */}
        <button className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
          <Bell size={18} />
        </button>

        {/* USER MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-white/5 transition">
              {/* AVATAR */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#7C8CFF] to-[#C084FC] flex items-center justify-center text-sm font-semibold">
                {user?.name?.charAt(
                  0
                )}
              </div>

              {/* NAME */}
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium leading-none">
                  {user?.name}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {user?.role}
                </p>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-64 bg-[#111827] border border-white/10 text-white rounded-2xl"
          >
            {/* USER INFO */}
            <DropdownMenuLabel className="py-4">
              <div>
                <p className="font-semibold text-sm">
                  {user?.name}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-white/10" />

            {/* PROFILE */}
            <DropdownMenuItem className="cursor-pointer focus:bg-white/5 rounded-xl">
              <User
                size={16}
                className="mr-3"
              />

              Profile
            </DropdownMenuItem>

            {/* SETTINGS */}
            <DropdownMenuItem className="cursor-pointer focus:bg-white/5 rounded-xl">
              <Settings
                size={16}
                className="mr-3"
              />

              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-white/10" />

            {/* LOGOUT */}
            <DropdownMenuItem
              onClick={() => {
                logout();

                toast.success(
                  "Logged out"
                );
              }}
              className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-500/10 rounded-xl"
            >
              <LogOut
                size={16}
                className="mr-3"
              />

              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}