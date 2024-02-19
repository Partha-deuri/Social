const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// update user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const currUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            return res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can update only your account");
    }
})

// delete user
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const currUser = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can delete only your account");
    }
})

// get a user
router.get('/:id', async (req, res) => {
    try {
        const currUser = await User.findById(req.params.id);
        const { password, updatedAt, ...rest } = currUser._doc;
        res.status(200).json(rest)

    } catch (err) {
        return res.status(500).json(err);
    }
})

// follow a user 
router.get("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const otherUser = await User.findById(req.params.id);
            const currUser = await User.findById(req.body.userId);
            if (!otherUser.followers.includes(req.body.userId)) {
                await otherUser.updateOne({ $push: { followers: req.body.userId } })
                await currUser.updateOne({ $push: { followings: req.params.id } })
                return res.status(200).json("user has been followed");
            } else {
                return res.status(403).json("You already follow this  user");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can not follow yourself")
    }
})

// unfollow a user
router.get("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const otherUser = await User.findById(req.params.id);
            const currUser = await User.findById(req.body.userId);
            if (otherUser.followers.includes(req.body.userId)) {
                await otherUser.updateOne({ $pull: { followers: req.body.userId } })
                await currUser.updateOne({ $pull: { followings: req.params.id } })
                return res.status(200).json("user has been unfollowed");
            } else {
                return res.status(403).json("You don't follow this user");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can not unfollow yourself")
    }
})



module.exports = router;