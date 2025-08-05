const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", auth, authController.getUser);
router.put("/update", auth, authController.updateUser);
router.delete("/delete", auth, authController.deleteUser);

module.exports = router;
