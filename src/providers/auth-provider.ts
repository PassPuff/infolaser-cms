import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  onError: async (error) => {
    if (error?.status === 401) {
      const customError = new Error("Unauthorized");

      return {
        logout: true,
        error: customError,
      };
    }

    return {};
  },

  // getIdentity: async () => {
  //   const response = await fetch("https://api.fake-rest.refine.dev/auth/me", {
  //     headers: {
  //       Authorization: localStorage.getItem("my_access_token"),
  //     },
  //   });
  //
  //   if (response.status < 200 || response.status > 299) {
  //     return null;
  //   }
  //
  //   const data = await response.json();
  //
  //   return data;
  // },

  logout: async () => {
    localStorage.removeItem("refine-auth");
    // We're returning success: true to indicate that the logout operation was successful.
    return { success: true };
  },

  login: async ({ email, password }) => {
    const response = await fetch("https://api.infolasers.ru/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("refine-auth", data.data.token);

      return {
        success: true,
        successNotification: {
          message: "Login Successful",
        },
      };
    }

    return { success: false };
  },

  check: async () => {
    const token = localStorage.getItem("refine-auth");

    return { authenticated: Boolean(token) };
  },
};
