import createHttpError from "http-errors";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		if (!token) {
			throw createHttpError(401, "Unauthorized - No token provided");
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			throw createHttpError(401, "Unauthorized - Invalid token");
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			throw createHttpError(404, "User not found");
		}

		req.userId = user._id;
		req.user = user;

		next();
	} catch (error) {
		next(error);
		console.log(error);
	}
};
