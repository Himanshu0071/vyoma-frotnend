import { create } from "zustand";

import { persist } from "zustand/middleware";

/* =========================
   TYPES
========================= */

interface CartItem {
  _id: string;

  title: string;

  price: number;

  image: string;

  quantity: number;

  selectedSize?: string;
}

interface CartStore {
  cart: CartItem[];

  addToCart: (
    item: CartItem
  ) => void;

  removeFromCart: (
    id: string,
    selectedSize?: string
  ) => void;

  increaseQuantity: (
    id: string,
    selectedSize?: string
  ) => void;

  decreaseQuantity: (
    id: string,
    selectedSize?: string
  ) => void;

  clearCart: () => void;
}

/* =========================
   STORE
========================= */

export const useCartStore =
  create<CartStore>()(
    persist(
      (set) => ({
        cart: [],

        /* =========================
           ADD TO CART
        ========================= */

        addToCart: (item) =>
          set((state) => {
            const existingItem =
              state.cart.find(
                (cartItem) =>
                  cartItem._id ===
                    item._id &&
                  cartItem.selectedSize ===
                    item.selectedSize
              );

            /* ITEM EXISTS */
            if (existingItem) {
              return {
                cart: state.cart.map(
                  (cartItem) =>
                    cartItem._id ===
                      item._id &&
                    cartItem.selectedSize ===
                      item.selectedSize
                      ? {
                          ...cartItem,

                          quantity:
                            cartItem.quantity +
                            1,
                        }
                      : cartItem
                ),
              };
            }

            /* NEW ITEM */
            return {
              cart: [
                ...state.cart,

                {
                  ...item,

                  quantity: 1,
                },
              ],
            };
          }),

        /* =========================
           REMOVE FROM CART
        ========================= */

        removeFromCart: (
          id,
          selectedSize
        ) =>
          set((state) => ({
            cart:
              state.cart.filter(
                (item) =>
                  !(
                    item._id ===
                      id &&
                    item.selectedSize ===
                      selectedSize
                  )
              ),
          })),

        /* =========================
           INCREASE QUANTITY
        ========================= */

        increaseQuantity: (
          id,
          selectedSize
        ) =>
          set((state) => ({
            cart: state.cart.map(
              (item) =>
                item._id ===
                  id &&
                item.selectedSize ===
                  selectedSize
                  ? {
                      ...item,

                      quantity:
                        item.quantity +
                        1,
                    }
                  : item
            ),
          })),

        /* =========================
           DECREASE QUANTITY
        ========================= */

        decreaseQuantity: (
          id,
          selectedSize
        ) =>
          set((state) => ({
            cart: state.cart.map(
              (item) =>
                item._id ===
                  id &&
                item.selectedSize ===
                  selectedSize
                  ? {
                      ...item,

                      quantity:
                        item.quantity >
                        1
                          ? item.quantity -
                            1
                          : 1,
                    }
                  : item
            ),
          })),

        /* =========================
           CLEAR CART
        ========================= */

        clearCart: () =>
          set({
            cart: [],
          }),
      }),

      {
        name: "vyoma-cart",
      }
    )
  );