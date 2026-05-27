"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  getAllOrders,

  markDelivered,
} from "@/services/order.service";

export default function AdminOrdersPage() {
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
        const data =
          await getAllOrders();

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

  /* =========================
     DELIVER
  ========================= */

  const handleDeliver =
    async (id: string) => {
      try {
        await markDelivered(id);

        toast.success(
          "Order delivered"
        );

        fetchOrders();
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed"
        );
      }
    };

  return (
    <section className="py-24">
      <div className="container-custom">

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold">
            Orders Dashboard
          </h1>

          <p className="text-gray-500 mt-4">
            Manage customer orders
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20">
            Loading...
          </div>
        ) : (
          <div className="glass rounded-[32px] overflow-hidden overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              <thead className="border-b border-gray-200 dark:border-white/10">

                <tr className="text-left">

                  <th className="p-6">
                    Customer
                  </th>

                  <th className="p-6">
                    Total
                  </th>

                  <th className="p-6">
                    Paid
                  </th>

                  <th className="p-6">
                    Delivered
                  </th>

                  <th className="p-6">
                    Date
                  </th>

                  <th className="p-6">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map(
                  (order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-200 dark:border-white/5"
                    >
                      <td className="p-6">

                        <div>
                          <p className="font-semibold">
                            {
                              order.user
                                ?.name
                            }
                          </p>

                          <p className="text-sm text-gray-500">
                            {
                              order.user
                                ?.email
                            }
                          </p>
                        </div>
                      </td>

                      <td className="p-6 font-semibold">
                        ₹
                        {
                          order.totalPrice
                        }
                      </td>

                      <td className="p-6">
                        {order.isPaid ? (
                          <span className="text-green-500">
                            Paid
                          </span>
                        ) : (
                          <span className="text-red-500">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="p-6">
                        {order.isDelivered ? (
                          <span className="text-green-500">
                            Delivered
                          </span>
                        ) : (
                          <span className="text-yellow-500">
                            Processing
                          </span>
                        )}
                      </td>

                      <td className="p-6">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-6">
                        {!order.isDelivered && (
                          <button
                            onClick={() =>
                              handleDeliver(
                                order._id
                              )
                            }
                            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#1356d0] via-[#9A1951] to-[#FA5303] text-white text-sm"
                          >
                            Mark Delivered
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}