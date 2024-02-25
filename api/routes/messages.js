const router = require("express").Router();
const Msg = require('../models/Message');
// add
router.post("/", async (req, res) => {
    try {
        const newMsg = new Msg(req.body);
        const savedMsg = await newMsg.save();
        res.status(200).json(savedMsg);
    } catch (err) {
        res.status(500).json(err)
    }
})

// get
router.get("/:convId", async (req, res) => {
    try {
        const allMsg = await Msg.find({ convId: req.params.convId });
        res.status(200).json(allMsg);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;