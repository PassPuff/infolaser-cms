import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.infolasers.ru/api";
// const API_URL = "https://api.fake-rest.refine.dev";

// Обёртка над fetch для добавления заголовка Authorization
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
	const token = localStorage.getItem("my_access_token");
	const headers = new Headers(options.headers || {});

	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	return fetch(url, { ...options, headers });
};


export const dataProvider: DataProvider = {

	getMany: async ({ resource, ids, meta }) => {
		const params = new URLSearchParams();

		if (ids) {
			ids.forEach((id) => params.append("id", id));
		}

		const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);

		if (response.status < 200 || response.status > 299) throw response;

		const data = await response.json();

		return { data };
	},

	create: async ({ resource, variables, /*meta*/ }) => {
		const response = await fetchWithAuth(`${API_URL}/${resource}`, {
			method: "POST",
			body: JSON.stringify(variables),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status < 200 || response.status > 299) throw response;

		const { data } = await response.json();

		return { data };
	},

	update: async ({ resource, id, variables, /*meta*/ }) => {
		const response = await fetchWithAuth(`${API_URL}/${resource}/${id}`, {
			method: "PATCH",
			body: JSON.stringify(variables),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status < 200 || response.status > 299) throw response;

		const { data } = await response.json();

		return { data };
	},

	getList: async ({ resource, pagination }) => {
		const params = new URLSearchParams();

		if (pagination) {
			params.append("page", pagination.current.toString()); // Используем API параметр page
			params.append("limit", pagination.pageSize.toString()); // Используем API параметр limit
		}

		const response = await fetchWithAuth(`${API_URL}/${resource}?${params.toString()}`);

		if (!response.ok) throw response;

		const { data } = await response.json();


		// console.log(pagination);

		return {
			data: data, // API возвращает массив продуктов внутри data.list
			total: data.pagination.total, // Общее количество записей из API
		};
	},


	getOne: async ({ resource, id, meta }) => {
		const response = await fetchWithAuth(`${API_URL}/${resource}/${id}`);

		if (response.status < 200 || response.status > 299) throw response;

		const { data } = await response.json();

		return { data };
	},
};