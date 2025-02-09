export const format = (name) => {
	return name
		.split(" ")
		.map(
			(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		)
		.join(" ");
};
