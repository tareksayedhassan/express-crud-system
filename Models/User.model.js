const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const UsersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "failed: must be a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "manger"],
      default: "user",
    },
    avatar: {
      type: String,
      default: "uploads/profile.webp",
    },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

module.exports = mongoose.model("user", UsersSchema);
