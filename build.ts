import { execa } from "execa";
import fs from "fs-extra";
export async function build() {
  try {
    await execa`pnpm vite build`;
    await execa`pnpm build:dts`;
    fs.copyFileSync("./global.d.ts", "./dist/global.d.ts");
  } catch (error) {
    console.error(error);
  }
}
build();
