"use server";

import { connectDB } from "@/db/mongodb";
import { signIn, signOut } from "./auth";
import User from "@/db/models/User";
import { hashPassword } from "./crypt";

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
