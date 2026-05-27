"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import {
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWishlistStore } from "@/store/wishlist.store";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();

  const liked =
    product?._id
      ? isInWishlist(product._id)
      : false;

  return (
    <Link
      href={`/product/${product._id}`}
      className="group"
    >
      <div className="glass rounded-[32px] overflow-hidden hover:-translate-y-2 transition duration-500">

        {/* Image */}
        <div className="relative overflow-hidden">
          <button
            onClick={(e) => {
              e.preventDefault();

              if (liked) {
                removeFromWishlist(
                  product._id
                );

                toast.success(
                  "Removed from wishlist"
                );
              } else {
                addToWishlist(product);

                toast.success(
                  "Added to wishlist"
                );
              }
            }}
            className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md flex items-center justify-center hover:scale-110 transition"          >
            <FontAwesomeIcon
              icon={faHeart}
              className={
                liked
                  ? "text-red-500"
                  : "text-black dark:text-white"
              }
            />
          </button>
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.title}
            width={500}
            height={600}
            className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700 relative z-0"
          />
        </div>

        {/* Content */}
        <div className="p-6">

          <div className="flex items-center justify-between mb-4">

            <span className="text-xs uppercase tracking-[3px] text-purple-400">
              {product.category}
            </span>

            <span className="text-lg font-bold gradient-text">
              ${product.price}
            </span>
          </div>

          <h3 className="text-xl font-semibold mb-3">
            {product.title}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
}