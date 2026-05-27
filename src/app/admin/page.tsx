"use client";

import { useEffect, useState } from "react";

import {
  ShoppingCart,
  Users,
  Package,
  IndianRupee,
} from "lucide-react";

import toast from "react-hot-toast";

import { getDashboardStats } from "@/services/admin-dashboard.service";

export default function AdminDashboard() {
  const [stats, setStats] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  /* FETCH */
  useEffect(() => {
    const fetchStats =
      async () => {
        try {
          const data =
            await getDashboardStats();

          setStats(data);
        } catch (error) {
          console.log(error);

          toast.error(
            "Failed to load dashboard"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-sm text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  const cards = [
    {
      title:
        "Total Orders",

      value:
        stats?.totalOrders,

      icon: ShoppingCart,
    },

    {
      title:
        "Users",

      value:
        stats?.totalUsers,

      icon: Users,
    },

    {
      title:
        "Products",

      value:
        stats?.totalProducts,

      icon: Package,
    },

    {
      title:
        "Revenue",

      value: `₹${stats?.totalRevenue}`,

      icon: IndianRupee,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Vyoma ERP Overview
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map(
          (card) => {
            const Icon =
              card.icon;

            return (
              <div
                key={
                  card.title
                }
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Icon
                      size={18}
                    />
                  </div>

                  <span className="text-xs text-gray-400">
                    Overview
                  </span>
                </div>

                <h2 className="text-3xl font-bold">
                  {
                    card.value
                  }
                </h2>

                <p className="text-sm text-gray-400 mt-2">
                  {card.title}
                </p>
              </div>
            );
          }
        )}

      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-5">
          Recent Orders
        </h2>

        <div className="space-y-4">
          {stats?.recentOrders.map(
            (order: any) => (
              <div
                key={
                  order._id
                }
                className="flex items-center justify-between border-b border-white/5 pb-4"
              >
                <div>
                  <p className="text-sm font-medium">
                    {
                      order.user
                        ?.name
                    }
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {
                      order.user
                        ?.email
                    }
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium">
                    ₹
                    {
                      order?.totalPrice
                    }
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}