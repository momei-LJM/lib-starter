import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

const isVueSFC = (id: string) => {
  return /\.([tj]sx)|(vue)?$/.test(id);
};
const format = (info) =>
  `${isVueSFC(info.name) ? info.name.replace(/\.([tj]sx)|(\.vue)?$/, ".js") : info.name}`;

export default defineConfig({
  build: {
    rollupOptions: {
      input: ["./src/components/index.ts"],
      external: ["vue"],
      output: [
        {
          exports: "named",
          format: "es",
          preserveModules: true,
          entryFileNames: format,
          // 输出目录
          dir: "dist/es",
          // 指定保留模块结构的根目录
          preserveModulesRoot: "src",
        },
        {
          exports: "named",
          format: "cjs",
          preserveModules: true,
          entryFileNames: format,
          // 输出目录
          dir: "dist/lib",
          // 指定保留模块结构的根目录
          preserveModulesRoot: "src",
        },
        {
          name: "momei",
          format: "umd",
          entryFileNames: "index.js",
          globals: {
            vue: "Vue",
          },
          // 输出目录
          dir: "dist/umd",
        },
      ],
    },

    lib: {
      name: "momei",
      entry: ["./src/components/index.ts"],
      cssFileName: "momei-style",
    },
    minify: true,
  },

  plugins: [vue(), vueJsx({}), UnoCSS()],
});
