<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-22 16:42:40
-->
<template>
    <div class="pagewarp">
        <el-row class="tool">

       <el-button type="primary" @click="bindPoivs">加载poiv</el-button>
       <el-button type="primary" @click="unBindPoivs">销毁poiv</el-button>

      </el-row>

        <div class="earthWarp">
            <vc-viewer
                @ready="ready"
                :showCredit="false"
                :selectionIndicator="false"
                :requestRenderMode="true"
                :maximumRenderTimeChange="Infinity"
            >
            <!-- 绘制路线 -->
            <vc-entity :position="[-75.59777, 40.03883]" @click="onEntityEvt" @mouseover="onEntityEvt" @mouseout="onEntityEvt">
              <vc-graphics-polyline
                :positions="[{ lng: 90, lat: 20, height: 0 }, { lng: 120, lat: 20, height: 0 }]"
                material="red"
                :width="5"
                :arcType="1"
                :clampToGround="false"
                @ready="polylineReady"
              ></vc-graphics-polyline>
            </vc-entity>
            <!-- 家的位置 -->
                <vc-overlay-html
                    :position="[120.886, 29.5198,0]"
                     customClass="overlayHtml"
                    @click="clickHome"
                    :auto-hidden="true"
                >
                    <el-icon size="30" color="red"><home-filled /></el-icon>
                </vc-overlay-html>
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
<script lang="ts" src="./index.ts"></script>
