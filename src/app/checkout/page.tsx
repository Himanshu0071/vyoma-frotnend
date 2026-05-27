"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cart.store";
import { createPaymentOrder } from "@/services/payment.service";
import {
  verifyPayment,
} from "@/services/payment.service";

import { useAuthStore } from "@/store/auth.store";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartStore();

  /* =========================
     TOTAL PRICE
  ========================= */

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  /* =========================
     HANDLE PAYMENT
  ========================= */

  const handlePayment =
    async () => {
      try {
        if (cart.length === 0) {
          toast.error(
            "Cart is empty"
          );

          return;
        }

        const order =
          await createPaymentOrder(
            totalPrice
          );

        const options = {
          key: process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

          amount: order.amount,

          currency: order.currency,

          name: "Vyoma",

          description:
            "Premium Fashion Marketplace",

          order_id: order.id,

          handler: async (
            response: any
          ) => {
            try {
              await verifyPayment({
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                orderItems: cart.map(
                  (item) => ({
                    title:
                      item.title,

                    quantity:
                      item.quantity,

                    image:
                      item.image,

                    price:
                      item.price,

                    product:
                      item._id,

                    email: user?.email,
                    name: user?.name,
                  })
                ),

                totalPrice,

                userId: user?.id,
              });

              toast.success(
                "Payment verified!"
              );

              clearCart();
            } catch (error) {
              console.log(error);

              toast.error(
                "Verification failed"
              );
            }
          },

          prefill: {
            name: "Vyoma User",
            email:
              "customer@vyoma.com",
          },

          theme: {
            color: "#7C8CFF",
          },
        };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();
      } catch (error) {
        console.log(error);

        toast.error(
          "Payment failed"
        );
      }
    };

  const { user } =
    useAuthStore();

  return (
    <section className="py-24">
      <div className="container-custom">

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold">
            Checkout
          </h1>

          <p className="text-gray-500 mt-4">
            Complete your purchase
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="glass rounded-[32px] p-10 text-center">
            Your cart is empty
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">

              {cart.map((item) => (
                <div
                  key={item._id}
                  className="glass rounded-[32px] p-6 flex gap-6"
                >
                  {/* Image */}
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden">

                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">

                    <div>
                      <h2 className="text-2xl font-semibold">
                        {item.title}
                      </h2>

                      <p className="text-gray-500 mt-2">
                        ₹
                        {item.price}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-4 mt-4">

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item._id
                          )
                        }
                        className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/10"
                      >
                        -
                      </button>

                      <span className="text-lg font-semibold">
                        {
                          item.quantity
                        }
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item._id
                          )
                        }
                        className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/10"
                      >
                        +
                      </button>

                      <button
                        onClick={() =>
                          removeFromCart(
                            item._id
                          )
                        }
                        className="ml-auto text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="glass rounded-[32px] p-8 h-fit sticky top-28">

              <h2 className="text-3xl font-bold mb-8">
                Order Summary
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">
                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₹
                    {totalPrice.toFixed(
                      2
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>
                    Shipping
                  </span>

                  <span>
                    Free
                  </span>
                </div>

                <div className="border-t border-gray-200 dark:border-white/10 pt-5 flex justify-between text-xl font-bold">

                  <span>Total</span>

                  <span className="gradient-text">
                    ₹
                    {totalPrice.toFixed(
                      2
                    )}
                  </span>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={
                  handlePayment
                }
                className="w-full mt-8 py-5 rounded-2xl bg-gradient-to-r from-[#7C8CFF] via-[#C084FC] to-[#FFB38A] text-white font-semibold text-lg hover:opacity-90 transition"
              >
                Pay with Razorpay
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}