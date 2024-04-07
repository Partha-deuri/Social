const router = require("express").Router();
const Conv = require("../models/Conversation");
const { authUser } = require("./verifyToken");


// new conv

router.post('/', authUser, async (req, res) => {
    try {
        if (req.body.senderId !== req.user.userId)
            return res.status(403).json("Access Denied");
        const oldConv = await Conv.find({
            members: { $in: [req.body.senderId] }
        })
        const sameConv = await Promise.all(
            oldConv.filter(i => {
                return (i.members.includes(req.body.receiverId))
            })
        )
        if (oldConv.length === 0 || sameConv.length === 0) {
            const newConv = new Conv({
                members: [req.body.senderId, req.body.receiverId]
            })
            const savedConv = await newConv.save();
            return res.status(200).json(savedConv);
        }
        else {
            return res.status(200).json(sameConv);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
})
// get conv for a  user

router.get("/:userId", authUser, async (req, res) => {
    try {
        if (req.user.userId !== req.params.userId)
            return res.status(403).json("Access Denied");
        const allConv = await Conv.find({
            members: { $in: [req.params.userId] }
        })
        return res.status(200).json(allConv);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get("/one/:convId", authUser, async (req, res) => {
    try {
        const oneConv = await Conv.findById(req.params.convId)
        if (oneConv.members.includes(req.user.userId))
            return res.status(200).json(oneConv);
        return res.status(403).json("Access Denied");
    } catch (err) {
        return res.status(500).json(err);
    }
})


module.exports = router;


