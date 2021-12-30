/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-30 17:13:19
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-30 20:39:47
 */
/* eslint-disable */
var ws = require("nodejs-websocket");
var server = ws.createServer(function(connection){
  let interval 
  // 定时轮询，发送心跳，让连接端知道是否还是连接状态
  interval = setInterval(()=>{
    connection.sendText("hello");
  }, 1000);
  
  connection.on("text", function (str) {
    console.log('收到来自客户端的消息：', str)
    connection.sendText("亲，您说的是：" + str);
  })
  // connection.on("connect", function(code) {
  //   console.log('开启连接', code)
  //   // 定时轮询，发送心跳，让连接端知道是否还是连接状态
  //   interval = setInterval(()=>{
  //     connection.sendText("hello");
  //   }, 1000);
  // })
  connection.on("close", function (code, reason) {
    console.log("关闭")
    clearInterval(interval)
  });
  connection.on("error", function (code, reason) {
    console.log("异常")
    clearInterval(interval)
  });

}).listen(3001)