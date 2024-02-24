const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");

// register user
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        const currUser = await newUser.save();
        const { password, updatedAt, ...rest } = currUser._doc;
        res.status(200).json(rest);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// login user
router.post('/login', async (req, res) => {
    try {
        const currUser = await User.findOne({ email: req.body.email });
        if (!currUser) return res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, currUser.password);
        if (!validPassword) return res.status(400).json("invalid password");
        const { password, updatedAt, ...rest } = currUser._doc;
        res.status(200).json(rest);
    }
    catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;