<template>
  <div class="dept">
    <div ref="home" class="content">
      <dept-list />
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
  activated() {
    if (this.$route.meta.isBack) {
      // 企业列表返回操作，比如页面位置
      const indexContainer = this.$refs.home
      indexContainer.scrollTop = this.$route.meta.scroll || 0
    }
  }
}
</script>

<style lang="less" scoped>
.dept {
  font-size: 16px;
  background-color: #292a3a;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow: auto;
  }
}
</style>
