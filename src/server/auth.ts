import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

import { env } from "~/env";
import { db } from "~/server/db";

/**
 * Extending the default session and user interface to store extra properties like accessToken
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      accessToken?: string; // Added accessToken to session for Google Calendar API calls
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}

/**
 * NextAuth configuration with Google Calendar API integration
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign-in
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : 0;
        token.userId = user.id;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, refresh it
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.id = token.userId as string;
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  authorization: {
    params: {
      scope: "openid email profile",
      access_type: "offline",  // Ensure that refresh_token is returned
      prompt: "consent",  // Force consent screen to always show
    },
  },
}),
  ],
};

/**
 * Helper function to refresh the access token
 */
interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  error?: string;
  error_description?: string;
}
// Updated refreshAccessToken function
async function refreshAccessToken(token: JWT) {
  try {
    const url =
      `https://oauth2.googleapis.com/token?` +
      new URLSearchParams({
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      }).toString();

    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const refreshedTokens: GoogleTokenResponse = await response.json();

    if (!response.ok) {
      throw new Error(
        refreshedTokens.error_description || "Failed to refresh access token",
      );
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // Expires in seconds
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

/**
 * Wrapper for `getServerSession`
 */
export const getServerAuthSession = () => getServerSession(authOptions);
