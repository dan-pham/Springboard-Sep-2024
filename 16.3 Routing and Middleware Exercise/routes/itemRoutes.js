const express = require("express");
const router = express.Router();

// Conditionally import the controller based on environment
let itemController;
if (process.env.NODE_ENV === "test") {
	itemController = require("../controllers/itemController");
} else {
	itemController = require("../controllers/fsItemController");
}

// GET /items
router.get("", itemController.getItems);

// POST /items
router.post("", itemController.addItem);

// GET /items/:name
router.get("/:name", itemController.getItemByName);

// PATCH /items/:name
router.patch("/:name", itemController.updateItem);

// DELETE /items/:name
router.delete("/:name", itemController.deleteItem);

module.exports = router;
