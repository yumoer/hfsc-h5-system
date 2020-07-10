<template>
  <div id="banner">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item @click="goto('classifyList?cat=724')"><img src="../../../static/images/index/4.jpg" alt=""></van-swipe-item>
      <van-swipe-item><img src="../../../static/images/index/1.jpg" alt=""></van-swipe-item>
      <van-swipe-item><img src="../../../static/images/index/2.jpg" alt=""></van-swipe-item>
      <van-swipe-item><img src="../../../static/images/index/3.jpg" alt=""></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

  export default {
    data () {
      return {

      }
    },
    methods: {
      goto(path){
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #banner{
    width 100%
    height 183px
    img{
      width 100%
      height 183px
    }
  }
</style>
