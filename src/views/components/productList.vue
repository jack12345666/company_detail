<template>
  <div class="box">
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
            v-for="item in productList"
            :key="item.id"
            class="listItem"
            @click="toProductList(item)"
          >
            <div class="img">
              <img :src="item.img" />
            </div>
            <div class="nav">
              <div class="name">
                {{ item.name }}
              </div>
              <div class="arrow">
                <van-icon name="arrow" />
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
// import { getServerDepts } from '../../api/home'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      productList: [],
      searchConf: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  created() {},
  methods: {
    async firstLoad() {},
    toProductList(item) {
      localStorage.setItem('deptId', item.id)
      localStorage.removeItem('industryId')
      //   this.$router.push({ path: '/companyList', query: { name: item.name } })
    },
    async onLoad() {},
    async onRefresh() {}
  }
}
</script>

<style lang="less" scoped>
.box {
  padding: 8px;
  border-radius: 10px;
  background: rgba(41, 42, 58, 0.4);
  display: flex;
  flex-direction: column;
  .list {
    flex: 1;
    overflow: auto;
    .listItem {
      margin-bottom: 10px;
      .img {
        margin: 0;
        img {
          width: 100%;
          height: 180px;
          border-radius: 13px 13px 0px 0px;
        }
      }
      .nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #292a3a;
        border-radius: 0px 0px 13px 13px;
        color: #fff;
        padding: 17px 20px;
        margin-top: -5px;
        .name {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
