import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
	const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
	const { theme } = useThemeStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth && !authUser) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader2 className="size-10 animate-spin" />
			</div>
		);
	}

	return (
		<div data-theme={theme}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						path="/"
						element={authUser ? <Home /> : <Navigate to="/login" />}
					/>
					<Route
						path="/login"
						element={!authUser ? <Login /> : <Navigate to="/" />}
					/>
					<Route
						path="/signup"
						element={!authUser ? <Signup /> : <Navigate to={"/"} />}
					/>
					<Route path="/settings" element={<SettingsPage />} />

					<Route
						path="/profile"
						element={
							authUser ? (
								<ProfilePage />
							) : (
								<Navigate to={"/login"} />
							)
						}
					/>
				</Routes>
			</BrowserRouter>
			<Toaster
				toastOptions={{
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
					},
				}}
			/>
		</div>
	);
};
export default App;
