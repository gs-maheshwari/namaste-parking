import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAME } from "./constants";

export async function getAccessToken(): Promise<string | null> {
  return (await cookies()).get(TOKEN_COOKIE_NAME)?.value || null;
}
