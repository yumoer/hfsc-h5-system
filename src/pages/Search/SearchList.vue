<template>
  <div id="app">
    <div v-if="skus.length > 0">
      <header class="header">
        <div class="back" @click="goBack" style="">
          <van-icon style="font-size: 20px!important;" name="arrow-left"></van-icon>
        </div>
        <div class="search" style="">
          <van-search
            clearable
            v-model="value"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch"
          >
            <div slot="action" @click="onSearch" style="font-size: 16px">搜索</div>
          </van-search>
        </div>
      </header>
      <div class="con" style="height: 100%" >
        <ul class="sku_s clearfix">
          <li v-for="sku in skus" @click="goto('/indexDetails?id='+sku.id)">
            <a style="background-color: #fff" v-if="sku"><!--{{ sku }}-->
              <img @error="onError('../../../static/images/timg.jpg')" v-lazy="sku.default_image_url" alt="">
              <p>{{ sku.name }}</p>
              <i>&yen;{{ sku.price }}</i>
            </a>
          </li>
        </ul>
        <ToTop/>
        <ToShop/>
      </div>
    </div>
    <div class="content" style="" v-if="skus.length === 0" >
      <header class="header">
        <div class="back" @click="goBack" style="">
          <van-icon style="font-size: 20px!important;" name="arrow-left"></van-icon>
        </div>
        <div class="search" style="">
          <van-search
            clearable
            v-model="value"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch"
          >
            <div slot="action" @click="onSearch">搜索</div>
          </van-search>
        </div>
      </header>
      <NoDate v-if=" show === true" style="" type="2"/>
      <div v-if=" show === false" style="width: 100%;height: 100%;background: #fff"></div>
    </div>
  </div>
</template>

