const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../middlewares/multer");
const productController = require("../controllers/productContoller");
// const upload = require('../config/multer-config')
// const productModel = require('../models/product-model')

// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/multer");
// const productController = require("../controllers/productContoller");

// router.post("/create", upload.single("image"), productControllers.createProduct);

// module.exports = router;

// 


// const upload = require("../middlewares/multer");
// const productController = require("../controllers/productContoller");

router.post("/create", upload.single("image"), productController.createProduct);
router.get("/edit/:id", isLoggedIn, isAdmin, productController.editPage);

// UPDATE PRODUCT
router.post(
    "/update/:productid",
    isAdmin,
    upload.single("image"),
    productController.editProduct
);

router.get("/delete/:id", isLoggedIn, isAdmin, productController.deleteProduct);


module.exports = router;



// router.post('/create', upload.single("image"), async (req, res) => {
//     try{
//     let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
//     let product = await productModel.create({
//         image: req.file.buffer
//         , name, price, discount, bgcolor, panelcolor, textcolor
//     });
//     req.flash("success", "product created successfully")
//     res.redirect('/owners/admin');
//     }
//     catch(err){
//         res.send(err.message);
//     }
// });

module.exports = router;
//   try {
//     const Product = require("../models/product-model");
//     const products = await Product.find();
//     res.render("products", { products });
//   } catch (err) {
//     console.log(err);
//     res.send("Error loading products page");
//   }
// });