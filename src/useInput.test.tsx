import { cleanup, screen } from "@testing-library/react";
import type { FC } from "react";
import { afterEach, describe, expect, test } from "vitest";
import { setup } from "./testUtils";
import { useInput } from "./useInput";

type TestConfig = {
	initialValue: string;
};

const Input: FC<TestConfig> = ({ initialValue }) => {
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
