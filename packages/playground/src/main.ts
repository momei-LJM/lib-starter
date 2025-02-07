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
const app = createApp(App);
app.use(PlayComponents);

app.mount("#app");
