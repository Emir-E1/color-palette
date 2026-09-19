"use server";

import { connectDB } from "@/db/mongodb";
import { signIn, signOut } from "./auth";
import User from "@/db/models/User";
import { hashPassword } from "./crypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/dashboard" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
export async function registerAction(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const hashedPassword = await hashPassword(password);
  const newUser = {
    name: name,
    email: email,
    password: hashedPassword,
    age: 22,
  };
  await connectDB();
  const user = await User.findOne({ email: email });
  if (!user) {
    await User.create(newUser);
  } else {
    return;
  }

  //authorize it to enter

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
}
export async function guestAction(formData) {
  const guestName = formData.get("name");
  await connectDB();
  const guestUser = await User.create({
    type: "guest",
    name: guestName,
  });

  const cookieStore = await cookies();

  cookieStore.set("guestId", guestUser._id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 2, // 2 heures
    path: "/",
  });

  redirect("/dashboard");
}
