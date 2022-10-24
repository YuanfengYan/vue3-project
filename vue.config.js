/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-27 15:17:39
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-08-30 15:06:19
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
  // "lintOnSave": false,//关闭严格模式
  chainWebpack: config => {
    console.log(config,'config')
    config.resolve.alias
        .set("@", resolve("src"))
        .set("assets", resolve("src/assets"))
        .set("components", resolve("src/components"))
        .set("views", resolve("src/views"))
        // .set("base", resolve("baseConfig"))
        // .set("public", resolve("public"));
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          reactivityTransform: true
        }
      })
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
