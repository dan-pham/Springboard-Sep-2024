/** Command-line tool to generate Markov text. */

const fs = require("fs");
const process = require("process");
const axios = require("axios");
const MarkovMachine = require("./markov"); // require("./bigrams");

// Make Markov Machine
function generateText(text) {
	let mm = new MarkovMachine(text);
	console.log(mm.makeText());
}

// Load text from file
function loadTextFromFile(path) {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			// If there's an error, print it out and exit with error code 1
			console.error(`Cannot read file at ${path}: ${err}`);
			process.exit(1);
		} else {
			// Generate text using data from the file
			generateText(data);
		}
	});
}

// Load text from URL
async function loadTextFromUrl(url) {
	axios
		.get(url)
		.then((response) => {
			// Generate text using data from the URL
			const data = response.data;
			generateText(data);
		})
		.catch((err) => {
			// If there's an error, print it out and exit with error code 1
			console.error(`Error fetching ${url}: ${err}`);
			process.exit(1);
		});
}

// Interpret command line
let [method, path] = process.argv.slice(2);

if (method === "file") {
	loadTextFromFile(path);
} else if (method === "url") {
	loadTextFromUrl(path);
} else {
	console.error(`Unknown method: ${method}`);
	process.exit(1);
}
