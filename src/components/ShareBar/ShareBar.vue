<template>
  <div class="share" :class="{'share-open':visible}" @click="tap">
    <div class="bdsharebuttonbox bdshare-button-style0-16" v-show="visible">
      <van-grid :span="8" v-for="(item,index) in list" :key="index">
        <a href="#" :class="'bds_'+item.cmd" :data-cmd="item.cmd"></a>
      </van-grid>
    </div>
  </div>
</template>
<script>
  import {BASE_URL} from '../../api'
  var imgUrl = BASE_URL
  export default {
    data() {
      return {
        imgUrl: imgUrl,
        list : [
          {cmd:'tsina', img:imgUrl+'qq.png'},
          {cmd:'sqq', img:imgUrl+'share_qq.png'},
          {cmd:'weixin', img:imgUrl+'share_weixin.png'},
          {cmd:'fbook', img:imgUrl+'share_facebook.png'},
          {cmd:'twi', img:imgUrl+'share_twitter.png'},
          {cmd:'linkedin', img:imgUrl+'share_linkedin.png'},
        ]
      }
    },
    beforeCreate(){
      window._bd_share_main = '';
    },
    mounted() {
      this.$nextTick(() => {
        this.setup();
      });
    },
    props: {
      visible: {
        type: Boolean,
        required: false,
        default() {
          return false;
        }
      },
      shareDesc: {
        type: String,
        required: false,
        default() {
          return '';
        }
      }
    },
    methods:{
      setup(){
        var _this = this;
        window._bd_share_config = {
          "common":{
            "bdSnsKey":{},
            "bdText": _this.shareDesc,
            "bdDesc": _this.shareDesc,
            "bdMini":"2",
            "bdPic": imgUrl + 'logo@2x.png',
            "bdStyle":"0",
            "bdSize":"16"
          },
          "share":{}
        };
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
        document.body.appendChild(s);
      },
      tap() {
        this.$emit('tap');
      }
    }
  }
</script>
<style scoped>
  .share { position: fixed; left:0; bottom:-132px; right:0; z-index: 100; height:132px; transition: all .15s linear; }
  .share-open { bottom:0; transition: all .15s linear; }
  .share-open:before { position: fixed; left:0; top:0; right:0; bottom:0; content:''; background: rgba(0, 0, 0, .2); z-index:1; transition: all .15s linear; }
  .bdshare-button-style0-16 { position: relative; height: 112px; padding:10px 0; background: #fff; overflow: hidden; text-align: center; z-index:2; }
  .bdshare-button-style0-16 a { display: block; float: none; height: 36px; padding:10px 0; margin:0; background-repeat: no-repeat; background-position: center; background-size: auto 80%; text-align: center; }
  .bdshare-button-style0-16 img { height:100%; }
  .bdshare-button-style0-16 .bds_tsina { background-image: url(/static/img/share_sina.png); }
  .bdshare-button-style0-16 .bds_sqq { background-image: url(/static/img/share_qq.png); }
  .bdshare-button-style0-16 .bds_weixin { background-image: url(/static/img/share_weixin.png); }
  .bdshare-button-style0-16 .bds_fbook { background-image: url(/static/img/share_facebook.png); }
  .bdshare-button-style0-16 .bds_twi { background-image: url(/static/img/share_twitter.png); }
  .bdshare-button-style0-16 .bds_linkedin { background-image: url(/static/img/share_linkedin.png); }
</style>
