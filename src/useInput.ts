import { useState, useCallback, type ChangeEvent } from "react";

export const useInput = (initialValue = "") => {
	const [input, setInput] = useState(initialValue);

	const handler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
		[],
	);

	return { input, handler };
};
