const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

module.exports = function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "ecommerce_products" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
