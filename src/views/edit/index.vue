<template>
  <div class="edit-container">
    <!-- 头部功能区 -->
    <header>
      <common-header></common-header>
    </header>
    <!-- 主功能区 -->
    <main class="main">
      <!-- 左侧层级区域 -->
      <aside class="layer">
        <!-- 折叠按钮 -->
        <el-button
          @click.prevent="collapse"
          style="
            position: fixed;
            z-index: 9;
            left: 0px;
            margin-top: 6px;
            border-left: 0;
            text-align: center;
            padding: 8px;
            border: 1px solid #444;
          "
        >
          <i :class="collapseIcon" @click="changeIcon()" title="折叠/展开"></i>
        </el-button>
        <layerPage />
      </aside>
      <!-- 中心舞台 -->
      <section class="screen-content" @click="screenSetting()">
        <mainScreen />
      </section>
      <!-- 右侧设置面板 -->
      <aside class="config-panel">
        <el-button
          @click.prevent="collapse2"
          style="
            position: fixed;
            z-index: 9;
            right: 0px;
            margin-top: 6px;
            border-right: 0;
            text-align: center;
            padding: 8px;
            background-color: #1b1f25;
            border: 1px solid #444;
          "
        >
          <i
            :class="collapseIcon2"
            @click="changeIcon2()"
            title="折叠/展开"
          ></i>
        </el-button>
        <configPage />
      </aside>
    </main>
  </div>
</template>

<script>
import VueDragResizeRotate from "@gausszhou/vue-drag-resize-rotate";

