"use server";

import { connectDB } from "@/db/mongodb";
import { auth, signIn, signOut } from "./auth";
import User from "@/db/models/User";
import { hashPassword } from "./crypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import Palette from "@/db/models/Palette";

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

export async function favoriteAction(paletteId) {
  try {
    if (!paletteId) {
      return { success: false, error: "Missing Palette ID" };
    }

    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "User not connected." };
    }

    await connectDB();

    const user = await User.findById(session.user.id);
    if (!user) {
      return { success: false, error: "User not found." };
    }

    const paletteExist = user.favorites.some((palette) =>
      palette.equals(paletteId)
    );

    await User.findByIdAndUpdate(
      user.id,
      paletteExist
        ? { $pull: { favorites: paletteId } }
        : { $addToSet: { favorites: paletteId } }
    );

    revalidatePath("/dashboard/favorite");

    return { success: true, isFavorite: !paletteExist };
  } catch (error) {
    console.error("favoriteAction error:", error);
    return { success: false, error: "Une erreur est survenue." };
  }
}

export async function actionEditAccount(formData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "User not connected." };
  }
  const name = formData.get("name")?.toString().trim();
  const profilePic = formData.get("image").toString().trim();
  if (!name || name.length > 80) {
    return { success: false, error: "Invalid name." };
  }
  await connectDB();
  const updatedFields = {
    name: name,
    image: profilePic,
  };
  await User.findByIdAndUpdate(session.user.id, updatedFields);
  revalidatePath("/dashboard/settings");
}

export async function actionChangePassword(formData) {
  //get the session
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "User not connected." };
  }
  //get the new mdp
  const password = formData.get("password");
  //hash-it
  const hashedPassword = await hashPassword(password);
  //re-update the user
  await User.findByIdAndUpdate(session.user.id, { password: hashedPassword });
  //revalidate the path
  revalidatePath("/dashboard/settings");
}

export async function actionDeleteAccount() {
  //get the session
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "User not connected." };
  }
  //get the mongodb account
  await connectDB();
  // Delete the user's palettes
  await Palette.deleteMany({ ownerId: session.user.id });
  //delete the mongoDB account related
  await User.findByIdAndDelete(session.user.id);
  //sign out
  await signOut({ redirectTo: "/login" });
}
/*
actionEditAccount,
actionChangePassword,
actionDeleteAccount,*/
