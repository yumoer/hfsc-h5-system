<template>
  <div class="totop" v-if="btnFlag"  @click="backShop" v-show="toTopIsShow">
    <van-icon class="goTop" name="cart-o"></van-icon>
  </div>
</template>

<script>
  export default {
    name: "top-top",
    data () {
      return {
        toTopIsShow: true,// 控制回到顶部按钮是否显示
        btnFlag:false,  //是否显示
        scrollTop:0, // 滑动距离
      }
    },
    mounted () {
      this.btnFlag = true
    },
    methods: {
      /*回到购物车*/
      backShop () {
        this.$router.push('/shopping')
        this.$router.go(0)
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .totop{
    position: fixed;
    width: 2.5rem ;/* 40/16 */
    height: 2.5rem;
    border-radius: 1.25rem /* 20/16 */;
    opacity: 0.8;
    background: #ee0a24;
    box-shadow: 0 1px 5px 0 #e0e0e0;
    right: 1.125rem; /* 18/16 */
    bottom: 5rem; /* 64/16 */
    z-index: 1200;
    -webkit-transition: opacity .5s;
    transition: opacity .5s;
    .goTop{
      font-size: 1.5rem;
      color: #fff;
      margin: 0 0 0 0.5rem;
      position: relative;
      top: 0.5rem;
      opacity .8
    }
  }
</style>
