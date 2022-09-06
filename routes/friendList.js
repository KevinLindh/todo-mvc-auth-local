const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, userController.getUserInfo);
router.put("/addfriend", userController.addFriend);
router.put("/pokefriend", userController.pokeFriend);
router.delete("/deleteFriend", userController.deleteFriend);

module.exports = router;
