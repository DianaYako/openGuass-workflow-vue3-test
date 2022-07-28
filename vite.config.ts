import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/openGuass-workflow-vue3-test/",
  plugins: [vue()],
  server: {
    port: 3005,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@g": resolve(__dirname, "src/global"),
      "@antv/x6": "@antv/x6/lib",
      "@antv/x6-vue-shape": "@antv/x6-vue-shape/lib",
    },
  },
});
