import mongoose from "mongoose";

//using conditional validation to require or no some keys

const userSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["user", "guest"],
      default: "user",
      required: true,
    },

    email: {
      type: String,
      required: function () {
        return this.type === "user";
      },
    },

    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
    },

    age: {
      type: Number,
      required: false,
    },

    image: {
      type: String,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Palette",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
