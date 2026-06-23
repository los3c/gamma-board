import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // En développement local, proxifie /api vers une fonction locale
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
