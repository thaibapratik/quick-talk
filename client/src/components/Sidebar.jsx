import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
	const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
		useChatStore();

	const { onlineUsers } = useAuthStore();
	const [showOnlineOnly, setShowOnlineOnly] = useState(false);

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	const filteredUsers = showOnlineOnly
		? users.filter((user) => onlineUsers.includes(user._id))
		: users;

	if (isUsersLoading) return <SidebarSkeleton />;

	return (
		<aside className="w-20 lg:w-80 border-r border-base-300 flex flex-col bg-base-100">
			{/* Header */}
			<div className="p-4 border-b border-base-300">
				<div className="flex items-center gap-2">
					<Users className="size-5" />
					<span className="font-medium hidden lg:block">
						Contacts
					</span>
				</div>

				<div className="mt-4 hidden lg:block">
					<label className="flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							checked={showOnlineOnly}
							onChange={(e) =>
								setShowOnlineOnly(e.target.checked)
							}
							className="checkbox checkbox-sm checkbox-primary"
						/>
						<span className="text-sm">Show online only</span>
						<span className="text-xs text-base-content/60">
							({onlineUsers.length - 1} online)
						</span>
					</label>
				</div>
			</div>

			{/* Contact List */}
			<div className="overflow-y-auto flex-1">
				{filteredUsers.map((user) => (
					<button
						key={user._id}
						onClick={() => setSelectedUser(user)}
						className={`
							w-full p-3 flex items-center gap-3 transition-colors
							hover:bg-base-300/50
							${selectedUser?._id === user._id ? "bg-base-300" : ""}
						`}
					>
						<div className="relative mx-auto lg:mx-0">
							<div className="size-12 rounded-full ring-2 ring-base-300 overflow-hidden">
								<img
									src={user.profilePic || "/avatar.png"}
									alt={user.fullName}
									className="w-full h-full object-cover"
								/>
							</div>
							<span
								className={`absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-base-100
									${onlineUsers.includes(user._id) ? "bg-success" : "bg-base-300"}`}
							/>
						</div>

						<div className="hidden lg:block flex-1 min-w-0">
							<div className="font-medium truncate">
								{user.fullName}
							</div>
							<div className="text-sm text-base-content/60">
								{onlineUsers.includes(user._id)
									? "Online"
									: "Offline"}
							</div>
						</div>
					</button>
				))}

				{filteredUsers.length === 0 && (
					<div className="flex flex-col items-center justify-center h-40 text-base-content/60">
						<Users className="size-8 mb-2 opacity-40" />
						<p className="text-sm">No users found</p>
					</div>
				)}
			</div>
		</aside>
	);
};
export default Sidebar;
