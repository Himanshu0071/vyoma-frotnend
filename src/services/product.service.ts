import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async () => {
  const response = await axios.get(
    `${API_URL}/products`
  );

  return response.data;
};

export const getSingleProduct = async (
  id: string
) => {
  const response = await axios.get(
    `${API_URL}/products/${id}`
  );

  return response.data;
};