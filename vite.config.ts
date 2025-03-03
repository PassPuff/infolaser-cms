import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000, // Задаем нужный порт (например, 3000)
		host: true // Позволяет слушать внешние подключения
	}
});
