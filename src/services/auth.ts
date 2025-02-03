'use server'

import { fetchApi } from "./fetchApi";

export const getUserFromToken = async (token: {
  name: string;
  value: string;
}) => {
  const response = await fetchApi("/auth/me", {
    headers: { Authorization: `Bearer ${token.value}` },
  });

  return response.data.user;
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await fetchApi(`/auth/password`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
