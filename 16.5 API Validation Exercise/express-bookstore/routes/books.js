const express = require("express");
const Book = require("../models/book");

const router = new express.Router();

const jsonSchema = require("jsonschema");
const bookSchema = require("../bookSchema.json");
const ExpressError = require("../expressError");

/** GET / => {books: [book, ...]}  */

router.get("/", async function (req, res, next) {
	try {
		const books = await Book.findAll(req.query);
		return res.json({ books });
	} catch (err) {
		return next(err);
	}
});

/** GET /[id]  => {book: book} */

router.get("/:id", async function (req, res, next) {
	try {
		const book = await Book.findOne(req.params.id);
		return res.json({ book });
	} catch (err) {
		return next(err);
	}
});

/** POST /   bookData => {book: newBook}  */

router.post("/", async function (req, res, next) {
	try {
		// Validate request body against schema
		const result = jsonSchema.validate(req.body, bookSchema);

		// Handle validation failed
		if (!result.valid) {
			// Get all the validation errors
			const errors = [];

			result.errors.forEach((error) => {
				let errorMessage = "";

				if (error.name === "required") {
					errorMessage = "Missing required fields";
				}

				if (error.property === "instance.isbn") {
					errorMessage = "Invalid ISBN";
				} else if (error.property === "instance.amazon_url") {
					errorMessage = "Invalid Amazon URL";
				} else if (error.property === "instance.author") {
					errorMessage = "Author must be provided";
				} else if (error.property === "instance.language") {
					errorMessage = "Language must be valid (e.g., 'en', 'es')";
				} else if (error.property === "instance.pages") {
					errorMessage = "Pages must be a positive integer";
				} else if (error.property === "instance.publisher") {
					errorMessage = "Publisher must be provided";
				} else if (error.property === "instance.title") {
					errorMessage = "Title must be provided";
				} else if (error.property === "instance.year") {
					errorMessage = "Year must be a valid integer";
				}

				if (errorMessage && !errors.includes(errorMessage)) {
					errors.push(errorMessage);
				}
			});

			// Create error with all validation messages
			return next(new ExpressError(errors, 400));
		}

		// If validation succeeded, create book
		const book = await Book.create(req.body);
		return res.status(201).json({ book });
	} catch (err) {
		return next(err);
	}
});

/** PUT /[isbn]   bookData => {book: updatedBook}  */

router.put("/:isbn", async function (req, res, next) {
	try {
		// Validate the ISBN has not changed in the request body
		if ("isbn" in req.body && req.body.isbn !== req.params.isbn) {
			return next(new ExpressError("Cannot change ISBN", 400));
		}

		// Validate request body against schema
		const result = jsonSchema.validate(req.body, bookSchema);

		// Handle validation failed
		if (!result.valid) {
			// Get all the validation errors
			const errors = [];

			result.errors.forEach((error) => {
				let errorMessage = "";

				if (error.name === "required") {
					errorMessage = "Missing required fields";
				}

				if (error.property === "instance.isbn") {
					errorMessage = "Invalid ISBN";
				} else if (error.property === "instance.amazon_url") {
					errorMessage = "Invalid Amazon URL";
				} else if (error.property === "instance.author") {
					errorMessage = "Author must be provided";
				} else if (error.property === "instance.language") {
					errorMessage = "Language must be valid (e.g., 'en', 'es')";
				} else if (error.property === "instance.pages") {
					errorMessage = "Pages must be a positive integer";
				} else if (error.property === "instance.publisher") {
					errorMessage = "Publisher must be provided";
				} else if (error.property === "instance.title") {
					errorMessage = "Title must be provided";
				} else if (error.property === "instance.year") {
					errorMessage = "Year must be a valid integer";
				}

				if (errorMessage && !errors.includes(errorMessage)) {
					errors.push(errorMessage);
				}
			});

			// Create error with all validation messages
			return next(new ExpressError(errors, 400));
		}

		// If validation succeeded, update book
		const book = await Book.update(req.params.isbn, req.body);
		return res.json({ book });
	} catch (err) {
		return next(err);
	}
});

/** PATCH /[isbn]   bookData => {book: updatedBook}  */

router.patch("/:isbn", async function (req, res, next) {
	try {
		// Validate the ISBN has not changed in the request body
		if ("isbn" in req.body && req.body.isbn !== req.params.isbn) {
			return next(new ExpressError("Cannot change ISBN", 400));
		}

		// Validate request body against schema
		const result = jsonSchema.validate(req.body, bookSchema);

		// Handle validation failed
		if (!result.valid) {
			// Get all the validation errors
			const errors = [];

			result.errors.forEach((error) => {
				let errorMessage = "";

				if (error.name === "required") {
					errorMessage = "Missing required fields";
				}

				if (error.property === "instance.isbn") {
					errorMessage = "Invalid ISBN";
				} else if (error.property === "instance.amazon_url") {
					errorMessage = "Invalid Amazon URL";
				} else if (error.property === "instance.author") {
					errorMessage = "Author must be provided";
				} else if (error.property === "instance.language") {
					errorMessage = "Language must be valid (e.g., 'en', 'es')";
				} else if (error.property === "instance.pages") {
					errorMessage = "Pages must be a positive integer";
				} else if (error.property === "instance.publisher") {
					errorMessage = "Publisher must be provided";
				} else if (error.property === "instance.title") {
					errorMessage = "Title must be provided";
				} else if (error.property === "instance.year") {
					errorMessage = "Year must be a valid integer";
				}

				if (errorMessage && !errors.includes(errorMessage)) {
					errors.push(errorMessage);
				}
			});

			// Create error with all validation messages
			return next(new ExpressError(errors, 400));
		}

		// Find the existing book by ISBN
		const book = await Book.findOne(req.params.isbn);
		if (!book) {
			return next(new ExpressError(`No book found with ISBN '${req.params.isbn}'`, 404));
		}

		// Merge the existing book with the updates provided in the body
		const updatedBook = { ...book, ...req.body };

		// Use the update function to update the book data
		const updatedBookInDb = await Book.update(req.params.isbn, updatedBook);

		return res.json({ book: updatedBookInDb });
	} catch (err) {
		return next(err);
	}
});

/** DELETE /[isbn]   => {message: "Book deleted"} */

router.delete("/:isbn", async function (req, res, next) {
	try {
		await Book.remove(req.params.isbn);
		return res.json({ message: "Book deleted" });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
