declare module "momei-lib-starter/css";
declare module "vue" {
  export interface GlobalComponents {
    TestComponent: (typeof import("momei-lib-starter"))["test"];
  }
}

export default {};
