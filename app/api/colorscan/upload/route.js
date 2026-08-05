export const runtime = "nodejs";
import { Vibrant } from "node-vibrant/node";
export async function POST(request) {
  try {
    // console.log("im posting");
    const formData = await request.formData();
    const uploadedFile = formData.get("imageUpload");
    //console.log(uploadedFile);
    const arrayBuffer = await uploadedFile.arrayBuffer();
    //console.log(arrayBuffer);
    const buffer = Buffer.from(arrayBuffer);
    console.log(buffer);
    const palette = await Vibrant.from(buffer).getPalette();
    console.log(palette);

    const cleanPalette = {};
    for (const [name, swatch] of Object.entries(palette)) {
      if (swatch) {
        cleanPalette[name] = {
          rgb: swatch.rgb,
          population: swatch.population,
        };
      }
    }

    return Response.json({
      status: "sucess",
      message: "Recieving POST req",
      file: uploadedFile.name,
      palette: cleanPalette,
    });
  } catch (err) {
    console.log(err);
    return Response.json({
      status: "failed",
      message: "Failed POST req",
    });
  }
}
