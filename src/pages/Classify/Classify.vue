<template>
  <div class="hf_app" id="apps">
    <div v-if="oneShops.length > 0" >
      <header class="header"> <!--<!--left-arrow @click-left="goBack"-->-->
        <van-nav-bar title="商品分类" fixed style="font-weight: bold;width:100%;height: 46px;">
        </van-nav-bar>
      </header>

      <div class="nav">
        <div class="left">
          <div class="wrap" v-for="oneShop in oneShops">
            <div v-if="activeIndex === oneShop.id-1" class="line" style="font-size: 14px;padding: 15px 15px 15px 23px;border-left: 5px solid red;color: red;background: #fff">
              <span>{{oneShop.name}}</span>
            </div>
            <div v-else class="line" @click="checkScroll(oneShop.id-1)" style="font-size: 14px;padding: 15px 15px 15px 28px;">
              <span>{{oneShop.name}}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div v-if="activeIndex === oneShop.id-1" v-for="oneShop in oneShops">
            <div id="wrap" style="padding-top: 10px;padding-left:10px;" v-for="shops in oneShop.subs">
              <div style="font-weight: bold;font-size: 16px;padding-left: 10px;">{{shops.name}}</div>
              <van-grid :border=false :column-num="4">
                <van-grid-item v-for="(shop,index) in shops.subs" :key="index" @click="goto('/classifyList?cat='+shop.id)" :icon="shop.image !== ''?shop.image:'http://hbimg.b0.upaiyun.com/dbfaad8aed38c49805b16e7b2afdb441ab2813b68895-ihqaSI_fw658'" :text="shop.name" ></van-grid-item>
              </van-grid>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>

    <!--数据为空开始-------------->
    <div v-else style="width: 100%;height:100%;background: #fff"></div>
    <!--数据为空结束-------------->
  </div>
</template>

<script>
  import Footer from '../../components/Footer/Footer'
  import axios from 'axios'
  import {BASE_URL} from '../../api'
  export default {
    data () {
      return {
        activeIndex: parseInt(localStorage.activeIndex) || 0,  //默认显示第一个
        activeId:[],  //一级分类
        oneShops:[], // 二三级分类
        items: [],
        scroll:0,
        show:false,
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    components:{Footer},
    mounted(){
      if(this.activeIndex !== undefined){
        this.activeIndex = parseInt(localStorage.activeIndex)
      }
      this.getData()  // 获取分类数据
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      goto(path){
        this.$router.push(path)
        window.location.reload()
        this.$toast.loading({
          mask: true,
          position:'middle',
          message: '加载中...'
        })
      },
      getData(){
        axios.get(BASE_URL+'/mobile/get/goods/category/')
          .then(response => {
            // console.log(response.data)
            this.activeIndex = parseInt(localStorage.activeIndex) || 0
            document.title = '行丰商城-商品分类' // 显示标签名
            this.oneShops = response.data
            this.oneShops.forEach((ele,index)=>{
              this.items=  this.oneShops
              this.items[index].text = ele.name
              this.items[index].children = ele.subs
            })
          })
          .catch(error => {
            console.log(error)
            this.$toast({
              message:'服务器错误'
            })
          })
      },

      checkScroll(activeIndex){
        localStorage.activeIndex = activeIndex
        this.activeIndex = activeIndex
        window.scrollTo(0,0)
      },

    },
  }
</script>
<style type="text/css">
  .van-sidebar van-tree-select__nav{
    border-right: none;
  }
  .van-grid-item__icon{
    font-size: 60px;
  }
  .van-tree-select__content{
    flex:3;
  }
  .van-grid-item__text{
    text-align: center;
    width: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .van-tree-select__content{
    padding-bottom: 46px;
  }
  .van-sidebar van-tree-select__nav{
    position: absolute;
  }
  /*.van-grid-item{
    flex-basis:32%!important;
  }*/
  .van-image{
    font-size: 60px;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .hf_app{
    background-color #fff
    height 100%
    width 100%
    overflow:auto;
    .header{
      /*min-width 375px*/
      width 100%
      height:100%;
      line-height: 46px;
      background:#fff;
      border-bottom 1px solid #ddd
      position:relative;
      color:#fff;
      z-index: 1;
    }
    .nav{
      width 100%
      height 100%
      /*position fixed*/
      .left{
        width 30%
        height 100%
        background #f6f6f6;
        position fixed
        overflow-y auto
        padding-bottom 90px
        &::-webkit-scrollbar{
          display: none;
        }
      }
      .right{
        width 70%
        height 100%
        float right
        overflow-y auto
        padding-bottom 90px
        background #fff
      }
    }
  }
</style>
