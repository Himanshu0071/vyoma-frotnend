import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

/* =========================
   CREATE PRODUCT
========================= */

export const createProduct = async (
  productData: any
) => {
  const response = await axios.post(
    `${API_URL}/products`,
    productData
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

/* =========================
   IMAGE UPLOAD
========================= */

export const uploadImage =
  async (file: File) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await axios.post(
      `${API_URL}/upload`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  };