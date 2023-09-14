import { FC, forwardRef, ComponentPropsWithRef } from "react";
import { it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const Button: FC<ComponentPropsWithRef<"button">> = forwardRef((props, ref) => (
  <button ref={ref} {...props}>
    {props.children}
  </button>
));

afterEach(() => {
  cleanup();
});

it("Button, display children and function called", async () => {
  const user = userEvent.setup();
  const mockFunction = vi.fn();
  render(<Button onClick={mockFunction}>a</Button>);
  const target = screen.getByRole("button");
  expect(target.innerText).toBe("a");
  await user.click(target);
  expect(mockFunction).toBeCalledTimes(1);
});

it("Button, display children and function called", async () => {
  const user = userEvent.setup();
  const mockFunction = vi.fn();
  render(<Button onClick={mockFunction}>b</Button>);
  const target = screen.getByRole("button");
  expect(target.innerText).toBe("b");
  await user.dblClick(target);
  expect(mockFunction).toBeCalledTimes(2);
});
