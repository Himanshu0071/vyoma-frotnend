"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { useCartStore } from "@/store/cart.store";

import { useAuthStore } from "@/store/auth.store";

import { createOrder } from "@/services/order.service";

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, clearCart } =
    useCartStore();

  const { user, token } =
    useAuthStore();

  const [formData, setFormData] =
    useState({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    });

  const subtotal = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = async () => {
    if (!user || !token) {
      toast.error(
        "Please login first"
      );

      router.push("/login");

      return;
    }

    try {
      await createOrder(
        {
          items: cart.map((item) => ({
            productId: item._id,
            title: item.title,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
          })),

          shippingAddress: formData,

          totalPrice: subtotal,
        },

        token
      );

      toast.success(
        "Order placed successfully"
      );

      clearCart();

      router.push("/orders");
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to place order"
      );
    }
  };

  return (
    <section className="py-24">
      <div className="container-custom grid lg:grid-cols-2 gap-16">

        {/* Form */}
        <div className="space-y-6">

          <div>
            <h1 className="text-5xl font-bold">
              Checkout
            </h1>

            <p className="text-gray-500 mt-4">
              Enter shipping details
            </p>
          </div>

          {[
            "fullName",
            "phone",
            "address",
            "city",
            "postalCode",
            "country",
          ].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field}
              value={
                formData[
                  field as keyof typeof formData
                ]
              }
              onChange={handleChange}
              className="w-full h-14 px-5 rounded-2xl bg-transparent border border-gray-300 dark:border-white/10 outline-none"
            />
          ))}

          <button
            onClick={handleOrder}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#7C8CFF] via-[#C084FC] to-[#FFB38A] text-white font-semibold"
          >
            Place Order
          </button>
        </div>

        {/* Summary */}
        <div className="glass rounded-[32px] p-8 h-fit">

          <h2 className="text-3xl font-bold mb-8">
            Order Summary
          </h2>

          <div className="space-y-6">

            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-bold">
                  $
                  {item.price *
                    item.quantity}
                </p>
              </div>
            ))}

            <div className="border-t border-gray-200 dark:border-white/10 pt-6 flex items-center justify-between text-2xl font-bold">
              <span>Total</span>

              <span className="gradient-text">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}