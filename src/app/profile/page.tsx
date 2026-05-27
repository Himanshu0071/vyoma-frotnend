"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { useAuthStore } from "@/store/auth.store";

import { getMyOrders } from "@/services/order.service";

export default function ProfilePage() {
  const { user, token } =
    useAuthStore();

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================
     FETCH ORDERS
  ========================= */

  const fetchOrders =
    async () => {
      try {
        if (!token) return;

        const data =
          await getMyOrders(
            token
          );

        setOrders(data);
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <section className="py-24">
      <div className="container-custom">

        {/* Profile Header */}
        <div className="glass rounded-[32px] p-10 mb-12">

          <h1 className="text-5xl font-bold mb-4">
            My Profile
          </h1>

          <div className="space-y-2">

            <p className="text-lg">
              <span className="font-semibold">
                Name:
              </span>{" "}
              {user?.name}
            </p>

            <p className="text-lg">
              <span className="font-semibold">
                Email:
              </span>{" "}
              {user?.email}
            </p>
          </div>
        </div>

        {/* Orders */}
        <div>
          <div className="mb-10">
            <h2 className="text-4xl font-bold">
              My Orders
            </h2>

            <p className="text-gray-500 mt-3">
              View your order history
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              Loading...
            </div>
          ) : orders.length === 0 ? (
            <div className="glass rounded-[32px] p-10 text-center">
              No orders found
            </div>
          ) : (
            <div className="space-y-8">

              {orders.map(
                (order) => (
                  <div
                    key={order._id}
                    className="glass rounded-[32px] p-8"
                  >
                    {/* Top */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">

                      <div>
                        <p className="text-sm text-gray-500">
                          Order ID
                        </p>

                        <h3 className="font-semibold mt-1">
                          {
                            order._id
                          }
                        </h3>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Total
                        </p>

                        <h3 className="font-bold text-2xl gradient-text mt-1">
                          ₹
                          {
                            order.totalPrice
                          }
                        </h3>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Payment
                        </p>

                        <h3
                          className={`font-semibold mt-1 ${
                            order.isPaid
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {order.isPaid
                            ? "Paid"
                            : "Pending"}
                        </h3>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Delivery
                        </p>

                        <h3
                          className={`font-semibold mt-1 ${
                            order.isDelivered
                              ? "text-green-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {order.isDelivered
                            ? "Delivered"
                            : "Processing"}
                        </h3>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-5">

                      {order.orderItems.map(
                        (
                          item: any,
                          index: number
                        ) => (
                          <div
                            key={index}
                            className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-5"
                          >
                            <div>
                              <h4 className="font-semibold">
                                {
                                  item.title
                                }
                              </h4>

                              <p className="text-sm text-gray-500 mt-1">
                                Qty:{" "}
                                {
                                  item.quantity
                                }
                              </p>
                            </div>

                            <p className="font-semibold">
                              ₹
                              {
                                item.price
                              }
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}