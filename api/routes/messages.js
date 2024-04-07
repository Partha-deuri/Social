const router = require("express").Router();
const Msg = require('../models/Message');
const Conv = require("../models/Conversation");
const { authUser } = require("./verifyToken");


// add
router.post("/", authUser, async (req, res) => {
    try {
        if (req.user.userId !== req.body.sender)
            return res.status(403).json("Access Denied");
        const newMsg = new Msg(req.body);
        const savedMsg = await newMsg.save();
        res.status(200).json(savedMsg);
    } catch (err) {
        res.status(500).json(err)
    }
})

// get
router.post("/:convId", authUser, async (req, res) => {
    try {
        const sender = req.body.userId;
        const receiver = req.body.friendId;
        if (sender !== req.user.userId)
            return res.status(403).json("Access Denied");
        const conv = await Conv.findById(req.params.convId);
        if (conv?.members?.includes(sender) && conv?.members?.includes(receiver)) {
            const allMsg = await Msg.find({ convId: req.params.convId });
            return res.status(200).json(allMsg);
        }
        else {
            return res.status(404).json("conversation not found")
        }
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;