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
    const [selectedSize, setSelectedSize] =
        useState("");

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
    const handleAddToCart = () => {

        /* SIZE VALIDATION */
        if (
            product.sizes?.length > 0 &&
            !selectedSize
        ) {
            return toast.error(
                "Please select a size"
            );
        }

        addToCart({
            _id: product._id,
            title: product.title,
            price: product.price,
            image:
                product.images?.[0] ||
                "/placeholder.png",
            selectedSize,
            quantity: 1,
        });

        toast.success(
            "Added to cart"
        );
    };
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
                  <div className="mt-8">
  <h3 className="text-sm font-semibold mb-4">
    Select Size
  </h3>

  <div className="flex flex-wrap gap-3">
    {product.sizes?.map(
      (size: string) => (
        <button
          key={size}
          onClick={() =>
            setSelectedSize(
              size
            )
          }
          className={`w-12 h-12 rounded-full border text-sm font-semibold transition-all duration-300 flex items-center justify-center ${
            selectedSize ===
            size
              ? "bg-gradient-to-r from-[#1356d0] via-[#9A1951] to-[#FA5303] text-white border-transparent scale-110 shadow-lg shadow-purple-500/30"
              : "border-gray-300 dark:border-white/10 text-black dark:text-white hover:border-purple-400 hover:scale-105"
          }`}
        >
          {size}
        </button>
      )
    )}
  </div>

  {/* SELECTED SIZE TEXT */}
  {selectedSize && (
    <p className="text-sm text-purple-400 mt-4">
      Selected Size:{" "}
      <span className="font-semibold text-white">
        {selectedSize}
      </span>
    </p>
  )}
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
                        onClick={handleAddToCart}
                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#1356d0] via-[#9A1951] to-[#FA5303] text-white font-semibold text-lg"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </section>
    );
}