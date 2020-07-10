<template>
  <div id="app">
    <div>
      <header class="header">
        <van-nav-bar fixed class="nav" title="登录" left-arrow @click-left="goBack" style="">
        </van-nav-bar>
      </header>
      <div class="content">
        <div class="login_box cur login">
          <van-field
            class="userName"
            v-model="username"
            clearable
            @clear="getInputValue"
            @keyup="getInputValue"
            maxlength = 20
            placeholder="请输入用户名/已验证手机"
          ></van-field>

          <van-field
            class="passWord"
            v-model="password"
            type="password"
            clearable
            @clear="getInputValue"
            @keyup="getInputValue"
            maxlength = 20
            placeholder="请输入密码"
          >
            <van-button class="forGet" @click="goto('/forget')" slot="button" size="small" type="default">
              <span>忘记密码</span>
            </van-button>
          </van-field>

          <div class="register">
            <van-checkbox class="remember" @click="goChecked" style="margin-left: 5px" v-model="remember" checked-color="#ee0a24">记住密码</van-checkbox>
            <span @click="goto('/register')">快速注册</span>
          </div>

          <van-button v-if="!btnShow" @click="on_submit" disabled round type="danger" class="loginBtn" id="login">登陆</van-button>
          <van-button v-if="btnShow" @click="on_submit" round type="danger" class="loginBtns" id="login">登陆</van-button>


        </div>
        <div class="other">
          <van-divider>其他登陆方式</van-divider>
          <!--<van-grid :border="false" :column-num="4">
            <van-grid-item @click="qq_login">
              <van-image style="width: 50px" src="./static/images/qq.jpg"></van-image>
              <span style="text-align: center">QQ</span>
            </van-grid-item>
            <van-grid-item @click="yc_login('http://47.94.106.106:8000/oauth/authorize/')">
              <van-image style="width: 50px" src="./static/images/guocailogo.png"></van-image>
              <span style="text-align: center">央采</span>
            </van-grid-item>
            <van-grid-item></van-grid-item>
          </van-grid>-->
          <div class="wrap">
            <div class="qq" @click="qq_login">
              <img src="../../../static/images/qq.jpg" alt="">
              <span>QQ</span>
            </div>
            <div class="qq" @click="yc_login('http://47.94.106.106:8000/oauth/authorize/')">
              <img src="../../../static/images/guocailogo.png" alt="">
              <span>央采</span>
            </div>
          </div>
          <span class="agree">登陆即代表您已同意<a href="">行丰银拓隐私政策</a></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {reqLogin,BASE_URL} from '../../api'
  export default {
    data () {
      return {
        // token:localStorage.token || sessionStorage.token
        error_username: false,
        error_pwd: false,
        error_pwd_message: '请填写密码',
        username: '', // 用户名
        password: '', // 密码
        remember: false, // 记住登陆
        getLogin:{}, //登陆信息
        btnShow:false,  //按钮状态
        next:location.href.split('?next=')[1] || '',
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    async mounted(){
      document.title = '行丰商城-登陆账号'
      var Height = this.screeHeight - $('.header').height() - 30
      $('.content').height(Height)
    },
    methods: {
      /*路由导航*/
      goto(path){
        this.$router.replace(path)
      },
      /*返回*/
      goBack(){
        this.$router.go(-1)
      },
      /*记住密码*/
      goChecked(){
        this.remember = !this.remember
      },
      // 获取输入框数据
      getInputValue(){
        if(this.username.length > 0 && this.password.length > 0){
          this.btnShow = true
        }else{
          this.btnShow = false
        }
      },

      // 获取url路径参数
      get_query_string: function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return decodeURI(r[2]);
        }
        return null;
      },
      // 表单提交
      async on_submit() {
        if(this.username.length > 0 && this.username.length > 0){
          if(this.username.length <3){
            this.$toast({
              message:'用户名格式错误,3-20个字符'
            })
          }else if(this.password.length <8){
            this.$toast({
              message:'密码格式错误,8-20个字符'
            })
          }else{
            axios.post(BASE_URL + '/auth2/', {
              username: this.username,
              password: this.password
            }, {
              responseType: 'json',
              withCredentials: true // 跨域时带上cookie
            })
              .then(response => {
                console.log(response)
                // 使用浏览器本地存储保存token
                if (this.remember) {
                  // 记住登录
                  sessionStorage.clear();
                  localStorage.token = response.data.token;  //用户token
                  localStorage.user_id = response.data.user_id; //用户id
                  localStorage.username = response.data.username; //用户名
                  localStorage.expires_at = response.data.expires_at;  //过期时间
                  localStorage.is_maintainer = response.data.is_maintainer;  // 是否管理员
                  if(response.data.code === ''){  // 是否央采用户
                    sessionStorage.code = ''
                  }else{
                    sessionStorage.code = response.data.code
                  }
                } else {
                  // 未记住登录
                  localStorage.clear();
                  sessionStorage.token = response.data.token;
                  sessionStorage.user_id = response.data.user_id;
                  sessionStorage.username = response.data.username;
                  sessionStorage.expires_at = response.data.expires_at;
                  sessionStorage.code = response.data.code;
                  sessionStorage.is_maintainer = response.data.is_maintainer;
                  if(response.data.code === ''){  // 是否央采用户
                    sessionStorage.code = ''
                  }else{
                    sessionStorage.code = response.data.code
                  }
                }
                // 跳转页面
                // this.$router.go(-1)
                this.$router.replace('/'+this.next)
                window.location.reload()
              })
              .catch(error => {
                console.log(error)
                if (error.response.status === 400) {
                  this.$toast({
                    message:'用户名或密码错误'
                  })
                } else {
                  this.$toast({
                    message:'服务器错误'
                  })
                }
              })
          }
        }
      },
      // qq登录
      qq_login: function(){
        var next = location.href.split('?next=')[1];
        axios.get(BASE_URL + '/oauth/qq/authorization/?next='+next, {
          responseType: 'json'
        })
          .then(response => {
            location.href = response.data.login_url;
            console.log(response.data.login_url)
          })
          .catch(error => {
            console.log(error.response.data);
            this.$toast({
              message:'服务器错误'
            })
          })
      },
      yc_login(path){
        location.href = path
      },
      // 微信登陆
      weixin_login:function(){
        var url = '/oauth/wechat/authorization/';
        axios.get(BASE_URL+url,{responseType:'json'
        }).then(response=>{
          location.href = response.data.login_url;
        }).catch(err=>{
          console.log(err)
          this.$toast({
            message:'服务器错误'
          })
        })
      },
    },
  }
