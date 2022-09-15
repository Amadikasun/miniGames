import { join } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: join(__dirname, "index.html"),
      },
    },
  },
});
