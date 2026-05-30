const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // If a user adds items to cart or wishes to purchase later
    products: [
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    quantity: {
      type: Number,
      default: 1
    }
  }
],
    picture: {
      type: String, // store URL if using Cloudinary later
      default: "",
    },
    role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
  },

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
