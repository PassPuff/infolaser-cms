import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.infolasers.ru/api";
// const API_URL = "https://api.fake-rest.refine.dev";

// Обёртка над fetch для добавления заголовка Authorization
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("refine-auth");
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

  create: async ({ resource, variables /*meta*/ }) => {
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

  update: async ({ resource, id, variables /*meta*/ }) => {
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

  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const params = new URLSearchParams();

    if (pagination?.current && pagination?.pageSize) {
      params.append("page", pagination.current.toString());
      params.append("limit", pagination.pageSize.toString());
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }

    const response = await fetchWithAuth(
      `${API_URL}/${resource}?${params.toString()}`,
    );

    if (!response.ok) throw response;

    const json = await response.json();

    return {
      data: json.data.list ?? [],
      total: json.data.pagination.total,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const response = await fetchWithAuth(`${API_URL}/${resource}/${id}`);

    if (response.status < 200 || response.status > 299) throw response;

    const { data } = await response.json();

    return { data };
  },
};
