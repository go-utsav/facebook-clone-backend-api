var express = require("express");
var router = express.Router();
const { signUp, signIn, getuserpost } = require("./../controller/userController");
const { feed } = require("./../controller/feedController");
const { searchUser } = require("./../controller/searchUserController");
const authMiddleware = require("./../util/middleware/authMiddleware");
const {
  followUser,
  unfollowUser,
} = require("./../controller/followController");

/* GET users listing. */

router.get("/feed", feed);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/searchuser", authMiddleware, searchUser);
router.get("/user/follow/:id", authMiddleware, followUser);
router.get("/user/unfollow/:id", authMiddleware, unfollowUser);
router.get("/user/", authMiddleware, getuserpost);

module.exports = router;
