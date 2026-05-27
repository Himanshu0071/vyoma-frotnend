"use client";

import ProductCard from "@/components/product-card";

import { useWishlistStore } from "@/store/wishlist.store";

import { Trash2 } from "lucide-react";

import toast from "react-hot-toast";

export default function WishlistPage() {
  const {
    wishlist,

    removeFromWishlist,
  } = useWishlistStore();

  return (
    <section className="py-24">
      <div className="container-custom">
        {/* HEADING */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold">
            Wishlist
          </h1>

          <p className="text-gray-500 mt-4">
            Your saved products
          </p>
        </div>

        {/* EMPTY */}
        {wishlist.length === 0 ? (
          <div className="glass rounded-[32px] p-10 text-center">
            No wishlist items
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map(
              (product) => (
                <div
                  key={
                    product._id
                  }
                  className="relative group"
                >
                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => {
                      removeFromWishlist(
                        product._id
                      );

                      toast.success(
                        "Removed from wishlist"
                      );
                    }}
                    className="absolute top-5 right-5 z-30 w-11 h-11 rounded-full bg-white/90 dark:bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-300"
                  >
                    <Trash2
                      size={18}
                      className="text-gray-800 dark:text-white"
                    />
                  </button>

                  {/* CARD */}
                  <ProductCard
                    product={
                      product
                    }
                    hideWishlistButton={
                      true
                    }
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}