<template>
  <div id="container">
    <div ref="home" class="content">
      <div>
        <amap v-if="deptList.length > 0" :depts="deptList" />
      </div>
      <!-- <div v-if="showMapTips" class="tips">
        <map-tips @checkTips="checkShowMapTips" />
      </div>
      <div v-if="!showMapTips" class="hideTips">
        <div class="show" @click="showMapTips = true">
          显示数据
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getServerDepts } from '../../api/home'
export default {
  data() {
    return {
      showMapTips: false,
      deptList: []
    }
  },
  created() {
    this.fetchDepts()
  },
  methods: {
    checkShowMapTips() {
      this.showMapTips = !this.showMapTips
    },
    async fetchDepts() {
      let rsp = await getServerDepts()
      if (rsp.code === '0') {
        if (rsp.datas.length > 0) {
          rsp.datas.forEach(item => {
            this.deptList.push({
              id: item.id,
              position: [item.comment.lng, item.comment.lat],
              name: item.comment.name,
              img: item.comment.pic
            })
          })
        }
      }
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
