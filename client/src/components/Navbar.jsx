import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

const Navbar = () => {
	const { logout, authUser } = useAuthStore();
	const { setSelectedUser } = useChatStore();
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className="fixed w-full top-0 z-40 bg-base-100/80 backdrop-blur-md border-b border-base-200/50">
			<div className="h-16 px-4 flex items-center justify-between max-w-[1920px] mx-auto">
				{/* Logo */}
				<Link
					to="/"
					className="flex items-center gap-3 hover:opacity-80 transition-all duration-200"
				>
					<div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
						<MessageSquare className="size-5 text-primary" />
					</div>
					<div className="flex flex-col">
						<span className="text-lg font-semibold leading-tight">
							QuickTalk
						</span>
					</div>
				</Link>

				{/* Profile Dropdown - Only show when user is logged in */}
				{authUser && (
					<div className="relative" ref={dropdownRef}>
						<button
							onClick={() => setShowDropdown(!showDropdown)}
							className="flex items-center gap-2 group"
						>
							<div className="size-11 rounded-full ring-2 ring-base-200 overflow-hidden hover:ring-base-300 transition-all duration-200">
								{authUser.profilePic ? (
									<img
										src={authUser.profilePic}
										alt="profile"
										className="w-full h-full object-cover cursor-pointer"
									/>
								) : (
									<div className="w-full h-full bg-base-200 flex items-center justify-center">
										<User className="size-5 text-base-content/70" />
									</div>
								)}
							</div>
						</button>

						{/* Dropdown Menu */}
						{showDropdown && (
							<div className="absolute right-0 mt-2 w-48 rounded-xl bg-base-100 shadow-lg border border-base-200 overflow-hidden">
								<div className="p-3 border-b border-base-200">
									<p className="font-medium truncate">
										{authUser.fullName}
									</p>
									<p className="text-sm text-base-content/60 truncate">
										{authUser.email}
									</p>
								</div>

								<div className="p-1">
									<Link
										to="/profile"
										className="flex items-center gap-2 w-full p-2 hover:bg-base-200 rounded-lg transition-colors"
										onClick={() => setShowDropdown(false)}
									>
										<User className="size-4" />
										<span>Profile</span>
									</Link>

									<Link
										to="/settings"
										className="flex items-center gap-2 w-full p-2 hover:bg-base-200 rounded-lg transition-colors"
										onClick={() => setShowDropdown(false)}
									>
										<Settings className="size-4" />
										<span>Settings</span>
									</Link>

									<button
										onClick={() => {
											setShowDropdown(false);
											logout();
											setSelectedUser(null);
										}}
										className="flex items-center gap-2 w-full p-2 hover:bg-error/10 text-error rounded-lg transition-colors"
									>
										<LogOut className="size-4" />
										<span>Logout</span>
									</button>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</header>
	);
};
export default Navbar;
