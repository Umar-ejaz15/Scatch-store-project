const express = require('express');
const router = express.Router();
const { registerUser, loginuser, logout } = require('../controllers/authController');


router.get('/', (req, res) => {
    res.render('index');
});
router.post("/register", registerUser)
router.post("/login", loginuser)
router.get("/logout", logout)


module.exports = router;