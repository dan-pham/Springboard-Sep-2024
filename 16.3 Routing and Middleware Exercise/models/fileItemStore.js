const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../database/datastore.json");

class FileItemStore {
	static async readData() {
		return new Promise((resolve, reject) => {
			fs.readFile(filePath, "utf-8", (err, data) => {
				if (err) reject(err);
				try {
					resolve(JSON.parse(data));
				} catch (parseError) {
					reject(parseError);
				}
			});
		});
	}

	static async writeData(data) {
		return new Promise((resolve, reject) => {
			fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8", (err) => {
				if (err) reject(err);
				resolve();
			});
		});
	}

	static async getAllItems() {
		const items = await FileItemStore.readData();
		return items;
	}

	static async getItemByName(name) {
		const items = await FileItemStore.readData();
		return items.find((item) => item.name === name);
	}

	static async addItem(newItem) {
		const items = await FileItemStore.readData();
		items.push(newItem);
		await FileItemStore.writeData(items);
	}

	static async updateItem(name, updatedData) {
		const items = await FileItemStore.readData();
		const item = items.find((item) => item.name === name);
		if (!item) throw new Error("Item not found");
		item.name = updatedData.name || item.name;
		item.price = updatedData.price || item.price;
		await FileItemStore.writeData(items);
	}

	static async deleteItem(name) {
		const items = await FileItemStore.readData();
		const itemIndex = items.findIndex((item) => item.name === name);
		if (itemIndex === -1) throw new Error("Item not found");
		items.splice(itemIndex, 1);
		await FileItemStore.writeData(items);
	}
}

module.exports = FileItemStore;
