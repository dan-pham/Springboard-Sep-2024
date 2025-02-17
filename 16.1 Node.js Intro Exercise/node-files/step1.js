// Import the filesystem module
const fs = require("fs");
const process = require("process");

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

cat(process.argv[2]);
