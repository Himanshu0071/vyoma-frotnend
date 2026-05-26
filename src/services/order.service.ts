import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export const createOrder = async (
  orderData: any,
  token: string
) => {
  const response = await axios.post(
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

export const getMyOrders = async (
  token: string
) => {
  const response = await axios.get(
    `${API_URL}/orders/my-orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};