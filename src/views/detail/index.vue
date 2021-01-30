<template>
  <div class="detailBox">
    <div class="bg">
      <img :src="companyInfo.mainPic || require('../../assets/detailbg.png')" />
    </div>
    <div class="content">
      <van-swipe indicator-color="white">
        <van-swipe-item>
          <div class="infoBox">
            <div v-if="companyInfo" class="info">
              <div class="title">
                {{ companyInfo.name }}
              </div>
              <div class="line"></div>
              <div class="items">
                <div class="item">
                  <div class="label">
                    公司地址
                  </div>
                  <div class="value">
                    {{ companyInfo.address || '暂未填写' }}
                  </div>
                </div>
                <div v-if="companyInfo.scienceOrgType" class="item">
                  <div class="label">
                    科技企业类型
                  </div>
                  <div class="value">
                    {{ companyInfo.scienceOrgType }}
                  </div>
                </div>
                <div v-if="personList.length > 0" class="item">
                  <div class="label">
                    联系方式
                  </div>
                  <div class="value">
                    <div v-for="(item, index) in personList" :key="index">
                      {{ item.position }}&nbsp;&nbsp;{{
                        item.name
                      }}&nbsp;&nbsp;{{ item.mobile || item.tel }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="descriptionTitle">
                企业介绍
              </div>
              <div class="description" v-html="companyInfo.introduction"></div>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item v-if="productLists.length > 0">
          <div class="products">
            <product-list ref="product" />
          </div>
        </van-swipe-item>
      </van-swipe>
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
      personList: [],
      productLists: []
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
        this.personList = rsp.contacters.filter(item => item.isDefault === 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detailBox {
  width: 100%;
  margin: 0;
  position: relative;
  background: rgba(0, 0, 0, 0);
  .bg {
    z-index: 1;
    width: 100%;
    height: 100vh;
    position: fixed;
    img {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      filter: blur(4px);
      filter: drop-shadow(-4px);
      backdrop-filter: blur(4px);
    }
  }
  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    color: #fff;
    .infoBox {
      margin: 10px;
      border-radius: 10px;
      box-sizing: border-box;
      height: calc(100vh - 20px);
      overflow: hidden;
      background: rgba(41, 42, 58, 0.65);
      display: flex;
      flex-direction: column;
      .info {
        flex: 1;
        overflow: auto;
        .title {
          font-weight: 700;
          font-size: 20px;
          padding: 20px 0;
          text-align: center;
          letter-spacing: 2px;
        }
        .line {
          background-color: rgba(255, 255, 255, 0.3);
          height: 2px;
          margin: 0 20px;
        }
        .items {
          padding: 30px;
          .item {
            display: flex;
            margin-bottom: 12px;
            .label {
              color: #fff;
              font-size: 16px;
              width: 110px;
            }
            .value {
              font-size: 15px;
              flex: 1;
            }
          }
        }
        .descriptionTitle {
          text-align: center;
          font-size: 18px;
          font-weight: 700;
        }
        .description {
          color: #ddd;
          margin: 20px 0;
          padding: 0 20px;
          font-size: 16px;
        }
      }
    }
    .products {
      padding: 10px;
      height: calc(100vh - 20px);
    }
  }
}
</style>
