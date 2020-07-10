<template>
  <div id="app">
    <!--数据为空开始-------------->
    <div v-if="skus.length === 0" style="width: 100%;height:100%;background: #fff"></div>
    <!--数据为空结束-------------->
    <div v-else>
      <header class="header">
        <!--<div class="back" @click="goBack">
          <van-icon name="arrow-left"></van-icon>
        </div>-->
        <div class="search">
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
      <nav class="remen" style="">
        <van-cell-group>
          <van-cell title="热门搜索"></van-cell>
        </van-cell-group>
        <div style="width: 100%">
          <van-grid :column-num="3">
            <van-grid-item
              v-for="(remen,index) in remenss"
              :key="index"
              :text="remen"
              @click="ToSearch(remen)"
            ></van-grid-item>
          </van-grid>
        </div>
      </nav>
      <Footer/>
    </div>
  </div>
</template>

<script>
  import {reqSearch,reqSearchResult,BASE_URL} from '../../api'
  import Footer from '../../components/Footer/Footer'
  export default {
    data () {
      return {
        username: sessionStorage.username || localStorage.username,
        user_id: sessionStorage.user_id || localStorage.user_id,
        token: sessionStorage.token || localStorage.token,
        code: sessionStorage.code || localStorage.code,
        remenss:['硒鼓','墨粉','碎纸机','投影仪','华为手机','复印纸'],
        value:'',
        skus:[],
        show:false,
        query:'',
        page:1,
        page_size:100,
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    components:{Footer},
    mounted(){
      var Height = this.screeHeight - $('.header').height()
      $('.remen').height(Height)
      this.getDate()
    },
    created(){
      this.$nextTick(()=>{
        this.show = true
      })
    },
    methods: {
      ToSearch(q){
        this.goto('/searchList?q='+q)
      },
      async getDate(){
        const response = await reqSearchResult(this.query,this.page,this.page_size)
        // console.log(response.results)
        if(response !== undefined || response !== null){
          document.title = '行丰商城-搜索'
          this.count = response.count
          let results = response.results;
          for(let i=0; i< results.length; i++){
            let sku = results[i].object;
            this.skus.push(sku);
          }
        }else{
        }
      },
      async onSearch(){
        const response = await reqSearch(this.value,this.page,this.page_size)
        // console.log(response)
        this.skus = [];
        this.count = response.count;
        this.goto('/searchList?q='+this.value)
      },
      goto(path){
        if(path.split('?q=')[0] === '/searchList'){
          this.$toast.loading({
            mask: true,
            position:'middle',
            message: '加载中...'
          })
          this.$router.push(path)
          window.location.reload()
        }else{
          this.$router.push(path)
        }
      },
      goBack(){
        this.$router.go(-1)
      },
    }
  }
</script>
<style type="text/css">
  .van-field__control{
    text-align: left;
    margin-left: 20px
  }
  .van-nav-bar .van-icon{
    color: #222;
    font-size: 20px;
    cursor: pointer;
  }
  .van-search{
    padding: 5px 12px;
  }
  .van-field__label{
    width: 60px;
  }
  .van-icon .van-icon-arrow-left {
    font-size: 20px;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  /*搜素框封装css*/
  .header{
    width:100%;
    height:46px;
    line-height: 60px;
    background:#fff;
    /*position:fixed;*/
    position:relative;
    .back{
      float left
      height 54px
      line-height 60px
      width 10%
      font-size 22px
      padding-left: 2.5%
    }
    .search{
      width 100%
      float right
      display inline-block
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
  .ss span{
    color:#fff;
    font-size: 14px;
  }
</style>
