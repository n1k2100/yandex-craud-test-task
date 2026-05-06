import { defineConfig } from "vite";

export default defineConfig({
  base: "/yandex-craud-test-task/",
  root: "src",
  publicDir: "../static",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
