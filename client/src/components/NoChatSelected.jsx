import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
	return (
		<div className="flex-1 flex items-center justify-center bg-base-100">
			<div className="max-w-md text-center p-6 space-y-6">
				<div className="flex justify-center">
					<div className="relative">
						<div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
							<MessageSquare className="w-8 h-8 text-primary" />
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<h2 className="text-2xl font-bold text-base-content">
						Welcome to QuickTalk!
					</h2>
					<p className="text-base-content/60">
						Select a conversation from the sidebar to start chatting
					</p>
				</div>
			</div>
		</div>
	);
};

export default NoChatSelected;
