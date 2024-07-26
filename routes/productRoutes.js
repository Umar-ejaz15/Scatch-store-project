const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/productsModels');

router.post('/create', upload.single('image'), async (req, res) => {
    let { name, image, price, bgcolor, panalcolor, textcolor, discount } = req.body;
    let product = await productModel.create({
        name,
        image:req.file.buffer,
        price,
        bgcolor,
        panalcolor,
        textcolor,
        discount

    });
    res.redirect('/owner/admin');
});

module.exports = router;