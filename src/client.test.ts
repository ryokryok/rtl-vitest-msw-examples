import { it, expect, afterEach, beforeAll, afterAll, describe } from "vitest";
import { http, HttpResponse, type RequestHandler } from "msw";
import { setupServer } from "msw/node";
import { fetchUser } from "./client";

describe("Fetch from api", () => {
  const handlers: RequestHandler[] = [
    http.get(
      "https://jsonplaceholder.typicode.com/users/:userId",
      ({ params }) => {
        if (params.userId === "1") {
          return HttpResponse.json({ id: 1, name: "John Doe", username: "jd" });
        }
        return new HttpResponse("Not found", { status: 404 });
      }
    ),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
  it("fetchUser return user data", async () => {
    const result = await fetchUser("1");
    expect(result).toEqual({
      id: 1,
      name: "John Doe",
      username: "jd",
    });
  });
  it("fetchUser throws error", async () => {
    await expect(() => fetchUser("2")).rejects.toThrowError(/fetching error/);
  });
});
