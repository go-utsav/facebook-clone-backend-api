var express = require("express");
var router = express.Router();

const { createPost, deletePost } = require("./../controller/postController");
const {
    addComment,
    deleteComment,
} = require("./../controller/commentsController");
const { feed } = require("./../controller/feedController");
const authMiddleware = require("./../util/middleware/authMiddleware");

/* GET users listing. */

router.get("/feed", feed);
router.post("/post/create", authMiddleware, createPost);
router.delete("/post/delete/:id", authMiddleware, deletePost);
router.post("/comment/create", authMiddleware, addComment);
router.delete("/comment/delete/:id", authMiddleware, deleteComment);

module.exports = router;
