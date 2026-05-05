import { Roles } from "@/constrants/roles";
import { services } from "@/services/user.services";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  let isAuthinticated = false;
  let isAdmin = false;
  let isProvider = false;
  let isCustomer = false;

  const { data } = await services.getSessionService();

  if (data) {
    isAuthinticated = true;
    isAdmin = data.user.role === Roles.admin;
    isProvider = data.user.role === Roles.provider;
    isCustomer = data.user.role === Roles.customer;
  }

  if (!isAuthinticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isProvider && pathName.startsWith("/provider-dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isCustomer && pathName.startsWith("/customer-dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!(isCustomer || isAdmin) && pathName.startsWith("/checkouts")) {
    return NextResponse.redirect(new URL("/provider-dashboard", request.url));
  }
  if (
    !(isCustomer || isProvider || isAdmin) &&
    pathName.startsWith("/profile")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!isProvider && pathName.startsWith("/provider-dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/provider-dashboard",
    "/provider-dashboard/:path*",
    "/customer-dashboard",
    "/customer-dashboard/:path*",
    "/checkouts",
    "/checkouts/:path*",
    "/profile",
    "/profile/:path*",
  ],
};
