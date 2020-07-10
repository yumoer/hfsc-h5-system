<template>
  <div class="totop" v-if="btnFlag"  @click="backTop" v-show="toTopIsShow">
    <van-icon class="goTop" name="arrow-up"></van-icon>
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
    }
    ,
    methods: {
      /*回到顶部*/
      backTop () {
        const that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },

      // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
      scrollToTop () {
        const that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
        if (that.scrollTop > 1000) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }
      }

    },

    mounted () {
      window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    }
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
    bottom: 8rem; /* 64/16 */
    z-index: 1100;
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
