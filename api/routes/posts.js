const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

// create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// update a post
router.put("/:id", async (req, res) => {
    try {
        const currPost = await Post.findById(req.params.id);
        if (currPost.userId === req.body.userId) {
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
router.put("/:id/delete", async (req, res) => {
    try {
        const currPost = await Post.findById(req.params.id);
        if (currPost.userId === req.body.userId) {
            await Promise.all(
                currPost.comments.map(cId => Comment.findByIdAndDelete(cId))
            )
            await currPost.deleteOne();
            return res.status(200).json("The  post has been deleted");
        } else {
            return res.status(403).json("You are not allowed to delete this post");
        }
    } catch (err) {
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
router.put("/:id/like", async (req, res) => {
    try {
        const currPost = await Post.findById(req.params.id);
        if (!currPost.likes.includes(req.body.userId)) {
            await currPost.updateOne({ $push: { likes: req.body.userId } })
            return res.status(200).json("liked successfully");
        }
        else {
            await currPost.updateOne({ $pull: { likes: req.body.userId } })
            return res.status(200).json("unliked successfully");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
})

// comment in a post
router.post("/:id/comment", async (req, res) => {
    try {
        const currPost = await Post.findById(req.params.id);
        const newComment = new Comment({
            userId: req.body.userId,
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
        const currPost = await Post.findById(req.params.id);
        if (currPost.comments.includes(req.params.comment)) {
            const currComment = await Comment.findById(req.params.comment);
            return res.status(200).json(currComment);
        } else {
            return res.status(403).json("this comment doesn't belong to this post");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
})

// update a comment
router.put("/:id/comment/:comment", async (req, res) => {
    try {
        const currPost = await Post.findById(req.params.id);
        if (currPost.comments.includes(req.params.comment)) {
            const currComment = await Comment.findById(req.params.comment);
            if (currComment.userId === req.body.userId) {
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
router.delete("/:id/comment/:comment", async (req, res) => {
    try {
        const currPost = await Post.findById(req.params.id);
        if (currPost.comments.includes(req.params.comment)) {
            const currComment = await Comment.findById(req.params.comment);
            if (currComment.userId === req.body.userId) {
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
        const currPost = await Post.findById(req.params.id);
        const allComments = await Promise.all(
            currPost.comments.map(cId => {
                return Comment.findById(cId);
            })
        )
        return res.status(200).json(allComments);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: req.params.userId });
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