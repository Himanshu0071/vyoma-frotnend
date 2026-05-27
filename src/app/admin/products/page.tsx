"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import toast from "react-hot-toast";

import {
  createProduct,
  deleteProduct,
} from "@/services/admin.service";

import { getProducts } from "@/services/product.service";

import {
  Trash2,
  Plus,
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });

  /* =========================
     FETCH PRODUCTS
  ========================= */

  const fetchProducts =
    async () => {
      try {
        const data =
          await getProducts();

        setProducts(data);
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to fetch products"
        );
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  /* =========================
     CREATE PRODUCT
  ========================= */

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        await createProduct({
          ...formData,

          price: Number(
            formData.price
          ),

          images: [
            formData.image,
          ],
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

  /* =========================
     DELETE PRODUCT
  ========================= */

  const handleDelete =
    async (id: string) => {
      try {
        await deleteProduct(
          id
        );

        toast.success(
          "Product deleted"
        );

        fetchProducts();
      } catch (error) {
        console.log(error);

        toast.error(
          "Delete failed"
        );
      }
    };

  return (
    <div className=" flex flex-col gap-6 overflow-auto">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Products
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Manage your store products
        </p>
      </div>

      {/* CREATE PRODUCT */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-5">
          <Plus size={18} />

          <h2 className="text-lg font-semibold">
            Add Product
          </h2>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 outline-none text-sm"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
            className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 outline-none text-sm"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={
              formData.price
            }
            onChange={
              handleChange
            }
            className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 outline-none text-sm"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={
              formData.image
            }
            onChange={
              handleChange
            }
            className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 outline-none text-sm"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            className="md:col-span-2 min-h-[100px] p-4 rounded-xl bg-white/5 border border-white/10 outline-none text-sm"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="h-11 rounded-xl bg-gradient-to-r from-[#7C8CFF] via-[#C084FC] to-[#FFB38A] text-sm font-medium"
          >
            {loading
              ? "Creating..."
              : "Create Product"}
          </button>
        </form>
      </div>

      {/* PRODUCT TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-auto flex-1">
        {/* TABLE HEADER */}
        <div className="grid grid-cols-[80px_1.5fr_1fr_120px_100px] gap-4 px-5 py-4 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
          <span>
            Image
          </span>

          <span>
            Product
          </span>

          <span>
            Category
          </span>

          <span>
            Price
          </span>

          <span>
            Action
          </span>
        </div>

        {/* PRODUCTS */}
        <div className="divide-y divide-white/5">
          {products.map(
            (product) => (
              <div
                key={
                  product._id
                }
                className="grid grid-cols-[80px_1.5fr_1fr_120px_100px] gap-4 items-center px-5 py-4 hover:bg-white/[0.03] transition"
              >
                {/* IMAGE */}
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src={
                      product
                        .images?.[0] ||
                      "/placeholder.png"
                    }
                    alt={
                      product.title
                    }
                    fill
                    className="object-cover"
                  />
                </div>

                {/* TITLE */}
                <div>
                  <h3 className="text-sm font-medium line-clamp-1">
                    {
                      product.title
                    }
                  </h3>

                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                    {
                      product.description
                    }
                  </p>
                </div>

                {/* CATEGORY */}
                <div className="text-sm text-gray-300">
                  {
                    product.category
                  }
                </div>

                {/* PRICE */}
                <div className="text-sm font-medium">
                  ₹
                  {
                    product.price
                  }
                </div>

                {/* DELETE */}
                <button
                  onClick={() =>
                    handleDelete(
                      product._id
                    )
                  }
                  className="w-9 h-9 rounded-lg bg-red-500/10 hover:bg-red-500 transition flex items-center justify-center text-red-400"
                >
                  <Trash2
                    size={16}
                  />
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}