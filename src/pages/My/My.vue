<template>
  <div class="hf_app" id="app">
    <div style="width: 100%;height: 100%;" v-if="token === null">
      <div v-if="skus.length === 0" style="width: 100%;height: 100%;background: #fff"></div>
      <div v-else>
        <header class="header">
          <van-nav-bar class="head" fixed title="我的" @click-left="goBack" style="width: 100%;"></van-nav-bar>
        </header>
        <div class="wrap">
          <div class="content">
            <div class="top">
              <div style="float: right">
                <van-cell title="未登录" icon="bookmark" style="background: none;font-size: 14px"></van-cell>
              </div>
              <van-image class="image" round width="100px" height="100px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571377037335&di=5f2453f5e6ec5d3676b753b9aa85a3a9&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01460b57e4a6fa0000012e7ed75e83.png%401280w_1l_2o_100sh.png" fit="cover">
              </van-image>
              <div class="username" @click="goto('/login?next=my')"><van-button type="danger" style="border-radius: 10px">点击登录</van-button></div>
            </div>
            <div class="center">
              <van-cell-group class="user-group">
                <van-cell title="全部订单" icon="description" is-link @click="toast"></van-cell>
              </van-cell-group>
              <div style="width: 100%;height: 5px;background: #f6f6f6"></div>
              <van-cell-group>
                <van-cell title="收货地址" icon="hotel-o" is-link @click="toast"></van-cell>
                <van-cell title="个人信息" icon="records" is-link @click="toast"></van-cell>
                <van-cell title="修改密码" icon="discount" is-link @click="toast"></van-cell>
                <van-cell title="发票管理" icon="notes-o" is-link @click="toast"></van-cell>
              </van-cell-group>
            </div>
            <div style="width: 100%;height: 1px;background: #f6f6f6"></div>
            <div class="bottom" v-if="shops.length !== 0">
              <van-cell title="最近浏览"></van-cell>
              <div class="shop" v-for="shop in shops" @click="goto('/indexDetails?id='+shop.id)">
                <div class="images">
                  <img v-lazy="shop.default_image_url" alt="">
                </div>
                <div class="shopinfo">
                  <div class="info_top">{{shop.name}}</div>
                  <div class="info_bottom">
                    <span class="price">￥{{shop.price}}</span>
                    <span class="assess" style="float: right;margin-right: 10px">{{shop.comments}}评价</span>
                  </div>
                </div>
              </div>
              <van-action-sheet
                v-if="show"
                v-model="show"
                :actions="actions"
                cancel-text="取消"
                @select="onSelect"
                @cancel="onCancel"
              ></van-action-sheet>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
    <div v-else>
      <div v-if="skus.length === 0" style="width: 100%;height: 100%;background: #fff"></div>
      <div v-else>
        <header class="header">
          <van-nav-bar class="head" fixed title="我的" @click-left="goBack" style="width: 100%;">
            <van-icon name="ellipsis" slot="right" @click="setRight"></van-icon>
          </van-nav-bar>
        </header>
        <div class="wrap">
          <div class="content">
            <div class="top">
              <!--普通-->
              <div v-if="code === ''">
                <div style="float: right;">
                  <van-cell title="普通用户" icon="label" style="background: none;font-size: 14px"></van-cell>
                </div>
                <!--http://img.zcool.cn/community/01650e57e4a6fa0000012e7e6eab80.png@1280w_1l_2o_100sh.png-->
                <van-image class="image" round width="100px" height="100px" src="http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png" fit="cover">
                </van-image>
              </div>
              <!--央采-->
              <div v-if="code !== ''">
                <div style="float: right;">
                  <van-cell title="央采用户" icon="bookmark" style="background: none;font-size: 14px"></van-cell>
                </div>
                <van-image class="image" round width="100px" height="100px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570534827025&di=11e89dd29f4faec93dd0de848fb379cc&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c8415b10ec7aa801212d57334fdc.png%401280w_1l_2o_100sh.png" fit="cover">
                </van-image>
              </div>
              <div class="username">{{info.username}}</div>
            </div>
            <div class="center">
              <van-cell-group class="user-group" style="">
                <van-cell title="全部订单" icon="description" is-link @click="goto('/myOrder')"></van-cell>
              </van-cell-group>
              <div style="width: 100%;height: 5px;background: #f6f6f6"></div>
              <van-cell-group>
                <van-cell title="收货地址" icon="hotel-o" is-link @click="goto('/myShopAddress')"></van-cell>
                <van-cell title="个人信息" icon="records" is-link @click="goto('/myInfo')"></van-cell>
                <van-cell title="修改密码" icon="discount" is-link @click="goto('/myChangePwd')"></van-cell>
                <van-cell title="发票管理" icon="notes-o" is-link @click="goto('/myInvoices')"></van-cell>
              </van-cell-group>
            </div>
            <div style="width: 100%;height: 1px;background: #f6f6f6"></div>
            <div class="bottom" v-if="shops.length !== 0">
              <van-cell title="最近浏览"></van-cell>
              <div class="shop" v-for="shop in shops" @click="goto('/indexDetails?id='+shop.id)">
                <div class="images">
                  <img v-lazy="shop.default_image_url" alt="">
                </div>
                <div class="shopinfo">
                  <div class="info_top">{{shop.name}}</div>
                  <div class="info_bottom">
                    <span class="price">￥{{shop.price}}</span>
                    <span class="assess" style="float: right;margin-right: 10px">{{shop.comments}}评价</span>
                  </div>
                </div>
              </div>
            </div>
            <van-action-sheet
              v-if="show"
              v-model="show"
              :actions="actions"
              cancel-text="取消"
              @select="onSelect"
              @cancel="onCancel"
            ></van-action-sheet>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Footer from '../../components/Footer/Footer'
  import { Dialog } from 'vant';
  import {BASE_URL,reqSearchResult} from '../../api'
  import NoDate from '../../components/NoDate/NoDate'
  import ToLogin from '../../components/ToRoute/ToLogin/ToLogin'
  export default {
    data () {
      return {
        token:localStorage.getItem('token') || sessionStorage.getItem('token'),
        shops:[],
        query:'',
        page:1,
        page_size:10,
        skus:[],
        showHide:false,
        show:false, //是否显示设置
        code:localStorage.code || sessionStorage.code,
        actions: [ // 信息
          { name: '退出登陆', color: '#ee0a24' },
        ],
        info:{
          user_id:'',
          username:'',
          mobile:'',
          email:'',
          email_active:''
        }
      }
    },
    components:{Footer,NoDate,ToLogin},
    mounted(){
      document.title = '行丰商城-我的'
      console.log(this.code)
      if(this.code === undefined){
        this.code =  ''
        localStorage.code = ''
        sessionStorage.code = ''
      }
      this.ifLogin()
      this.getDate()
    },
    created(){
    },
    methods:{
      goto(path){
        this.$router.push(path)
        console.log(path)
        if(path.split('?id=')[0] !== '/indexDetails'){
          localStorage.default = true
        }
      },
      goBack(){
        this.$router.go(-1)
      },
      toast(){
        this.$toast({
          message:'请先登录',
          position:'bottom'
        })
      },
      setRight(){
        this.show = true
      },
      async getDate(){
        const response = await reqSearchResult(this.query,this.page,this.page_size)
        // console.log(response.results)
        if(response !== undefined || response !== null){
          document.title = '行丰商城-我的'
          this.count = response.count
          let results = response.results;
          for(let i=0; i< results.length; i++){
            let sku = results[i].object;
            this.skus.push(sku);
          }
        }else{
          console.log('111')
        }
      },
      logout(){
        if(sessionStorage.code||localStorage.code){
          location.href = 'http://121.43.184.110:8080/logout.do';
        }
        else{
          this.$router.push('/my');
          this.$toast({
            message:'已退出登陆,请重新登陆'
          })
          window.location.reload()
        }
        sessionStorage.clear();
        localStorage.clear();
      },
      ifLogin(){
        // 判断用户的登录状态
        if (this.token !== null) {
          this.showHide = false
          axios.get(BASE_URL + '/user/', {
            // 向后端传递JWT token的方法
            headers: {
              'Authorization': 'JWT ' + this.token
            },
            responseType: 'json',
          })
            .then(response => {
              // 加载用户数据
              this.info.user_id = response.data.id;
              this.info.username = response.data.username;
              this.info.mobile = response.data.mobile;
              this.info.email = response.data.email;
              this.info.email_active = response.data.email_active;
              // 补充请求浏览历史
              axios.get(BASE_URL + '/browse_histories/', {
                headers: {
                  'Authorization': 'JWT ' + this.token
                },
                responseType: 'json'
              })
                .then(response => {
                  this.shops = response.data;
                })
                .catch(error => {
                  console.log(error)
                  this.$toast({
                    message:'服务器错误'
                  })
                });
            })
            .catch(error => {
              if (error.response.status===401 || error.response.status===403) {
                this.showHide = true
              }else{
                this.showHide = false
                this.$toast({
                  message:'服务器错误'
                })
              }
            });
        }else{
          this.showHide = true
        }
      },
      onSelect(){
        this.show = false
        Dialog.confirm({
          title: '退出',
          message: '是否要退出登陆?',
          confirmButtonColor:'#ee0a24',
        }).then(() => {
          // on confirm
          this.logout()
          /*if(sessionStorage.code !== '' || localStorage.code !== ''){
            // window.location.href = 'http://121.43.184.110:8080/logout.do'
            this.$router.push('/my')
            this.$toast({
              message:'已退出登陆,请重新登陆'
            })
            window.location.reload()
          }else{
            localStorage.clear()
            sessionStorage.clear()
            this.$toast({
              message:'已退出登陆,请重新登陆'
            })
            window.location.reload()
          }*/
        }).catch(() => {

        });
      },
      onCancel(){
        console.log('222')
      }
    }
  }
