import { it, expect, afterEach, beforeAll, afterAll, describe } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { User, fetchUser } from "./User";

const successHandler = rest.get(
  "https://jsonplaceholder.typicode.com/users/1",
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: "John Doe",
        username: "jd",
      })
    );
  }
);

const failedHandler = rest.get(
  "https://jsonplaceholder.typicode.com/users/1",
  (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        message: "Not Found",
      })
    );
  }
);

const successServer = setupServer(successHandler);

const failedServer = setupServer(failedHandler);

describe("Success pattern", () => {
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
    expect(screen.getByTestId("loading-text").innerHTML).toBe("Loading...");

    // show user info
    expect((await screen.findByTestId("user-name")).innerHTML).toBe("John Doe");
    expect((await screen.findByTestId("user-username")).innerHTML).toBe("jd");
  });
});

describe("Failed pattern", () => {
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
    expect(screen.getByTestId("loading-text").innerHTML).toBe("Loading...");

    // show not found
    expect((await screen.findByTestId("error-text")).innerHTML).toBe(
      "Not Found"
    );
  });
});
