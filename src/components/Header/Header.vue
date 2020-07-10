<template>
  <header class="header"> <!--<!--left-arrow @click-left="goBack"-->-->
    <van-nav-bar :title="message" fixed left-arrow @click-left="goBack" style="font-weight: bold;width:100%;height: 46px;">
    </van-nav-bar>
  </header>
</template>

<script>
  export default {
    props:['message'],
    data () {
      return {

      }
    },
    mounted(){

    },
    methods: {
      goBack(){
        this.$router.go(-1)
      }
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
  .header {
    line-height: 46px;
    background: #fff;
    border-bottom 1px solid #ddd
    position: relative;
    color: #fff;
    z-index: 2;
  }
</style>
