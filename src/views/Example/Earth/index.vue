<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-15 16:24:03
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
<script lang="ts"  src="./index.ts">

</script>
