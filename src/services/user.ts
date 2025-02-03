"use server";

import { cache } from "react";
import { cookies } from "next/headers";
import { Routes, TOKEN_COOKIE_NAME } from "@/lib";
import { redirect } from "next/navigation";
import { getUserFromToken } from "./auth";

export const getCurrentUser = cache(async () => {
  const token = (await cookies()).get(TOKEN_COOKIE_NAME);
  if (!token) redirect(Routes.LOGIN);

  const user = await getUserFromToken(token);
  if (!user) redirect(Routes.LOGIN);

  return user;
});
