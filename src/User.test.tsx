import { cleanup, render, screen } from "@testing-library/react";
import { http, HttpResponse, type RequestHandler } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { User } from "./User";

describe("Fetch from api", () => {
	const handlers: RequestHandler[] = [
		http.get(
			"https://jsonplaceholder.typicode.com/users/:userId",
			({ params }) => {
				if (params.userId === "1") {
					return HttpResponse.json({ id: 1, name: "John Doe", username: "jd" });
				}
				return new HttpResponse("Not found", { status: 404 });
			},
		),
	];

	const server = setupServer(...handlers);

	beforeAll(() => {
		server.listen();
	});
	afterEach(() => {
		cleanup();
		server.resetHandlers();
	});
	afterAll(() => {
		server.close();
	});

	it("User ID:1, John Doe, jd", async () => {
		render(<User id="1" />);

		// check loading text
		expect(screen.getByText("Loading...")).not.toBeUndefined();

		// show user info
		expect(await screen.findByText("John Doe")).not.toBeUndefined();
		expect(await screen.findByText("jd")).not.toBeUndefined();
	});

	it("User ID:2, Not found error", async () => {
		render(<User id="2" />);

		// check loading text
		expect(screen.getByText("Loading...")).not.toBeUndefined();

		// show not found
		expect(await screen.findByText("Not Found")).not.toBeUndefined();
	});
});
