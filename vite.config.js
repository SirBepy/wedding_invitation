import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  build: {
    rollupOptions: {
      // Second HTML entry: the standalone seating page, built alongside the invitation.
      input: { main: "index.html", seating: "seating.html" },
    },
  },
});
