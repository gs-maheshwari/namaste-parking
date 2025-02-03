import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Routes, TOKEN_COOKIE_NAME } from "@/lib";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith(Routes.DASHBOARD) ||
    pathname.startsWith(Routes.SESSIONS)
  ) {
    if (!request.cookies.has(TOKEN_COOKIE_NAME)) {
      return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
    }
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL(Routes.DASHBOARD, request.url));
  }
}

export const config = {
  matcher: [`/dashboard/:path*`, `/sessions/:path*`, "/"],
};
