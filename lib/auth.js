import User from "@/db/models/User";
import { connectDB } from "@/db/mongodb";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
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
      async authorize(credentials) {},
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB();
        const userExists = await User.findOne({ email: user.email });
        if (!userExists) {
          const newUser = {
            email: user.email,
            name: user.name,
            age: user?.age || 0,
            image: user?.image,
          };
          await User.create(newUser);
        }
        console.log("user stored in the DB");
        return true;
      } catch (error) {
        console.log("error in user save");
        return false;
      }
    },
    async session({ session }) {
      try {
        await connectDB();
        const userDb = await User.findOne({ email: session.user.email });
        if (userDb) {
          session.user.id = userDb._id.toString();
        }
        return session;
      } catch (error) {
        console.log("couldnt catch user session id");
      }
    },
  },
});
