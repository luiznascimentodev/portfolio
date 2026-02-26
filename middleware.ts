import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

/**
 * Middleware edge-compatible: usa apenas authConfig (sem pg/bcryptjs).
 * A lógica de proteção de rotas /admin/* está em authConfig.callbacks.authorized.
 */
export const { auth: middleware } = NextAuth(authConfig);
export default middleware;

export const config = {
  // Aplica o middleware nas rotas admin e na página de login
  matcher: ["/admin/:path*", "/login"],
};
