<template>
  <div id="wrap">
    <div class="nav">
      <van-icon @click="goBack" class="icon" name="arrow-left" ></van-icon>
    </div>
    <img style="width: 100%;height: 100%" src="../../../static/images/index/details.jpg" alt="">
  </div>
</template>

<script>
  export default {
    methods: {
      goBack(){
        this.$router.push('/unsteady')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#wrap{
  .nav{
    width 100%
    height 45px
    position fixed
    z-index 1
    .icon{
      font-size 20px
      color #fff
      background-color #ddd
      padding 10px
      width 40px
      height 40px
      border-radius 20px
      margin: 20px 0 0 20px
    }
  }
}
</style>
