const express = require("express");
const register = require("../controllers/user.controller/register");
const login = require("../controllers/user.controller/login");
const logout = require("../controllers/user.controller/logout");
const addAvatar = require("../controllers/user.controller/add_avatar");
const authMiddleware = require("../middlewares/auth.middleware");
const uploader = require("../middlewares/file_uploader.middleware");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(authMiddleware, logout);
router
  .route("/add-avatar")
  .patch(authMiddleware, uploader.single("avatar"), addAvatar);

module.exports = router;
