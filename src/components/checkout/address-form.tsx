"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { createAddress } from "@/services/address.service";

import { useAuthStore } from "@/store/auth.store";
import { useCheckoutStore } from "@/store/checkout.store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AddressForm() {
    const { token } =
        useAuthStore();

    const { addAddress } =
        useCheckoutStore();

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            fullName: "",
            phone: "",
            email: "",
            country: "",
            state: "",
            city: "",
            pincode: "",
            address: "",
            landmark: "",
            isDefault: false,
        });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ) => {
        const {
            name,
            value,
            type,
        } = e.target;

        setFormData((prev) => ({
            ...prev,

            [name]:
                type === "checkbox"
                    ? (
                        e.target as HTMLInputElement
                    ).checked
                    : value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            //   await createAddress(
            //     formData,
            //     token as string
            //   );

            const response =
                await createAddress(
                    formData,
                    token as string
                );

            addAddress(
                response.address
            );

            toast.success(
                "Address saved"
            );

            setFormData({
                fullName: "",
                phone: "",
                email: "",
                country: "",
                state: "",
                city: "",
                pincode: "",
                address: "",
                landmark: "",
                isDefault: false,
            });
        } catch (error: any) {
            toast.error(
                error?.response?.data
                    ?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass rounded-[32px] p-8">
            <h2 className="text-2xl font-bold mb-8">
                Add New Address
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-5"
            >
                <Input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input"
                    required
                />

                <Input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                    required
                />

                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    required
                />

                <Input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    className="input"
                    required
                />

                <Input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="input"
                    required
                />

                <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="input"
                    required
                />

                <Input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="input"
                    required
                />

                <Input
                    type="text"
                    name="landmark"
                    placeholder="Landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    className="input"
                />

                <Textarea
                    name="address"
                    placeholder="Full Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input md:col-span-2 min-h-[120px]"
                    required
                />

                <label className="flex items-center gap-3 md:col-span-2">
                    <Input
                    className="w-auto"
                        type="checkbox"
                        name="isDefault"
                        checked={
                            formData.isDefault
                        }
                        onChange={handleChange}
                    />

                    Set as default address
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="md:col-span-2 py-4 rounded-2xl bg-gradient-to-r from-[#7c8cff] to-[#c084fc] text-white font-semibold hover:scale-[1.02] transition"
                >
                    {loading
                        ? "Saving..."
                        : "Save Address"}
                </button>
            </form>
        </div>
    );
}