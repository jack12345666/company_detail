<template>
  <div class="industry">
    <div ref="industry" class="content">
      <div class="industryList">
        <div
          v-for="(item, index) in industryList"
          :key="index"
          class="listItem"
          @click="checkIndusty(item)"
        >
          <div class="name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIndustries } from '../../api/home'
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
    const indexContainer = this.$refs.industry
    // 记录滚动高度
    this.$route.meta.scroll = indexContainer.scrollTop
    next()
  },
  data() {
    return {
      industryList: []
    }
  },
  created() {
    this.fetchIndusty()
  },
  activated() {
    if (this.$route.meta.isBack) {
      // 企业列表返回操作，比如页面位置
      const indexContainer = this.$refs.industry
      indexContainer.scrollTop = this.$route.meta.scroll || 0
    }
  },
  methods: {
    async fetchIndusty() {
      let rsp = await getIndustries()
      if (rsp.code === '0') {
        this.industryList = rsp.datas
      }
    },
    checkIndusty(item) {
      localStorage.setItem('industryId', item.bigNo)
      localStorage.removeItem('deptId')
      this.$router.push({ path: '/companyList', query: { name: item.name } })
    }
  }
}
</script>

<style lang="less" scoped>
.industry {
  width: 100%;
  height: 100%;
  background-color: #292a3a;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow: auto;
    .industryList {
      padding: 12px;
      .listItem {
        background-color: rgba(255, 255, 255, 0.1);
        margin-bottom: 2px;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        padding: 15px;
        .orgName {
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
