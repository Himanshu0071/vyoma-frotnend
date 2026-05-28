"use client";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { Product } from "@/types/product";

import {
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useWishlistStore } from "@/store/wishlist.store";

import { useAuthStore } from "@/store/auth.store";

import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;

  hideWishlistButton?: boolean;
}

export default function ProductCard({
  product,

  hideWishlistButton = false,
}: ProductCardProps) {
  const router = useRouter();

  const { user } =
    useAuthStore();

  const {
    wishlist,

    addToWishlist,

    removeFromWishlist,
  } = useWishlistStore();

  const liked =
    wishlist.some(
      (item) =>
        item._id ===
        product._id
    );

  return (
    <Link
      href={`/product/${product._id}`}
      className="group"
    >
      <div className="glass rounded-[32px] overflow-hidden hover:-translate-y-2 transition duration-500">
        {/* IMAGE */}
        <div className="relative overflow-hidden">
          {!hideWishlistButton && (
            <button
              onClick={(e) => {
                e.preventDefault();

                /* LOGIN CHECK */
                if (!user) {
                  toast.error(
                    "Please login first"
                  );

                  router.push(
                    "/login"
                  );

                  return;
                }

                if (liked) {
                  removeFromWishlist(
                    product._id
                  );

                  toast.success(
                    "Removed from wishlist"
                  );
                } else {
                  addToWishlist(
                    product
                  );

                  toast.success(
                    "Added to wishlist"
                  );
                }
              }}
              className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/90 dark:bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center hover:scale-110 transition"
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={`transition ${liked
                    ? "text-red-500"
                    : "text-gray-800 dark:text-white"
                  }`}
              />
            </button>
          )}

          <Image
            src={
              product.images?.[0] ||
              "/placeholder.png"
            }
            alt={product.title}
            width={500}
            height={600}
            className="w-full h-[320px] object-cover group-hover:scale-105 transition duration-700 relative z-0" />
        </div>

        {/* CONTENT */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-[3px] text-purple-400">
              {
                product.category
              }
            </span>

            <span className="text-lg font-bold gradient-text">
              $
              {product.price}
            </span>
          </div>

          <h3 className="text-xl font-semibold mb-3 truncate">
            {product.title}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 truncate">
            {
              product.description
            }
          </p>
        </div>
      </div>
    </Link>
  );
}