// File-based approach
const Item = require("../models/item");
const FileItemStore = require("../models/fileItemStore");

// GET /items
const getItems = async (req, res) => {
	try {
		const items = await FileItemStore.getAllItems();
		res.json(items);
	} catch (err) {
		res.status(500).json({ error: "Failed to retrieve items" });
	}
};

// POST /items
const addItem = async (req, res) => {
	const { name, price } = req.body;
	if (!name || !price) {
		return res.status(400).json({ error: "Name and price are required" });
	}

	const newItem = new Item(name, price);

	try {
		await FileItemStore.addItem(newItem);
		res.status(201).json({ added: newItem });
	} catch (err) {
		res.status(500).json({ error: "Failed to save item" });
	}
};

// GET /items/:name
const getItemByName = async (req, res) => {
	const { name } = req.params;

	try {
		const item = await FileItemStore.getItemByName(name);

		if (!item) {
			return res.status(404).json({ error: "Item not found" });
		}

		res.json(item);
	} catch (err) {
		res.status(500).json({ error: "Failed to retrieve items" });
	}
};

// PATCH /items/:name
const updateItem = async (req, res) => {
	const { name } = req.params;
	const { updatedName, updatedPrice } = req.body;

	try {
		const item = await FileItemStore.getItemByName(name);

		if (!item) {
			return res.status(404).json({ error: "Item not found" });
		}

		if (updatedName) {
			item.name = updatedName;
		}
		if (updatedPrice) {
			item.price = updatedPrice;
		}

		await FileItemStore.updateItem(item);
		res.json({ updated: item });
	} catch (err) {
		res.status(500).json({ error: "Failed to update item" });
	}
};

// DELETE /items/:name
const deleteItem = async (req, res) => {
	const { name } = req.params;

	try {
		const success = await FileItemStore.deleteItem(name);

		if (!success) {
			return res.status(404).json({ error: "Item not found" });
		}

		res.json({ message: "Deleted" });
	} catch (err) {
		res.status(500).json({ error: "Failed to delete item" });
	}
};

module.exports = {
	getItems,
	addItem,
	getItemByName,
	updateItem,
	deleteItem,
};
