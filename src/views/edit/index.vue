<template>
  <div class="edit-container">
    <!-- 头部功能区 -->
    <header>
      <common-header></common-header>
    </header>
    <!-- 主功能区 -->
    <div class="main">
      <!-- 左侧层级区域 -->
      <aside class="layer-panel" :class="layerCollapse ? 'collaped' : ''">
        <!-- 折叠按钮 -->
        <el-button
          class="collapse-btn"
          @click.prevent="layerCollapse = !layerCollapse"
        >
          <i class="el-icon-d-arrow-left" title="折叠/展开"></i>
        </el-button>
        <layerPage />
      </aside>
      <!-- 中心舞台 -->
      <section class="screen-content">
        <mainScreen />
        <!-- 缩放控制器 -->
      </section>
      <!-- 右侧设置面板 -->
      <aside class="config-panel" :class="configCollapse ? 'collaped' : ''">
        <el-button
          class="collapse-btn"
          @click.prevent="configCollapse = !configCollapse"
        >
          <i class="el-icon-d-arrow-left" title="折叠/展开"></i>
        </el-button>
        <configPage :type="currentType" />
      </aside>
    </div>
  </div>
</template>

<script>
import commonHeader from "./components/header";
import configPage from "./components/config-page";
import layerPage from "./components/layer";
import mainScreen from "./components/main-screen";

export default {
  components: {
    commonHeader,
    configPage,
    layerPage,
    mainScreen,
  },
  data() {
    return {
      layerCollapse: false,
      configCollapse: false,
      ScreenBgColor: "rgb(36,43,41)",
      sysUserName: "",
      sysUserAvatar: "",
      currentType: "screen",
    };
  },
  // watch
  created: function () {
    // 获取tabItems、pageComponents数据
    // this.pageComponents = [
    //   {
    //     label: "文本",
    //     name: "commonText",
    //     component: "common-text",
    //     color: "#fff",
    //     fontSize: 14,
    //     fontWeight: 400,
    //     fontFamily: "",
    //     text: "我是通用文本组件",
    //     textAlign: "center",
    //     id: "a2e84f8ae81d8",
    //   },
    // ];
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.edit-container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0;
  left: 0;
  .main {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: calc(100% - 40px);
    aside {
      color: #666;
      background-color: #f4f4f4;
      overflow: hidden;
      .collapse-btn {
        position: fixed;
        z-index: 9;

        margin-top: 6px;
        border-left: 0;
        text-align: center;
        padding: 8px;
        border: 1px solid #444;
      }
      &.config-panel {
        flex: 0 0 360px;
        border-left: 1px solid #dcdee3;
        &.collaped {
          flex-basis: 0;
        }
        .collapse-btn {
          right: 0;
        }
      }
      &.layer-panel {
        flex: 0 0 300px;
        border-right: 1px solid #dcdee3;
        &.collaped {
          flex-basis: 0;
        }
        .collapse-btn {
          left: 0;
        }
      }
    }
    .screen-content {
      flex: 1;
      overflow: auto;
      margin: 20px;
    }
  }
}
</style>