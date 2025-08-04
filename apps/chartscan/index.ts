import * as esbuild from "npm:esbuild";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader";

const result = await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: ["./apps/chartscan/mod.ts"],
  outfile: "./apps/chartscan/dist/chartscan.esm.js",
  bundle: true,
  format: "esm",
});

esbuild.stop();