import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  paletteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Palette",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 10,
  },
});

const History =
  mongoose.models.History || mongoose.model("History", historySchema);
export default History;
