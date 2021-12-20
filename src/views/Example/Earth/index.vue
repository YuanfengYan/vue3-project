<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-20 18:14:28
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
