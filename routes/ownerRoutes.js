const express = require('express');
const ownersModel = require('../models/ownerModel');
const ownerModel = require('../models/ownerModel');
const router = express.Router();

if (process.env.NODE_ENV === "development") {
    router.post('/createowner', async (req, res) => {
        let owners = await ownerModel.find()
        if (owners.length > 0) {
            return res
                .status(503)
                .send("you do not have permission o create any owner ")
        }
        const { name, email, password } = req.body;
        let createdowner = await ownersModel.create({
            name,
            email,
            password
        })
        res
            .status(201)
            .send(createdowner)
    })
}
router.get("/admin", (req, res) => {
    res.render("createproducts")
})





module.exports = router;