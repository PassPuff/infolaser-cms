import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 4173,
		host: true,
		allowedHosts: ["infolaser-infolasercms-edhcd0-feaa7c-46-101-244-239.traefik.me"]
	}
});
