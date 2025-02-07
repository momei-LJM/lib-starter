import { App } from "vue";
import Test from "./test/index.vue";
export { setupHttp } from "./utils/http";
import "virtual:uno.css";
const makeInstaller = (components: any[]) => {
  const install = (app: App) => {
    components.forEach((c) => app.component(c.name, c));
  };
  return {
    install,
  };
};
export const TestComponent = Test;

export const components = [TestComponent];

export default makeInstaller(components);
