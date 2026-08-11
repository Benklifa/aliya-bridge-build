import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    // One file per route at the dist root (about.html, framework-a is nested
    // via its route path, 404.html for Vercel's static 404 convention).
    // Served pretty-URL style by Vercel's cleanUrls option.
    dirStyle: "flat",
    formatting: "minify",
  },
}));
