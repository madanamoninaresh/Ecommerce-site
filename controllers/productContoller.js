const productModel= require("../models/product-model");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const cloudinary = require("../config/cloudinary");


module.exports.createProduct = async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    let imageUrl = null;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    await productModel.create({
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      imageUrl
    });

    res.redirect("/owners/admin");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating product");
  }
};

exports.editPage = async (req, res) => {
    const product = await productModel.findById(req.params.id);
    res.render("edit-product", { product });
};

exports.editProduct = async (req, res) => {
    try {
        const { name, price, discount, category, bgcolor, panelcolor, textcolor } = req.body;

        const updatedData = {
            name,
            price,
            discount,
            category,
            bgcolor,
            panelcolor,
            textcolor
        };

        // If a new image is uploaded, update it
      if (req.file) {
         const uploadResult = await uploadToCloudinary(req.file.buffer);
        updatedData.imageUrl = uploadResult.secure_url;
      }


        await productModel.findByIdAndUpdate(req.params.productid, updatedData);

        req.flash("success", "Product updated successfully!");
        console.log(req.body)
        res.redirect("/owners/products");
        // console.log(req.body)

    } catch (err) {
        console.log(err);
        req.flash("error", "Failed to update product!");
        res.redirect("/owners/products");
    }
};

exports.deleteProduct = async(req,res)=>{
  try{
    const product = await productModel.findById(req.params.id);

     const publicId = product.imageUrl.split("/").pop().split(".")[0];
     await cloudinary.uploader.destroy(`ecommerce/${publicId}`);
     await productModel.findByIdAndDelete(req.params.id)
     req.flash("success", "Product deleted successfully!");
     res.redirect("/owners/products");
  }catch (err) {
        console.log(err);
        req.flash("error", "Failed to delete product!");
        res.redirect("/owners/products");
    }
}

