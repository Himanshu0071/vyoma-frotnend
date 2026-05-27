"use client";

import { useCheckoutStore } from "@/store/checkout.store";

export default function PaymentMethod() {
  const {
    paymentMethod,
    setPaymentMethod,
  } = useCheckoutStore();

  return (
    <div className="glass rounded-[32px] p-8">
      <h2 className="text-2xl font-bold mb-8">
        Payment Method
      </h2>

      <div className="space-y-5">
        {/* CASH ON DELIVERY */}
        <div
          onClick={() =>
            setPaymentMethod(
              "COD"
            )
          }
          className={`border rounded-3xl p-5 cursor-pointer transition-all duration-300 ${
            paymentMethod ===
            "COD"
              ? "border-purple-500 bg-purple-500/10"
              : "border-white/10 hover:border-purple-500/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">
                Cash on Delivery
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Pay when your order arrives
              </p>
            </div>

            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod ===
                "COD"
                  ? "border-purple-500"
                  : "border-gray-400"
              }`}
            >
              {paymentMethod ===
                "COD" && (
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              )}
            </div>
          </div>
        </div>

        {/* ONLINE PAYMENT */}
        <div
          onClick={() =>
            setPaymentMethod(
              "ONLINE"
            )
          }
          className={`border rounded-3xl p-5 cursor-pointer transition-all duration-300 ${
            paymentMethod ===
            "ONLINE"
              ? "border-purple-500 bg-purple-500/10"
              : "border-white/10 hover:border-purple-500/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">
                Online Payment
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Pay securely using Razorpay / UPI / Cards
              </p>
            </div>

            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod ===
                "ONLINE"
                  ? "border-purple-500"
                  : "border-gray-400"
              }`}
            >
              {paymentMethod ===
                "ONLINE" && (
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}