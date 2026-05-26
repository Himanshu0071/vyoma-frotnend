"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faXmark,
    faMinus,
    faPlus,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { useCartStore } from "@/store/cart.store";

interface CartDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function CartDrawer({
    open,
    setOpen,
}: CartDrawerProps) {
    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCartStore();

    const subtotal = cart.reduce(
        (acc, item) =>
            acc + item.price * item.quantity,
        0
    );

    return (
        <>
            {/* Overlay */}
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 bg-black/40 z-40 transition duration-300 ${open
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white dark:bg-[#0D1324] z-50 shadow-2xl transition duration-300 flex flex-col ${open
                        ? "translate-x-0"
                        : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
                    <h2 className="text-2xl font-bold">
                        Your Cart
                    </h2>

                    <button onClick={() => setOpen(false)}>
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="text-2xl"
                        />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">

                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500">
                            Your cart is empty
                        </p>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex gap-4"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={100}
                                    height={100}
                                    className="w-24 h-24 object-cover rounded-2xl"
                                />

                                <div className="flex-1 space-y-2">
                                    <h3 className="font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="gradient-text font-bold">
                                        ${item.price}
                                    </p>

                                    {/* Quantity */}
                                    <div className="flex items-center gap-3">

                                        <button
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item._id
                                                )
                                            }
                                            className="w-8 h-8 rounded-full border border-gray-300 dark:border-white/10"
                                        >
                                            <FontAwesomeIcon
                                                icon={faMinus}
                                            />
                                        </button>

                                        <span>
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    item._id
                                                )
                                            }
                                            className="w-8 h-8 rounded-full border border-gray-300 dark:border-white/10"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                            />
                                        </button>

                                        <button
                                            onClick={() =>
                                                removeFromCart(
                                                    item._id
                                                )
                                            }
                                            className="ml-auto text-red-500"
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-white/10 space-y-5">

                    <div className="flex items-center justify-between text-xl font-bold">
                        <span>Subtotal</span>

                        <span className="gradient-text">
                            ${subtotal.toFixed(2)}
                        </span>
                    </div>

                    <Link
                        href="/checkout"
                        className="block text-center w-full py-4 rounded-2xl bg-gradient-to-r from-[#7C8CFF] via-[#C084FC] to-[#FFB38A] text-white font-semibold"
                    >
                        Checkout
                    </Link>
                </div>
            </div>
        </>
    );
}