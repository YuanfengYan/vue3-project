/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-30 17:13:19
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-31 16:55:10
 */
/* eslint-disable */
var ws = require("nodejs-websocket");
const connectObj = {}
var server = ws.createServer(function(connection){
  let interval 
  if(!connectObj[connection.headers.origin]){
    interval = setInterval(()=>{
      connection.sendText("hello");
    }, 1000);
  }
  connectObj[connection.headers.origin] = connection
  // 定时轮询，发送心跳，让连接端知道是否还是连接状态
  connection.on("text", function (str) {
    console.log('收到来自客户端的消息：', str)
    if(str == 'hello'){
      connection.sendText("hello");
      return
    }
    connection.sendText("亲，您说的是：" + str);
  })
  // connection.on("connect", function() {
  //   console.log('开启连接')
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