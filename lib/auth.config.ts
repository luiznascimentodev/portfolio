import type { NextAuthConfig } from "next-auth";

/**
 * Configuração básica do NextAuth — edge-compatible.
 * NÃO importar `db` nem `bcryptjs` aqui (Node.js APIs incompatíveis com Edge Runtime).
 * Este arquivo é usado pelo middleware.ts.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");

      if (isAdminRoute) return isLoggedIn;

      return true;
    },
  },
  providers: [], // Providers completos definidos em lib/auth.ts
} satisfies NextAuthConfig;
