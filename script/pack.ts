import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["src/buka.ts", "src/kunci.ts"],
  outdir: "dist",
  bundle: true,
  minify: true,
  platform: "node",
});
