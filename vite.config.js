import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add configuration to handle font files and other static assets from node_modules
  assetsInclude: [
    "**/*.woff",
    "**/*.woff2",
    "**/*.ttf",
    "node_modules/slick-carousel/slick/fonts/*",
  ],
  rollupOptions: {
    external: ["react-icons/io5"],
  },
});
