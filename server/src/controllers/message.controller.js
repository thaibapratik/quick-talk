import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUserForSidebar = async (req, res, next) => {
	try {
		const loggedInUser = req.userId;
		const filteredUser = await User.find({
			_id: { $ne: loggedInUser },
		}).select("-password");

		res.status(200).json({ users: filteredUser });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const getMessages = async (req, res, next) => {
	try {
		const { id: yourId } = req.params;
		const myId = req.userId;

		const messages = await Message.find({
			$or: [
				{ senderId: myId, receiverId: yourId },
				{ senderId: yourId, receiverId: myId },
			],
		});

		res.status(200).json({ messages });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const sendMessage = async (req, res, next) => {
	try {
		const { text, image } = req.body;

		const { id: receiverId } = req.params;
		const senderId = req.userId;

		let imageUrl;

		if (image) {
			const uploadResponse = await cloudinary.uploader.upload(image);
			imageUrl = uploadResponse.secure_url;
		}

		const newMessage = await Message.create({
			senderId,
			receiverId,
			text,
			image: imageUrl,
		});

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(200).json({ message: newMessage });
	} catch (error) {
		console.log(error);
		next(error);
	}
};
