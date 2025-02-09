import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
	const { selectedUser, setSelectedUser } = useChatStore();
	const { onlineUsers } = useAuthStore();

	return (
		<div className="p-3 sm:p-4 border-b border-base-300 bg-base-200/50 backdrop-blur supports-[backdrop-filter]:bg-base-200/50">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="avatar">
						<div className="size-8 sm:size-10 rounded-full relative">
							<img
								src={selectedUser.profilePic || "/avatar.png"}
								alt={selectedUser.fullName}
								className="object-cover"
							/>
							<span 
								className={`absolute bottom-0 right-0 size-2 sm:size-3 rounded-full ring-2 ring-base-100 
									${onlineUsers.includes(selectedUser._id) ? "bg-success" : "bg-base-300"}`}
							/>
						</div>
					</div>

					<div>
						<h3 className="font-medium text-sm sm:text-base">
							{selectedUser.fullName}
						</h3>
						<p className="text-xs text-base-content/60">
							{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
						</p>
					</div>
				</div>

				<button
					className="btn btn-ghost btn-sm btn-circle"
					onClick={() => setSelectedUser(null)}
				>
					<X className="size-4 sm:size-5" />
				</button>
			</div>
		</div>
	);
};

export default ChatHeader;
