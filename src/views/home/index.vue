<template>
  <div id="container">
    <div class="tabs">
      <div
        v-for="(item, index) in tabList"
        :key="item.id"
        :class="item.isChecked ? 'tab checkTab' : 'tab'"
        @click="checkTab(item, index)"
      >
        <div class="title">
          <div class="icon">
            <van-icon :name="item.icon" />
          </div>
          <div class="text">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div ref="home" class="content">
      <dept-list v-if="tabList[1].isChecked" />
      <div v-if="tabList[0].isChecked">
        <amap />
      </div>
      <div v-if="tabList[0].isChecked && showMapTips" class="tips">
        <map-tips @checkTips="checkShowMapTips" />
      </div>
      <div v-if="tabList[0].isChecked && !showMapTips" class="hideTips">
        <div class="show" @click="showMapTips = true">
          显示数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === 'companyList') {
      to.meta.isBack = true
    } else {
      to.meta.isBack = false
    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    const indexContainer = this.$refs.home
    // 记录滚动高度
    this.$route.meta.scroll = indexContainer.scrollTop
    next()
  },
  data() {
    return {
      tabList: [
        { id: 1, name: '按地图查看', icon: 'map-marked', isChecked: false },
        { id: 2, name: '按地区查看', icon: 'wap-nav', isChecked: true }
      ],
      showMapTips: true
    }
  },
  activated() {
    if (this.$route.meta.isBack) {
      // 企业列表返回操作，比如页面位置
      const indexContainer = this.$refs.home
      indexContainer.scrollTop = this.$route.meta.scroll || 0
    }
  },
  methods: {
    checkTab(item, index) {
      this.tabList.map(item => (item.isChecked = false))
      this.tabList[index].isChecked = true
      if (item.id === 1) {
        this.$refs.home.scrollTop = 0
      }
    },
    checkShowMapTips() {
      this.showMapTips = !this.showMapTips
    }
  }
}
</script>
<style></style>
<style lang="less" scoped>
#container {
  font-size: 16px;
  background-color: #292a3a;
  height: 100%;
  display: flex;
  flex-direction: column;
  .tabs {
    width: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    height: 40px;
    background-color: #33334d;
    color: #676878;
    .tab {
      flex: 1;
      .title {
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        .icon {
          padding: 4px 3px 0 0;
        }
        .text {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    .checkTab {
      background-color: #01aaed;
      color: #292a3a;
    }
  }
  .content {
    flex: 1;
    overflow: auto;
    .tips {
      padding: 0 10px;
      margin-bottom: 20px;
      position: fixed;
      bottom: 20px;
    }
    .hideTips {
      position: fixed;
      bottom: 20px;
      right: 20px;
      .show {
        padding: 10px;
        border-radius: 50%;
        background: #292a3a;
        color: #fff;
      }
    }
  }
}
</style>
