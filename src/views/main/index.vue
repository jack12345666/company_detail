<template>
  <div class="main">
    <div class="swipe">
      <van-swipe :autoplay="5000" @change="onChange">
        <van-swipe-item v-for="item in imgList" :key="item.id">
          <img :src="item.url" />
        </van-swipe-item>
        <template #indicator>
          <div class="swipeInt">
            <div class="title">
              <!-- {{ swipeTitle }} -->
              钱塘新区-企涌钱塘
            </div>
            <div class="block"></div>
            <div class="line"></div>
          </div>
        </template>
      </van-swipe>
    </div>
    <div class="content">
      {{ description }}

      <div class="btns">
        <van-button
          color="linear-gradient(to right, #55A6F7, #5682F7)"
          size="small"
          style="margin-left: 0px;"
          @click="toDept"
        >
          按区域查看
        </van-button>
        <!-- <van-button
          color="linear-gradient(to right, #55A6F7, #5682F7)"
          size="small"
          style="margin-left: 0px;"
          @click="toMap"
        >
          按地图查看
        </van-button> -->
        <van-button
          color="linear-gradient(to right, #55A6F7, #5682F7)"
          size="small"
          style="margin-right: 20px; margin-left: 20px;"
          @click="toIndustry"
        >
          按行业查看
        </van-button>
        <van-button
          color="linear-gradient(to right, #55A6F7, #5682F7)"
          size="small"
          style="margin-right: 0px;"
          @click="toEnterprise"
        >
          按企业查看
        </van-button>
      </div>
      <div class="org">
        <a @click="toScienceOrg">科技型企业查看></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swipeTitle: '',
      titleList: ['钱塘新区-企涌钱塘', '六大产业功能'],
      imgList: [
        { id: 1, url: require('../../assets/swipe/swipe1.jpg') },
        { id: 2, url: require('../../assets/swipe/swipe2.jpg') },
        { id: 3, url: require('../../assets/swipe/swipe3.jpg') }
      ],
      description: `
            2019年4月，浙江省人民政府批复
            设立杭州钱塘新区，空间范围包括杭州
            大江东产业集聚区和杭州经济技术开发
            区，拥有杭州经济技术开发区、杭州综
            合保税区、临江高新技术产业开发区3
            块国家级牌子。新区打造六大产业功能
            平台医药港、大创小镇、综合保税区、
            江东芯谷、前进智造园、临江高科园，
            聚焦生命健康、半导体、航空航天、智
            能汽车及智能装备、新材料等五大先进
            制造业，探索布局未来产业，积极发展
            五大现代服务业，构建“515”现代产
            业发展体系。
      `
    }
  },
  created() {
    this.swipeTitle = this.titleList[0]
  },
  methods: {
    onChange(index) {
      this.swipeTitle = this.titleList[index]
    },
    toDept() {
      this.$router.push('/dept')
    },
    toIndustry() {
      this.$router.push('/industry')
    },
    toEnterprise() {
      this.$router.push('/enterprise')
    },
    toScienceOrg() {
      this.$router.push({ path: '/enterprise', query: { isScienceOrg: 1 } })
    },
    toMap() {
      this.$router.push('/map')
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  background-color: #292a3a;
  // min-height: 100vh;
  height: 100%;
  .swipe {
    img {
      width: 100%;
      height: 260px;
    }
    .swipeInt {
      position: absolute;
      left: 30px;
      bottom: 20px;
      font-size: 12px;
      .title {
        font-size: 18px;
        color: #fff;
        font-weight: bold;
      }
      .block {
        width: 90px;
        background: rgba(1, 170, 237, 0.5);
        height: 12px;
        margin: -8px 0 8px 0;
      }
      .line {
        width: 90px;
        background: rgba(1, 170, 237, 0.5);
        height: 2px;
      }
    }
  }
  .content {
    margin-top: -10px;
    background: #292a3a;
    padding: 20px 30px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    .btns {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .org {
      text-align: center;
      margin: 25px 0;
      a {
        color: #fff;
        text-decoration: underline;
      }
    }
  }
}
</style>
