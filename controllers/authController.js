const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generatetoken');
module.exports.registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let user = await userModel.findOne({ email })
        if (user) {
            return res
                .status(401)
                .send("user already exists plese login")
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                else {
                    let user = await userModel.create({
                        name,
                        email,
                        password: hash
                    })
                    let token = generateToken(user)
                    res.cookie('token', token)
                    res.send("user created successfully")
                }
            })
        })

    } catch (err) {
        res
            .status(500)
            .send(err.message);
    }
}
module.exports.loginuser = async (req,res)=>{
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email })
        if (!user) {
            return res
                .status(401)
                .send("user does not exist plese register")
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (result) {
                let token = generateToken(user)
                res.cookie('token', token)
                res.redirect('/shop')
            }
            else {
                res
                    .status(401)
                    .send("invalid credentials")
            }
        })
    } catch (err) {
        res
            .status(500)
            .send(err.message);
    }

}
module.exports.logout = (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
}