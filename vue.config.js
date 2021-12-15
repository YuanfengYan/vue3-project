/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-27 15:17:39
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-15 15:30:46
 */
const path = require("path");

// const debug = process.env.NODE_ENV !== 'production'
// // use CesiumUnminified when debug
// const cesiumSource = debug
//   ? './node_modules/cesium/Build/CesiumUnminified'
//   : './node_modules/cesium/Build/Cesium'

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
        .set("@", resolve("src"))
        .set("assets", resolve("src/assets"))
        .set("components", resolve("src/components"))
        .set("views", resolve("src/views"))
        // .set("base", resolve("baseConfig"))
        // .set("public", resolve("public"));
  },
  configureWebpack:{
      module: {
          rules: [
              {
                  test: /\.mjs$/,
                  include: /node_modules/,
                  type: "javascript/auto"
              },
          ]
      }
  }
}