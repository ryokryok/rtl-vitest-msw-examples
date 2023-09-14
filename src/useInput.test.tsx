import { ChangeEvent, ReactElement, useCallback, useState } from "react";
import { describe, test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

const setup = (jsx: ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
    input: screen.getByRole<HTMLInputElement>("textbox"),
  };
};

afterEach(() => {
  cleanup();
});

describe("useInput", () => {
  test("initial value is empty", () => {
    const { input } = setup(<Input initialValue="" />);
    expect(input.value).toBe("");
  });

  test("initial value is hello", () => {
    const { input } = setup(<Input initialValue="hello" />);
    expect(input.value).toBe("hello");
  });

  test("update input", async () => {
    const { user, input } = setup(<Input initialValue="" />);
    await user.type(input, "aaa");
    expect(input.value).toBe("aaa");
  });
});
