import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const TOKEN_LIFETIME = 14 * 60 * 1000;

async function refreshToken(token: string) {
  const res = await fetch(`${process.env.API_URL}/auth/jwt/refresh/`, {
    method: "POST",
    body: JSON.stringify({ refresh: token }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to refresh token");
  }

  const refreshedToken = await res.json();
  refreshedToken.expires = Date.now() + TOKEN_LIFETIME;

  return refreshedToken;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Django Rest Framework",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.API_URL}/auth/jwt/create/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        const token = await res.json();

        if (res.ok && token) {
          token.expires = Date.now() + TOKEN_LIFETIME;
          return token;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      if (Date.now() >= token.user.expires) {
        try {
          const refreshedToken = await refreshToken(token.user.refresh);
          token.user.access = refreshedToken.access;
          token.user.expires = Date.now() + TOKEN_LIFETIME;
        } catch (error) {
          console.error(error);
          token.user = null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.user && session.user) {
        session.user.access = token.user.access;
        session.user.refresh = token.user.refresh;
      } else {
        session.user = null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
