const request = require("supertest");
const app = require("./app");

describe("GET /mean", () => {
	it("should return the mean of the numbers", async () => {
		const response = await request(app).get("/mean?nums=1,2,3,4,5");
		expect(response.status).toBe(200);
		expect(response.body.operation).toBe("mean");
		expect(response.body.value).toBe(3);
	});

	it("should return 400 for invalid number", async () => {
		const response = await request(app).get("/mean?nums=foo,2,3");
		expect(response.status).toBe(400);
		expect(response.body.error).toBe("foo is not a number.");
	});

	it("should return 400 for missing nums", async () => {
		const response = await request(app).get("/mean");
		expect(response.status).toBe(400);
		expect(response.body.error).toBe("nums are required.");
	});
});

describe("GET /median", () => {
	it("should return the median of the numbers", async () => {
		const response = await request(app).get("/median?nums=1,2,3,4,5");
		expect(response.status).toBe(200);
		expect(response.body.operation).toBe("median");
		expect(response.body.value).toBe(3);
	});

	it("should return 400 for invalid number", async () => {
		const response = await request(app).get("/median?nums=foo,2,3");
		expect(response.status).toBe(400);
		expect(response.body.error).toBe("foo is not a number.");
	});

	it("should return 400 for missing nums", async () => {
		const response = await request(app).get("/median");
		expect(response.status).toBe(400);
		expect(response.body.error).toBe("nums are required.");
	});
});

describe("GET /mode", () => {
	it("should return the mode of the numbers", async () => {
		const response = await request(app).get("/mode?nums=1,1,1,2,2,3");
		expect(response.status).toBe(200);
		expect(response.body.operation).toBe("mode");
		expect(response.body.value).toEqual([1]);
	});

	it("should return 400 for invalid number", async () => {
		const response = await request(app).get("/mode?nums=foo,2,3");
		expect(response.status).toBe(400);
		expect(response.body.error).toBe("foo is not a number.");
	});

	it("should return 400 for missing nums", async () => {
		const response = await request(app).get("/mode");
		expect(response.status).toBe(400);
		expect(response.body.error).toBe("nums are required.");
	});
});