import commonHeader from "./components/header";
import configPage from "./components/config-page";
import layerPage from "./components/layer";
import mainScreen from "./components/main-screen";
import { mapGetters } from "vuex";
export default {
  components: {
    VueDragResizeRotate,
    commonHeader,
    configPage,
    layerPage,
    mainScreen,
  },
  data() {
    return {
      ScreenBgColor: "rgb(36,43,41)",
      screenBgImg: "",
      value0: true,
      fullscreenLoading: true,
      disabled: false,
      showSetting: "uid_1",
      collapsed2: false,
      sysUserName: "",
      sysUserAvatar: "",
      collapseIcon: "el-icon-d-arrow-left",
      collapseIcon2: "el-icon-d-arrow-right",
      screenWidth: 1,
      screenHeight: 1,
      tabPosition: "left",
      positionOptions: [
        {
          value: "center",
          label: "居中",
        },
        {
          value: "left",
          label: "居左",
        },
        {
          value: "right",
          label: "居右",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("panel", {
      pageComponents: "getElements",
    }),
  },
  // watch
  created: function () {
    this.fullscreenLoading = true;
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
    console.log("this.pageComponents", this.pageComponents);
  },
  mounted: function () {
    /*初始化屏幕尺寸*/
    let screenPannel = document.getElementsByClassName("screenPannel")[0];
    screenPannel.style.height = screenPannel.clientWidth * 0.6 + "px";
    console.log(this.screenSet);
    /*当窗口大小改变时改变屏幕尺寸*/
    window.onresize = function () {
      screenPannel.style.height = screenPannel.clientWidth * 0.6 + "px";
    };

    //console.log(screenPannel.clientHeight);
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || "";
      this.sysUserAvatar = user.avatar || "";
    }
    // this.$nextTick(function(){
    // 	alert('渲染完成');
    // })
    //

    window.onbeforeunload = () => {
      /*这里对data里的数据全部进行更新，所有需要保存的操作都调用该函数*/
      this.$notify({
        title: "保存",
        message: "正在为您保存页面更改",
        type: "success",
        offset: 90,
      });

      //计划执行保存操作
    };
  },
  beforeUpdate: function () {
    let screenPannel = document.getElementsByClassName("screenPannel")[0];
    screenPannel.style.height = screenPannel.clientWidth * 0.6 + "px";
    // this.screenBgImg = this.screenSet.bgimg;
  },
  updated: function () {
    // console.log('updata');
  },
  activabled: function () {},
  methods: {
    resizing({ x, y, w, h }, item) {
      // item.posX = x;
      // item.posY = y;
      item.width = w;
      item.height = h;
    },
    moveIt({ x, y, target }) {
      target.posY = y;
      target.posX = x;
      console.log(target, x, y);
    },
    saveChange() {
      /*	let url_saveScreen = 'http://localhost:8888/saveScreenSetting';
					this.screenSet.bgcolor = this.ScreenBgColor;
					this.screenSet.bgimg = this.screenBgImg;
					let settingData = JSON.stringify(this.screenSet);
					console.log(settingData);
					this.$http.post(url_saveScreen,{"str":settingData},{emulateJSON:true}).then((req,res) => {
	    				console.log(res.bodyText);
			    	}).catch((err) =>{
			    		console.log('确实修改数据库成功了，但是这了还是报了个错');
			    		return;
			    	});*/
      /*这里对pageComponents里的数据全部进行更新，所有需要保存的操作都调用该函数*/
      let self = this;
      if (this.pageComponents != "") {
        let url = "http://localhost:8888/saveChange";
        var newJson = self.pageComponents;
        /*因为如果把dataJson保存在styleJson中，从数据库里拿出来的styleJson则会不能直接被解析成json对象，
						所以这里对dataJson剔除，单独保存*/
        for (var i = 0; i < newJson.length; i++) {
          delete newJson[i].dataJson;
          // console.log(newJson[i]);
        }
        var newJsonStr = JSON.stringify(newJson);
        console.log(newJsonStr);
        self.$http
          .post(url, { str: newJsonStr }, { emulateJSON: true })
          .then((req, res) => {
            console.log(res.bodyText);
          })
          .catch((err) => {
            console.log("确实修改数据库成功了，但是这了还是报了个错");
            return;
          });
      } else {
        console.log("页面未添加组件");
      }
    },
    changeStyle(id) {
      console.log(id);
      /*计划执行保存操作*/
    },
    removeColor(index) {
      // pageComponent.dataJson.unshift('');
    },
    addColor(color) {
      console.log(color);
    },
    pannelResize() {
      console.log(this.$refs.pannel.clientWidth);
    },
    loadSetting(id) {
      // console.log(this.pageComponents);
      this.showSetting = "uid_" + id;
      /*设置左侧图层列表，点击激活
				思路：先获取所有图层，取消激活状态，再给点击的图层增加激活态*/
      let allList = document.getElementsByClassName("z-axis-item");
      let theList;
      for (let i = 0; i < allList.length; i++) {
        allList[i].style.background = "#1b1f25";
        allList[i].getElementsByTagName("input")[0].checked = false;
      }

      let self = this;
      for (let h = 0; h < self.pageComponents.length; h++) {
        if (self.pageComponents[h].uid == "uid_" + id) {
          theList = allList[h];
        }
      }
      theList.style.background = "rgba(50,180,255,.8)";
      theList.getElementsByTagName("input")[0].checked = true;
      //console.log(theList.getElementsByTagName('input'));
    },
    changeSize(size) {
      // console.log(this.pageComponents);
      let self = this;
      for (let i = 0; i < self.pageComponents.length; i++) {
        if (self.pageComponents[i].uid == size.uid) {
          self.pageComponents[i].widgetWidth = Math.round(size.width * 10) / 10;
          self.pageComponents[i].widgetHeight =
            Math.round(size.height * 10) / 10;
          return;
        }
      }
      //console.log(size.width);
      //console.log(this.pageComponents[size.theId].widgetWidth);
    },
    changePosition(position) {
      // console.log(this.pageComponents);
      let self = this;
      for (let i = 0; i < self.pageComponents.length; i++) {
        if (self.pageComponents[i].uid == position.uid) {
          self.pageComponents[i].widgetLeft =
            Math.round(position.left * 10) / 10;
          self.pageComponents[i].widgetTop = Math.round(position.top * 10) / 10;
          return;
        }
      }
      //console.log(this.pageComponents[position.theId].widgetLeft)
    },
    deleate(theId) {
      //从数据列表中彻底删除该控件的配置数据，不可恢复
      console.log("将删除第：" + theId);

      let url = "http://localhost:8888/deleteBindWidgets";
      this.$http
        .post(url, { id: theId }, { emulateJSON: true })
        .then((req, res) => {
          console.log(res.bodyText);
        })
        .catch((err) => {
          console.log(
            "未能成功发送新增widget数据，请联系系统维护人员或稍后重试！"
          );
          return;
        });
      //遍历数组，删除选定元素
      let self = this;
      for (let i = 0; i < self.pageComponents.length; i++) {
        if (self.pageComponents[i].id == theId) {
          console.log(i);
          self.pageComponents.splice(i, 1);
          return;
        }
      }
    },
    previewIt() {
      /*var titleText = document.getElementsByClassName('titleText')[i];
				//给标题文本设置超链接
				titleText.append(this.form.name);
				if((this.form.url)!=''){
					titleText.href = this.form.url;
					titleText.target = this.form.target;
				}*/
      // alert("预览？");
      /*点击预览之前应该先执行保存操作，完成之后再跳转进行预览*/
      var content = document.getElementsByClassName("screenPannel")[0]
        .innerHTML;
      console.log(content);
      let pageId = window.location.href.split("=")[1];
      //1、上传数据到服务器思路
      let url = "http://localhost:8888/preview";
      this.$http
        .post(url, { id: pageId, content: content }, { emulateJSON: true })
        .then((req, res) => {
          console.log(res.bodyText);
        })
        .catch((err) => {
          console.log(
            "未能成功发送预览界面数据，请联系系统维护人员或稍后重试！"
          );
          return;
        });
      //跳转预览界面
      window.open("http://localhost:8080/#/preview?id=" + pageId);
    },
    screenSetting() {
      //框定除了编辑面板之外的部分
      // this.$refs.pannel.onclick = function (e) {
      //   e.stopPropagation();
      // };
      var pageSetting = document.getElementsByClassName("pageSetting")[0];
      var widgetSetting = document.getElementsByClassName("widgetSetting")[0];
      //去除元素选中状态
      var allDrags = document.getElementsByClassName("drag");
      //去除其他元素的边框
      for (let m = 0; m < allDrags.length; m++) {
        allDrags[m].style.border = "0";
        //console.log(allDrags[m].style);
      }
      /*获取所有的 .btn 并且设置为隐藏状态*/
      var allBtns = document.getElementsByClassName("btn");
      for (let q = 0; q < allBtns.length; q++) {
        //console.log('iii');
        allBtns[q].style.visibility = "hidden";
      }
      //更换属性配置面板
      pageSetting.style.display = "block";
      widgetSetting.style.display = "none";
      //console.log();
    },
    changeIcon() {
      console.log(this.collapsed1);
      if (this.collapsed1) {
        this.collapseIcon = "el-icon-d-arrow-left";
      } else {
        this.collapseIcon = "el-icon-d-arrow-right";
      }
    },
    changeIcon2() {
      console.log(this.collapsed2);

      if (this.collapsed2) {
        //console.log(this.isCollapse);
        this.collapseIcon2 = "el-icon-d-arrow-right";
      } else {
        this.collapseIcon2 = "el-icon-d-arrow-left";
      }
    },
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function (a, b) {},
    //退出登录
    logout: function () {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    //折叠导航栏
    //讲道理在这里对屏幕适配情况进行调整是我们想到比较合适的了
    collapse: function () {
      this.collapsed1 = !this.collapsed1;
      /*获取此时的控件对象*/
      var oDrag = document.getElementsByClassName("drag") || [];
      //console.log(oDrag);
      /*对所有控件的宽高进行调整*/
      var self = this;
      /*for (let i = 0; i < self.pageComponents.length; i++) {

						percentWidth = self.pageComponents[i].widgetWidth/self.$refs.pannel.clientWidth;
						percentHeight = self.pageComponents[i].widgetHeight/self.$refs.pannel.clientHeight;

						setTimeout(function(){
							oDrag[i].style.width = percentWidth*self.$refs.pannel.clientWidth+'px';
							console.log(oDrag[i].style.width);
						},30);
					}*/
      //self.pageComponents
      setTimeout(function () {
        let pannel = self.$refs.pannel;
        pannel.style.height = pannel.clientWidth * 0.6 + "px";
      }, 30);
    },
    //折叠导航栏
    collapse2: function () {
      this.collapsed2 = !this.collapsed2;
      var self = this;
      setTimeout(function () {
        let pannel = self.$refs.pannel;
        pannel.style.height = pannel.clientWidth * 0.6 + "px";
      }, 30);
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
  },

  beforeDestroyed: function () {
    console.log("即将销毁组件");
  },
};
</script>
<style>
a {
  text-decoration: none;
}
a:link,
a:visitrd,
a:hover,
a:active {
  color: ;
}
.drag > div.btn {
  visibility: hidden;
}
.titleText {
  text-decoration: none;
  color: #fff;
}
.drag:active,
.drag:hover {
  box-shadow: 0 0 1px #6bf;
  background-color: rgba(0, 192, 222, 0.1);
}
.leftComponentList {
  width: 100%;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  border: 0 !important;
}

.el-menu-item,
.el-submenu__title {
  color: #20a0ff;
}
.dataPannal .el-textarea__inner {
  background: #000;
  color: #fff;
}
.el-button--small,
.el-button--small.is-round {
  padding: 6px 8px;
}
.el-button--medium {
  margin-right: 28px;
  font-size: 20px;
}

.el-input-number--small .el-input-number__decrease {
  width: 26px;
  right: 26px;
}
.el-input-number--small .el-input-number__increase {
  width: 26px;
}
.el-input-number--small .el-input__inner {
  padding-left: 28px;
  padding-right: 28px;
}
i:hover {
  color: #e91 !important;
}
.components-item > p {
  text-align: center;
}
.el-menu--horizontal {
  border-bottom: 0;
}
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: #373d41;
}
.el-form-item__content {
  margin-left: 80px;
}
.el-tabs__item {
  color: #999;
}
.el-menu--popup-bottom-start {
  margin: 0;
  border-bottom: 0;
}
.el-radio + .el-radio {
  margin-left: 8px;
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 40px;
  line-height: 40px !important;
}
.el-submenu__title i {
  color: #ccc;
}
.el-tabs--border-card > .el-tabs__header {
  background-color: #1b1f25;
}
.el-collapse-item__wrap {
  background-color: #1b1f25;
}
.el-collapse-item__header {
  background-color: #1b1f25;
  color: #ccc;
}
.el-form-item__label {
  color: #ccc;
}
.el-collapse-item__content {
  color: #ccc;
}
</style>

<style scoped lang="scss">
@import "~scss_vars";

aside {
  background-color: #1b1f25 !important;
  color: #ccc !important;
}
.drag > btn {
  visiblty: none;
}
/*滚动条样式*/
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 5px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.6);
  background: rgba(0, 0, 0, 0.6);
}

* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.el-menu {
  background: #373d41;
}
.el-menu--horizontal .el-submenu > .el-menu {
  width: 545px;
  background-color: #222225;
}
.components-item[data-v-498a33db],
.target-item[data-v-498a33db] {
  color: #999;
}
.components-item[data-v-498a33db]:hover,
.target-item[data-v-498a33db]:hover {
  color: #e91;
}
.el-menu-item,
.el-submenu__title {
  color: #eceff3;
}
.el-menu-item,
.el-submenu__title:hover {
  background-color: #373d41;
}
.el-menu--horizontal .el-menu-item[data-v-498a33db] {
  height: 40px;
}
i {
  cursor: pointer;
}
.reSize:hover {
  cursor: se-resize;
}
.components-item,
.target-item {
  width: 120px;
  height: 120px;
  cursor: pointer;
  margin: 5px 8px;
  float: left;
}
.components-item:hover,
.target-item:hover {
  /* color:#fff; */
  img {
    border: 1px solid #6be;
    width: 118px;
    height: 88px;
    /* margin-top:-1px; */
  }
}
.components-item > img,
.target-item > img {
  width: 120px;
  height: 90px;
}
.el-collapse {
  border: 0;
}
.el-tabs--border-card {
  background: #2f2d2d;
  border: 0;
}
.screenPannel {
  width: 100%;
  box-shadow: 0 0 2px #8bf;
  position: relative;
  .component > div {
    // position: absolute;
    // top: 40%;
    // left: 40%;
    // &::after {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   content: "";
    //   width: 100%;
    //   height: 100%;
    //   background: #000;
    //   opacity: 0;
    //   // z-index:
    // }
    // &:hover {
    //   cursor: all-scroll;
    //   z-index: 9999;
    //   &::after {
    //     opacity: 0.15;
    //     border: 1px dashed #eee;
    //     top: -1px;
    //     left: -1px;
    //   }
    // }
  }
}
.input-num {
  width: 90px;
  float: left;
  margin-right: 5px;
}
.input-num > span {
  width: 90px;
  text-align: center;
  font-size: 8px;
  line-height: 16px;
  float: left;
}
.el-input-number__increase {
  line-height: 28px;
  width: 20px;
  font-size: 10px;
  border: 1px solid #dcdfe6;
}
li {
  list-style-type: none;
}
.imgContainer {
  margin: -20px auto 10px 60px;
  width: 170px;
  height: 90px;
  border: 1px dashed #ccc;
  text-align: center;
  padding: 15px;
}
.data-right {
  margin: -35px 0 5px auto;
}
.contain-item {
  padding: 3px 0;
  border-bottom: 1px solid #ccc;
}
.el-input-number--small .el-input-number__decrease {
  right: 20px;
}
.el-input-number--small {
  width: 90px;
  margin-right: 5px;
  /* 	    top: 10px; */
}
.el-collapse-item__header {
  color: #333;
  border-left: 0;
}
.pannal {
  border-bottom: 1px solid #ccc;
}
.el-tabs__item {
  width: 150px !important;
  height: 45px;
  line-height: 45px;
  background: #fff;
  color: #333;
}
.el-menu--horizontal .el-menu-item {
  float: left;
  width: 33%;
  height: 45px;
  line-height: 45px;
  /* background:#fff; */
  color: #333;
}
.el-menu-item.is-active {
  /* background-color: #00c1de; */
  box-shadow: 0 0 1px #2196f3;
}

.navbar-item {
  margin: 0;
  position: releative;
}
.el-button + .el-button {
  margin-left: 0px;
}
aside {
  color: #666;
  background-color: #f4f4f4;
  border-right: 1px solid #333;
  overflow: hidden;
}
.navbar-item {
  margin: 0;
  position: releative;
}
.z-axis-list {
  overflow: scroll;
  width: 100%;
  text-align: center;
}
.z-axis-item {
  line-height: 30px;
  width: 100%;
  text-align: left;
  height: 30px;
}
.z-axis-item:hover {
  background-color: rgba(88, 110, 76, 0.3);
}
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
    el-button {
      cursor: pointer;
    }
    aside {
      flex: 0 0 230px;
      width: 230px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 0;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 160px;
      width: 160px;
    }
    .menu-collapsed2 {
      flex: 0 0 0;
      width: 60px;
    }
    .menu-expanded2 {
      flex: 0 0 360px;
      width: 360px;
    }
    .screen-content {
      // background: #f1f2f7;
      flex: 1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        /* background-color: #fff; */
        box-sizing: border-box;
      }
    }
  }
}
</style>