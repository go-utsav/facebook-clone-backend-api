var express = require('express');
var router = express.Router();
const { signUp, signIn } = require('./../controller/userController');
const { createPost, deletePost } = require('./../controller/postController');
const { addComment, deleteComment } = require('./../controller/commentsController');
const { feed } = require('./../controller/feedController');
const { searchUser } = require('./../controller/searchUserController');
const authMiddleware = require('./../util/middleware/authMiddleware');
const { followUser, unfollowUser } = require('./../controller/followController');

/* GET users listing. */

router.get('/feed', feed);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/createpost', authMiddleware, createPost);
router.post('/deletepost', authMiddleware, deletePost);
router.post('/addcomment', authMiddleware, addComment);
router.post('/deleteComment', authMiddleware, deleteComment);
router.post('/searchuser', authMiddleware, searchUser);
router.post('/follow', authMiddleware, followUser);
router.post('/unfollow', authMiddleware, unfollowUser);


module.exports = router;
