import express from "express";
import {
	signup,
	login,
	deleteAccount,
	updateProfile,
	checkAuth,
	changePassword,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.delete("/:id", verifyToken, deleteAccount);
router.patch("/profile", verifyToken, updateProfile);
router.put("/change-password", verifyToken, changePassword);

router.get("/check", verifyToken, checkAuth);

export default router;
