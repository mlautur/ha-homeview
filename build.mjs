// Bundle the card pack into one ES module for Home Assistant (dist/homeview.js).
import * as esbuild from "esbuild";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const options = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  format: "esm",
  outfile: "dist/homeview.js",
  minify: true,
  sourcemap: false,
  // old iPads / Android WebViews: Safari 14 and Chrome 87 baseline
  target: ["es2020", "safari14", "chrome87"],
  define: { __VERSION__: JSON.stringify(pkg.version) },
  legalComments: "none",
  logLevel: "info",
};

if (process.argv.includes("--watch")) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
} else {
  await esbuild.build(options);
}
