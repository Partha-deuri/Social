const router = require("express").Router();
const Conv = require("../models/Conversation");


// new conv

router.post('/', async (req, res) => {
    try {
        const oldConv = await Conv.find({
            members: { $in: [req.body.senderId] }
        }, { members: 1, _id: 0 })
        console.log(oldConv)
        const sameConv = await Promise.all(
            oldConv.filter(i => {
                return (i.members.includes(req.body.receiverId))
            })
        )
        console.log(sameConv);
        if (oldConv.length === 0 || sameConv.length === 0) {
            const newConv = new Conv({
                members: [req.body.senderId, req.body.receiverId]
            })
            const savedConv = await newConv.save();
            return res.status(200).json(savedConv);
        }
        else
            return res.status(200).json("already exist");
    } catch (err) {
        return res.status(500).json(err);
    }
})
// get conv for a  user

router.get("/:userId", async (req, res) => {
    try {
        const allConv = await Conv.find({
            members: { $in: [req.params.userId] }
        })
        return res.status(200).json(allConv);
    } catch (err) {
        return res.status(500).json(err);
    }
})


module.exports = router;


