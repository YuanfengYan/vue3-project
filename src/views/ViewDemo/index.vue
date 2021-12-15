<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-15 15:52:37
-->
<template>
    <div class="pagewarp">
      <div class="earthWarp">
                <vc-viewer
                    @ready="ready"
                    :showCredit="false"
                    :selectionIndicator="false"
                    :requestRenderMode="true"
                    :maximumRenderTimeChange="Infinity"
                >
                
                 <vc-layer-imagery
                  :alpha="1"
                  :brightness="1"
                  :contrast="1"
                  :sortOrder="20"
                  :show="true"
                >
                  <vc-provider-imagery-bingmaps
                    ref="provider"
                    bmKey="AvLX3xcNvMZeLeAPq33u8kObVKu6mArl8VprMjyt8M2HSQiZp1meCVW3XTfCauZf"
                    mapStyle="Aerial"
                    @ready="layerReady"
                    tileProtocol="https"
                  ></vc-provider-imagery-bingmaps>
                </vc-layer-imagery>
                            
                  
                </vc-viewer>
            </div>
    </div>
</template>
<style lang="scss" scoped>
@import './style.scss';
</style>
<script lang="ts">
// import { ElMessage } from 'element-plus'
import { defineComponent } from 'vue';
// import { loginApi } from '@/api/user';

export default defineComponent({
    data() {
        return {
           point: {
        pixelSize: 28,
        color: 'red'
      },
      label: {
        text: 'Hello VueCesium',
        pixelOffset: [0, 80],
        fillColor: 'red'
      },
      billboard: {
        image: 'https://zouyaoji.top/vue-cesium/favicon.png',
        scale: 0.5
      }
        };
    },
    methods: {
        layerReady: function(Cesium: any) {
            console.log('layerReady', Cesium);
            // @ts-ignore
            window.viewer = Cesium.viewer;
            // @ts-ignore
            // window.viewer.imageryLayers.get(1).show =  false
            // viewer.scene.globe.baseColor = Cesium.Color.BLACK;
        },
        ready(e: any) {
            console.log("1",e);
            // e.Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMjZjNGMyYy02ZmJlLTQ1ZGYtOWE2NC0yYTdjYmZhODUxYTgiLCJpZCI6NDMyMjgsImlhdCI6MTYxNzMzNDA5OX0.ox0okdwvueefvj7I4KVd9KNqVOEsMStSTmn8sDhoim4'

            // e.viewer.imageryLayers.get(0).show = false
        },
         onEntityEvt (e:any) {
      console.log(e)
      if (e.type === 'onmouseover') {
        this.billboard = {
          image: 'https://zouyaoji.top/vue-cesium/favicon.png',
          scale: 0.6
        }
      } else if (e.type === 'onmouseout') {
        this.billboard = {
          image: 'https://zouyaoji.top/vue-cesium/favicon.png',
          scale: 0.5
        }
      }}
    },
    created() {},
    mounted() {},
    unmounted() {},
    setup() {},
});
</script>
