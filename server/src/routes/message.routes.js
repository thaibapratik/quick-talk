import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
	getMessages,
	getUserForSidebar,
	sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", verifyToken, getUserForSidebar);
router.get("/chat/:id", verifyToken, getMessages);
router.post("/chat/:id", verifyToken, sendMessage);

export default router;
