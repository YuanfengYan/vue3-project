<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-30 20:56:21
-->
<template>
    <div class="websocketWarp">
      <el-row class="tool">
        <el-button type="primary" @click="connectChat">连接客服</el-button>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="chatWarp">
            <div class="chatContent">
              <div class="msgList" v-for="(item,index) in msgList" :key="index">
                <div class="msg">
                  {{item.text}}--{{item.fromType}}
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
import { ElMessage } from 'element-plus'
const pubSub =  EventPubSub.getInstance();
const WS = Socket.getInstance()
import { defineComponent } from 'vue';
/* eslint-disable */
const enum FromType {
  DISTAL = 1,//远端客服
  USER = 2//本地用户
}
/* eslint-enable */
interface MsgItem {
  text:string,
  fromType:number
}
interface IData {
  sendValue:string,
  msgList:MsgItem[],
  [propName: string]: any
}
export default defineComponent({
    data() :IData{
        return {
          sendValue:'',
          msgList:[],
        }
    },
    methods: {
      initEvent(){
        const that = this
        pubSub.on('WEBSCOCKET_MSG',(e:any)=>{
          console.log('ee',e.data, that.msgList)
          that.msgList.push({
            text: e.data as string,
            fromType:FromType.DISTAL
          })
        })
      },
      connectChat(){
         WS.startConnect()
         this.initEvent()
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
           pubSub.emit('WEBSCOCKET_SEND_MSG',msg)
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

    },
    unmounted(){

    },
    setup() {},
});
</script>
