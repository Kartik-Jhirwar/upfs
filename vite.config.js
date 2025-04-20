import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/upfs/",
  build: {
    outDir: "dist", // Make sure this is the correct output directory
    rollupOptions: {
      output: {
        // This ensures proper chunking and naming for assets
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0]; // Separate chunks for node_modules
          }
        },
      },
    },
  },
});
