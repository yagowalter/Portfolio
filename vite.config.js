import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  publicDir: "web/assets",
  server: {
    watch: {
      ignored: [/hero_cloud_04_isolated \(1\)\.png$/],
    },
  },
  build: { outDir: "dist", emptyOutDir: true },
});
