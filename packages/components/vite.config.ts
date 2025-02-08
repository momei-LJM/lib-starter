import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import HElementPlusResolver from "@hgj/element-plus-import-resolver";
const isVueSFC = (id: string) => {
  return /\.([tj]sx)|(vue)?$/.test(id);
};
const format = (info: any) =>
  `${isVueSFC(info.name) ? info.name.replace(/\.([tj]sx)|(\.vue)?$/, ".js") : info.name}`;

export default defineConfig({
  build: {
    rollupOptions: {
      input: ["./index.ts"],
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
          preserveModulesRoot: ".",
        },
        {
          exports: "named",
          format: "cjs",
          preserveModules: true,
          entryFileNames: format,
          // 输出目录
          dir: "dist/lib",
          // 指定保留模块结构的根目录
          preserveModulesRoot: ".",
        },
        // {
        //   name: "momei",
        //   format: "umd",
        //   entryFileNames: "index.js",
        //   globals: {
        //     vue: "Vue",
        //   },
        //   // 输出目录
        //   dir: "dist/umd",
        // },
      ],
    },

    lib: {
      name: "spot-share",
      entry: ["index.ts"],
      cssFileName: "spot-share-style",
    },
    minify: true,
  },

  plugins: [
    vue(),
    vueJsx({}),
    UnoCSS(),
    AutoImport({
      resolvers: [HElementPlusResolver()],
    }),
    Components({
      resolvers: [HElementPlusResolver()],
    }),
  ],
});