</script>
<style type="text/css">
  .van-nav-bar .van-icon{
    color: #222;
    font-size: 20px;
    cursor: pointer;
  }
  .van-field__control{
    text-align: left;
    margin-left: 0
  }
  .van-nav-bar__title{
    font-family: PingFang-SC-Regular;
  }
  .van-field__label{
    width: 40px;
  }
  .van-grid-item__content::after{
    border: none;
    border-top-width:2px;
  }
  .van-checkbox__label{
    color: #999;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app{
    width: 100%
    height 100%
    background-color #fff
    .header{
      width:100%
      height:40px
      line-height 40px
      position relative
      color #fff
      background #fff
      .nav{
        font-weight: bold
      }
    }
    .login{
      width 100%
      padding 0 5%
      margin-top 30px
      .userName{
        height 50px
        line-height 50px
        margin-top 30px
        font-size 16px
        border-bottom 1px solid #efefef
        padding-top 0
      }
      .passWord{
        height 50px
        margin-top 30px
        font-size 16px
        border-bottom 1px solid #efefef
        .forGet{
          border none
          border-left 1px solid #ccc
          span{
            font-size 14px
            color #848689
          }
        }
      }
      .loginBtn{
        width 100%
        height 50px
        margin-top 30px
      }
      .loginBtns{
        width 100%
        height 50px
        margin-top 30px
      }
      .register{
        margin-top 20px
        height 30px
        line-height 30px
        font-size 14px
        font-family PingFang-SC-Regular
        color #999
        .remember{
          height 100%
          float: left
        }
        span{
          float right
          margin-right 24px
        }
      }
    }
    .other{
      width 100%
      margin-top 40px
      position relative
      text-align center
      padding-bottom 20px
      .wrap{
        margin-top 40px
        margin-bottom 40px
        .qq{
          display inline-block
          margin-left 10px
          img{
            width 50px
          }
          span{
            display block
          }
        }
      }
      .agree{
        text-align center
        font-size 13px
        color #bebebe
        margin-top 20px
        a{
          color #409eff
        }
      }
    }
  }

</style>
