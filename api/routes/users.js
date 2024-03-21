const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const bcrypt = require("bcrypt");


const dotenv = require('dotenv');
dotenv.config();

const multer = require("multer");
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
    region: BUCKET_REGION,
})

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// search a user
router.get("/search", async (req, res) => {
    try {
        const q = req.query.q;
        const re = `.*(${q}).*`
        const userList = await User.find({ username: { $regex: re } }, { _id: 1, username: 1, fullname: 1, profilePic: 1 })
        const userList2 = await User.find({ fullname: { $regex: re } }, { _id: 1, username: 1, fullname: 1, profilePic: 1 })
        const userList3 = userList2.filter(i => userList.includes(i))
        if (!userList && !userList2) return res.status(404).json("no result found");
        return res.status(200).json(userList.concat(userList3));
    } catch (err) {
        res.status(500).json(err);
    }
})


// update user
router.put('/:id', async (req, res) => {
    try {

        if (req.body._id === req.params.id || req.body.isAdmin) {
            try {
                const currUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
                const { password, updatedAt, ...rest } = currUser._doc;
                return res.status(200).json(rest);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        else {
            return res.status(403).json("You can update only your account");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
})
// upload iamge 

router.put("/:id/upload", upload.single("image"), async (req, res) => {
    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: `social-web-app/public/users/${req.params.id}-${req.body.type}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }
        const command = new PutObjectCommand(params);
        s3.send(command);

        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                profilePic: `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/social-web-app/public/users/${req.params.id}-profile`,
                coverPic: `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/social-web-app/public/users/${req.params.id}-cover`,
            }
        )
        res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(err);
    }
})




// delete user
router.put('/:id/delete', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const currUser = await User.findById(req.params.id);
            const allPosts = await Post.find({ userId: req.params.id }, { _id: 1 })
            const allComments = await Comment.find({ userId: req.params.id }, { _id: 1 })
            await Promise.all(
                allPosts.map(pId => Post.findByIdAndDelete(pId))
            )
            await Promise.all(
                allComments.map(cId => Comment.findByIdAndDelete(cId))
            )
            await Promise.all(
                currUser.followings.map(fId => User.findByIdAndUpdate(fId, { $pull: { followers: req.params.id } }))
            )
            await Promise.all(
                currUser.followers.map(fId => User.findByIdAndUpdate(fId, { $pull: { followings: req.params.id } }))
            )
            await currUser.deleteOne();
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
        const currUser = await User.findById(req.params.id, { password: 0, updatedAt: 0 });
        res.status(200).json(currUser)

    } catch (err) {
        return res.status(500).json(err);
    }
})
// get followings
router.get('/:id/followings', async (req, res) => {
    try {
        const currUser = await User.findById(req.params.id);
        const flwings = await Promise.all(
            currUser.followings.map(fid => {
                return User.findById(fid, { _id: 1, username: 1, profilePic: 1 });
            })
        )
        return res.status(200).json(flwings);
    } catch (err) {
        return res.status(500).json(err);
    }
})
// get followers
router.get('/:id/followers', async (req, res) => {
    try {
        const currUser = await User.findById(req.params.id);
        const flwers = await Promise.all(
            currUser.followers.map(fid => {
                return User.findById(fid, { _id: 1, username: 1, profilePic: 1 });
            })
        )

        return res.status(200).json(flwers);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// follow a user 
router.post("/:id/follow", async (req, res) => {
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
router.post("/:id/unfollow", async (req, res) => {
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