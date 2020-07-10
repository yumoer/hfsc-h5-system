<template>
  <div id="details">
    <!--头部-->
    <div v-if="result.images !== undefined" class="header">
      <div>
        <!--返回-->
        <div class="nav">
          <van-icon @click="goBack" class="icon" name="arrow-left" ></van-icon>
          <van-icon @click="goShare" style="float: right;margin-right: 10px" class="icon" name="share" ></van-icon>
        </div>

        <!--banner图-->
        <van-swipe class="banner" :autoplay="3000" indicator-color="white" >
          <van-swipe-item v-for="(image,index) in images" :key="index">
            <img v-lazy="image" alt="">
          </van-swipe-item>
        </van-swipe>

        <!--内容区-->
        <div class="content">
          <!--信息-->
          <div class="price">
            <span class="new">￥{{result.price}}</span>
            <span class="old">￥{{result.market_price}}</span>
            <span class="dis">市场价</span>
            <span class="count">库存: {{result.stock}}</span>
          </div>
          <div class="name">
            <p v-if="result.name !== ''">{{result.name}}</p>
          </div>
          <div class="caption">
            <p v-if="result.caption !== ''">{{result.caption}}</p>
          </div>
          <div class="line"></div>
          <!--参数详情-->
          <div class="detail">
            <van-tabs type="card" style="padding-top: 0" animated>
              <van-tab title="商品参数">
                <div class="wrap"  v-html="good.desc_detail">
                  <p>
                    <img style="width: 100%;height: 100%" alt="">
                  </p>
                </div>
              </van-tab>
              <van-tab title="规格包装">
                <div class="wrap"   v-html="good.desc_detail">
                  <p>
                    <img style="width: 100%;height: 100%" alt="">
                  </p>
                </div>
              </van-tab>
              <van-tab title="售后保障">
                <div v-html="good.desc_detail">
                  <p>
                    <img style="width: 100%;height: 100%" alt="">
                  </p>
                </div>
              </van-tab>
            </van-tabs>
          </div>
          <!--购物导航-->
          <van-goods-action class="buyShop" style="width: 100%;">
            <a href="http://wpa.qq.com/msgrd?V=1&amp;uin=3145517362&amp;Site=行丰银拓办公用品商城&amp;Menu=yes'" target="_blank">
              <van-goods-action-icon icon="chat-o" text="客服"></van-goods-action-icon>
            </a>

            <van-goods-action-icon @click="goto('/shopping')" icon="cart-o" text="购物车" :info="num"></van-goods-action-icon>
            <van-goods-action-button @click="goShowAdd" type="warning" text="加入购物车"></van-goods-action-button>

            <van-action-sheet class="show" v-model="showAdd" title="加入购物车">
              <div class="showAdd">
                <div class="showInfo">
                  <div class="showImage">
                    <img v-lazy="result.default_image_url" alt="">
                  </div>
                  <div class="showText">
                    <span class="showName">{{result.name}}</span>
                    <div class="showOther">
                      <span class="disprice">￥{{result.price}}</span>
                      <span class="stock">剩余{{result.stock}}件</span>
                    </div>
                  </div>
                </div>
                <div class="showCount">
                  <span>购买数量</span>
                  <van-stepper
                    class="strpper"
                    v-model="count"
                    @focus="origin_input=shop.count"
                    @blur="on_input(index)"
                    @plus="on_add(index)"
                    @minus="on_minus(index)"
                    integer
                    style="float: right;margin-right: 10px"
                  ></van-stepper>
                </div>
                <div class="showBtn">
                  <van-button
                    class="submit"
                    @click="goAdd()"
                    @focus="origin_input=shop.count"
                    round
                    type="danger"
                    style="width: 100%">确认</van-button>
                </div>
              </div>
            </van-action-sheet>

            <van-goods-action-button type="danger" @click="goShowBuy" text="立即购买"></van-goods-action-button>

            <van-action-sheet class="show" v-model="showBuy" title="立即购买">
              <div class="showAdd">
                <div class="showInfo">
                  <div class="showImage">
                    <img v-lazy="result.default_image_url" alt="">
                  </div>
                  <div class="showText" style="">
                    <span class="showName">{{result.name}}</span>
                    <div class="showOther">
                      <span class="disprice">￥{{result.price}}</span>
                      <span class="stock">剩余{{result.stock}}件</span>
                    </div>
                  </div>
                </div>
                <div class="showCount">
                  <span>购买数量</span>
                  <van-stepper
                    v-model="count"
                    @focus="origin_input=shop.count"
                    @blur="on_input(index)"
                    @plus="on_add(index)"
                    @minus="on_minus(index)"
                    integer
                    style="float: right;margin-right: 10px"
                  ></van-stepper>
                </div>
                <div class="showBtn">
                  <van-button
                    class="submit"
                    @click="goBuy()"
                    round
                    type="danger"
                  >确认</van-button>
                </div>
              </div>
            </van-action-sheet>
          </van-goods-action>
        </div>
      </div>

      <!--分享(vue-native-share)-->
      <van-action-sheet v-model="show" title=" ">
        <vue-native-share :shareMenu="shareMenu" :config="config" />
      </van-action-sheet>
    </div>

    <div v-else style="width: 100%;height: 100%;background: #fff"></div>
  </div>
