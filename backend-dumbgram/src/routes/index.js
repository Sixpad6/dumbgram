const express = require("express");

const router = express.Router();

const { auth } = require ("../middlewares/auth")
const { uploadFile } = require("../middlewares/uploadFile")

// Controller
const {register, login, checkAuth} = require("../controllers/auth")
const { getUser,getUserId, updateUser, deleteUser, getFollowers, getFollowing, addMessage, getMessage } = require("../controllers/users")
const { addFeed, getFeeds, getComment, addComment, getFollowingFeed } = require ("../controllers/feed")



//route
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth",auth, checkAuth);


router.get("/users", getUser)
router.get("/user/:id", getUserId )
router.patch("/user/:id", auth,uploadFile("image") , updateUser)
router.delete("/user/:id", deleteUser)
router.get("/followers/:id", getFollowers )
router.get("/following/:id", getFollowing)
router.post("/message/:id",auth, addMessage)
router.get ("/message-user/:id", auth,getMessage )

router.get ("/feeds", getFeeds)
router.get ("/feed-follow/:id", getFollowingFeed)
router.post("/feed", auth, uploadFile("filename"), addFeed)
router.get("/comments/:id", auth, getComment)
router.post("/comment", auth, addComment)


module.exports = router;