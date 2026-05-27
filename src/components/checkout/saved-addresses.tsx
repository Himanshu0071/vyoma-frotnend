"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getAddresses,
    deleteAddress,
    setDefaultAddress,
} from "@/services/address.service";

import { useAuthStore } from "@/store/auth.store";

import { useCheckoutStore } from "@/store/checkout.store";

export default function SavedAddresses() {
    const { token } =
        useAuthStore();

    //   const {
    //     selectedAddress,
    //     setSelectedAddress,
    //   } = useCheckoutStore();

    //   const [addresses, setAddresses] =
    //     useState<any[]>([]);
    const {
        addresses,
        setAddresses,
        selectedAddress,    
        setSelectedAddress,
    } = useCheckoutStore();

    const [loading, setLoading] =
        useState(true);

    const fetchAddresses =
        async () => {
            try {
                setLoading(true);

                const data =
                    await getAddresses(
                        token as string
                    );

                setAddresses(data);

                // Auto select default address
                const defaultAddress =
                    data.find(
                        (item: any) =>
                            item.isDefault
                    );

                if (
                    defaultAddress &&
                    !selectedAddress
                ) {
                    setSelectedAddress(
                        defaultAddress
                    );
                }
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to load addresses"
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        if (token) {
            fetchAddresses();
        }
    }, [token]);

    const handleDelete = async (
        id: string
    ) => {
        try {
            await deleteAddress(
                id,
                token as string
            );

            toast.success(
                "Address deleted"
            );

            // Remove selected address if deleted
            if (
                selectedAddress?._id === id
            ) {
                setSelectedAddress(
                    null
                );
            }

            fetchAddresses();
        } catch (error) {
            toast.error(
                "Delete failed"
            );
        }
    };

    const handleDefault = async (
        id: string
    ) => {
        try {
            await setDefaultAddress(
                id,
                token as string
            );

            toast.success(
                "Default address updated"
            );

            fetchAddresses();
        } catch (error) {
            toast.error(
                "Failed to update"
            );
        }
    };

    if (loading) {
        return (
            <div className="glass rounded-[32px] p-8">
                Loading addresses...
            </div>
        );
    }

    return (
        <div className="glass rounded-[32px] p-8">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">
                    Saved Addresses
                </h2>

                <span className="text-sm text-gray-400">
                    {
                        addresses.length
                    }{" "}
                    Saved
                </span>
            </div>

            {addresses.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No saved addresses
                </div>
            ) : (
                <div className="space-y-5">
                    {addresses.map(
                        (address: any) => (
                            <div
                                key={
                                    address._id
                                }
                                onClick={() =>
                                    setSelectedAddress(
                                        address
                                    )
                                }
                                className={`border rounded-3xl p-5 cursor-pointer transition-all duration-300 ${selectedAddress?._id ===
                                        address._id
                                        ? "border-purple-500 bg-purple-500/10"
                                        : "border-white/10 hover:border-purple-500/40"
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-5">
                                    {/* LEFT */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="font-semibold text-lg">
                                                {
                                                    address.fullName
                                                }
                                            </h3>

                                            {address.isDefault && (
                                                <span className="px-3 py-1 rounded-full text-xs bg-purple-500 text-white">
                                                    Default
                                                </span>
                                            )}

                                            {selectedAddress?._id ===
                                                address._id && (
                                                    <span className="px-3 py-1 rounded-full text-xs bg-green-500 text-white">
                                                        Selected
                                                    </span>
                                                )}
                                        </div>

                                        <p className="mt-3 text-gray-300">
                                            {
                                                address.address
                                            }
                                        </p>

                                        <p className="text-gray-400">
                                            {
                                                address.city
                                            }
                                            ,{" "}
                                            {
                                                address.state
                                            }{" "}
                                            -{" "}
                                            {
                                                address.pincode
                                            }
                                        </p>

                                        <p className="text-gray-400">
                                            {
                                                address.country
                                            }
                                        </p>

                                        {address.landmark && (
                                            <p className="text-gray-500 mt-1">
                                                Landmark:{" "}
                                                {
                                                    address.landmark
                                                }
                                            </p>
                                        )}

                                        <p className="mt-3 font-medium">
                                            {
                                                address.phone
                                            }
                                        </p>

                                        <p className="text-gray-400 text-sm">
                                            {
                                                address.email
                                            }
                                        </p>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex flex-col gap-3">
                                        {!address.isDefault && (
                                            <button
                                                onClick={(
                                                    e
                                                ) => {
                                                    e.stopPropagation();

                                                    handleDefault(
                                                        address._id
                                                    );
                                                }}
                                                className="px-4 py-2 rounded-xl border border-white/10 hover:border-purple-500 transition text-sm"
                                            >
                                                Set Default
                                            </button>
                                        )}

                                        <button
                                            onClick={(
                                                e
                                            ) => {
                                                e.stopPropagation();

                                                handleDelete(
                                                    address._id
                                                );
                                            }}
                                            className="px-4 py-2 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}