"use client";

import ProductCard from "@/components/product-card";

import { useWishlistStore } from "@/store/wishlist.store";

export default function WishlistPage() {
  const { wishlist } =
    useWishlistStore();

  return (
    <section className="py-24">
      <div className="container-custom">

        <div className="mb-12">
          <h1 className="text-5xl font-bold">
            Wishlist
          </h1>

          <p className="text-gray-500 mt-4">
            Your saved products
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="glass rounded-[32px] p-10 text-center">
            No wishlist items
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {wishlist.map(
              (product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}