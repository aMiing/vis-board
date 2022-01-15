<template>
  <!-- 操作面板 -->
  <div class="screen" ref="screen" :style="screenConfig">
    <vue-drag-resize-rotate
      v-for="item in pageComponents"
      :key="item.id"
      :rotatable="true"
      :w="item.width"
      :h="item.height"
      :x="item.posX"
      :y="item.posY"
      :r="item.romate"
      @resizing="(x, y, w, h) => resizing({ x, y, w, h }, item)"
    >
      <component
        :is="item.name"
        :data="item"
        @loadSetting="loadSetting"
        @changeSize="changeSize"
        @changePosition="changePosition"
        @deleate="deleate"
      >
      </component>
    </vue-drag-resize-rotate>
  </div>
</template>

<script>
import CommonText from "@/components/widgets/commonTitle";
import linesText from "@/components/widgets/linesText";
import scrollText from "@/components/widgets/scrollText";
import Time from "@/components/widgets/Time";
import scrollCards from "@/components/widgets/scrollCards";
import lineChart from "@/components/widgets/lineChart";
import radarChart from "@/components/widgets/radarChart";
import barChart from "@/components/widgets/barChart";
import horizontalBarChart from "@/components/widgets/horizontalBarChart";
import pieChart from "@/components/widgets/pieChart";
import ringChart from "@/components/widgets/ringChart";
import pointChart from "@/components/widgets/pointChart";
import mapChart from "@/components/widgets/mapChart";
import dashbord from "@/components/widgets/dashbord";
import seriesDashbord from "@/components/widgets/seriesDashbord";
import borderWidget from "@/components/widgets/border";
import iconFont from "@/components/widgets/iconFont";

import screen from "@/configs/screen.js";
export default {
  components: {
    CommonText,
    linesText,
    Time,
    scrollText,
    scrollCards,
    lineChart,
    radarChart,
    barChart,
    horizontalBarChart,
    pieChart,
    ringChart,
    pointChart,
    mapChart,
    dashbord,
    seriesDashbord,
    borderWidget,
    iconFont,
  },
  data() {
    return {
      screen,
    };
  },
  computed: {
    screenConfig() {
      const {
        width,
        height,
        fontSize,
        whUnit = "",
        fontUnit = "",
      } = this.screen;
      return {
        ...this.screen,
        width: width + whUnit,
        height: height + whUnit,
        fontSize: fontSize + fontUnit,
      };
    },
  },
  mounted() {
    //   监听resize，缩放画布
    

  },
};
</script>