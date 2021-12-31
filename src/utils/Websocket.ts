import EventPubSub from '@/utils/EventPubSub'
import WSCONF from '@/config/WebsocketConf'
const pubSub =  EventPubSub.getInstance();
const URL_WS = 'ws://localhost:3001'
let webSocket:WebSocket
type HeartCheck = {
  timeout:number,
  timeoutObj:NodeJS.Timeout|null,
  serverTimeoutObj:NodeJS.Timeout|null,
  reset:{():void},
  start:{():void},
}

export default class Socket {
     /**
     * 单例
     */
      static instance:Socket|null = null;
      static getInstance() {
          if (!this.instance) {
              this.instance = new Socket()
          }
          return this.instance;
      }
    constructor(name?:string) {
      this.initPubEvent()
    }
    startConnect(){
        webSocket = new WebSocket(URL_WS);
        this.initEventHandle()
    }
    initPubEvent(){
      // 用户发送消息
      pubSub.on(WSCONF.WEBSCOCKET_SEND_MSG,(msg:any)=>{
        console.log('发送消息')
        webSocket.send(msg)
      })
      // 主动断开连接
      pubSub.on(WSCONF.WEBSCOCKET_UNCONECT,(msg:any)=>{
        console.log('发送消息')
        webSocket.close()
      })
    }
    /**
     * 初始化事件
     */
    initEventHandle() {
        const socketSelf:Socket = this
        const heartCheck:HeartCheck = {
            timeout: 60000,//60ms
            timeoutObj:null ,
            serverTimeoutObj: null,
            reset: function(){
              if( this.timeoutObj != null){
                clearTimeout(this.timeoutObj);
              }
              if(this.serverTimeoutObj != null){
                clearTimeout(this.serverTimeoutObj)
              }
              this.start();
            },
            start: function(){
                const self = this
                this.timeoutObj = setTimeout(function(){
                    webSocket.send("hello");
                    self.serverTimeoutObj = setTimeout(function(){
                        webSocket.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                    }, self.timeout)
                }, this.timeout)
            },
        }
        webSocket.onerror = function() {
            console.log("Connection onerror ..."); 
            socketSelf.reconnect()
        }.bind(this)
        webSocket.onclose = function() {
            console.log('onclose')
            socketSelf.reconnect()
        }.bind(this)
        webSocket.onopen = function(event) {
            console.log('onopen,websocket连接成功')
            pubSub.emit(WSCONF.WEBSOCKET_CONNECT_SUCC)
            heartCheck.start();
        }
        webSocket.onmessage = function(event:any) {
            // console.log("Connection onmessage ...",event); 
            if(event.data=='hello'){//心跳数据
                heartCheck.reset();
                console.log('连接心跳')
                return 
            }else{
              pubSub.emit(WSCONF.WEBSCOCKET_MSG,event)
            }
        }
    }
    // 重连
     reconnect() {
        setTimeout(()=>{     //没连接上会一直重连，设置延迟避免请求过多
            this.startConnect();
        }, 2000);
    }
    unConnect(){
      webSocket.close()
    }
    
}