</script>

<style type="text/css">
  .van-nav-bar .van-icon{
    color: #222;
    font-size: 20px;
    cursor: pointer;
  }
  .van-icon{
    font-size: 13px;
  }
  .van-dialog{
    width: 80%;
  }
  .van-field__label{
    width: 40px;
  }
  .van-action-sheet{
    width: 100%;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app{
    background-color #f6f6f6
    .header{
      width:100%;
      height:40px;
      line-height: 40px;
      background:#fff;
      position:relative;
      color:#fff;
      .head{
        font-weight bold
      }
    }
    .wrap{
      width 100%
      height 100%
      margin-top 5px
      .content{
        width 100%
        .top{
          width 100%
          height 200px
          position relative
          background url("../../../static/images/backImg.jpg") repeat
          background-size 100% 100%
          .image{
            position absolute
            left 0
            right 0
            bottom 0
            top -40px
            margin auto
          }
          .username{
            text-align center
            padding-top 140px
            font-size 16px
            color #fff
          }
          .info{
            text-align right
            padding-top 15px
            padding-right 5px
            font-size 14px
            color #000
          }
        }
        .center{
          width 100%
          height 220px
        }
        .bottom{
          margin-top 10px
          width 100%;
          background-color #fff
          padding-bottom 50px
          .shop{
            width 100%
            height 80px
            margin-top 10px
            padding 10px
            .images{
              height 100%
              float left
              img{
                width 100px
                height 100%
              }
            }
            .shopinfo{
              height 100%
              margin-left 120px
              .info_top{
                font-size 14px
                font-weight bold
                font-family "Arial Black"
                padding-right 10px
                text-overflow ellipsis
                overflow hidden
                display -webkit-box
                -webkit-box-orient vertical
                -webkit-line-clamp 2
              }
              .info_bottom{
                margin-top 5px
                .price{
                  color #ee0a24
                  font-weight bold
                }
                .assess{
                  color #333
                  margin-left 50px
                  font-size 12px
                }
              }
            }
          }
        }
      }
    }
  }
</style>
