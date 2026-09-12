import mongoose from "mongoose";

let isConnected = false; // <-- c'est notre "post-it"

export async function connectDB() {
  if (isConnected) {
    console.log("Déjà connecté, on réutilise");
    return; // on sort direct, pas de nouvelle connexion
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}
