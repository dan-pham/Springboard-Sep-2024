// Import the filesystem module
const fs = require("fs");
const process = require("process");
const axios = require("axios");

// Create helper functions to print in console or write to file
function printToConsole(data) {
	// Print out the data
	console.log(data);
}

function writeToFile(data, filename) {
	// Write data to file with filename
	fs.appendFile(filename, data, "utf8", (err) => {
		if (err) {
			// If there's an error, print it out and exit with error code 1
			console.error(`Error writing ${filename}: ${err}`);
			process.exit(1);
		}
	});
}

function handleOutput(data, outputFile) {
	if (outputFile) {
		writeToFile(data, outputFile);
	} else {
		printToConsole(data);
	}
}

// Define the 'cat' function to read the file at the specified path
function cat(path, outputFile) {
	// Try reading the file
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			// If there's an error, print it out and exit with error code 1
			console.error(`Error reading ${path}: ${err}`);
			process.exit(1);
		} else {
			handleOutput(data, outputFile);
		}
	});
}

// Define the 'webCat' function to read the page at the specified URL
async function webCat(url, outputFile) {
	// Try getting the URL
	axios
		.get(url)
		.then((response) => {
			const data = response.data;
			handleOutput(data, outputFile);
		})
		.catch((err) => {
			// If there's an error, print it out and exit with error code 1
			console.error(`Error fetching ${url}: ${err}`);
			process.exit(1);
		});
}

// Check for --out flag
let outputFile;
let paths = [];

if (process.argv[2] === "--out") {
	outputFile = process.argv[3];
	paths = process.argv.slice(4);
} else {
	paths = process.argv.slice(2);
}

// Iterate over all paths
paths.forEach((path) => {
	// Check if path is a URL
	const isUrl = path.startsWith("http://") || path.startsWith("https://");

	if (isUrl) {
		webCat(path, outputFile);
	} else {
		cat(path, outputFile);
	}
});
