import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: [
			"https://quicktalk-thaibapratik.netlify.app/",
			"http://localhost:5173",
		],
		methods: ["GET", "POST"],
		credentials: true,
		allowedHeaders: ["Content-Type", "Authorization"],
	},
	transports: ["websocket", "polling"],
	pingTimeout: 60000,
});

export const getReceiverSocketId = (userId) => {
	return userSocketMap[userId];
};

//to store online user
const userSocketMap = {};

io.on("connection", (socket) => {
	console.log("User connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId) userSocketMap[userId] = socket.id;

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("User disconnnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { io, server, app };
