const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");


const dotenv = require('dotenv');
dotenv.config();

const multer = require("multer");
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { authUser } = require("./verifyToken");

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

// create a post
router.post("/", authUser, async (req, res) => {
    try {
        if (req.body.userId === req.user.userId) {
            const newPost = new Post(req.body);
            const savedPost = await newPost.save();
            return res.status(200).json(savedPost);
        }
        return res.status(403).json("you can not post for different user");

    } catch (err) {
        return res.status(500).json(err);
    }
})

router.put("/:id/upload", upload.single('image'), async (req, res) => {
    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: `social-web-app/public/posts/${req.params.id}-image`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }
        const command = new PutObjectCommand(params);
        const currPost = await Post.findById(req.params.id);

        if (currPost.userId === req.body.userId) {
            await s3.send(command);
            await currPost.updateOne({ image: `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/social-web-app/public/posts/${req.params.id}-image` })

            const updatedPost = await Post.findById(req.params.id);
            return res.status(200).json(updatedPost);
        } else {
            return res.status(403).json("You are not allowed to update this post");
        }

    } catch (err) {
        res.status(500).json(err);
    }
})

// update a post
router.put("/:id", authUser, async (req, res) => {
    try {
        const currPost = await Post.findById(req.params.id);
        if (currPost.userId === req.user.userId) {
            await currPost.updateOne({ $set: req.body })
            return res.status(200).json("The  post has been updated");
        } else {
            return res.status(403).json("You are not allowed to update this post");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
})

// delete a post
router.put("/:id/delete", authUser, async (req, res) => {
    try {
        const currPost = await Post.findById(req.params.id);
        if (req.body.userId === req.user.userId && currPost.userId === req.body.userId) {
            if (currPost.image && currPost.image !== "") {
                const params = {
                    Bucket: BUCKET_NAME,
                    Key: `social-web-app/public/posts/${req.params.id}-image`
                }
                const command = new DeleteObjectCommand(params);
                // const result = await s3.send(command);
                // console.log(result);
                s3.send(command)
                    .catch(err => {
                        console.log(err);
                        return res.status(403).json("The post isn't deleted");
                    })
            }
            await Comment.deleteMany({ postId: currPost._id });
            await currPost.deleteOne();
            return res.status(200).json("The  post has been deleted");

        } else {
            return res.status(403).json("You are not allowed to delete this post");

        }
    } catch (err) {
        console.log(err, "catch");
        return res.status(500).json(err);
    }
})

// get a post
router.get("/:id", async (req, res) => {
    try {
        const currPost = await Post.findById(req.params.id);
        return res.status(200).json(currPost);
    } catch (err) {
        return res.status(500).json(err);
    }
})


// like or unlike a post
router.put("/:id/like", authUser, async (req, res) => {
    try {
        const currPost = await Post.findById(req.params.id);
        if (!currPost.likes.includes(req.user.userId)) {
            await currPost.updateOne({ $push: { likes: req.body.userId } })
            return res.status(200).json("liked successfully");
        }
        else {
            await currPost.updateOne({ $pull: { likes: req.body.userId } })
            return res.status(200).json("like removed successfully");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
})

// comment in a post
router.post("/:id/comment", authUser, async (req, res) => {
    try {
        
        const currPost = await Post.findById(req.params.id);
        const newComment = new Comment({
            userId: req.user.userId,
            postId: req.params.id,
            comment: req.body.comment,
        });
        const savedComment = await newComment.save();
        await currPost.updateOne({ $push: { comments: savedComment._id } })
        return res.status(200).json(savedComment);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// get a comment
router.get("/:id/comment/:comment", async (req, res) => {
    try {
        const currComment = await Comment.findById(req.params.comment);
        if (currComment.postId === req.params.id) {
            return res.status(200).json(currComment);
        } else {
            return res.status(403).json("this comment doesn't belong to this post");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
})

// update a comment
router.put("/:id/comment/:comment",authUser, async (req, res) => {
    try {
        // const currPost = await Post.findById(req.params.id);
   
        const currComment = await Comment.findById(req.params.comment);
        if (currComment.postId === req.params.id) {
            if (currComment.userId === req.user.userId) {
                await currComment.updateOne({ $set: { comment: req.body.comment } });
                return res.status(200).json("comment updated successfully");
            }
            else {
                return res.status(403).json("You can only edit your own commnets");
            }
        }
        else {
            return res.status(403).json("this comment doesn't belong to this post");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
})

// delete a comment
router.put("/:id/comment/:comment/delete",authUser, async (req, res) => {
    try {
        const currPost = await Post.findById(req.params.id);
        const currComment = await Comment.findById(req.params.comment);
        if (currComment.postId === req.params.id) {
            if (currComment.userId === req.user.userId || currPost.userId === req.user.userId) {
                let temp = currPost.comments.filter(items => items != req.params.comment);
                await currPost.updateOne({ $set: { comments: temp } })
                await currComment.deleteOne();
                return res.status(200).json("comment deleted successfully");
            }
            else {
                return res.status(403).json("You can only delete your own commnets");
            }
        }
        else {
            return res.status(403).json("this comment doesn't belong to this post");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
})

// get all comments in a post
router.get("/:id/comments/all", async (req, res) => {
    try {
        // const currPost = await Post.findById(req.params.id);
        const allComments = await Comment.find({ postId: req.params.id })
        return res.status(200).json(allComments);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currUser.userId });
        return res.status(200).json(userPosts);
    } catch (err) {
        return res.status(500).json(err);
    }
})
router.get("/feed/:userId", async (req, res) => {
    try {
        const currUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: req.params.userId });
        const followingPosts = await Promise.all(
            currUser.followings.map(fId => {
                return Post.find({ userId: fId });
            })
        )
        return res.status(200).json(userPosts.concat(...followingPosts));
    } catch (err) {
        return res.status(500).json(err);
    }

})

module.exports = router;