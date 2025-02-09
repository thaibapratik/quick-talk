import createHttpError from "http-errors";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/generateToken.js";
import { format } from "../lib/formatName.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res, next) => {
	try {
		const { fullName, email, password } = req.body;

		if (!fullName || !email || !password) {
			throw createHttpError(401, "All fields are required");
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw createHttpError(401, "User already exists");
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			fullName: format(fullName),
			email,
			password: hashedPassword,
		});

		res.status(201).json({ user, token: generateToken(user._id) });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw createHttpError(401, "All fields are required");
		}

		const user = await User.findOne({ email });
		if (!user) {
			throw createHttpError(401, "Invalid email or password");
		}

		const matchPassword = await bcrypt.compare(password, user.password);

		if (!matchPassword) {
			throw createHttpError(401, "Invalid email or password");
		}

		res.status(201).json({ user, token: generateToken(user._id) });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const updateProfile = async (req, res, next) => {
	try {
		const { profilePic, fullName, password } = req.body;

		const userId = req.userId;

		let uploadResponse;
		let profilePicUrl;

		if (profilePic) {
			uploadResponse = await cloudinary.uploader.upload(profilePic);
			profilePicUrl = uploadResponse.secure_url;
		}

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ profilePic: profilePicUrl, fullName },
			{ new: true }
		);

		res.status(200).json({ user: updatedUser });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const changePassword = async (req, res, next) => {
	try {
		const { password } = req.body;
		const userId = req.userId;
		const hashedPassword = await bcrypt.hash(password, 10);

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ password: hashedPassword },
			{ new: true }
		);

		if (!updatedUser) {
			throw createHttpError(404, "User not found");
		}

		res.status(200).json({ message: "Password changed" });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const deleteAccount = async (req, res, next) => {
	try {
		const { id } = req.params;

		await User.findByIdAndDelete(id);
		res.json({ message: "Deleted" });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const checkAuth = async (req, res) => {
	try {
		res.status(200).json({ user: req.user });
	} catch (error) {
		console.log(error);
		next(error);
	}
};
