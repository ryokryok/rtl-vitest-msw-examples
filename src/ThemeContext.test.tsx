import { it, expect, afterEach } from "vitest";
import { screen, cleanup } from "@testing-library/react";
import { useContext } from "react";
import { setup } from "./testUtils";
import { ThemeContext, ThemeProvider } from "./ThemeContext";

function DisplayTheme() {
  const { theme } = useContext(ThemeContext);
  return <p data-testid="theme-display">Current theme is {theme}</p>;
}

function UpdateTheme() {
  const { update } = useContext(ThemeContext);
  return (
    <>
      <button data-testid="theme-toggle" onClick={update}>
        toggle theme
      </button>
    </>
  );
}

afterEach(() => {
  cleanup();
});

it("Theme context, initial theme is light", () => {
  setup(
    <ThemeProvider>
      <DisplayTheme />
    </ThemeProvider>
  );

  expect(screen.getByTestId("theme-display").innerHTML).toBe(
    "Current theme is light"
  );
});

it("toggle light to dark", async () => {
  const { user } = setup(
    <ThemeProvider>
      <DisplayTheme />
      <UpdateTheme />
    </ThemeProvider>
  );

  await user.click(screen.getByTestId("theme-toggle"));
  expect(screen.getByTestId("theme-display").innerHTML).toBe(
    "Current theme is dark"
  );
});
