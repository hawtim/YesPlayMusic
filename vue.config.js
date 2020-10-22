const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let plugins = [];
let optimization = {};
// comment line 6 to disable analyzer
plugins.push(new BundleAnalyzerPlugin());

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  pwa: {
    name: "YesPlayMusic",
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
    },
    themeColor: "#ffffff00",
    manifestOptions: {
      background_color: "#335eea",
    },
    // workboxOptions: {
    //   swSrc: "dev/sw.js",
    // },
  },
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "YesPlayMusic",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  chainWebpack(config) {
    config.module.rules.delete("svg");
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  configureWebpack: {
    plugins,
    optimization,
  },
};
