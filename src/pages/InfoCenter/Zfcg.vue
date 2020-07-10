<template>
  <div class="hf_app" id="apps">
    <div>
      <Header message="政府采购"/>
      <div class="nav">
        <div class="info">
          <p style="text-indent: 2em;line-height: 24px">{{introduce}}</p>
        </div>
        <div class="content">
          <van-row class="company" gutter="10" style="text-align: center;padding: 10px">
            <van-col class="one" span="12" v-for="(img_src,index) in img_srcs" :key="index" @click="goto(img_src.a_href)">
              <div>
                <img style="width: 100%;height: 50px;" :src="img_src.img_src" alt="">
              </div>
              <span v-bind:style="{color:img_src.color}">{{img_src.title}}</span>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>

    <!--数据为空开始-------------->
    <!--<div v-else style="width: 100%;height:100%;background: #fff"></div>-->
    <!--数据为空结束-------------->
  </div>
</template>

<script>
  import axios from 'axios'
  import {BASE_URL} from '../../api'
  import Header from '../../components/Header/Header'
  export default {
    data () {
      return {
        introduce:'北京行丰银拓科技有限公司自成立以来一直秉承“以客为尊，用心服务，诚信永恒，高效卓越”的企业文化和服务宗旨。公司依靠优秀的技术，销售，物流，售后团队致力于打造一流的一站式办公服务平台，公司自成立以来一直不断进步，深受各个政府采购方面的信任和喜爱，现已与各大政府部门有着深远的合作以及平台对接。在一起前进的道路上，我们保证一定继续提供最优质的服务。',
        img_srcs:[
          {title:'中国政府采购网',img_src:'./static/images/infoCenter/001.jpg',a_href:'http://www.ccgp.gov.cn/',color:'#2180d8'},
          {title:'中央政府采购网',img_src:'./static/images/infoCenter/002.jpg',a_href:'http://www.zycg.gov.cn/',color:'#c90101'},
          {title:'北京市政府采购网',img_src:'./static/images/infoCenter/003.jpg',a_href:'http://www.ccgp-beijing.gov.cn/',color:'#a2d9de'},
          {title:'中共中央直属机关采购中心',img_src:'./static/images/infoCenter/004.jpg',a_href:'http://zzcg.ccgp.gov.cn/',color:'#ff9329'},
          {title:'天津市政府采购网',img_src:'./static/images/infoCenter/005.jpg',a_href:'http://www.tjgp.gov.cn/',color:'#188cfa'},
          {title:'河北省政府采购网',img_src:'./static/images/infoCenter/006.jpg',a_href:'http://www.ccgp-hebei.gov.cn/province/',color:'#003c87'},
          {title:'军队采购网',img_src:'./static/images/infoCenter/007.jpg',a_href:'https://www.plap.cn/',color:'#268f95'},
          {title:'江苏政府采购网',img_src:'./static/images/infoCenter/008.jpg',a_href:'http://www.ccgp-jiangsu.gov.cn/',color:'#1049a0'},
          {title:'中国海关采购网',img_src:'./static/images/infoCenter/009.jpg',a_href:'http://hgcg.customs.gov.cn/hgcg/',color:'#0b4d99'},
          {title:'武警物资采购网',img_src:'./static/images/infoCenter/010.jpg',a_href:'http://www.capfp.cn/default.jsp',color:'#1d442c'},
          {title:'湖北政府采购网',img_src:'./static/images/infoCenter/011.jpg',a_href:'http://www.ccgp-hubei.gov.cn/',color:'#da0000'},
          {title:'广东省政府采购网',img_src:'./static/images/infoCenter/012.jpg',a_href:'http://www.gdgpo.gov.cn/',color:'#32afe2'},
          {title:'山东政府集中采购网',img_src:'./static/images/infoCenter/013.jpg',a_href:'http://www.sdzfcg.gov.cn/',color:'#0e5f60'},
          {title:'重庆市政府采购网',img_src:'./static/images/infoCenter/014.jpg',a_href:'https://www.cqgp.gov.cn/',color:'#1a80cb'},
          {title:'湖南政府采购网',img_src:'./static/images/infoCenter/015.jpg',a_href:'http://www.ccgp-hunan.gov.cn/',color:'#0d3ec1'},
        ],
      }
    },
    components:{Header},
    methods: {
      goBack(){
        this.$router.go(-1)
      },
      goto(path){
        location.href = path
      },
    }
  }
</script>
<style type="text/css">
  .van-nav-bar .van-icon{
    color: #000;
    font-size: 20px;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .hf_app {
    background-color #fff
    height 100%
    width 100%
    overflow: auto;
    .header {
      /*min-width 375px*/
      width 100%
      height: 100%;
      line-height: 46px;
      background: #fff;
      border-bottom 1px solid #ddd
      position: relative;
      color: #fff;
      z-index: 1;
    }
    .nav{

      .info{
        padding 10px
        p{
          font-size 15px
        }
      }
      .content{
        .company{
          .one{
            margin-bottom 15px
          }
        }
      }
    }
  }
</style>
