import { ChangeEvent, useCallback, useState } from "react";
import { describe, test, expect, afterEach } from "vitest";
import { screen, cleanup } from "@testing-library/react";
import { setup } from "./testUtils";

const useInput = (initialValue: string = "") => {
  const [input, setInput] = useState(initialValue);

  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
    []
  );

  return { input, handler };
};

type TestConfig = {
  initialValue: string;
};

const Input: React.FC<TestConfig> = ({ initialValue }) => {
  const { input, handler } = useInput(initialValue);
  return <input value={input} onChange={handler} />;
};

afterEach(() => {
  cleanup();
});

describe("useInput", () => {
  test("initial value is empty", () => {
    setup(<Input initialValue="" />);
    const input = screen.getByRole<HTMLInputElement>("textbox");

    expect(input.value).toBe("");
  });

  test("initial value is hello", () => {
    setup(<Input initialValue="hello" />);
    const input = screen.getByRole<HTMLInputElement>("textbox");

    expect(input.value).toBe("hello");
  });

  test("update input", async () => {
    const { user } = setup(<Input initialValue="" />);
    const input = screen.getByRole<HTMLInputElement>("textbox");

    await user.type(input, "aaa");
    expect(input.value).toBe("aaa");
  });
});
