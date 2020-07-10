<template>
  <div class="hf_app" id="app">
    <div class="content" style="">
      <div class="wrap" style="">
        <img style="" src="../../../static/icon.png" alt="">
        <van-loading v-if="_props.type === '1'" class="span" size="24px" color="red">加载数据中...</van-loading>
        <span v-if="_props.type === '2'" class="span" style="font-size: 14px">暂无数据</span>
        <span v-if="_props.type === '3'" class="span" style="font-size: 14px">暂无地址,点击右上方新增</span>
        <span v-if="_props.type === '4'" class="span" style="font-size: 14px">暂无订单,去添加一笔订单</span>
        <span v-if="_props.type === '5'" class="span" style="font-size: 14px">暂无发票,点击右上方新增</span>
        <span v-if="_props.type === '6'" class="span" style="font-size: 14px">暂无登陆信息,去登录</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['type'],
    data () {
      return {
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1)
      }
    },
    mounted(){
      var Height = this.screeHeight - 46
      $('.content').height(Height)
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
    .content{
      background: #f6f6f6
      .wrap{
        width 100%
        height 100%
        img{
          position: absolute;
          width: 150px;
          top: -200px;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
        .span{
          width: 100%;
          display: inline-table;
          text-align: center;
          position: absolute;
          left: 0;
          bottom: 0;
          right: 0;
          top: 0;
          margin: auto;
        }
      }
    }
  }
</style>
