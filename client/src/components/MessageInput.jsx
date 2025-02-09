import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";

const MessageInput = () => {
	const [text, setText] = useState("");
	const [imagePreview, setImagePreview] = useState(null);
	const fileInputRef = useRef(null);
	const { sendMessage } = useChatStore();

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (!file.type.startsWith("image/")) {
			toast.error("Please select an image file");
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => setImagePreview(reader.result);
		reader.readAsDataURL(file);
	};

	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!text.trim() && !imagePreview) return;

		try {
			await sendMessage({ text: text.trim(), image: imagePreview });
			setText("");
			setImagePreview(null);
			if (fileInputRef.current) fileInputRef.current.value = "";
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="p-4 bg-base-200/50 border-t border-base-300">
			{imagePreview && (
				<div className="mb-3">
					<div className="relative inline-block">
						<img
							src={imagePreview}
							alt="Preview"
							className="max-h-32 rounded-lg border border-base-300"
						/>
						<button
							onClick={() => setImagePreview(null)}
							className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error"
						>
							<X className="size-3" />
						</button>
					</div>
				</div>
			)}

			<form
				onSubmit={handleSendMessage}
				className="flex items-center gap-2"
			>
				<input
					type="text"
					className="flex-1 input input-bordered focus:outline-none"
					placeholder="Type a message..."
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>

				<input
					type="file"
					accept="image/*"
					className="hidden"
					ref={fileInputRef}
					onChange={handleImageChange}
				/>

				<button
					type="button"
					className="btn btn-circle btn-ghost"
					onClick={() => fileInputRef.current?.click()}
				>
					<Image className="size-5" />
				</button>

				<button
					type="submit"
					className="btn btn-circle btn-primary"
					disabled={!text.trim() && !imagePreview}
				>
					<Send className="size-5" />
				</button>
			</form>
		</div>
	);
};
export default MessageInput;
