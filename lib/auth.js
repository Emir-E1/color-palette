import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
//Configure NextAuth to prepare it for authentication

export const { auth, signIn, signOut, handlers } = NextAuth({
  basePath: "/api/colorscan/auth",
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {},
});
