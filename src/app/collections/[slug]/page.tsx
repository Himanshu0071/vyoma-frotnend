"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import ProductCard from "@/components/product-card";

import { getProducts } from "@/services/product.service";

import { Product } from "@/types/product";

export default function CollectionPage() {
  const params = useParams();

  const slug =
    params.slug as string;

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          const data =
            await getProducts(
              "",
              slug,
              ""
            );

          setProducts(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="mb-10">
          <h1 className="text-4xl font-bold capitalize">
            {slug}
          </h1>

          <p className="text-gray-500 mt-2">
            Browse all {slug}
          </p>
        </div>

        {loading ? (
          <div>
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(
              (product) => (
                <ProductCard
                  key={product._id}
                  product={
                    product
                  }
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}