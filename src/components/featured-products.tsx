"use client";

import { useEffect, useState } from "react";

import ProductCard from "./product-card";

import { getProducts } from "@/services/product.service";

import { Product } from "@/types/product";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<
    Product[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log(products,"data")

  return (
    <section className="py-24">
      <div className="container-custom">

        {/* Heading */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-sm uppercase tracking-[4px] text-purple-400">
              Featured
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              New Arrivals
            </h2>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20">
            Loading products...
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                id={product._id}
                key={product._id}
                title={product.title}
                category={product.category}
                price={`$${product.price}`}
                image={product.images[0]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}