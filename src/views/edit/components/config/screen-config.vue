<template>
  <div class="pageSetting">
    <div class="style-pannel .pannal">
      <h3
        style="
          padding: 9px 0;
          margin: 0;
          width: 100%;
          text-align: center;
          border-bottom: 1px solid #ccc;
        "
      >
        <span>{{ screenSet.title }}</span>
      </h3>
      <div class="contain" style="padding: 5px 5px 0 20px; font-size: 12px">
        <div
          class="screenSize contain-item"
          style="line-height: 35px; height: 50px"
        >
          <span>屏幕大小</span>
          <div class="data-right" style="margin-left: 120px">
            <div class="screenWidth input-num">
              <el-input-number
                v-model="screenWidth"
                size="small"
                :min="975"
                :max="4000"
                disabled
              ></el-input-number>
              <span>宽度</span>
            </div>

            <div class="screenWidth input-num">
              <el-input-number
                v-model="screenHeight"
                size="small"
                :min="400"
                :max="2200"
                disabled
              ></el-input-number>
              <span>高度</span>
            </div>
          </div>
        </div>
        <div class="backgroundImg contain-item" style="line-height: 40px">
          <span>背景图片</span>
          <div class="data-right" style="margin-left: 60px">
            <div class="imgContainer">
              <div
                alt="背景图片"
                style="
                  background-size: 100% 100%;
                  width: 90px;
                  height: 60px;
                  box-shadow: 0 0 1px #6bf;
                  margin: 0 auto 10px;
                "
                :style="{ backgroundImage: screenSet.bgimg }"
              ></div>
              <p style="font-size: 0.8em; color: #888; margin: -10px">
                点击或将文件拖拽到这里更换
              </p>
            </div>
          </div>
          <el-form label-width="80px" size="mini" style="margin-left: 40px">
            <el-form-item label="">
              <el-input style="display: none"></el-input>
              <el-input placeholder="粘贴图片url于此处"></el-input>
            </el-form-item>
          </el-form>
          <div style="display: table">
            <span style="display: table-cell; vertical-align: middle"
              >背景颜色</span
            >
            <span class="data-right" style="margin-left: 70px">
              <el-color-picker
                v-model="screenSet.BgColor"
                show-alpha
                :predefine="predefineColors"
              >
              </el-color-picker>
            </span>
          </div>
        </div>
        <div class="zoomType contain-item" style="line-height: 40px">
          <span>缩放方式</span>
          <div class="data-right" style="margin-left: 60px">
            <el-radio type="radio" v-model="zoomType" label="fill-width"
              >等比缩放宽度铺满</el-radio
            >
            <el-radio type="radio" v-model="zoomType" label="fill-height"
              >等比缩放高度铺满</el-radio
            >
            <el-radio type="radio" v-model="zoomType" label="fill-screen"
              >全屏铺满</el-radio
            >
          </div>
        </div>
        <div class="backgroundImg contain-item" style="line-height: 40px">
          <div>
            <span>栅格间距</span>
            <span class="data-right" style="margin-left: 70px">
              <el-input-number
                v-model="Space"
                size="small"
                :precision="1"
                :step="0.5"
                :max="10"
              >
              </el-input-number>
            </span>
          </div>
          <div>
            <span>封面样式</span>
            <span class="data-right" style="margin-left: 70px">
              <el-button type="primary" plain>截取封面</el-button>
              <img
                src="@/assets/bg.png"
                alt="背景图片"
                width="180"
                height="120"
                style="margin: 5px 0 0 120px"
              />
            </span>
          </div>
        </div>

        <div class="reNew contain-item" style="line-height: 40px; border: 0">
          <div style="margin-top: 5px">
            <span>重置</span>
            <span class="data-right" style="margin-left: 92px">
              <el-button type="primary" plain>恢复默认背景</el-button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenSet: {},
      screenWidth: 600,
      screenHeight: 400,
      zoomType: "fill-width",
      Space: 5,
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577",
      ],
    };
  },
};
</script>