import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const Home = () => {
	const { selectedUser } = useChatStore();

	return (
		<div className="h-screen overflow-hidden">
			<div className="h-full pt-16">
				<div className="h-[calc(100vh-4rem)] flex">
					<Sidebar />
					{!selectedUser ? <NoChatSelected /> : <ChatContainer />}
				</div>
			</div>
		</div>
	);
};
export default Home;
