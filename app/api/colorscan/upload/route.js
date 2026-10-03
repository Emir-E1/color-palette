export const runtime = "nodejs";

import Palette from "@/db/models/Palette";
import User from "@/db/models/User";
import History from "@/db/models/History";

import { connectDB } from "@/db/mongodb";
import { auth } from "@/lib/auth";

import { Vibrant } from "node-vibrant/node";

const MAX_HISTORY = 10;

export async function POST(request) {
  try {
    const session = await auth();

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

    let savedPalette = null;

    if (session?.user?.id) {
      await connectDB();

      const userExist = await User.findById(session.user.id);

      if (userExist) {
        const colors = Object.values(cleanPalette).map((swatch) => {
          const [r, g, b] = swatch.rgb;

          return `#${[r, g, b]
            .map((value) => Math.round(value).toString(16).padStart(2, "0"))
            .join("")}`;
        });

        savedPalette = await Palette.create({
          colors: colors,
          ownerId: userExist._id,
        });

        // Ajout dans l'historique
        await History.create({
          userId: userExist._id,
          paletteId: savedPalette._id,
        });

        // Garder seulement les 10 plus récentes
        const old = await History.find({ userId: userExist._id })
          .sort({ createdAt: -1 })
          .skip(MAX_HISTORY)
          .select("_id");

        if (old.length) {
          await History.deleteMany({ _id: { $in: old.map((h) => h._id) } });
        }
      }
    }

    return Response.json({
      status: "success",
      message: "Receiving POST request",
      file: uploadedFile.name,
      palette: cleanPalette,
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
