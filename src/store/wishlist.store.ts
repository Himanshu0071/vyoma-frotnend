import { create } from "zustand";

import { persist } from "zustand/middleware";

import { Product } from "@/types/product";

interface WishlistStore {
  wishlist: Product[];

  addToWishlist: (
    product: Product
  ) => void;

  removeFromWishlist: (
    id: string
  ) => void;

  isInWishlist: (
    id: string
  ) => boolean;
}

export const useWishlistStore =
  create<WishlistStore>()(
    persist(
      (set, get) => ({
        wishlist: [],

        addToWishlist: (
          product
        ) =>
          set((state) => {
            const exists =
              state.wishlist.find(
                (item) =>
                  item._id ===
                  product._id
              );

            if (exists) {
              return state;
            }

            return {
              wishlist: [
                ...state.wishlist,
                product,
              ],
            };
          }),

        removeFromWishlist: (
          id
        ) =>
          set((state) => ({
            wishlist:
              state.wishlist.filter(
                (item) =>
                  item._id !== id
              ),
          })),

        isInWishlist: (id) => {
          return get().wishlist.some(
            (item) =>
              item._id === id
          );
        },
      }),

      {
        name: "vyoma-wishlist",
      }
    )
  );