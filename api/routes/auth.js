const router = require("express").Router();
const User = require("../models/User")
const OTP = require("../models/Otp")
const bcrypt = require("bcrypt");

// register user
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = await new User({
            username: req.body.username, 
            email: req.body.email,
            fullname: req.body.fullname,
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
// send otp
router.get('/email/:email', async (req, res) => {
    try {
        const oldUser = await User.findOne({ email: req.params.email });
        if (!oldUser) {
            const otp = Math.floor((Math.random() * 1000000) + 1);
            const newOTP = new OTP({
                email: req.params.email,
                otp,
            })
            const savedOtp = await newOTP.save();
            console.log(savedOtp);
            return res.status(200).json({ msg: "all ok", otpId: savedOtp._id });
        } else {
            return res.status(200).json({ msg: "email already in use" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
})


// verify otp
router.post('/otp', async (req, res) => {
    try {
        const oldOTP = await OTP.findById(req.body.otpId);
        if (!oldOTP) return res.status(404).json({ msg: "otp expired" });
        if (oldOTP.otp === req.body.otp) {
            await oldOTP.deleteOne();
            return res.status(200).json({ msg: "success" })
        }
        return res.status(403).json({ msg: "otp mismatch" });

    } catch (err) {
        res.status(500).json(err);
    }
})

// verify otp
router.get('/username/:username', async (req, res) => {
    try {
        const oldUser = await User.findOne({ username: req.params.username });
        if (oldUser) return res.status(200).json({ msg: "username already taken" });
        return res.status(200).json({ msg: "username exist" });
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;