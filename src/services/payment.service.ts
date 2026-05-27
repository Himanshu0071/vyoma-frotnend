import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export const createPaymentOrder =
  async (amount: number) => {
    const response =
      await axios.post(
        `${API_URL}/payment/create-order`,
        {
          amount,
        }
      );

    return response.data;
  };

  export const verifyPayment =
  async (
    paymentData: any
  ) => {
    const response =
      await axios.post(
        `${API_URL}/payment/verify`,
        paymentData
      );

    return response.data;
  };