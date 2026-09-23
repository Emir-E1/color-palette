"use server";

import { connectDB } from "@/db/mongodb";
import { auth, signIn, signOut } from "./auth";
import User from "@/db/models/User";
import { hashPassword } from "./crypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

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
      return {
        success: false,
        error: "Palette ID manquant.",
      };
    }

    if (!mongoose.isValidObjectId(paletteId)) {
      return {
        success: false,
        error: "Identifiant de palette invalide.",
      };
    }

    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Utilisateur non connecté.",
      };
    }

    await connectDB();

    await User.findByIdAndUpdate(session.user.id, {
      $addToSet: {
        favorites: paletteId,
      },
    });

    return {
      success: true,
      isFavorite: true,
    };
  } catch (error) {
    console.error("favoriteAction error:", error);

    return {
      success: false,
      error: "Impossible d'ajouter la palette aux favoris.",
    };
  }
}
