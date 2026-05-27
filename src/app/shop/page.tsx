"use client";

import { useEffect, useState } from "react";

import { Product } from "@/types/product";

import ProductCard from "@/components/product-card";

import { getProducts } from "@/services/product.service";

export default function ShopPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [keyword, setKeyword] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [sort, setSort] =
    useState("");

  const fetchProducts = async () => {
    try {
      const data = await getProducts(
        keyword,
        category,
        sort
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword, category, sort]);

  return (
    <section className="py-24">
      <div className="container-custom">

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold">
            Shop Collection
          </h1>

          <p className="text-gray-500 mt-4">
            Discover premium fashion
          </p>
        </div>

        {/* Filters */}
        <div className="glass rounded-[32px] p-6 mb-12 grid md:grid-cols-3 gap-6">

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) =>
              setKeyword(
                e.target.value
              )
            }
            className="h-14 px-5 rounded-2xl bg-transparent border border-gray-300 dark:border-white/10 outline-none"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="h-14 px-5 rounded-2xl bg-transparent border border-gray-300 dark:border-white/10 outline-none"
          >
            <option value="">
              All Categories
            </option>

            <option value="Streetwear">
              Streetwear
            </option>

            <option value="Oversized">
              Oversized
            </option>

            <option value="Luxury">
              Luxury
            </option>
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) =>
              setSort(
                e.target.value
              )
            }
            className="h-14 px-5 rounded-2xl bg-transparent border border-gray-300 dark:border-white/10 outline-none"
          >
            <option value="">
              Sort By
            </option>

            <option value="low">
              Price Low to High
            </option>

            <option value="high">
              Price High to Low
            </option>
          </select>
        </div>

        {/* Products */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}