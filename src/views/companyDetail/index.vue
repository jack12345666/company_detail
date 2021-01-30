<template>
  <div class="box">
    <div class="img">
      <img :src="companyInfo.mainPic || require('../../assets/default.jpg')" />
    </div>
    <div class="content">
      <div class="title">
        {{ companyInfo.name }}
      </div>
      <div class="line"></div>
      <div class="info">
        <div class="item">
          <div class="label">
            地址
          </div>
          <div class="value">
            {{ companyInfo.address || '暂未填写' }}
          </div>
        </div>
        <div class="item">
          <div class="label">
            联系方式
          </div>
          <div class="value">
            {{ companyInfo.contact }}({{ companyInfo.mobile }})
          </div>
        </div>
        <div class="item">
          <div class="label">
            负责人
          </div>
          <div v-if="personList.length > 0" class="value">
            <div v-for="(item, index) in personList" :key="index">
              {{ item.position }}&nbsp;&nbsp;{{ item.name }}&nbsp;&nbsp;{{
                item.mobile || item.tel
              }}
            </div>
          </div>
          <div v-else class="value">
            暂未填写
          </div>
        </div>
      </div>
      <div class="descriptionTitle">
        企业介绍
      </div>
      <div class="sign"></div>
      <div class="introduce" v-html="companyInfo.introduction"></div>
    </div>
  </div>
</template>

<script>
import { getCompanyDetail } from '../../api/home'
export default {
  data() {
    return {
      companyId: null,
      companyInfo: {},
      personList: []
    }
  },
  created() {
    document.title = this.$route.query.name
    this.companyId = this.$route.query.id
    this.fetchCompanyDetail()
  },
  methods: {
    async fetchCompanyDetail() {
      let rsp = await getCompanyDetail(this.companyId)
      if (rsp.code === '0') {
        this.companyInfo = rsp.data
        this.personList = rsp.contacters
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  overflow: auto;
  background-color: #fff;
  .img {
    z-index: 1;
    img {
      position: fixed;
      top: 0;
      width: 100%;
      height: 330px;
    }
  }
  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 285px;
    overflow: auto;
    background: rgba(41, 42, 58, 0.9);
    border-radius: 35px 35px 0 0;
    z-index: 9999;
    .title {
      text-align: center;
      color: #01aaed;
      font-size: 20px;
      font-weight: bold;
      padding: 15px 0;
    }
    .line {
      margin: 0 35px 35px 35px;
      height: 2px;
      background-color: rgba(13, 237, 168, 0.2);
    }
    .info {
      padding: 0 30px;
      margin-bottom: 50px;
      .item {
        display: flex;
        margin-bottom: 12px;
        .label {
          color: #fff;
          font-size: 16px;
          width: 90px;
        }
        .value {
          color: #95969f;
          font-size: 16px;
          flex: 1;
        }
      }
    }
    .descriptionTitle {
      text-align: center;
      font-size: 16px;
      color: #fff;
      font-weight: bold;
    }
    .sign {
      margin: 0 auto;
      width: 86px;
      height: 16px;
      background: rgba(75, 226, 255, 0.4);
      margin-top: -10px;
    }
    .introduce {
      padding: 22px 50px;
      font-size: 16px;
      color: #95969f;
    }
  }
}
</style>
