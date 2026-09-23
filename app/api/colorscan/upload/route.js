export const runtime = "nodejs";

import Palette from "@/db/models/Palette";
import User from "@/db/models/User";

import { connectDB } from "@/db/mongodb";
import { auth } from "@/lib/auth";

import { Vibrant } from "node-vibrant/node";

export async function POST(request) {
  const session = await auth();

  try {
    const formData = await request.formData();

    const uploadedFile = formData.get("imageUpload");

    const arrayBuffer = await uploadedFile.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const palette = await Vibrant.from(buffer).getPalette();

    const cleanPalette = {};

    for (const [name, swatch] of Object.entries(palette)) {
      if (swatch) {
        cleanPalette[name] = {
          rgb: swatch.rgb,
          population: swatch.population,
        };
      }
    }

    // ID de la palette créée en base de données
    let savedPalette = null;

    if (session) {
      await connectDB();

      const userExist = await User.findOne({
        email: session.user.email,
      });

      if (userExist) {
        const colors = Object.values(cleanPalette).map((swatch) => {
          const [r, g, b] = swatch.rgb;

          return `#${[r, g, b]
            .map((value) => Math.round(value).toString(16).padStart(2, "0"))
            .join("")}`;
        });

        // On récupère la palette créée
        savedPalette = await Palette.create({
          colors: colors,
          ownerId: userExist._id,
        });
      }
    }

    return Response.json({
      status: "success",
      message: "Receiving POST request",
      file: uploadedFile.name,
      palette: cleanPalette,

      // On renvoie l'ID au frontend
      paletteId: savedPalette?._id?.toString() || null,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        status: "failed",
        message: "Failed POST request",
      },
      { status: 500 }
    );
  }
}
