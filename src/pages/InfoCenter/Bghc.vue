<template>
  <div class="hf_app" id="apps">
    <Header message="办公耗材"/>
    <div class="nav">

    </div>
  </div>
</template>

<script>
  import Header from '../../components/Header/Header'
  export default {
    data () {
      return {}
    },
    components:{Header},
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .hf_app {
    background-color #fff
    height 100%
    width 100%
    overflow: auto;
    .nav{

    }
  }
</style>
