const Controller = require("@dotmh/lambda-controller");
const cors = require("..");

const event = require("./event.mock");
const cb = jest.fn(() => null);

describe("cors", () => {
	let controller;

	beforeEach(() => {
		controller = new Controller(event, {}, cb);
	});

	it("should add the cors api to a controller", () => {
		expect(controller.cors).toBeUndefined();
		expect(controller.corsOptions).toBeUndefined();

		controller.add(cors());

		expect(controller.cors).toBeInstanceOf(Function);
		expect(controller.corsOptions).toBeInstanceOf(Function);
	});

	describe("isAllowed", () => {
		describe("when config allowed is set to *", () => {
			it("should return true", () => {
				controller.add(cors());
				expect(controller.isAllowed()).toBe(true);
			});
		});

		describe("when allowed is set to the same host as the event", () => {
			it("should return true", () => {
				controller.add(cors({allowed: "127.0.0.1"}));
				expect(controller.isAllowed()).toBe(true);
			});
		});

		describe("when allowed is set to an array containing the same host as the event", () => {
			it("should return true", () => {
				controller.add(cors({allowed: ["127.0.0.1"]}));
				expect(controller.isAllowed()).toBe(true);
			});
		});

		describe("when allowed is set to something other than the host in the event", () => {
			it("should return false", () => {
				controller.add(cors({allowed: "somedomain.local"}));
				expect(controller.isAllowed()).toBe(false);
			});
		});

		describe("when allowed is set to an array not including the host in the event", () => {
			it("should return false", () => {
				controller.add(cors({allowed: ["somedomain.local"]}));
				expect(controller.isAllowed()).toBe(false);
			});
		});
	});

	describe("cors", () => {
		describe("when allowed is set to match the event origin", () => {
			it("it should add in the cors headers", () => {
				controller.add(cors({allowed: "127.0.0.1"}));
				controller.cors();
				expect(controller.response.headers).toHaveProperty("Access-Control-Allow-Origin", "http://127.0.0.1:8888");
				expect(controller.response.headers).toHaveProperty("Access-Control-Allow-Credentials", "true");
			});
		});

		describe("when allowed is not set to match the event origin", () => {
			it("it should not add the cors headers", () => {
				controller.add(cors({allowed: "somedomain.local"}));
				controller.cors();
				expect(controller.response.headers).not.toHaveProperty("Access-Control-Allow-Origin");
				expect(controller.response.headers).not.toHaveProperty("Access-Control-Allow-Credentials");
			});
		});
	});

	describe("corsOptions", () => {
		it("should add cors headers in for options requests", () => {
			controller.add(cors());
			controller.corsOptions();
			expect(cb).toHaveBeenCalledWith(null, {
				headers: expect.objectContaining({
					"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
				}),
				statusCode: 200,
				body: expect.anything()
			});
		});
	});

	describe("isCorsRequest", () => {
		describe("when option header is in event", () => {
			it("should return true", () => {
				controller.add(cors());
				expect(controller.isCorsRequest()).toBe(true);
			});
		});

		describe("when the origin header is not in the event", () => {
			let nonCorsController;

			beforeEach(() => {
				const noOriginEvent = {...event};
				delete noOriginEvent.headers.origin;
				delete noOriginEvent.multiValueHeaders.origin;
				nonCorsController = new Controller(noOriginEvent, {}, cb);
			});

			it("should return false", () => {
				nonCorsController.add(cors());
				expect(nonCorsController.isCorsRequest()).toBe(false);
			});
		});
	});
});
