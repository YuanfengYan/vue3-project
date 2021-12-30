<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-29 15:41:02
-->
<template>
  <div class="pagewarp">
    <el-row class="tool">
      <el-button type="primary" v-if="!hasPoivs" @click="bindPoivs">加载poiv</el-button>
      <el-button type="danger" v-else @click="unBindPoivs">销毁poiv</el-button>

      <el-popover  v-if="!hasPath"  v-model:visible="showPathConf" placement="bottom-start" :width="300">
        <el-form ref="form" :model="pathForm" label-width="80px">
          <el-form-item label="路线点">
            <el-input-number :min="2" v-model="pathForm.count" :step="1" />
          </el-form-item>
          <el-form-item label="弯曲度">
            <el-slider :min="0" :max="90" v-model="pathForm.radians"></el-slider>
          </el-form-item>
        </el-form>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="showPathConf = false"
            >取消</el-button
          >
          <el-button type="primary" size="mini" @click="initBindPath"
            >确定</el-button
          >
        </div>
        <template #reference>
          <el-button type="primary" @click="showPathConf = true">生成曲型路线</el-button>
          
        </template>
      </el-popover>
      <el-button type="danger"  v-else @click="unBindPath">清除路线</el-button>
      
      <el-button type="primary" v-if="hasPath"   @click="startmove">单步执行人物</el-button>
      <el-button type="primary"    @click="changeViewPitch">切换角度</el-button>
      <!-- <el-button type="primary" @click="unBindPoivs">两点生成曲线</el-button> -->
    </el-row>
    <el-row> </el-row>

    <div class="earthWarp">
      <vc-viewer
        @ready="ready"
        :shouldAnimate="true"
        :showCredit="false"
        :selectionIndicator="false"
        :requestRenderMode="true"
        :maximumRenderTimeChange="1"
      >
        <!-- 绘制路线 -->
        <!-- <vc-entity :position="[-75.59777, 40.03883]" @click="onEntityEvt" @mouseover="onEntityEvt" @mouseout="onEntityEvt">
              <vc-graphics-polyline
                :positions="[{ lng: 90, lat: 20, height: 0 }, { lng: 120, lat: 20, height: 0 }]"
                material="red"
                :width="5"
                :arcType="1"
                :clampToGround="false"
                @ready="polylineReady"
              ></vc-graphics-polyline>
            </vc-entity> -->
        <!-- 家的位置 -->
        <vc-overlay-html
          :position="[120.886, 29.5198, 0]"
          customClass="overlayHtml"
          @click="clickHome"
          :auto-hidden="true"
        >
          <el-icon :size="30" color="red"><home-filled /></el-icon>
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
@import "./style.scss";
</style>

<script lang="ts" src="./index.ts"></script>