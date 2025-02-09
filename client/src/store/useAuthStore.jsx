import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useChatStore } from "./useChatStore";

const BASE_URL = "http://localhost:4000";

export const useAuthStore = create((set, get) => ({
	authUser: null,
	isCheckingAuth: true,
	isSigningUp: false,
	isLoggingIn: false,
	isLoggingOut: false,
	isUpdatingProfile: false,
	onlineUsers: [],
	socket: null,

	checkAuth: async () => {
		try {
			const token = localStorage.getItem("jwt");

			const { data } = await axios.get(`${BASE_URL}/api/users/check`, {
				headers: { Authorization: token },
			});
			set({ authUser: data.user });

			get().connectSocket();
		} catch (error) {
			console.log(error);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	signup: async (userInfo) => {
		try {
			set({ isSigningUp: true });
			const { data } = await axios.post(
				`${BASE_URL}/api/users/signup`,
				userInfo
			);

			localStorage.setItem("jwt", data.token);
			set({ authUser: data.user });
			toast.success("Signed In successfully");

			get().connectSocket();
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		} finally {
			set({ isSigningUp: false });
		}
	},

	login: async (userInfo) => {
		try {
			set({ isLoggingIn: true });

			const { data } = await axios.post(
				`${BASE_URL}/api/users/login`,
				userInfo
			);

			localStorage.setItem("jwt", data.token);
			set({ authUser: data.user });
			toast.success("Logged In successfully");

			get().connectSocket();
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		} finally {
			set({ isLoggingIn: false });
		}
	},

	logout: async () => {
		try {
			set({ isLoggingOut: true });
			localStorage.clear("jwt");
			set({ authUser: null });
			get().disconnectSocket();
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		} finally {
			set({ isLoggingOut: false });
		}
	},

	updateProfile: async (userInfo) => {
		try {
			set({ isUpdatingProfile: true });

			const token = localStorage.getItem("jwt");

			console.log(token);
			console.log(userInfo);

			const { data } = await axios.patch(
				`${BASE_URL}/api/users/profile`,
				userInfo,
				{
					headers: {
						Authorization: token,
					},
				}
			);

			console.log(data);

			set({ authUser: data.user });
			toast.success("Profile updated successfully");
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		} finally {
			set({ isUpdatingProfile: false });
		}
	},

	connectSocket: () => {
		const { authUser } = get();

		if (!authUser || get().socket?.connected) return;
		const socket = io(BASE_URL, {
			query: {
				userId: authUser._id,
			},
		});

		socket.connect();
		set({ socket: socket });

		socket.on("getOnlineUsers", (userIds) => {
			set({ onlineUsers: userIds });
		});
	},

	disconnectSocket: () => {
		if (get().socket?.connected) get().socket.disconnect();
	},
}));
