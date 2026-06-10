import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

interface CustomJwtPayload {
  userId: string;
  role: string;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    if (pathname === "/cart") {
      return NextResponse.redirect(new URL("/products", request.url));
    }

    return NextResponse.redirect(new URL("/log-in", request.url));
  }

  if (pathname === "/cart") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

      const { payload } = await jwtVerify(token, secret);

      const decoded = payload as unknown as CustomJwtPayload;

      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/log-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/admin/:path*"],
};
