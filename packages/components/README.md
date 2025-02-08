# setup

```typescript
import "spot-share/css"; //引入css
import PlayComponents, { setupHttp } from "spot-share";

// 注册组件
app.use(PlayComponents);

const cfg = {
  baseUrl: import.meta.env.VITE_API_URL, //baseUrl
  httpHeadersGetter: () => {
    // "access-token" 必填
    //返回的对象回合并到请求头中
    return {
      "access-token": getAccessToken(),
    };
  },
}; //配置http
setupHttp(cfg);
```
