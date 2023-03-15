const express = require("express");
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    logout, 
    getUser, 
    loginStatus, 
    updateUser, 
    changePassword,
    forgotPassword
} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/logout", logout);
router.get("/get-user", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/update-user", protect, updateUser);
router.patch("/change-password", protect, changePassword);
router.post("/forgot-password", forgotPassword);

module.exports = router;