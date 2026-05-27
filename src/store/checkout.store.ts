import { create } from "zustand";

interface CheckoutStore {
  selectedAddress: any;

  setSelectedAddress: (
    address: any
  ) => void;

  paymentMethod: string;

  setPaymentMethod: (
    method: string
  ) => void;

  addresses: any[];

  setAddresses: (
    addresses: any[]
  ) => void;

  addAddress: (
    address: any
  ) => void;
}

export const useCheckoutStore =
  create<CheckoutStore>(
    (set) => ({
      /* =========================
         SELECTED ADDRESS
      ========================= */

      selectedAddress: null,

      setSelectedAddress: (
        address
      ) =>
        set({
          selectedAddress:
            address,
        }),

      /* =========================
         PAYMENT METHOD
      ========================= */

      paymentMethod: "COD",

      setPaymentMethod: (
        method
      ) =>
        set({
          paymentMethod:
            method,
        }),

      /* =========================
         ADDRESSES
      ========================= */

      addresses: [],

      setAddresses: (
        addresses
      ) =>
        set({
          addresses,
        }),

      addAddress: (
        address
      ) =>
        set((state) => ({
          addresses: [
            address,
            ...state.addresses,
          ],

          selectedAddress:
            address,
        })),
    })
  );