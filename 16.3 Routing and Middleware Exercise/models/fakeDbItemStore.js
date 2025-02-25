const items = require("../database/fakeDb");
const Item = require("../models/item");

class FakeDbItemStore {
	constructor() {
		this.items = items;
	}

	getAllItems() {
		return this.items;
	}

	getItemByName(name) {
		return this.items.find((item) => item.name === name);
	}

	addItem(newItem) {
		if (!(newItem instanceof Item)) {
			throw new Error("Only Item instances can be added to the store");
		}

		this.items.push(newItem);
		return true;
	}

	updateItem(name, updatedItem) {
		if (!(updatedItem instanceof Item)) {
			throw new Error("Only Item instances can be used for updates");
		}

		const index = this.items.findIndex((item) => item.name === name);
		if (index === -1) {
			return false;
		}

		this.items[index] = updatedItem;
		return true;
	}

	deleteItem(name) {
		const index = this.items.findIndex((item) => item.name === name);
		if (index === -1) {
			return false;
		}

		this.items.splice(index, 1);
		return true;
	}
}

module.exports = FakeDbItemStore;