</template>

<script>
  import {reqDetails,BASE_URL,CASE_URL} from '../../api'
  import vueNativeShare from 'vue-native-share'
  // import ToTop from '../../components/ToTop/ToTop'
  import axios from 'axios'
  import wxApi from '../../assets/js/wxapi.js'
  export default {
    components: {
      vueNativeShare
    },
    mixins: [wxApi],
    data () {
      return {
        show:false,
        id:'',  //详情id
        result:{}, //数据
        images:[], // 图片
        shop:{}, // 商品
        good:{},  //参数数据
        sku_id:0,  // 商品id
        count: 1,  // 商品库存
        selected:false, //加入购物车状态
        token:localStorage.getItem('token') || sessionStorage.getItem('token'),  // 标识
        num:0,  // 购物车商品数量
        showAdd: false, // 加入购物车规格隐藏
        showBuy:false, // 购买规格隐藏
        shareMenu: [0,1,2,3,4,5],
        config: {}
      }
    },
    // components:{ToTop},
    async mounted(){
      document.title = '行丰商城-商品详情'
      this.getShop()
      this.id = location.href.split('?id=')[1]
      const result = await reqDetails(this.id)
      if(result !== undefined || result !== null){
        this.result = result
        let image = this.result.images.filter(function (s) {
          return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
        });
        this.images = image
        this.good = result.goods
        this.config = {
          title: document.title,
          desc: '我正在看['+document.title+']，分享给你，一起来看看吧',
          img: this.images[0],
          img_title: this.result.name,
          link: window.location.href,
          success: () => { //成功回调
            // this.GetMobelType()
            /*this.$toast({
              message:'请打开浏览器的菜单来分享',
              position:'bottom'
            })*/
            this.show = false
          },
          cancel: () => { //取消回调
            this.$toast('cancel')
          },
        }
      }
    },
    methods: {
      /*返回*/
      goBack(){
        this.$router.go(-1)
      },
      goShare(){
        this.show = true
        this.isweixin()
      },
      /**
       * [isweixin 判断是否微信浏览器]
       */
      isweixin() {
        const ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          this.show = false
          // alert('true')
          this.$toast({
            message:'请点击右上方按钮进行分享',
            position:'bottom'
          })
          var t=document.createElement("div");t.className="m-share-tips",t.innerHTML='\n      <div class="m-share-tips-w">\n        <div class="m-share-tips-p">点击右上角“<i class="m-share-iconfont m-share-iconfont-dots"></i>”</div>\n        <div class="m-share-tips-p">分享给朋友吧！</div>\n      </div>\n      <div class="m-share-tips-arrow"></div>\n    ',document.body.appendChild(t),window.setTimeout(function(){e.hideMask(),e.hideRightTips()},1400)
          wxApi.wxRegister(this.wxRegCallback)
        } else if(ua.match(/QQ/i) == 'qq'){
          //qq内置浏览器
          this.show = false
          // alert('true')
          this.$toast({
            message:'请点击右上方按钮进行分享',
            position:'bottom'
          })
          var t=document.createElement("div");t.className="m-share-tips",t.innerHTML='\n      <div class="m-share-tips-w">\n        <div class="m-share-tips-p">点击右上角“<i class="m-share-iconfont m-share-iconfont-dots"></i>”</div>\n        <div class="m-share-tips-p">分享给朋友吧！</div>\n      </div>\n      <div class="m-share-tips-arrow"></div>\n    ',document.body.appendChild(t),window.setTimeout(function(){e.hideMask(),e.hideRightTips()},1400)
          wxApi.wxRegister(this.wxRegCallback)
        }else{
          return false;
        }
      },
      wxRegCallback () {
        this.wxShareTimeline()
      },
      wxShareTimeline () {
        let opstion = {
          title: document.title, // 分享标题
          desc:'我正在看['+document.title+']，分享给你，一起来看看吧', // 分享描述
          link: window.location.href,  // 分享链接
          imgUrl: this.images[0],// 分享图标
          success: function () {
            alert('分享成功')
          },
          error: function () {
            alert('分享失败')
          }
        }
        // 将配置注入通用方法
        wxApi.ShareAppMessage(opstion)
        wxApi.ShareTimeline(opstion)
        wxApi.MenuShareQQ(opstion)
        wxApi.MenuShareQZone(opstion)
      },
      /*路由导航*/
      goto(path){
        this.$router.push(path)
        this.$router.go(0)
      },
      /*获取商品数据*/
      getShop(){
        axios.get(BASE_URL + '/cart/', {
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json',
          withCredentials: true
        })
          .then(response => {
            // console.log(response.data)
            this.num = response.data.length
            response.data.forEach(ele=>{
              if(parseInt(this.id) === ele.id){
                this.shop = ele
              }
            })
          })
          .catch(error => {
            console.log(error.response.data);
            this.$toast({
              message:'服务器错误'
            })
          })
      },
      /*加入购物车*/
      goShowAdd(){
        this.showAdd = true
      },
      goShowBuy(){
        this.showBuy = true
      },
      goAdd(){
        this.sku_id = location.href.split('?id=')[1]
        console.log(this.sku_id)
        axios.post(BASE_URL + '/cart/',{
          sku_id: this.sku_id,
          count: this.count
        }, {
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json',
          withCredentials: true // 跨域时带上cookie
        })
          .then(response => {
            // console.log(response.data)
            if(response.data.selected === true){
              this.$toast({
                message:'添加购物车成功'
              })
              this.showAdd = false
              this.getShop()
              // this.goto('/shopping')
            }
          })
          .catch(error => {
            // console.log(error.response.data);
            if(this.sku_id === '218260'){
              this.$toast({
                message:error.response.data
              })
              this.showAdd = false
            }else{
              this.$toast({
                message:'服务器错误'
              })
              this.showAdd = false
            }

          })
      },
      /*去购买*/
      goBuy(){
        /*localStorage.setItem('skuId',this.id)
        localStorage.setItem('price',this.result.price)
        localStorage.setItem('count',this.count)*/
        this.goto('/shoppay?skuId='+this.id+'&price='+this.result.price+'&count='+this.count)
      },
      on_input(index,count){
        var val = parseInt(count);
        if (isNaN(val) || val <= 0) {
          this.count = val;
        } else {
          // 更新购物车数据
          axios.put(BASE_URL+'/cart/', {
            sku_id: this.shop.id,
            count: val,
            selected: this.shop.selected
          }, {
            headers:{
              'Authorization': 'JWT ' + this.token
            },
            responseType: 'json',
            withCredentials: true
          })
            .then(response => {
              this.count = response.data.count;
            })
            .catch(error => {
              let err = error.response.data;

              if(typeof(err)==='string'){
                alert(err);
              }
              else if ('error_msg' in err || 'non_field_errors' in err) {
                // alert(error.response.data.non_field_errors[0]);
                alert(error.response.data.non_field_errors[0]);
              } else {
                alert('修改购物车失败');
              }
              this.shops[index].count = this.origin_input;
            })
        }
      },
      // 增加操作
      on_add(count,price){
        this.count = this.count + 1
      },
      // 减少操作
      on_minus(count){
        if(this.count > 1){
          this.count = this.count - 1
        }
      },
      submit(){
        this.goto('/shoppay')
        localStorage.setItem('price',this.price)
      }
    },
  }
