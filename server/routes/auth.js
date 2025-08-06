const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", auth, authController.getUser);
router.put("/update", auth, authController.updateUser);
router.delete("/delete", auth, authController.deleteUser);
router.put("/likes", auth, authController.updateLikes);
router.get("/likes", auth, authController.getLikes);

module.exports = router;
