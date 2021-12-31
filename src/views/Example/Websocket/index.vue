<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-31 16:40:00
-->
<template>
    <div class="websocketWarp">
      <el-row class="tool">
        <el-button type="primary" v-if="!connectStatus" @click="connectChat">连接客服</el-button>
        <el-button type="danger" v-else @click="unConnectChat">断开连接</el-button>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="chatWarp">
            <div class="chatContent">
              <div class="msgList" >
                <div class="message" v-for="(item,index) in msgList" :key="index">
                  <div class="tip" v-if="item.fromType == 3">
                    {{item.text}}
                  </div>
                  <div v-else :class="'msg msg'+item.fromType">
                   {{item.text}}
                  </div>
                </div>
              </div>
            </div>
            
            <div class="msgInput">
              <el-row>
                <el-col :span="18">
                  <el-input v-model="sendValue" placeholder="Please input" />
                </el-col>
                <el-col :span="6">
                  <el-button type="primary" style="width: 100%;" round @click="sendUserMsg">
                    发送
                    </el-button>  
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
           <el-card class="desBox">
             使用该功能，先进入项目根目录下的nodeServe文件夹，打开终端运行"npm install", "npm run websocketServe"
            </el-card>
        </el-col>
      </el-row>
    </div>
</template>
<style lang="scss" scoped>
@import "./style.scss";
</style>
<script lang="ts">
import EventPubSub from '@/utils/EventPubSub'
import Socket from "@/utils/Websocket";
import WSCONF from '@/config/WebsocketConf'
import { ElMessage } from 'element-plus'
const pubSub =  EventPubSub.getInstance();
const WS = Socket.getInstance()
import { defineComponent } from 'vue';
/* eslint-disable */
const enum FromType {
  DISTAL = 1,//远端客服
  USER = 2,//本地用户
  TIP = 3//通知信息
}
/* eslint-enable */
interface MsgItem {
  text:string,
  fromType:number
}
interface IData {
  sendValue:string,
  msgList:MsgItem[],
  connectStatus:boolean,
  [propName: string]: any
}
export default defineComponent({
    data() :IData{
        return {
          sendValue:'',
          msgList:[{
            text:'大大所大所大所撒大所大所多耍大刀多多--1大大所大所大所撒大所大所多耍大刀多多--1',
            fromType:1
          },{
            text:'111',
            fromType:2
          }],
          connectStatus: false,
        }
    },
    methods: {
      initEvent(){
        const that = this
        pubSub.on(WSCONF.WEBSCOCKET_MSG,(e:any)=>{
          console.log('ee',e.data, that.msgList)
          that.msgList.push({
            text: e.data as string,
            fromType:FromType.DISTAL
          })
        })
        pubSub.on(WSCONF.WEBSOCKET_CONNECT_SUCC,()=>{
          that.connectStatus = true
           this.msgList.push({
            text: '已成功连接远程客服',
            fromType:FromType.TIP
          })
        })
      },
      connectChat(){
         WS.startConnect()
      },
      unConnectChat(){
        pubSub.emit(WSCONF.WEBSCOCKET_UNCONECT)
        this.msgList.push({
            text: '已断开远程连接',
            fromType:FromType.TIP
          })
        this.connectStatus = false
      },
      sendUserMsg(){
        console.log(this.sendValue)

        const msg = this.sendValue
        if(msg){
           this.msgList.push({
            text: ''+msg,
            fromType:FromType.USER
          })
          this.sendValue = ''
           pubSub.emit(WSCONF.WEBSCOCKET_SEND_MSG,msg)
        }else{
            ElMessage({
              message: '消息不能为空',
              type: 'warning',
            })
        }
      }
    },
    created(){

    },
    mounted(){
      this.initEvent()
    },
    unmounted(){

    },
    setup() {},
});
</script>