</script>
<style type="text/css">
  .van-tabs--card>.van-tabs__wrap{
    height: 40px;
  }
  .van-tabs__nav--card{
    height: 40px;
    line-height: 40px;
    margin: 0;
    border: 1px solid #d6d6d6;
  }
  .van-tabs__nav--card .van-tab{
    color: #333;
    border-right: 1px solid #ddd;
  }
  .van-tabs__nav--card .van-tab.van-tab--active{
    color: #ee0a24;
    background: none;
  }
  .van-ellipsis{
    line-height: 40px;
  }
  img{
    width: 100%;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#details{
  position relative
  background #fff
  font-family arial,sans-serif
  .header{
    .nav{
      width 100%
      height 45px
      position fixed
      z-index 1
      .icon{
        font-size 20px
        color #fff
        background-color #666
        padding 5px
        width 30px
        height 30px
        border-radius 20px
        margin: 7px 0 0 5px
      }
    }
    .banner{
      width 100%
      height 375px
      img{
        width 100%
        height 375px
      }
    }
  }
  .content{
    .price{
      width 100%
      height 47px
      padding 15px 10px 0
      .new{
        font-size 24px
        color #e4393c
        font-weight 700
        line-height 1.3
        display inline-block
      }
      .old{
        font-size 16px
        text-decoration line-through
      }
      .dis{
        font-size 10px
        padding 1px
        color #fff
        background #e4393c
      }
      .count{
        float right
        margin-top 5px
      }
    }
    .name{
      padding 10px 10px 0 10px
      font-weight: 700;
      line-height: 24px;
      color #333
      font-size 16px
    }
    .caption{
      font-size 12px
      color #999
      padding 5px 10px 10px 10px
    }
    .line{
      padding-top 10px
      background #e8e8ed
      margin -1px 0
      position relative
      z-index 0
    }
    .detail{
      margin-bottom 40px
      width 100%
      .wrap{
        width 100%
        p{
          width 100%
          img{
            width 100%
          }
        }
      }
    }
    .buyShop{
      height 50px
      a{
        display: block
      }
      .show{
        width:100%
        .showAdd{
          width 100%
          height 100%
          padding 20px
          .showInfo{
            width 100%
            height 100px
            .showImage{
              width 30%
              height 100%
              float left
              img{
                width 100px
                height 100%
              }
            }
            .showText{
              width 70%
              height 100%
              float left
              line-height 25px
              padding-left 20px
              .showName{
                display block
                color #000
                font-size 14px
                text-overflow ellipsis
                overflow hidden
                display -webkit-box
                -webkit-box-orient vertical
                -webkit-line-clamp 2
              }
              .showOther{
                margin-top: 20px;
                .disprice{
                  color red
                  font-size 16px
                }
                .stock{
                  float right
                }
              }
            }
          }

          .showCount{
            width 100%
            height 50px
            line-height 50px
          }
          .showBtn{
            width 100%
            margin-top 20px
            .submit{
              width 100%
            }
          }
        }
      }
    }
  }
}
</style>
