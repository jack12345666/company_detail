<template>
  <div v-if="settledList.length > 0" class="mapTips">
    <div class="header" @click="checkTips">
      <!-- <div class="line" @click="checkTips"></div> -->
      <div class="top">
        <div class="icon">
          <img :src="require('../../assets/index.png')" />
        </div>
        <div class="text">
          入驻企业共: 52家
        </div>
      </div>
    </div>
    <div class="streets">
      <div
        v-for="item in settledList"
        :key="item.id"
        class="item"
        @click="toCompanyList(item)"
      >
        <span style="width: 100px;display: inline-block;">{{ item.name }}</span>
        {{ item.num }}家
      </div>
    </div>
  </div>
</template>

<script>
import { getServerDepts } from '../../api/home'
export default {
  data() {
    return {
      settledList: []
    }
  },
  created() {
    this.fetchDepts()
  },
  methods: {
    async fetchDepts() {
      let rsp = await getServerDepts()
      if (rsp.code === '0') {
        if (rsp.datas.length > 0) {
          rsp.datas.forEach(item => {
            this.settledList.push({
              id: item.id,
              name: item.comment.name,
              num: 52
            })
          })
        }
      }
    },
    toCompanyList(item) {
      localStorage.setItem('deptId', item.id)
      this.$router.push({ path: '/companyList', query: { name: item.name } })
    },
    checkTips() {
      this.$emit('checkTips')
    }
  }
}
</script>

<style lang="less" scoped>
.mapTips {
  .header {
    width: 100%;
    background-color: #fff;
    font-family: Microsoft YaHei;
    border-radius: 10px;
    padding: 6px 0 10px 0;
    z-index: 9999999;
    .line {
      width: 100px;
      height: 2px;
      background-color: #292a3a;
      margin: 0 auto;
    }
    .top {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        margin-right: 15px;
        img {
          width: 30px;
          height: 30px;
        }
      }
      .text {
        color: #292a3a;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
  .streets {
    z-index: 9999;
    border-radius: 10px;
    // background: rgba(239, 239, 244, 0.1);
    background: rgba(41, 42, 58, 0.8);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 0;
    border-radius: 0 0 10px 10px;
    .item {
      width: 50%;
      text-align: center;
      color: #fff;
      margin: 8px 0;
    }
  }
}
</style>
