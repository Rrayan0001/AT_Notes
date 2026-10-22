import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      /** the user's locked platform domain */
      domain: string;
    } & DefaultSession["user"];
  }

  interface User {
    domain?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    domain?: string;
  }
}
