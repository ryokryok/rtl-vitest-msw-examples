import { it, expect, afterEach, beforeAll, afterAll, describe } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { rest, RestHandler } from "msw";
import { setupServer } from "msw/node";
import { User, fetchUser } from "./User";

describe("Success pattern", () => {
	const successHandler: RestHandler = rest.get(
		"https://jsonplaceholder.typicode.com/users/:userId",
		(req, res, ctx) => {
			const { userId } = req.params;
			if (userId === "1") {
				return res(
					ctx.status(200),
					ctx.json({
						id: 1,
						name: "John Doe",
						username: "jd",
					}),
				);
			} else {
				return res(
					ctx.status(404),
					ctx.json({
						message: "Not Found",
					}),
				);
			}
		},
	);

	const successServer = setupServer(successHandler);

	beforeAll(() => {
		successServer.listen();
	});
	afterEach(() => {
		cleanup();
		successServer.resetHandlers();
	});
	afterAll(() => {
		successServer.close();
	});
	it("fetchUser return user data", async () => {
		const result = await fetchUser("1");
		expect(result).toEqual({
			id: 1,
			name: "John Doe",
			username: "jd",
		});
	});
	it("User ID:1, John Doe, jd", async () => {
		render(<User id="1" />);

		// check loading text
		expect(screen.getByText("Loading...")).not.toBeUndefined();

		// show user info
		expect(await screen.findByText("John Doe")).not.toBeUndefined();
		expect(await screen.findByText("jd")).not.toBeUndefined();
	});
});

describe("Failed pattern", () => {
	const failedHandler: RestHandler = rest.get(
		"https://jsonplaceholder.typicode.com/users/:userId",
		(_, res, ctx) => {
			return res(
				ctx.status(404),
				ctx.json({
					message: "Not Found",
				}),
			);
		},
	);

	const failedServer = setupServer(failedHandler);

	beforeAll(() => {
		failedServer.listen();
	});
	afterEach(() => {
		cleanup();
		failedServer.resetHandlers();
	});
	afterAll(() => {
		failedServer.close();
	});

	it("fetchUser throws error", async () => {
		await expect(fetchUser("1")).rejects.toThrowError();
	});
	it("User, network error", async () => {
		render(<User id="1" />);

		// check loading text
		expect(screen.getByText("Loading...")).not.toBeUndefined();

		// show not found
		expect(await screen.findByText("Not Found")).not.toBeUndefined();
	});
});
