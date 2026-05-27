"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  ShieldCheck,
} from "lucide-react";

export default function AdminSidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },

    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
    },

    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
    },

    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
    },

    {
      name: "Admins",
      href: "/admin/admins",
      icon: ShieldCheck,
    },
  ];

  return (
  <aside className="w-[240px] h-screen border-r border-white/10 bg-[#111827] flex flex-col fixed left-0 top-0">
    {/* LOGO */}
    <div className="h-16 flex items-center px-6 border-b border-white/10">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-[#7C8CFF] via-[#C084FC] to-[#FFB38A] text-transparent bg-clip-text">
        VYOMA
      </h1>
    </div>

    {/* MENU */}
    <div className="flex-1 p-4 space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition text-sm"
          >
            <Icon size={18} />

            <span className="font-medium">
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  </aside>
);
}