"use server";

import { Routes, TOKEN_COOKIE_NAME } from "@/lib";
import { login } from "@/services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signIn = async (prevState: unknown, formData: FormData) => {
  const data = authSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  try {
    const { auth } = await login(data);
    const { accessToken, expiresIn: expiresInTime } = auth;

    const { set } = await cookies();
    const expiresIn = new Date(Date.now() + expiresInTime * 1000);

    set(TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: expiresIn,
    });
  } catch (e) {
    console.error(e);
    return e?.toString() || "An error occurred";
  }

  redirect(Routes.DASHBOARD);
};

export const signOut = async () => {
  (await cookies()).delete(TOKEN_COOKIE_NAME);
  redirect(Routes.LOGIN);
};
