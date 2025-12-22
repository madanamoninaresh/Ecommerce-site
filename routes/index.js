const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
// const shopController = require("../controllers/shopController");

router.get("/",(req,res)=>{
    let error = req.flash("error");
    res.render('index',{error , loggedIn : false})
})
router.get('/shop',isLoggedIn, async (req,res)=>{
    let products = await productModel.find();
    let error = req.flash("error")
    let success =  req.flash("success")
    res.render("shop",{ products ,success,error })
});

// router.get("/shop", shopController.getShop);


// router.get('/cart',isLoggedIn, async (req,res)=>{
//     let user = await userModel.findOne({email : req.user.email}).populate("products.productId").exec();
//     res.render("cart",{ user});
// });
router.get("/cart", isLoggedIn, async (req, res) => {
    let user = await userModel
        .findById(req.user._id)
        .populate("products.productId")
        .exec();

    // --- Clean up deleted/missing products ---
    const originalLength = user.products.length;

    user.products = user.products.filter(p => p.productId !== null);

    if (user.products.length !== originalLength) {
        await user.save(); // save cleaned cart
        req.flash("success", "Some unavailable items were removed from your cart.");
    }
    let subtotal = 0;
    let discountTotal = 0;

    user.products.forEach(item => {
        subtotal += item.productId.price * item.quantity;
        discountTotal += item.productId.discount * item.quantity;
    });

    const platformFee = 20;
    const shippingFee = 0; // Free shipping
    const grandTotal = subtotal + platformFee - discountTotal;

    res.render("cart", { user , success: req.flash , platformFee, grandTotal});
});
<<<<<<< HEAD


router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {

    let user = await userModel.findById(req.user._id)
        .populate("products.productId");

    const productId = req.params.productid;

    const productIndex = user.products.findIndex(
        (item) => item.productId && item.productId._id.toString() === productId);

    if (productIndex !== -1) {
        user.products[productIndex].quantity += 1;
    } else {
        user.products.push({
            productId: productId,
            quantity: 1
        });
    }

    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
    // res.send(user.products[productIndex].quantity)
    // console.log(productIndex)
});

router.get("/cart/increase/:productid", isLoggedIn, async (req, res) => {
    let user = await userModel.findById(req.user._id);

    user.products.forEach((item) => {
        if (item.productId.toString() === req.params.productid) {
            item.quantity += 1;
            // res.send(item)
        }
    });

    await user.save();
    res.redirect("/cart");
});
router.get("/cart/decrease/:productid", isLoggedIn, async (req, res) => {
    let user = await userModel.findById(req.user._id);

    user.products = user.products
        .map((item) => {
            if (item.productId.toString() === req.params.productid) {
                item.quantity -= 1;

                // remove item if quantity becomes 0
                if (item.quantity <= 0) return null;
            }
            return item;
        })
        .filter(Boolean); // remove null entries

    await user.save();
    res.redirect("/cart");
});
router.get("/cart/remove/:productid", isLoggedIn, async (req, res) => {
    const user = await userModel.findById(req.user._id);

    user.products = user.products.filter(
        (item) => item.productId.toString() !== req.params.productid
    );

    await user.save();
    res.redirect("/cart");
});


=======
// router.get("/addtocart/:productid",isLoggedIn, async (req,res)=>{
//     let user = await userModel.findOne({email : req.user.email});
//     user.cart.push(req.params.productid);
//     await user.save();
//     req.flash("success","Added to cart");
//     res.redirect("/shop")
// })
>>>>>>> c3ee9150335cef4193aaf2ad987ad468871cc8c6
module.exports = router;