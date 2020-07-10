<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
  import Footer from './components/Footer/Footer'
export default {
  name: 'App',
  provide() { // 注册一个方法
    return {
      reload: this.reload
    }
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path === "index") {
        document.getElementById('app').scrollTop = to.meta.scollTopPosition;
      }else{
        if (from.path === "classify") {
          document.getElementById('app').scrollTop = to.meta.scollTopPosition;
        }
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    if(from.meta.keepAlive) {
      from.meta.scollTopPosition = document.getElementById('app').scrollTop;
    }
    next();
  },
  components:{Footer},
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
  html{
    width:100%;
    height:auto;
    margin:auto;
    background-color: #f6f6f6;
  }
  body{
    width:100%;
    height:auto;
    margin:auto;
    background-color: #f6f6f6;
  }
  @supports (bottom: env(safe-area-inset-bottom)) {
    body {
      margin-bottom: env(safe-area-inset-bottom);
    }
  }
  body::-webkit-scrollbar {
    display:none
  }
  #app {
    width:100%;
    height: 100%;
    background-color: #f6f6f6;
  }
</style>
