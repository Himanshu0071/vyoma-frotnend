"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { useCartStore } from "@/store/cart.store";
import { useCheckoutStore } from "@/store/checkout.store";
import { useAuthStore } from "@/store/auth.store";

import { createOrder } from "@/services/order.service";

export default function OrderSummary() {
  const router = useRouter();

  const { cart, clearCart } =
    useCartStore();

  const { token } =
    useAuthStore();

  const {
    selectedAddress,
    paymentMethod,
  } = useCheckoutStore();

  const [loading, setLoading] =
    useState(false);

  const subtotal = cart.reduce(
    (acc: number, item: any) =>
      acc +
      item.price *
        item.quantity,
    0
  );

  const shipping = 0;

  const total =
    subtotal + shipping;

  const handlePlaceOrder =
    async () => {
      try {
        if (!token) {
          return toast.error(
            "Please login first"
          );
        }

        if (cart.length === 0) {
          return toast.error(
            "Cart is empty"
          );
        }

        if (!selectedAddress) {
          return toast.error(
            "Select an address"
          );
        }

        if (!paymentMethod) {
          return toast.error(
            "Select payment method"
          );
        }

        setLoading(true);

        const orderData = {
          orderItems: cart,

          totalPrice: total,

          paymentMethod,

          addressId:
            selectedAddress._id,
        };

        const response =
          await createOrder(
            orderData,
            token
          );

        toast.success(
          "Order placed successfully"
        );

        clearCart();

        router.push(
          `/orders/${response.order._id}`
        );
      } catch (error: any) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to place order"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="glass rounded-[32px] p-8 sticky top-24">
      <h2 className="text-2xl font-bold mb-8">
        Order Summary
      </h2>

      {/* Products */}
      <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2">
        {cart.map((item: any) => (
          <div
            key={item._id}
            className="flex gap-4"
          >
            <Image
              src={
                item.images?.[0] ||
                "/placeholder.png"
              }
              alt={item.title}
              width={80}
              height={80}
              className="rounded-2xl object-cover w-20 h-20"
            />

            <div className="flex-1">
              <h3 className="font-medium line-clamp-1">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                Qty:{" "}
                {item.quantity}
              </p>

              <p className="font-semibold mt-1">
                $
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-white/10 mt-8 pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span>
            Subtotal
          </span>

          <span>
            $
            {subtotal.toFixed(
              2
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>
            Shipping
          </span>

          <span>
            $
            {shipping.toFixed(
              2
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-xl font-bold">
          <span>Total</span>

          <span className="gradient-text">
            $
            {total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={
          handlePlaceOrder
        }
        disabled={loading}
        className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-[#7c8cff] via-[#c084fc] to-[#7c8cff] text-white font-semibold hover:scale-[1.02] transition disabled:opacity-50"
      >
        {loading
          ? "Placing Order..."
          : "Place Order"}
      </button>
    </div>
  );
}