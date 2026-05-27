"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { Product } from "@/types/product";

import { getProducts } from "@/services/product.service";

import {
  createProduct,
  uploadImage,
} from "@/services/admin.service";

export default function AdminProductsPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
      stock: "",
    });

  /* =========================
     FETCH PRODUCTS
  ========================= */

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  /* =========================
     HANDLE IMAGE UPLOAD
  ========================= */

  const handleImageUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        e.target.files?.[0];

      if (!file) return;

      try {
        setUploading(true);

        const data =
          await uploadImage(file);

        setFormData({
          ...formData,
          image: data.imageUrl,
        });

        toast.success(
          "Image uploaded"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Upload failed"
        );
      } finally {
        setUploading(false);
      }
    };

  /* =========================
     CREATE PRODUCT
  ========================= */

  const handleCreateProduct =
    async () => {
      try {
        setLoading(true);

        await createProduct({
          title: formData.title,

          description:
            formData.description,

          price: Number(
            formData.price
          ),

          category:
            formData.category,

          images: [formData.image],

          sizes: ["S", "M", "L"],

          colors: ["Black"],

          stock: Number(
            formData.stock
          ),

          featured: true,
        });

        toast.success(
          "Product created"
        );

        setFormData({
          title: "",
          description: "",
          price: "",
          category: "",
          image: "",
          stock: "",
        });

        fetchProducts();
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to create product"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="py-24">
      <div className="container-custom">

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold">
            Manage Products
          </h1>

          <p className="text-gray-500 mt-4">
            Upload and manage
            marketplace products
          </p>
        </div>

        {/* Product Form */}
        <div className="glass rounded-[32px] p-8 mb-16">

          <h2 className="text-3xl font-bold mb-8">
            Add Product
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Title */}
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="h-14 px-5 rounded-2xl bg-transparent border border-gray-300 dark:border-white/10 outline-none"
            />

            {/* Category */}
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="h-14 px-5 rounded-2xl bg-transparent border border-gray-300 dark:border-white/10 outline-none"
            />

            {/* Price */}
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="h-14 px-5 rounded-2xl bg-transparent border border-gray-300 dark:border-white/10 outline-none"
            />

            {/* Stock */}
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className="h-14 px-5 rounded-2xl bg-transparent border border-gray-300 dark:border-white/10 outline-none"
            />

            {/* Description */}
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={
                formData.description
              }
              onChange={handleChange}
              className="md:col-span-2 h-14 px-5 rounded-2xl bg-transparent border border-gray-300 dark:border-white/10 outline-none"
            />

            {/* Image Upload */}
            <div className="md:col-span-2">

              <input
                type="file"
                onChange={
                  handleImageUpload
                }
                className="w-full"
              />

              {uploading && (
                <p className="mt-2 text-sm">
                  Uploading...
                </p>
              )}

              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-2xl mt-4"
                />
              )}
            </div>
          </div>

          {/* Button */}
          <button
            onClick={
              handleCreateProduct
            }
            disabled={loading}
            className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#1356d0] via-[#9A1951] to-[#FA5303] text-white font-semibold"
          >
            {loading
              ? "Creating..."
              : "Create Product"}
          </button>
        </div>

        {/* Product Table */}
        <div className="glass rounded-[32px] overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">

                  <th className="text-left p-6">
                    Product
                  </th>

                  <th className="text-left p-6">
                    Category
                  </th>

                  <th className="text-left p-6">
                    Price
                  </th>

                  <th className="text-left p-6">
                    Stock
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map(
                  (product) => (
                    <tr
                      key={
                        product._id
                      }
                      className="border-b border-gray-200 dark:border-white/10"
                    >
                      <td className="p-6">
                        {product.title}
                      </td>

                      <td className="p-6">
                        {
                          product.category
                        }
                      </td>

                      <td className="p-6">
                        ₹
                        {
                          product.price
                        }
                      </td>

                      <td className="p-6">
                        {
                          product.stock
                        }
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}