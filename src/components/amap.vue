<template>
  <div class="box">
    <div id="map" :style="{ width: '100%', height: '100vh' }"></div>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图
import { QYQT } from '../utils/config'
// import { Toast } from 'vant'
export default {
  props: {
    center: {
      type: Array,
      default: function() {
        return [120.442067, 30.324788]
      }
    },
    // height: {
    //   type: Number,
    //   default: 460
    // },
    depts: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      path: [
        [116.403322, 39.920255],
        [116.410703, 39.897555],
        [116.402292, 39.892353],
        [116.389846, 39.891365]
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let mMap = new AMap.Map('map', {
        center: this.center,
        resizeEnable: true,
        zoom: 11,
        attributionControl: false,
        zoomEnable: true,
        dragEnable: true,
        mapStyle: 'amap://styles/a82e7b1f1f7c2ae354ed40bf2cb8fe8b'
      })
      // AMap.event.addListener(mMap, 'click', function() {
      //   // 添加点击事件,传入对象名，事件名，回调函数
      //   Toast('click')
      // })

      // let polygon = new AMap.Polygon({
      //   path: this.path,
      //   strokeColor: '#37a7c4',
      //   strokeWeight: 3,
      //   strokeOpacity: 0.2,
      //   fillOpacity: 0.2,
      //   fillColor: '#37a7c4',
      //   zIndex: 50
      // })

      // this.mMap.add(polygon)
      // // 缩放地图到合适的视野级别
      // this.mMap.setFitView([polygon])

      this.depts.forEach(function(marker) {
        let mark = new AMap.Marker({
          map: mMap,
          clickable: true,
          icon: 'https://i.loli.net/2020/11/23/U3HGETIi9oWfr6R.png',
          position: marker.position,
          offset: new AMap.Pixel(-13, -30)
        })

        mark.setLabel({
          offset: new AMap.Pixel(0, 0), // 设置文本标注偏移量
          content: `<div class='info'>${marker.name}</div>`, // 设置文本标注内容
          direction: 'bottom' // 设置文本标注方位
        })

        let infoWindowContent = `
        <a href="${QYQT}/#/companyList?name=${marker.name}&id=${marker.id}">
        <div
          class="listItem"
        >
          <div class="img">
            <img src="${marker.img}" />
          </div>
          <div class="nav">
            <div class="name">
            ${marker.name}
            </div>
            <div class="arrow">
              <van-icon name="arrow" color="#fff"/>
            </div>
          </div>
        </div>
        </a>
        `

        // 创建一个自定义内容的 infowindow 实例
        let infoWindow = new AMap.InfoWindow({
          position: marker.position,
          offset: new AMap.Pixel(0, -35),
          content: infoWindowContent
        })

        AMap.event.addListener(mark, 'click', function() {
          infoWindow.open(mMap)
        })
      })
    }
  }
}
</script>

<style lang="less">
.amap-logo {
  opacity: 0; //去掉高德地图logo
}
.amap-copyright {
  opacity: 0; //去掉高德的版本号
}
.amap-icon img {
  width: 25px;
  height: 25px;
}
.amap-marker-label {
  border: 0;
  border-color: #fff;
  background: transparent;
}
.bottom-center .amap-info-sharp {
  border-top: 8px solid #efeff41a;
}
.info {
  border-color: #fff;
  color: #fff;
}
.amap-info-content {
  background: #292a3a !important;
  padding: 0;
  overflow: hidden;
  height: 236px;
  border-radius: 10px;
}
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
    background: #efeff41a;
    border-radius: 0px 0px 13px 13px;
    color: #fff;
    padding: 17px 20px;
    margin-top: -5px;
    .name {
      font-weight: bold;
    }
  }
}
</style>
