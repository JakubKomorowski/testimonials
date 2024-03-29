import { withAuth } from "next-auth/middleware";

export default withAuth;

export const config = {
  matcher: [
    "/dashboard",
    "/auth/forgot-password",
    "/auth/signup",
    "/auth/verify-request",
  ],
};
