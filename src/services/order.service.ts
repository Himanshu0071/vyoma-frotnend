import axios from "axios";

const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL;

    /* =========================
   CREATE ORDER
========================= */

export const createOrder =
  async (
    orderData: any,
    token: string
  ) => {
    const response =
      await axios.post(
        `${API_URL}/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

/* =========================
   GET ALL ORDERS
========================= */

export const getAllOrders =
  async () => {
    const response =
      await axios.get(
        `${API_URL}/orders`
      );

    return response.data;
  };

/* =========================
   MARK DELIVERED
========================= */

export const markDelivered =
  async (id: string) => {
    const response =
      await axios.put(
        `${API_URL}/orders/${id}/deliver`
      );

    return response.data;
  };

  /* =========================
   MY ORDERS
========================= */

export const getMyOrders =
  async (token: string) => {
    const response =
      await axios.get(
        `${API_URL}/orders/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };