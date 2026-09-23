import mongoose, { mongo } from "mongoose";

//Schema and Model for Palette

const paletteSchema = new mongoose.Schema({
  colors: [{ type: String }],
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Palette =
  mongoose.models.Palette || mongoose.model("Palette", paletteSchema);
export default Palette;
