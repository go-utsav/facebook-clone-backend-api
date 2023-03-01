var express = require('express');
var router = express.Router();
const { signUp, signIn } = require('./../controller/userController');
const { createPost, deletePost } = require('./../controller/postController');
const { addComment, deleteComment } = require('./../controller/commentsController');
const jwt = require('jsonwebtoken');

const auth = ((req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verify = jwt.verify(token.toString(), process.env.ACCESS_KEY_TOKEN);
        if (verify) {
            next();
        } else {
            return res.json({
                status: 'error',
                message: 'Unauthorized access'
            })
        }
    } catch (err) {
        console.error(err);
        return res.json({
            status: 'error',
            message: 'internal server error '
        })
    }
});


/* GET users listing. */
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/createpost', auth, createPost);
router.post('/deletepost', auth, deletePost);
router.post('/addcomment', auth, addComment);
router.post('/deleteComment', auth, deleteComment);

module.exports = router;
