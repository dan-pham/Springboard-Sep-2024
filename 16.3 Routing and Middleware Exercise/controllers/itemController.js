// In-memory approach with fakeDb
const Item = require("../models/item");
const FakeDbItemStore = require("../models/fakeDbItemStore");
const store = new FakeDbItemStore();

// GET /items
const getItems = (req, res) => {
	const items = store.getAllItems();
	res.json(items);
};

// POST /items
const addItem = (req, res) => {
	const { name, price } = req.body;
	if (!name || price === undefined) {
		return res.status(400).json({ error: "Name and price are required" });
	}

	const newItem = new Item(name, price);
	store.addItem(newItem);

	res.status(201).json({ added: newItem });
};

// GET /items/:name
const getItemByName = (req, res) => {
	const { name } = req.params;
	const item = store.getItemByName(name);

	if (!item) {
		return res.status(404).json({ error: "Item not found" });
	}

	res.json(item);
};

// PATCH /items/:name
const updateItem = (req, res) => {
	const { name } = req.params;
	const { name: updatedName, price: updatedPrice } = req.body;

	const item = store.getItemByName(name);

	if (!item) {
		return res.status(404).json({ error: "Item not found" });
	}

	const updatedItem = new Item(updatedName, updatedPrice);

	const success = store.updateItem(name, updatedItem);

	if (!success) {
		return res.status(500).json({ error: "Failed to update item" });
	}

	res.json({ updated: updatedItem });
};

// DELETE /items/:name
const deleteItem = (req, res) => {
	const { name } = req.params;
	const success = store.deleteItem(name);

	if (!success) {
		return res.status(404).json({ error: "Item not found" });
	}

	res.json({ message: "Deleted" });
};

module.exports = {
	getItems,
	addItem,
	getItemByName,
	updateItem,
	deleteItem,
};
