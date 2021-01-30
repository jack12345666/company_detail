<template>
  <div class="box">
    <div class="list">
      <div
        v-for="item in deptList"
        :key="item.id"
        class="listItem"
        @click="toCompanyList(item)"
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
    </div>
  </div>
</template>

<script>
import { getServerDepts } from '../../api/home'
export default {
  data() {
    return {
      deptList: []
    }
  },
  created() {
    this.fetchDeptList()
  },
  methods: {
    async fetchDeptList() {
      let rsp = await getServerDepts()
      if (rsp.code === '0') {
        if (rsp.datas.length > 0) {
          rsp.datas.forEach(item => {
            this.deptList.push({
              id: item.id,
              name: item.comment.name,
              img: item.comment.pic
            })
          })
        }
      }
    },
    toCompanyList(item) {
      localStorage.setItem('deptId', item.id)
      localStorage.removeItem('industryId')
      this.$router.push({ path: '/companyList', query: { name: item.name } })
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding: 20px;
  .list {
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
        background: rgba(239, 239, 244, 0.1);
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
