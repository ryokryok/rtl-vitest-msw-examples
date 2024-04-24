import type { UserModel } from "./types";

export const fetchUser = async (userId: string): Promise<UserModel> => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/users/${userId}`,
	);
	if (response.ok || response.status === 200) {
		return response.json();
	}
	throw new Error("fetching error");
};
