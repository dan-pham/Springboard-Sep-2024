// Testing environment
process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

// Clean up database before testing
beforeAll(async () => {
	// Mock console.error to suppress logs during tests
	console.error = jest.fn();

	await db.query("DELETE FROM books");
});

// After each test, clear the database
afterEach(async () => {
	await db.query("DELETE FROM books");
});

// Close the database connection after all tests are done
afterAll(async () => {
	// Restore console.error after tests complete
	console.error.mockRestore();

	await db.end();
});

describe("Test book routes", () => {
	// Test POST with valid data
	it("should create a new book with valid data", async () => {
		const newBook = {
			isbn: "9781234567890",
			amazon_url: "https://amazon.com/book",
			author: "John Doe",
			language: "en",
			pages: 350,
			publisher: "Some Publisher",
			title: "Some Book Title",
			year: 2021,
		};

		const response = await request(app).post("/books").send(newBook);
		expect(response.status).toBe(201);
		expect(response.body.book.isbn).toBe(newBook.isbn);
		expect(response.body.book.author).toBe(newBook.author);
	});

	// Test POST with invalid ISBN
	it("should return an error for invalid ISBN", async () => {
		const invalidBook = {
			isbn: "12345", // Invalid ISBN (too short)
			amazon_url: "https://amazon.com/book",
			author: "John Doe",
			language: "en",
			pages: 350,
			publisher: "Some Publisher",
			title: "Some Book Title",
			year: 2021,
		};

		const response = await request(app).post("/books").send(invalidBook);
		expect(response.status).toBe(400);
		expect(response.body.message).toContain("Invalid ISBN");
	});

	// Test POST with missing required fields
	it("should return an error if required fields are missing", async () => {
		const incompleteBook = {
			isbn: "9781234567890",
			amazon_url: "https://amazon.com/book",
			author: "John Doe",
			language: "en",
		};

		const response = await request(app).post("/books").send(incompleteBook);
		expect(response.status).toBe(400);
		expect(response.body.message).toContain("Missing required fields");
	});

	// Test GET with all books
	it("should retrieve all books", async () => {
		const response = await request(app).get("/books");
		expect(response.status).toBe(200);
		expect(Array.isArray(response.body.books)).toBe(true);
	});

	// Test GET /:id with new book ISBN
	it("should return a book by ISBN", async () => {
		const book = await Book.create({
			isbn: "9781234567890",
			amazon_url: "https://amazon.com/book",
			author: "John Doe",
			language: "en",
			pages: 350,
			publisher: "Some Publisher",
			title: "Some Book Title",
			year: 2021,
		});

		const response = await request(app).get(`/books/${book.isbn}`);
		expect(response.status).toBe(200);
		expect(response.body.book.isbn).toBe(book.isbn);
		expect(response.body.book.title).toBe(book.title);
	});

	// Test PUT /:isbn to update book successfully
	it("should update a book successfully", async () => {
		const book = await Book.create({
			isbn: "9781234567890",
			amazon_url: "https://amazon.com/book",
			author: "John Doe",
			language: "en",
			pages: 350,
			publisher: "Some Publisher",
			title: "Some Book Title",
			year: 2021,
		});

		const updatedBook = {
			isbn: "9781234567890",
			amazon_url: "https://amazon.com/updated-book",
			author: "John Updated",
			language: "en",
			pages: 400,
			publisher: "Updated Publisher",
			title: "Updated Book Title",
			year: 2022,
		};

		const response = await request(app).put(`/books/${book.isbn}`).send(updatedBook);

		expect(response.status).toBe(200);
		expect(response.body.book.isbn).toBe(book.isbn);
		expect(response.body.book.author).toBe("John Updated");
		expect(response.body.book.year).toBe(2022);
	});

	// Test PUT /:isbn to update book with missing fields
	it("should return an error if missing required fields", async () => {
		const book = await Book.create({
			isbn: "9781234567890",
			amazon_url: "https://amazon.com/book",
			author: "John Doe",
			language: "en",
			pages: 350,
			publisher: "Some Publisher",
			title: "Some Book Title",
			year: 2021,
		});

		const updatedBook = {
			amazon_url: "https://amazon.com/updated-book",
			author: "John Updated",
			language: "en",
			pages: 400,
			publisher: "Updated Publisher",
			title: "Updated Book Title",
			year: 2022,
		};

		const response = await request(app).put(`/books/${book.isbn}`).send(updatedBook);

		expect(response.status).toBe(400);
		expect(response.body.message).toContain("Missing required fields");
	});

	// Test PUT /:isbn with invalid ISBN change
	it("should return an error if ISBN is changed in PUT", async () => {
		const book = await Book.create({
			isbn: "9781234567890",
			amazon_url: "https://amazon.com/book",
			author: "John Doe",
			language: "en",
			pages: 350,
			publisher: "Some Publisher",
			title: "Some Book Title",
			year: 2021,
		});

		const invalidUpdate = {
			isbn: "9789876543210",
			amazon_url: "https://amazon.com/updated-book",
			author: "John Updated",
			language: "en",
			pages: 400,
			publisher: "Updated Publisher",
			title: "Updated Book Title",
			year: 2022,
		};

		const response = await request(app).put(`/books/${book.isbn}`).send(invalidUpdate);
		expect(response.status).toBe(400);
		expect(response.body.message).toContain("Cannot change ISBN");
	});

	// Test DELETE /:isbn to delete book successfully
	it("should delete a book", async () => {
		const book = await Book.create({
			isbn: "9781234567890",
			amazon_url: "https://amazon.com/book",
			author: "John Doe",
			language: "en",
			pages: 350,
			publisher: "Some Publisher",
			title: "Some Book Title",
			year: 2021,
		});

		const response = await request(app).delete(`/books/${book.isbn}`);
		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Book deleted");

		const deletedBookResponse = await request(app).get(`/books/${book.isbn}`);
		expect(deletedBookResponse.status).toBe(404);
	});

	// Test DELETE /:isbn to delete nonexistent book
	it("should return an error if book to delete does not exist", async () => {
		const response = await request(app).delete("/books/9780000000000");
		expect(response.status).toBe(404);
		expect(response.body.message).toContain("There is no book with an isbn");
	});

	// Test PATCH /:isbn to update book successfully
	it("should partially update a book with valid data", async () => {
		const book = await Book.create({
			isbn: "9781234567890",
			amazon_url: "https://amazon.com/old-book",
			author: "John Doe",
			language: "en",
			pages: 200,
			publisher: "Big Publisher",
			title: "Old Book Title",
			year: 2025,
		});

		const updatedBook = {
			...book,
			amazon_url: "https://amazon.com/new-book",
			title: "New Book Title",
		};

		const response = await request(app).patch(`/books/${book.isbn}`).send(updatedBook);

		expect(response.status).toBe(200);
		expect(response.body.book.isbn).toBe(book.isbn);
		expect(response.body.book.amazon_url).toBe("https://amazon.com/new-book");
		expect(response.body.book.title).toBe("New Book Title");
		expect(response.body.book.author).toBe("John Doe");
		expect(response.body.book.year).toBe(2025);
	});

	// Test PATCH /:isbn with invalid ISBN change
	it("should return an error if ISBN is changed in PATCH", async () => {
		const book = await Book.create({
			isbn: "9781234567890",
			amazon_url: "https://amazon.com/old-book",
			author: "John Doe",
			language: "en",
			pages: 200,
			publisher: "Big Publisher",
			title: "Old Book Title",
			year: 2025,
		});

		const invalidBook = {
			...book,
			isbn: "9789876543210",
		};

		const response = await request(app).patch(`/books/${book.isbn}`).send(invalidBook);

		expect(response.status).toBe(400);
		expect(response.body.message).toContain("Cannot change ISBN");
	});
});