<script>
  import {reqSearch} from '../../api'
  import ToTop from '../../components/ToRoute/ToTop/ToTop'
  import ToShop from '../../components/ToRoute/ToShop/ToShop'
  import NoDate from '../../components/NoDate/NoDate'
  export default {
    data () {
      return {
        username: sessionStorage.username || localStorage.username,
        user_id: sessionStorage.user_id || localStorage.user_id,
        token: sessionStorage.token || localStorage.token,
        code: sessionStorage.code || localStorage.code,
        remenss_s:['硒鼓','墨粉','碎纸机','投影仪','华为手机','复印纸'],
        //搜素结果渲染
        value:'',
        show:false,
        actions: [
          { name: '首页' ,subname: '返回到首页',color:'red'},
          { name: '分类' ,subname: '返回到分类',color:'red'},
          { name: '搜索', subname: '返回到搜索',color:'red'},
          { name: '购物车', subname: '返回到购物车',color:'red'},
          { name: '我的', subname: '返回到我的',color:'red'}
        ],
        page:1,
        page_size:100,
        skus:[],
        count:0,
        src:'',
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    components:{
      ToTop,NoDate,ToShop
    },
    async mounted(){
      document.title = '行丰商城-搜索列表'
      // 获取 内容高度
      var Height = this.screeHeight - $('.header').height()
      $('.content').height(Height)
      this.value = decodeURI(location.href.split('?q=')[1])
      this.go_search(this.value)
      window.addEventListener('scroll', this.scrollTable, true)
    },
    methods: {
      goto(path){
        console.log(path)
        this.$router.push(path)
        // this.$router.go(0)
      },
      goBack(){
        this.$router.go(-1)
        this.skus = []
        this.value = ''
      },
      onSelect(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        this.show = false;
        this.$toast(item.name);
      },
      async go_search(q) {
        // this.$router.replace('/searchList?q='+q)
        this.value = q
        const response = await reqSearch(this.value,this.page,this.page_size)
        this.count = response.count;
        if(this.count === 0){
          this.show = true
          this.$toast({
            message:'您输入的宝贝目前没有找到',
            position:'bottom'
          })
          $('.header').css('position','relative')
          return;
        }
        if(response !== undefined || response !== null){
          let results = response.results;
          for(let i=0; i< results.length; i++){
            let sku = results[i].object;
            this.skus.push(sku);
            if(this.count === this.skus.length){
              this.$toast.clear()
            }
          }
        }
      },
      onSearch(){
        this.$router.replace('/searchList?q='+this.value)
        window.location.reload()
        this.go_search(this.value)
      },
      onError(imageUrl){
        let img = event.srcElement
        img.src = imageUrl
      },
      async scrollTable() {
        // 浏览器窗口高度
        let visibleHeight = window.innerHeight||document.body.clientHeight || document.documentElement.clientHeight
        // 文档高度
        let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        // 滑动高度
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        // console.log(scrollHeight, scrollHeight, scrollTop)
        // 发起请求前需要阻止页面滚动
        if (scrollHeight - (scrollTop + visibleHeight) === 0) {
          // 判断请求数量是否大于商品总数
          if(this.count <= (this.page*this.page_size)) {
            /*this.$toast({
              message:'没有更多'
            })*/

            return false
          }
          this.page = this.page + 1
          // 加载数据
          /*this.$toast.loading({
            mask: true,
            position:'middle',
            message: '加载中...'
          })*/
          this.go_search(this.value)
        } else {
          return false
        }
      }
    },
    watch:{

    }
  }
</script>
<style type="text/css">
  .van-field__control{
    text-align: left;
    margin-left: 20px
  }
  .van-field__label{
    width: 60px;
  }
  .van-nav-bar .van-icon{
    color: #000;
    font-size: 20px;
  }
  .van-search{
    padding: 5px 12px;
  }
  .van-icon .van-icon-arrow-left{
    color: #222;
    cursor: pointer;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app{
    /*搜素框封装css*/
    /*position:relative;*/
    background #fff
    height 100%
    .header{
      width:100%;
      height:46px;
      line-height: 60px;
      background:#fff;
      position:fixed;
      border-bottom solid 1px #ddd
      .back{
        float left
        height 44px
        line-height 55px
        width 10%
        padding-left: 2%
      }
      .search{
        width 90%
        float right
        display inline-block
      }
    }
    .content{
      width 100%
      height 120%
      background #fff
    }
    .con{
      padding-top 46px
      p{
        text-overflow: ellipsis;
        overflow: hidden;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
      }
    }
    .search_input{
      line-height: 40px;
      height:24px;
      border-radius:12px;
      font-size:0.8rem;
      text-indent:10px;
      width:100%;
    }
    .father_search{
      width:100%;
      padding:0 40px;
      position:absolute;
      left:0;
      top:0;
    }
    .back_index{
      color:#fff;
      background:#fff;
      position:absolute;
      left:0;
      width:40px;
      line-height: 40px;
      height:40px;
      text-align: center;
      font-size:24px;
    }
    .ss{
      color:#fff;
      position:absolute;
      right:0;
      line-height: 40px;
      width:40px;
      background:#fff;
      /*background:red;*/
      outline:none;
      border:0 none;
      height:40px;
      display: block;
    }
    /*搜素框封装css*/
    /*footer*/
    .bottom_nav{
      padding:6px 0;
      width:100%;
    }
    .bottom_nav li{
      float:left;
      width:20%;
    }
    .bottom_nav li a{
      display: block;
      width:100%;
    }
    .bottom_nav li a img{
      display: block;
      width:25%;
      margin:0 auto;
    }
    .bottom_nav li a span{
      display: block;
      width:100%;
      text-align: center;
    }

    /*skus*/
    .sku_s{
      width:100%;
      padding:0 2px;
    }
    .sku_s li{
      border:2px solid #f7f7f7;
      width:50%;
      float:left;
      /*background:pink;*/
    }
    .sku_s li a{
      display: block;
      width:100%;

    }
    .sku_s li a img{
      width: 90%;
      height: 160px;
      display: block;
      margin:0 auto;
    }
    .sku_s li a p{
      width:90%;
      margin:0 auto;
      line-height: 1rem;
      height:2rem;
      overflow: hidden;
      text-align: left;
      margin-top: 5px
    }
    .sku_s li a i{
      display: block;
      width:90%;
      margin:0 auto;
      text-align: left;
      line-height: 1rem;
      height:1.5rem;
      overflow: hidden;
      color:red;
      margin-top: 5px
      font-style:normal;
    }

    .pagenation{
      width:100%;
      padding-bottom:50px;
    }
    .pagenation a{
      height:40px;
      line-height:40px;
      text-align: center;
      display: block;
      border:1px solid #ccc;
      float:left;
      width:14%;
      /*padding:4px 10px;*/
      /*margin-left:4px;*/
    }
  }
</style>
