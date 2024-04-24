import { cleanup, screen } from "@testing-library/react";
import { useContext } from "react";
import { afterEach, expect, it } from "vitest";
import { ThemeContext, ThemeProvider } from "./ThemeContext";
import { setup } from "./testUtils";

function DisplayTheme() {
	const { theme } = useContext(ThemeContext);
	return <p>Current theme is {theme}</p>;
}

function UpdateTheme() {
	const { update } = useContext(ThemeContext);
	return (
		<>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button onClick={update}>toggle theme</button>
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
		</ThemeProvider>,
	);

	expect(screen.getByText("Current theme is light")).not.toBeUndefined();
});

it("toggle light to dark", async () => {
	const { user } = setup(
		<ThemeProvider>
			<DisplayTheme />
			<UpdateTheme />
		</ThemeProvider>,
	);

	await user.click(screen.getByRole("button"));

	expect(screen.getByText("Current theme is dark")).not.toBeUndefined();
});
