"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { useAuthStore } from "@/store/auth.store";

import { getMyOrders } from "@/services/order.service";

interface Order {
  _id: string;

  totalPrice: number;

  orderStatus: string;

  paymentStatus: string;

  createdAt: string;

  items: {
    title: string;

    quantity: number;

    price: number;
  }[];
}

export default function OrdersPage() {
  const router = useRouter();

  const { user, token } =
    useAuthStore();

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        toast.error(
          "Please login first"
        );

        router.push("/login");

        return;
      }

      try {
        const data =
          await getMyOrders(token);

        setOrders(data);
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to fetch orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, router]);

  if (loading) {
    return (
      <div className="py-32 text-center">
        Loading orders...
      </div>
    );
  }

  return (
    <section className="py-24">
      <div className="container-custom">

        <div className="mb-12">
          <h1 className="text-5xl font-bold">
            My Orders
          </h1>

          <p className="text-gray-500 mt-4">
            Track your purchases
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="glass rounded-[32px] p-10 text-center">
            No orders found
          </div>
        ) : (
          <div className="space-y-8">

            {orders.map((order) => (
              <div
                key={order._id}
                className="glass rounded-[32px] p-8"
              >
                {/* Top */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">

                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <h2 className="font-semibold">
                      {order._id}
                    </h2>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Status
                    </p>

                    <h2 className="font-semibold text-purple-400">
                      {order.orderStatus}
                    </h2>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Payment
                    </p>

                    <h2 className="font-semibold">
                      {order.paymentStatus}
                    </h2>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <h2 className="font-bold gradient-text">
                      ₹
                      {order.totalPrice.toFixed(
                        2
                      )}
                    </h2>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4">

                  {order.items.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4"
                      >
                        <div>
                          <h3 className="font-medium">
                            {item.title}
                          </h3>

                          <p className="text-sm text-gray-500">
                            Qty:{" "}
                            {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold">
                          ₹
                          {item.price}
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* Date */}
                <div className="mt-6 text-sm text-gray-500">
                  Ordered on{" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
