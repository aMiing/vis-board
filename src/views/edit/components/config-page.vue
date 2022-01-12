<template>
  <!--  通用配置页面：屏幕配置+组件配置 -->
  <div
    class="congig-page"
  >
    <!-- 屏幕设置 -->
    <screenConfig />
    <!-- 组件属性设置面板 -->
    <widgetConfig />
  </div>
</template>

<script>
import screenConfig from "./config/screen-config";
import widgetConfig from "./config/widget-config";
export default {
  components: {
    screenConfig,
    widgetConfig,
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.congig-page {
//   background-color: #1b1f25;
  border-left: 1px solid #dcdee3;
  width: 400px;
}
</style>
