const express = require("express");
const app = express();
const port = 3000;

const saveToFile = require("./saveToFile");

// Helper functions to find mean, median, and mode
const mean = (nums) => {
	const total = nums.reduce((acc, num) => acc + num, 0);
	return total / nums.length;
};

const median = (nums) => {
	nums.sort((a, b) => a - b);
	const mid = Math.floor(nums.length / 2);
	const avgMedian = (nums[mid - 1] + nums[mid]) / 2;
	const evenLength = nums.length % 2 === 0;
	return evenLength ? avgMedian : nums[mid];
};

const mode = (nums) => {
	const frequency = {};
	nums.forEach((num) => (frequency[num] = (frequency[num] || 0) + 1));
	const maxFrequency = Math.max(...Object.values(frequency));
	return Object.keys(frequency)
		.filter((key) => frequency[key] === maxFrequency)
		.map(Number);
};

// Validation
const validateNums = (req, res, next) => {
	const nums = req.query.nums;

	// Check if there an input
	if (!nums) {
		return res.status(400).json({ error: "nums are required." });
	}

	// Check if all inputs are numbers
	const numArray = nums.split(",").map(Number);
	if (numArray.includes(NaN)) {
		const notANumberElement = nums.split(",").find((num) => isNaN(num));
		return res.status(400).json({ error: `${notANumberElement} is not a number.` });
	}

	req.nums = numArray;
	next();
};

// Check Accept header
const sendResponse = (res, acceptHeader, response) => {
	// Check if the Accept header includes 'text/html'
	if (acceptHeader && acceptHeader.includes("text/html")) {
		// Send HTML response
		const htmlResponse = `
        <html>
            <body>
                <p>${response.operation}: ${response.value}</p>
            </body>
        </html>
    `;

		res.send(htmlResponse);
	} else {
		// Default to JSON response
		res.json(response);
	}
};

// Routes
app.get("/mean", validateNums, async (req, res) => {
	const result = mean(req.nums);
	const response = { operation: "mean", value: result };
	const save = req.query.save;
	const acceptHeader = req.get("Accept");

	try {
		await saveToFile(response, "mean", save);
		sendResponse(res, acceptHeader, response);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/median", validateNums, async (req, res) => {
	const result = median(req.nums);
	const response = { operation: "median", value: result };
	const save = req.query.save;
	const acceptHeader = req.get("Accept");

	try {
		await saveToFile(response, "median", save);
		sendResponse(res, acceptHeader, response);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/mode", validateNums, async (req, res) => {
	const result = mode(req.nums);
	const response = { operation: "mode", value: result };
	const save = req.query.save;
	const acceptHeader = req.get("Accept");

	try {
		await saveToFile(response, "mode", save);
		sendResponse(res, acceptHeader, response);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/all", validateNums, async (req, res) => {
	const nums = req.nums;
	const meanResult = mean(nums);
	const medianResult = median(nums);
	const modeResult = mode(nums);
	const save = req.query.save;
	const acceptHeader = req.get("Accept");

	const result = {
		operation: "all",
		mean: meanResult,
		median: medianResult,
		mode: modeResult,
	};

	try {
		await saveToFile(result, "all", save);
		sendResponse(res, acceptHeader, result);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Start the server only if it's not a test environment
if (process.env.NODE_ENV !== "test") {
	app.listen(port, () => {
		console.log(`Server running at http://localhost:${port}`);
	});
}

module.exports = app; // For testing purposes
