const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, userController.getUserInfo);
router.put("/", userController.addFriend);
router.delete("/", userController.deleteFriend);

module.exports = router;
