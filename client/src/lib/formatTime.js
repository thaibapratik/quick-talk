function formatTime(timeString) {
	const date = new Date(timeString);
	const options = {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	};
	return date.toLocaleTimeString("en-US", options);
}

export default formatTime;
