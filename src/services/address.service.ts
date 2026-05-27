import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

/* =========================
   GET ALL ADDRESSES
========================= */

export const getAddresses =
  async (token: string) => {
    const response =
      await axios.get(
        `${API_URL}/address`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

/* =========================
   CREATE ADDRESS
========================= */

export const createAddress =
  async (
    addressData: any,
    token: string
  ) => {
    const response =
      await axios.post(
        `${API_URL}/address`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

/* =========================
   UPDATE ADDRESS
========================= */

export const updateAddress =
  async (
    id: string,
    addressData: any,
    token: string
  ) => {
    const response =
      await axios.put(
        `${API_URL}/address/${id}`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

/* =========================
   DELETE ADDRESS
========================= */

export const deleteAddress =
  async (
    id: string,
    token: string
  ) => {
    const response =
      await axios.delete(
        `${API_URL}/address/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

/* =========================
   SET DEFAULT ADDRESS
========================= */

export const setDefaultAddress =
  async (
    id: string,
    token: string
  ) => {
    const response =
      await axios.put(
        `${API_URL}/address/default/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };