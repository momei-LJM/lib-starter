declare module "lib-starter-components/css";
declare module "vue" {
  export interface GlobalComponents {
    TestComponent: (typeof import("lib-starter-components"))["TestComponent"];
  }
}

export default {};
