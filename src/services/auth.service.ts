import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (
  userData: {
    name: string;
    email: string;
    password: string;
  }
) => {
  const response = await axios.post(
    `${API_URL}/auth/register`,
    userData
  );

  return response.data;
};

export const loginUser = async (
  userData: {
    email: string;
    password: string;
  }
) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    userData
  );

  return response.data;
};