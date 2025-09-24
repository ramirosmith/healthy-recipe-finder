import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/healthy-recipe-finder/",
  define: {
    "process.env": process.env
  }
});
