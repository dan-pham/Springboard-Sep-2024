const fs = require("fs");
const path = require("path");

// Define file path
const filePath = path.join(__dirname, "datastore.json");

// Read data from file
const readData = (callback) => {
	fs.readFile(filePath, "utf-8", (err, data) => {
		if (err) {
			console.error("Error reading data from file: ", err);
			return callback([]);
		}

		// Data received, try to parse into JSON
		try {
			const parsedData = JSON.parse(data);
			callback(parsedData);
		} catch (parseError) {
			console.error("Error parsing JSON data:", parseError);
			callback([]);
		}
	});
};

// Write data to file
const writeData = (data, callback) => {
	fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8", (err) => {
		if (err) {
			console.error("Error writing data to file: ", err);
			return callback(err);
		}

		// No error, write successful
		callback(null);
	});
};

module.exports = { readData, writeData };
