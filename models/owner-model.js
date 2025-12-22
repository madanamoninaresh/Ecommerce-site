const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    // Owner can manage many products
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    picture: {
      type: String,
      default: "",
    },

    gstin: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Owner", ownerSchema);
