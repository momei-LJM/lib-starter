import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import HElementPlusResolver from "@hgj/element-plus-import-resolver";
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      resolvers: [HElementPlusResolver()],
    }),
    Components({
      resolvers: [HElementPlusResolver()],
    }),
  ],
});
