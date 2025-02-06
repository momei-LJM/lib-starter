import { createApp } from "vue";
import PlayComponents from "../../components/index";
import App from "./App.vue";
import "./style.css";
import "virtual:uno.css";

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
