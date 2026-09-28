import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@notes": path.resolve(import.meta.dirname, "../notes"),
    },
  },
  server: {
    fs: {
      // allow Vite to serve files from the parent (notes-generator/)
      allow: [path.resolve(import.meta.dirname, "..")],
    },
  },
});
