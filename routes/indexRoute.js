const express = require('express');
const router = express.Router();
const islogin = require('../middlewares/islogedin');
const productModel = require('../models/productsModels');
const userModel = require('../models/userModel');


router.get('/', (req, res) => {
    res.render('index', { loggedin: false })
});
router.get("/shop", islogin, async (req, res) => {
    let products = await productModel.find()

    res.render("shop", { products })
});
router.get("/cart", islogin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate('cart')
    const bill = Number(user.cart[0].price) + 20
    res.render("cart", { user,bill })
});
router.get("/addtocart/:id", islogin, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart.push(req.params.id);
        await user.save();
        res.redirect('/cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding item to cart');
    }
});


module.exports = router;