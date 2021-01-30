<template>
  <div class="box">
    <div class="search">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
    </div>
    <div id="main" ref="companyList" class="content">
      <div class="list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              v-for="(item, index) in searchOrgList"
              :key="index"
              class="listItem"
              @click="checkOrg(item.id, item.name)"
            >
              <div class="orgName">
                {{ item.name }}
              </div>
            </div>
          </van-list>
        </van-pull-refresh>

        <van-empty v-if="searchOrgList.length === 0" description="暂无内容" />
      </div>
    </div>
  </div>
</template>

<script>
import { getCompanys, getCompanysByIndustry } from '../../api/home'
export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === 'detail') {
      to.meta.isBack = true
      next()
    } else {
      to.meta.isBack = false
      next(vm => {
        document.title = vm.$route.query.name
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    const indexContainer = this.$refs.companyList
    // 记录滚动高度
    this.$route.meta.scroll = indexContainer.scrollTop
    next()
  },
  data() {
    return {
      value: '',
      loading: false,
      finished: false,
      refreshing: false,
      searchOrgList: [],
      searchConf: {
        pageIndex: 1,
        pageSize: 20,
        searchText: ''
      }
    }
  },
  created() {
    if (this.$route.query.name) {
      document.title = this.$route.query.name
    }
    if (this.$route.query.id) {
      localStorage.setItem('deptId', this.$route.query.id)
    }
    if (localStorage.getItem('deptId')) {
      this.searchConf.bigNo = null
      this.searchConf.serverDept = localStorage.getItem('deptId')
    } else {
      this.searchConf.serverDept = null
      this.searchConf.bigNo = localStorage.getItem('industryId')
    }
    this.firstLoad()
  },
  activated() {
    if (this.$route.query.name) {
      document.title = this.$route.query.name
    }
    if (this.$route.query.id) {
      localStorage.setItem('deptId', this.$route.query.id)
    }
    if (!this.$route.meta.isBack) {
      if (localStorage.getItem('deptId')) {
        this.searchConf.bigNo = null
        this.searchConf.serverDept = localStorage.getItem('deptId')
      } else {
        this.searchConf.serverDept = null
        this.searchConf.bigNo = localStorage.getItem('industryId')
      }
      this.firstLoad()
    } else {
      // 详情页返回操作，比如页面位置
      const indexContainer = this.$refs.companyList
      indexContainer.scrollTop = this.$route.meta.scroll || 0
    }
  },
  methods: {
    async firstLoad() {
      this.searchOrgList = []
      this.searchConf.pageIndex = 1
      let rsp = null
      if (localStorage.getItem('deptId')) {
        rsp = await getCompanys(this.searchConf)
      } else {
        rsp = await getCompanysByIndustry(this.searchConf)
      }
      if (rsp.code === '0') {
        this.searchOrgList = rsp.datas
        this.refreshing = false
        if (this.searchOrgList.length < this.searchConf.pageSize) {
          this.finished = true
        } else {
          this.finished = false
        }
      }
    },
    async onLoad() {
      this.searchConf.pageIndex++
      let rsp = null
      if (localStorage.getItem('deptId')) {
        rsp = await getCompanys(this.searchConf)
      } else {
        rsp = await getCompanysByIndustry(this.searchConf)
      }
      if (rsp.datas.length === 0) {
        this.loading = false
        this.finished = true
      } else {
        this.searchOrgList = this.searchOrgList.concat(rsp.datas)
        this.loading = false
      }
    },
    async onRefresh() {
      this.finished = false
      this.refreshing = true
      this.searchConf.pageIndex = 1
      this.firstLoad()
    },
    onSearch() {
      this.searchConf.pageIndex = 1
      this.searchConf.searchText = this.value
      this.searchOrgList = []
      this.firstLoad()
    },
    checkOrg(id, name) {
      this.$router.push({ path: '/detail', query: { id, name } })
    }
  }
}
</script>
<style>
.van-search {
  padding: 20px 30px;
  background-color: #292a3a;
}
.van-search .van-cell {
  background-color: #3f404e;
  border-radius: 10px;
}
.van-icon-search::before {
  color: #4791ff;
  size: 24px;
}
.van-field__control {
  color: #fff;
}
.van-search__content {
  background-color: #3f404e;
  color: #fff;
  border-radius: 10px;
}
</style>
<style lang="less">
.box {
  background-color: #292a3a;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow: auto;
    .list {
      padding: 0 12px;
      min-height: 600px;
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
