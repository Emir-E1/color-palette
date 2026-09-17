import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String },
  age: { type: Number, required: false },
  image: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
