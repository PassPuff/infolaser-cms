import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
	logout: async () => {
		localStorage.removeItem("my_access_token");
		// We're returning success: true to indicate that the logout operation was successful.
		return { success: true };
	},
	// login method receives an object with all the values you've provided to the useLogin hook.
	login: async ({ email, password }) => {
		const response = await fetch(
			"https://api.infolasers.ru/user/login",
			{
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		const data = await response.json();


		if (data.success) {
			localStorage.setItem("my_access_token", data.data.token);
			return { success: true };
		}

		return { success: false };
	},
	check: async () => {
		const token = localStorage.getItem("my_access_token");

		return { authenticated: Boolean(token) };
	},
	onError: async (error) => {
		throw new Error("Not implemented");
	},
};