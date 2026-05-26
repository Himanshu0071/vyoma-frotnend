import { create } from "zustand";

import { persist } from "zustand/middleware";

interface CartItem {
  _id: string;

  title: string;

  price: number;

  image: string;

  quantity: number;
}

interface CartStore {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;

  removeFromCart: (id: string) => void;

  increaseQuantity: (id: string) => void;

  decreaseQuantity: (id: string) => void;

  clearCart: () => void;
}

export const useCartStore =
  create<CartStore>()(
    persist(
      (set) => ({
        cart: [],

        addToCart: (item) =>
          set((state) => {
            const existingItem =
              state.cart.find(
                (cartItem) =>
                  cartItem._id === item._id
              );

            // If item already exists
            if (existingItem) {
              return {
                cart: state.cart.map(
                  (cartItem) =>
                    cartItem._id === item._id
                      ? {
                          ...cartItem,
                          quantity:
                            cartItem.quantity + 1,
                        }
                      : cartItem
                ),
              };
            }

            // Add new item
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

        removeFromCart: (id) =>
          set((state) => ({
            cart: state.cart.filter(
              (item) => item._id !== id
            ),
          })),

        increaseQuantity: (id) =>
          set((state) => ({
            cart: state.cart.map((item) =>
              item._id === id
                ? {
                    ...item,
                    quantity:
                      item.quantity + 1,
                  }
                : item
            ),
          })),

        decreaseQuantity: (id) =>
          set((state) => ({
            cart: state.cart.map((item) =>
              item._id === id
                ? {
                    ...item,
                    quantity:
                      item.quantity > 1
                        ? item.quantity - 1
                        : 1,
                  }
                : item
            ),
          })),

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