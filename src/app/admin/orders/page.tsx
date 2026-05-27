"use client";

import { useEffect, useMemo, useState } from "react";

import toast from "react-hot-toast";

import {
  getAllOrders,
  markDelivered,
} from "@/services/order.service";

import {
  Search,
  Check,
} from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminOrdersPage() {
  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [paymentFilter, setPaymentFilter] =
    useState("ALL");

  const [deliveryFilter, setDeliveryFilter] =
    useState("ALL");

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

  /* =========================
     FILTERED ORDERS
  ========================= */

  const filteredOrders =
    useMemo(() => {
      return orders.filter(
        (order) => {
          const matchesSearch =
            order.user?.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            order.user?.email
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            order._id
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesPayment =
            paymentFilter ===
              "ALL" ||
            (paymentFilter ===
              "PAID" &&
              order.isPaid) ||
            (paymentFilter ===
              "PENDING" &&
              !order.isPaid);

          const matchesDelivery =
            deliveryFilter ===
              "ALL" ||
            (deliveryFilter ===
              "DELIVERED" &&
              order.isDelivered) ||
            (deliveryFilter ===
              "PENDING" &&
              !order.isDelivered);

          return (
            matchesSearch &&
            matchesPayment &&
            matchesDelivery
          );
        }
      );
    }, [
      orders,
      search,
      paymentFilter,
      deliveryFilter,
    ]);

  return (
    <div className="h-full flex flex-col gap-5 overflow-hidden">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Orders
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Manage customer orders
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-wrap items-center gap-3">
        {/* SEARCH */}
        <div className="relative w-full md:w-[260px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <Input
            placeholder="Search orders..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="pl-10 h-10 bg-white/5 border-white/10 text-sm"
          />
        </div>

        {/* PAYMENT */}
        <select
          value={paymentFilter}
          onChange={(e) =>
            setPaymentFilter(
              e.target.value
            )
          }
          className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-sm outline-none"
        >
          <option value="ALL">
            All Payments
          </option>

          <option value="PAID">
            Paid
          </option>

          <option value="PENDING">
            Pending
          </option>
        </select>

        {/* DELIVERY */}
        <select
          value={deliveryFilter}
          onChange={(e) =>
            setDeliveryFilter(
              e.target.value
            )
          }
          className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-sm outline-none"
        >
          <option value="ALL">
            All Deliveries
          </option>

          <option value="DELIVERED">
            Delivered
          </option>

          <option value="PENDING">
            Pending
          </option>
        </select>
      </div>

      {/* TABLE */}
      <div className="flex-1 min-h-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">
            Loading orders...
          </div>
        ) : (
          <div className="h-full overflow-auto">
            <Table>
              <TableHeader className="bg-white/[0.03] sticky top-0 z-10">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-gray-400 h-12 text-xs uppercase">
                    Customer
                  </TableHead>

                  <TableHead className="text-gray-400 text-xs uppercase">
                    Order ID
                  </TableHead>

                  <TableHead className="text-gray-400 text-xs uppercase">
                    Amount
                  </TableHead>

                  <TableHead className="text-gray-400 text-xs uppercase">
                    Payment
                  </TableHead>

                  <TableHead className="text-gray-400 text-xs uppercase">
                    Delivery
                  </TableHead>

                  <TableHead className="text-gray-400 text-xs uppercase">
                    Date
                  </TableHead>

                  <TableHead className="text-gray-400 text-xs uppercase">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredOrders.map(
                  (order) => (
                    <TableRow
                      key={
                        order._id
                      }
                      className="border-white/5 hover:bg-white/[0.02]"
                    >
                      {/* CUSTOMER */}
                      <TableCell className="py-4">
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
                      </TableCell>

                      {/* ORDER ID */}
                      <TableCell className="text-xs text-gray-400">
                        #
                        {order._id.slice(
                          -6
                        )}
                      </TableCell>

                      {/* AMOUNT */}
                      <TableCell className="text-sm font-medium">
                        ₹
                        {
                          order.totalPrice
                        }
                      </TableCell>

                      {/* PAYMENT */}
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.isPaid
                              ? "bg-green-500/10 text-green-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {order.isPaid
                            ? "Paid"
                            : "Pending"}
                        </span>
                      </TableCell>

                      {/* DELIVERY */}
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.isDelivered
                              ? "bg-green-500/10 text-green-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {order.isDelivered
                            ? "Delivered"
                            : "Pending"}
                        </span>
                      </TableCell>

                      {/* DATE */}
                      <TableCell className="text-sm text-gray-400">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </TableCell>

                      {/* ACTION */}
                      <TableCell>
                        {!order.isDelivered && (
                          <button
                            onClick={() =>
                              handleDeliver(
                                order._id
                              )
                            }
                            className="h-9 px-4 rounded-xl bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white transition text-sm flex items-center gap-2"
                          >
                            <Check size={15} />

                            Deliver
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}