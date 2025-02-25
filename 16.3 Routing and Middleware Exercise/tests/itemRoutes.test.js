const request = require("supertest");
const app = require("../app");

const Item = require("../models/item");
const items = require("../database/fakeDb");

// Reset in-memory store before each test
beforeEach(() => {
	items.length = 0;
});

// GET /items
describe("GET /items", () => {
	it("should return an empty array when no items are in the list", async () => {
		const response = await request(app).get("/items");
		expect(response.status).toBe(200);
		expect(response.body).toEqual([]);
	});

	it("should return a list of items", async () => {
		items.push(new Item("popsicle", 1.45), new Item("cheerios", 3.4));

		const response = await request(app).get("/items");

		expect(response.status).toBe(200);
		expect(response.body).toEqual([
			{ name: "popsicle", price: 1.45 },
			{ name: "cheerios", price: 3.4 },
		]);
	});
});

// POST /items
describe("POST /items", () => {
	it("should add a new item", async () => {
		const newItem = { name: "popsicle", price: 1.45 };

		const response = await request(app)
			.post("/items")
			.send(newItem)
			.set("Content-Type", "application/json");

		expect(response.status).toBe(201);
		expect(response.body.added).toEqual(newItem);
		expect(items.length).toBe(1);
		expect(items[0] instanceof Item).toBe(true);
	});
});

// PATCH /items/:name
describe("PATCH /items/:name", () => {
	it("should update an existing item", async () => {
		items.push(new Item("popsicle", 1.45));

		const response = await request(app)
			.patch("/items/popsicle")
			.send({ name: "new popsicle", price: 2.45 })
			.set("Content-Type", "application/json");

		expect(response.status).toBe(200);
		expect(response.body.updated).toEqual({ name: "new popsicle", price: 2.45 });
		expect(items[0] instanceof Item).toBe(true);
	});

	it("should return 404 if the item to update is not found", async () => {
		const response = await request(app)
			.patch("/items/non-existing-item")
			.send({ name: "non-existent", price: 5.0 })
			.set("Content-Type", "application/json");

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("error", "Item not found");
	});
});

// DELETE /items/:name
describe("DELETE /items/:name", () => {
	it("should delete an existing item", async () => {
		items.push(new Item("popsicle", 1.45));

		const response = await request(app).delete("/items/popsicle");

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ message: "Deleted" });
		expect(items.length).toBe(0);
	});

	it("should return 404 if the item to delete is not found", async () => {
		const response = await request(app).delete("/items/non-existing-item");

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("error", "Item not found");
	});
});
