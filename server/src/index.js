import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import messageRoutes from "./routes/message.routes.js";
import { connectDb } from "./lib/db.js";
import { isHttpError } from "http-errors";
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT;

app.use(
	cors({
		origin: [
			"https://quicktalk-thaibapratik.netlify.app",
			"http://localhost:5173",
		],
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	})
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
	res.json({ message: "hello" });
});

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.use("*", (error, req, res, next) => {
	let errorMessage = "An internal error occurred";
	let status = 500;

	if (isHttpError(error)) {
		errorMessage = error.message;
		status = error.status;
	}

	res.status(status).json({ message: errorMessage });
});

connectDb().then(() => {
	server.listen(PORT, () => {
		console.log(`Listening to port ${PORT}`);
	});
});
