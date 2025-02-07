import { execa } from "execa";
import fs from "fs-extra";
export async function build() {
  try {
    await execa`pnpm run -C packages/components build`;
    await execa`pnpm build:dts`;
    const res = await fs.copy(
      "types/packages/components",
      "packages/components/dist/types",
      {
        overwrite: true,
      },
    );
    fs.copyFileSync("./global.d.ts", "packages/components/dist/global.d.ts");
  } catch (error) {
    console.error(error);
  }
}
build();
