// middleware.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { runtime } from "./app/api/colorscan/upload/route";

export async function middleware(req) {
  const session = await auth();
  const hasGuest = !!req.cookies.get("guestId")?.value;

  if (!session && !hasGuest) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
  runtime: "nodejs",
};
