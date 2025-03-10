import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 4173,
		host: true,
		allowedHosts: ["cms.infolasers.ru"]
	}
});
