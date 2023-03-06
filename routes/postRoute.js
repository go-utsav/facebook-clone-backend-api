var express = require("express");
var router = express.Router();
const multer = require("multer");
// const upload = multer({ dest: 'src/uploads/' });
const { createPost, deletePost, getallpostwithuser } = require("./../controller/postController");
const { addComment, deleteComment } = require("./../controller/commentsController");
const { feed } = require("./../controller/feedController");
const authMiddleware = require("./../util/middleware/authMiddleware");
const { mediaupload, mediaDelete } = require("./../controller/mediaController");
const { unlikepost, likepost } = require("./../controller/likeController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'D:/OFFICE/facebook-api/facebook-app-version-1.1/src/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

/* GET users listing. */
router.get("/feed", feed);
router.post("/post/create", authMiddleware, createPost);
router.delete("/post/delete/:id", authMiddleware, deletePost);
router.post("/comment/create", authMiddleware, addComment);
router.delete("/comment/delete/:id", authMiddleware, deleteComment);
router.post('/post/media/upload/:id', authMiddleware, upload.single('media'), mediaupload);
router.delete('/post/media/delete/:id', authMiddleware, mediaDelete);
router.get("/post/:id", getallpostwithuser);
router.get("/post/like/:id", authMiddleware, likepost);
router.get("/post/unlike/:id", authMiddleware, unlikepost);


module.exports = router;
