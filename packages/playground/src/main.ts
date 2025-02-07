import { createApp } from "vue";
import PlayComponents, { setupHttp } from "../../components/index";
import App from "./App.vue";
import "./style.css";
import "virtual:uno.css";

const cfg = {
  baseUrl: "https://dev-apisix.hgj.com",
  httpHeadersGetter: () => {
    return {
      "access-token": "57b259dec6c34aec96b8558cba8fbf2a",
    };
  },
};
setupHttp(cfg);
function setupComponents(app: any) {
  Object.keys(PlayComponents).forEach((key) => {
    const component = PlayComponents[key as any as keyof typeof PlayComponents];
    if (component.install) {
      app.use(component);
    } else if (component.name) {
      app.component(component.name, component);
    }
  });
  return app;
}

setupComponents(createApp(App)).mount("#app");
