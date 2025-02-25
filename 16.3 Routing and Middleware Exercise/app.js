const express = require("express");
const app = express();

// Import router
const itemRoutes = require("./routes/itemRoutes");

// Parse JSON requests
app.use(express.json());

// Use router
app.use("/items", itemRoutes);

if (process.env.NODE_ENV !== "test") {
	const PORT = 3000;
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
}

module.exports = app;
