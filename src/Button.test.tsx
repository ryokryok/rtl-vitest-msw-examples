import { type FC, forwardRef, type ComponentPropsWithRef } from "react";
import { it, expect, vi, afterEach } from "vitest";
import { screen, cleanup } from "@testing-library/react";
import { setup } from "./testUtils";

const Button: FC<ComponentPropsWithRef<"button">> = forwardRef((props, ref) => (
	<button ref={ref} {...props}>
		{props.children}
	</button>
));

afterEach(() => {
	cleanup();
});

it("Button, display children and function called", async () => {
	const mockFunction = vi.fn();
	const { user } = setup(<Button onClick={mockFunction}>a</Button>);
	const target = screen.getByRole("button");
	expect(target.innerText).toBe("a");
	await user.click(target);
	expect(mockFunction).toBeCalledTimes(1);
});

it("Button, display children and function called", async () => {
	const mockFunction = vi.fn();
	const { user } = setup(<Button onClick={mockFunction}>b</Button>);
	const target = screen.getByRole("button");
	expect(target.innerText).toBe("b");
	await user.dblClick(target);
	expect(mockFunction).toBeCalledTimes(2);
});
