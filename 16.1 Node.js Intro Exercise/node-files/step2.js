// Import the filesystem module
const fs = require("fs");
const process = require("process");
const axios = require("axios");

// Define the 'cat' function to read the file at the specified path
function cat(path) {
	// Try reading the file
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			// If there's an error, print it out and exit with error code 1
			console.error(`Error reading ${path}: ${err}`);
			process.exit(1);
		} else {
			// Print out the data
			console.log(data);
		}
	});
}

// Define the 'webCat' function to read the page at the specified URL
async function webCat(url) {
	// Try getting the URL
	axios
		.get(url)
		.then((response) => {
			// Print out the data
			console.log(response.data);
		})
		.catch((err) => {
			// If there's an error, print it out and exit with error code 1
			console.error(`Error fetching ${url}: ${err}`);
			process.exit(1);
		});
}

// Check if input is a URL
const input = process.argv[2];
const isUrl = input.startsWith("http://") || input.startsWith("https://");

if (isUrl) {
	webCat(input);
} else {
	cat(input);
}
