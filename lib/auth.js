import User from "@/db/models/User";
import { connectDB } from "@/db/mongodb";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { hashCompare } from "./crypt";

//Configure NextAuth to prepare it for authentication

export const { auth, signIn, signOut, handlers } = NextAuth({
  basePath: "/api/colorscan/auth",

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        await connectDB();

        const { email, password } = credentials;

        if (!email || !password) return null;

        const user = await User.findOne({ email });

        if (!user || !user.password) return null;

        const compare = await hashCompare(password, user.password);

        if (!compare) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          await connectDB();

          const userExists = await User.findOne({
            email: user.email,
          });

          if (!userExists) {
            const newUser = {
              email: user.email,
              name: user.name,
              age: user?.age || 0,
              image: user?.image,
            };

            await User.create(newUser);
          }
        }

        return true;
      } catch (error) {
        console.log("error in user save:", error);
        return false;
      }
    },

    async session({ session }) {
      try {
        await connectDB();

        const userDb = await User.findOne({
          email: session.user.email,
        });

        if (userDb) {
          session.user.id = userDb._id.toString();
          session.user.name = userDb.name;
          session.user.image = userDb.image;
        }

        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        throw error;
      }
    },
  },
});
