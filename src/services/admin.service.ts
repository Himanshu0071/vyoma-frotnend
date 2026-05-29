import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

/* =========================
   CREATE PRODUCT
========================= */

export const createProduct =
  async (
    productData: FormData
  ) => {
    const response =
      await axios.post(
        `${API_URL}/products`,
        productData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };
/* =========================
   DELETE PRODUCT
========================= */

export const deleteProduct = async (
  id: string
) => {
  const response = await axios.delete(
    `${API_URL}/products/${id}`
  );

  return response.data;
};
