export { auth as proxy } from "@/lib/auth";

export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*"],
};
