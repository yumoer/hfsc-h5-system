<template>
  <footer id="footer" >
    <ul class="bottom_nav clearfix">
      <li>
        <a @click="goto('/index')"  class="index">
          <van-icon class="icon" name="wap-home-o"></van-icon>
          <span>首页</span>
        </a>
      </li>
      <li>
        <a @click="goto('/classify')" class="classify">
          <van-icon class="icon" name="apps-o"></van-icon>
          <span>分类</span>
        </a>
      </li>
      <li>
        <a @click="goto('/search')" class="search">
          <van-icon class="icon" name="search"></van-icon>
          <span>搜索</span>
        </a>
      </li>
      <li>
        <a @click="goto('/shopping')" class="shopping">
          <van-icon class="icon" name="cart-o"></van-icon>
          <span>购物车</span>
        </a>
      </li>
      <li>
        <a @click="goto('/my')" class="my">
          <van-icon class="icon" name="manager-o"></van-icon>
          <span>我的</span>
        </a>
      </li>
    </ul>
  </footer>
</template>

<script>
  export default {
    data () {
      return {
        title:location.href.split('#/')[1],
        token:localStorage.token || sessionStorage.token
      }
    },
    methods: {
      goto(path){
        this.$router.push(path)
        this.$router.go(0)
      }
    },
    mounted(){
      if(this.title === 'index'){
        $('.index').css('color','red')
      }else if(this.title === 'classify'){
        $('.classify').css('color','red')
      }else if(this.title === 'search'){
        $('.search').css('color','red')
      }else if(this.title === 'shopping'){
        $('.shopping').css('color','red')
      }else if(this.title === 'my'){
        $('.my').css('color','red')
      }
    },
    watch: {
      '$route': function (to, from) {
        console.log(to.name)
        if(to.name === 'index'){
          $('.index').css('color','red')
          $('.classify').css('color','#000')
          $('.search').css('color','#000')
          $('.shopping').css('color','#000')
          $('.my').css('color','#000')
        }else if(to.name === 'classify'){
          $('.index').css('color','#000')
          $('.classify').css('color','red')
          $('.search').css('color','#000')
          $('.shopping').css('color','#000')
          $('.my').css('color','#000')
        }else if(to.name === 'search'){
          // window.location.reload()
          $('.index').css('color','#000')
          $('.classify').css('color','#000')
          $('.search').css('color','red')
          $('.shopping').css('color','#000')
          $('.my').css('color','#000')
        }else if(to.name === 'shopping'){
          // window.location.reload()
          $('.index').css('color','#000')
          $('.classify').css('color','#000')
          $('.search').css('color','#000')
          $('.shopping').css('color','red')
          $('.my').css('color','#000')
        }else if(to.name === 'my'){
          $('.index').css('color','#000')
          $('.classify').css('color','#000')
          $('.search').css('color','#000')
          $('.shopping').css('color','#000')
          $('.my').css('color','red')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /*footer*/
  footer{
    position:fixed;
    bottom:0;
    background:rgba(255,255,255,1);
    height: 47px;
    border-top: solid 1px #ddd;
    width:100%;
    .bottom_nav{
      padding:6px 0;
      width:100%;
      li{
        float:left;
        width:20%;
        a{
          display: block;
          width:100%;
          .icon{
            display: block;
            width:30%;
            margin:0 auto;
            font-size 20px
            text-align: center;
          }
          .icons{
            display none
            width:30%;
            margin:0 auto;
            font-size 20px
            text-align: center;
            color #E43130
          }
          span{
            display: block;
            width:100%;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
