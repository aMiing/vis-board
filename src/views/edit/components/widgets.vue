<template>
  <div class="widgets">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select=""
      text-color="#fff"
      active-text-color="#6bf"
      default-active="1"
    >
      <el-submenu v-for="(item, index) in widgesList" :key="item.name">
        <template slot="title"
          ><i :class="item.icon" :title="item.name"></i
        ></template>
        <el-tabs
          tab-position="left"
          value="all"
          style="min-height: 240px; width: 640px"
        >
          <el-tab-pane label="全部" title="全部" name="all">
            <div class="Charts">
              <div
                class="components-item"
                v-for="widget in item.widgets"
                :key="widget.id"
                @click="UseIt(widget)"
              >
                <img :src="widget.img" :alt="widget.name" :title="widget.name" />
                <p style="line-height: 16px; width: 100%; margin: 0">
                  {{ widget.name }}
                </p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane
            :label="child"
            :title="child"
            v-for="(child, childIndex) in item.childTab"
            :key="child.name"
          >
            <div class="barChart">
              <div
                class="components-item"
                v-for="item in widgets"
                v-if="
                  item.widgetsGroupId == index + '' + childIndex &&
                  item.usable == 1
                "
                @click="UseIt(item)"
              >
                <img :src="item.img" :alt="item.name" :title="item.name" />
                <p style="line-height: 18px; width: 100%; margin: 0">
                  {{ item.name }}
                </p>
              </div>
              <div
                class="components-item"
                v-for="item in widgets"
                v-if="
                  item.widgetsGroupId == index + '' + childIndex &&
                  item.usable == 0
                "
              >
                <div
                  class="dialog"
                  style="
                    width: 120px;
                    height: 90px;
                    position: absolute;
                    background-color: rgba(25, 25, 25, 0.7);
                    color: #fff;
                    text-align: center;
                    vertical-align: middle;
                    display: table;
                  "
                >
                  <i class="iconfont icon-suo1" style="line-height: 90px"></i>
                </div>
                <img :src="item.img" :alt="item.name" :title="item.name" />
                <p style="line-height: 18px; width: 100%; margin: 0">
                  {{ item.name }}
                </p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      widgesList: [
        {
          label: "基础组件",
          name: "common",
          icon: "fa fa-bar-chart",
          widgets: [
              {
                  id: 123,
                  img: '@/assets/widgets/3D-map.png'
              }
          ]
        },
        {
          label: "图表",
          name: "chart",
          icon: "fa fa-bar-chart",
        },
        {
          label: "仿真图形",
          name: "images",
          icon: "fa fa-bar-chart",
        },
        {
          label: "平面图标",
          name: "icon",
          icon: "fa fa-bar-chart",
        },
      ],
      widgets: [],
    };
  },
};
</script>