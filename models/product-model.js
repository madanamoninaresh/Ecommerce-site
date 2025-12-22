const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    // Instead of image Buffer, use Cloudinary URL
    imageUrl: {
      type: String,
      required: false,
    },

    bgcolor: String,
    panelcolor: String,
    textcolor: String,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
    },
     category: { type: String, default: 'general', index: true }
  },
  { timestamps: true }
);

productSchema.index({ name: 'text' });
module.exports = mongoose.model("Product", productSchema);
