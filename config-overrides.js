const {
  override,
  fixBabelImports,
  addDecoratorsLegacy,
} = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  }),
  addDecoratorsLegacy()
  // addLessLoader({
  //   javascriptEnabled: true,
  //   modifyVars: {
  //     "@primary-color": "#1DA57A",
  //     "@heading-color": "#ff0"
  //   }
  // })
);
