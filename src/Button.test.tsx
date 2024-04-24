import { cleanup, screen } from "@testing-library/react";
import { type ComponentPropsWithRef, type FC, forwardRef } from "react";
import { afterEach, expect, it, vi } from "vitest";
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
