<template>
  <div class="hf_app" id="app">
    <header class="header">
      <van-nav-bar title="分类列表" fixed left-arrow @click-left="goBack" style="font-weight: bold;width:100%;">
      </van-nav-bar>
    </header>
    <div class="con" style="height: 100%" v-if="skus.length > 0">
      <ul class="sku_s clearfix">
        <li v-for="sku in skus" @click="goto('/indexDetails?id='+sku.id)">
          <a @click="goto('/indexDetails?id='+sku.id)" style="background-color: #fff"><!--{{ sku }}-->
            <img @error="onError('../../../static/images/timg.jpg')" v-lazy="sku.default_image_url" alt="">
            <p>{{ sku.name }}</p>
            <i>&yen;{{ sku.price }}</i>
          </a>
        </li>
      </ul>
    </div>
    <div v-if="skus.length === 0">
      <div v-if="show === false" style="width: 100%;height: 100%;background: #fff"></div>
      <NoDate v-if="show === true" type="2"/>
    </div>
    <ToTop/>
    <ToShop/>
  </div>
</template>

<script>
  import axios from 'axios'
  import ToTop from '../../components/ToRoute/ToTop/ToTop'
  import ToShop from '../../components/ToRoute/ToShop/ToShop'
  import {BASE_URL} from '../../api'
  import NoDate from '../../components/NoDate/NoDate'
  export default {
    data () {
      return {
        cat:location.href.split('?cat=')[1],
        page:1,
        page_size:100,
        ordering:'-create_time',
        skus:[],
        count:0,
        show:false,
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    components:{ToTop,NoDate,ToShop},
    mounted(){
      document.title = '行丰商城-分类列表'
      var Height = this.screeHeight - $('.header').height() -5
      $('.content').height(Height)
      this.getList()
    },
    created(){
      this.getList()
    },
    methods: {
      goto(path){
        this.$router.push(path)
      },
      goBack(){
        this.$router.go(-1)
        this.skus = []
      },
      getList(){
        axios.get(BASE_URL+'/categories/'+this.cat+'/skus/', {
          params: {
            page: this.page,
            page_size: this.page_size,
            ordering: this.ordering
          },
          responseType: 'json'
        })
          .then(response => {
            // console.log(response)
            this.count = response.data.count;
            if(this.count !== 0){
              this.show = false
            }else{
              this.show = true
              /*this.$toast({
                message:'您输入的宝贝目前没有找到',
                position:'bottom'
              })*/
            }
            this.skus = response.data.results;
            if(this.count === this.skus.length){
              this.$toast.clear()
            }
          })
          .catch(error => {
            // console.log(error.response);
            if(error.response !== undefined || error.response !== null){
            }else{
              this.$toast({
                position:'bottom',
                message:'服务器错误'
              });
            }
          })
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
  #app{
    background-color #f7f7f7
  }
  .header{
    /*min-width 375px*/
    width 100%
    height:40px;
    line-height: 40px;
    background:#fff;
    border-bottom 1px solid #ddd
    /*position:relative;*/
    color:#fff;
    z-index: 1;
  }
  .con{
    padding-top 4px
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
</style>
