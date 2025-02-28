import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {

	getOne: async ({ resource, id }) => {
		const response = await fetch(`${API_URL}/${resource}/${id}`);

		if (response.status < 200 || response.status > 299) {
			throw new Error(response.statusText);
		}

		const data = await response.json();

		return { data };
	},
	update: async ({ resource, id, variables }) => {
		const response = await fetch(`${API_URL}/${resource}/${id}`, {
			method: "PATCH",
			body: JSON.stringify(variables),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status < 200 || response.status > 299) {
			throw new Error(response.statusText);
		}

		const data = await response.json();

		return { data };
	},
	getList: () => {
		throw new Error("Not implemented");
	}

};