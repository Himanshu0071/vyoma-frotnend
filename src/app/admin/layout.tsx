"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";

import AdminSidebar from "@/components/admin/admin-sidebar";

import AdminHeader from "@/components/admin/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { user } =
    useAuthStore();

  useEffect(() => {
    if (
      !user ||
      user.role !== "admin"
    ) {
      router.push("/");
    }
  }, [user]);

  if (
    !user ||
    user.role !== "admin"
  ) {
    return null;
  }

  return (
    <div className="h-screen bg-[#0B1120] text-white flex overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-[240px] h-screen flex-shrink-0">
        <AdminSidebar />
      </div>
  
      {/* RIGHT SIDE */}
      <div className="flex-1 h-screen flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="h-20 flex-shrink-0">
          <AdminHeader />
        </div>
  
        {/* SCROLLABLE PAGE ONLY */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#0B1120]">
          {children}
        </main>
      </div>
    </div>
  );
}