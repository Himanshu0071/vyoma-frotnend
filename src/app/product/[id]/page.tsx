"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useParams } from "next/navigation";

import { getSingleProduct } from "@/services/product.service";

import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart.store";
import toast from "react-hot-toast";

export default function ProductPage() {
    const params = useParams();

    const addToCart =
        useCartStore((state) => state.addToCart);

    const [product, setProduct] =
        useState<Product | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getSingleProduct(
                    params.id as string
                );

                setProduct(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    if (loading) {
        return (
            <div className="py-32 text-center">
                Loading...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="py-32 text-center">
                Product not found
            </div>
        );
    }
    return (
        <section className="py-24">
            <div className="container-custom grid lg:grid-cols-2 gap-16">

                {/* Product Image */}
                <div className="relative">
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={700}
                        height={800}
                        className="w-full h-[700px] object-cover rounded-[40px]"
                    />
                </div>

                {/* Product Content */}
                <div className="space-y-8">

                    <div>
                        <p className="text-purple-400 uppercase tracking-[4px] text-sm">
                            {product.category}
                        </p>

                        <h1 className="text-5xl font-bold mt-4">
                            {product.title}
                        </h1>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                        {product.description}
                    </p>

                    <div className="text-4xl font-bold gradient-text">
                        ${product.price}
                    </div>

                    {/* Sizes */}
                    <div>
                        <h3 className="font-semibold mb-4">
                            Sizes
                        </h3>

                        <div className="flex gap-4">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    className="w-14 h-14 rounded-full border border-gray-300 dark:border-white/10"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    <div>
                        <h3 className="font-semibold mb-4">
                            Colors
                        </h3>

                        <div className="flex gap-4">
                            {product.colors.map((color) => (
                                <div
                                    key={color}
                                    className="px-5 py-3 rounded-full border border-gray-300 dark:border-white/10"
                                >
                                    {color}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Button */}
                    <button
                       onClick={() => {
                        addToCart({
                          _id: product._id,
                          title: product.title,
                          price: product.price,
                          image: product.images[0],
                          quantity: 1,
                        });
                      
                        toast.success("Added to cart");
                      }}
                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#7C8CFF] via-[#C084FC] to-[#FFB38A] text-white font-semibold text-lg"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </section>
    );
}