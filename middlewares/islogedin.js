const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        return res.status(401).send("unauthorized")
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        let user = await userModel
            .findOne({ _id: decoded.id })
            .select('-password')
        req.user = user
        next()

    } catch (err) {
        req.flash('error', "something went wrong")
        res.redirect('/')
    }
}
