import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
	messages: [],
	users: [],
	selectedUser: null,
	isUsersLoading: false,
	isMessagesLoading: false,

	getUsers: async () => {
		set({ isUsersLoading: true });
		try {
			const token = localStorage.getItem("jwt");
			const { data } = await axios.get(
				"https://quick-talk-6e57.onrender.com/api/messages/users/",
				{
					headers: {
						Authorization: token,
					},
				}
			);

			set({ users: data.users });
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		} finally {
			set({ isUsersLoading: false });
		}
	},

	getMessages: async (userId) => {
		set({ isMessagesLoading: true });
		try {
			const token = localStorage.getItem("jwt");
			const { data } = await axios.get(
				`https://quick-talk-6e57.onrender.com/api/messages/chat/${userId}`,
				{
					headers: {
						Authorization: token,
					},
				}
			);

			set({ messages: data.messages });
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		} finally {
			set({ isMessagesLoading: false });
		}
	},

	setSelectedUser: (selectedUser) => set({ selectedUser }),

	sendMessage: async (messageData) => {
		try {
			const { messages, selectedUser } = get();

			const token = localStorage.getItem("jwt");

			const { data } = await axios.post(
				`https://quick-talk-6e57.onrender.com/api/messages/chat/${selectedUser._id}`,
				messageData,
				{
					headers: {
						Authorization: token,
					},
				}
			);

			set({ messages: [...messages, data.message] });
		} catch (error) {
			console.log(error);
			toast.error(error.reponse.data.message);
		}
	},

	subscribeToMessages: () => {
		const { selectedUser } = get();

		if (!selectedUser) return;

		const socket = useAuthStore.getState().socket;

		socket.on("newMessage", (newMessage) => {
			if (newMessage.senderId !== selectedUser._id) return;
			set({ messages: [...get().messages, newMessage] });
		});
	},

	unsubscribeFromMessages: () => {
		const socket = useAuthStore.getState().socket;
		socket.off("newMessage");
	},
}));
