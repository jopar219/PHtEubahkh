const cssModules = require("esbuild-css-modules-plugin");

require("esbuild").build({
  entryPoints: ["app/javascript/application.js"],
  outdir: "app/assets/builds",
  bundle: true,
  publicPath: "assets",
  sourcemap: process.argv.includes("--watch"),
  watch: process.argv.includes("--watch"),
  plugins: [cssModules()]
});