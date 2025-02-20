const fs = require("fs");

const saveToFile = (result, operation, save) => {
	// Handle the "save" query key
	if (save !== "true") return Promise.resolve();

	// Insert a timestamp for every operation that writes to a file
	const timestamp = new Date().toISOString();
	const output = { ...result, timestamp, operation };

	return new Promise((resolve, reject) => {
		// Append the result with timestamp to a file
		fs.writeFile("results.json", JSON.stringify(output) + "\n", (err) => {
			if (err) {
				reject(new Error("Error saving to file."));
			} else {
				resolve();
			}
		});
	});
};

module.exports = saveToFile;
