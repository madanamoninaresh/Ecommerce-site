const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model')
const isAdmin = require("../middlewares/isAdmin");
const productModel = require("../models/product-model")


// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "development"){
    router.post('/create',async (req,res) => {
        let owners = await ownerModel.find();
        if (owners.length > 0){
            return res.status(500).send("you cannnot create a new owner");
        }
        let {fullname,email,password} = req.body;
        let createdOwner =  await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdOwner);
    })
    // console.log(process.env.NODE_ENV)
};


// ADMIN PRODUCT LIST
router.get("/products", isAdmin, async (req, res) => {
    const products = await productModel.find();
    res.render("products", { products });
});







router.get('/admin', isAdmin ,(req,res)=>{
    let success = req.flash("success")
    // let error = req.flash("error")
    res.render("createproducts", {success})
})
// router.post('/create',async (req,res)=>{
//     let {fullname,email,password} = req.body;
//     let owner = await ownerModel.create({
//         fullname,
//         email,
//         password,
//     })
//     res.send("owner created successfully");
// })




module.exports = router