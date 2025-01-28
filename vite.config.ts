import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },

    lib: {
      name: "momei",
      entry: ["./src/components/index.ts"],
      fileName: (format, entryName) => `momei-${entryName}.${format}.js`,
      cssFileName: "momei-style",
    },
    outDir: "dist",
    minify: false,
  },

  plugins: [vue(), vueJsx({}), UnoCSS()],
});
