"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
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
        <div className="glass rounded-2xl p-5">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold">
                Saved Addresses
              </h2>
      
              <p className="text-xs text-gray-400 mt-1">
                Select delivery address
              </p>
            </div>
      
            <span className="text-xs text-gray-400">
              {addresses.length} Saved
            </span>
          </div>
      
          {/* EMPTY */}
          {addresses.length === 0 ? (
            <div className="text-sm text-gray-500 py-6 text-center">
              No saved addresses
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map(
                (address: any) => {
                  const isSelected =
                    selectedAddress?._id ===
                    address._id;
      
                  return (
                    <div
                      key={address._id}
                      className={`rounded-xl border transition ${
                        isSelected
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-white/10"
                      }`}
                    >
                      {/* COMPACT ROW */}
                      <div className="flex items-center justify-between p-4">
                        {/* LEFT */}
                        <button
                          onClick={() =>
                            setSelectedAddress(
                              address
                            )
                          }
                          className="flex-1 text-left"
                        >
                          <h3 className="text-sm font-medium">
                            {
                              address.fullName
                            }
                          </h3>
      
                          <p className="text-xs text-gray-400 mt-1">
                            PIN:{" "}
                            {
                              address.pincode
                            }
                          </p>
                        </button>
      
                        {/* RIGHT */}
                        <div className="flex items-center gap-2">
                          {/* VIEW MODAL */}
                          <Dialog>
                            <DialogTrigger
                              asChild
                            >
                              <button className="h-8 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition text-xs">
                                View
                              </button>
                            </DialogTrigger>
      
                            <DialogContent className="bg-[#111827] border border-white/10 text-white rounded-2xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Delivery
                                  Address
                                </DialogTitle>
                              </DialogHeader>
      
                              <div className="space-y-4 mt-4">
                                <div>
                                  <p className="text-xs text-gray-400 mb-1">
                                    Name
                                  </p>
      
                                  <p className="text-sm">
                                    {
                                      address.fullName
                                    }
                                  </p>
                                </div>
      
                                <div>
                                  <p className="text-xs text-gray-400 mb-1">
                                    Phone
                                  </p>
      
                                  <p className="text-sm">
                                    {
                                      address.phone
                                    }
                                  </p>
                                </div>
      
                                <div>
                                  <p className="text-xs text-gray-400 mb-1">
                                    Address
                                  </p>
      
                                  <p className="text-sm leading-6">
                                    {
                                      address.address
                                    }
                                  </p>
                                </div>
      
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <p className="text-xs text-gray-400 mb-1">
                                      City
                                    </p>
      
                                    <p className="text-sm">
                                      {
                                        address.city
                                      }
                                    </p>
                                  </div>
      
                                  <div>
                                    <p className="text-xs text-gray-400 mb-1">
                                      State
                                    </p>
      
                                    <p className="text-sm">
                                      {
                                        address.state
                                      }
                                    </p>
                                  </div>
      
                                  <div>
                                    <p className="text-xs text-gray-400 mb-1">
                                      Pincode
                                    </p>
      
                                    <p className="text-sm">
                                      {
                                        address.pincode
                                      }
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
      
                          {/* DEFAULT */}
                          {!address.isDefault && (
                            <button
                              onClick={() =>
                                handleDefault(
                                  address._id
                                )
                              }
                              className="h-8 px-3 rounded-lg bg-purple-500/10 hover:bg-purple-500 text-purple-400 hover:text-white transition text-xs"
                            >
                              Default
                            </button>
                          )}
      
                          {/* DELETE */}
                          <button
                            onClick={() =>
                              handleDelete(
                                address._id
                              )
                            }
                            className="h-8 px-3 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      );
}