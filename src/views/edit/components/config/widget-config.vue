<template>
  <div class="widgetSetting">
    <el-tabs type="border-card">
      <el-tab-pane label="样式">
        <attrConfig :data="data" />
      </el-tab-pane>
      <el-tab-pane label="数据">
        <div
          class="style-pannel .pannal dataPannal"
          v-for="pageComponent in pageComponents"
          v-show="pageComponent.uid == showSetting"
        >
          <h3>>{{ pageComponent.name.slice(0, 4) }}.v1.0.0</h3>
          <el-input type="textarea" :rows="10" placeholder="请输入内容">
          </el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane label="交互">
        <div class="interactive-pannel .pannal">
          <h3>
            <span style="padding: 0">交互配置</span>
          </h3>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import attrConfig from "./attrs";
export default {
  components: {
    attrConfig,
  },
  data() {
    return {
	  pageComponents: [],
	  data: {
		  title: '组件名'
	  }
    };
  },
};
</script>