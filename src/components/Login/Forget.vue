<template>
  <div id="app">
    <header class="header">
      <van-nav-bar title="忘记密码" fixed left-arrow @click-left="goBack">
      </van-nav-bar>
    </header>

    <div class="login_box cur info content">
      <van-field
        class="userName"
        v-model="username"
        clearable
        placeholder="请输入用户名"
        @keyup="getInputValue"
        @clear="getInputValue"
        maxlength = 20
      ></van-field>

      <van-field
        class="userName"
        v-model="mobile"
        clearable
        label="+86"
        placeholder="请输入手机号"
        @keyup="getInputValue"
        @clear="getInputValue"
        maxlength = 11
        @click-right-icon="$toast('question')"
      >
      </van-field>

      <van-field
        class="userName"
        v-model="password"
        type="password"
        clearable
        placeholder="请输入新密码"
        @keyup="getInputValue"
        @clear="getInputValue"
        maxlength = 20
      >
      </van-field>

      <van-field
        class="userName"
        v-model="password2"
        type="password"
        clearable
        placeholder="请再次输入新密码"
        @keyup="getInputValue"
        @clear="getInputValue"
        maxlength = 20
      >
      </van-field>

      <van-button v-if="!btnShow" @click="on_submit" disabled round type="danger" class="login">提交</van-button>
      <van-button v-if="btnShow" @click="on_submit" round type="danger"  class="login">提交</van-button>
    </div>

  </div>
</template>

<script>
  import {reqforGet} from '../../api'
  export default {
    data () {
      return {
        username: '',  //用户名
        password: '',  // 密码
        password2: '',  // 确认密码
        mobile: '', // 手机号
        btnShow:false, // 按钮禁用
        screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,     // 屏幕宽
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    mounted() {
      document.title = '行丰商城-忘记密码'
      var Height = this.screeHeight - $('.header').height() - 42
      $('.content').height(Height)
    },
    methods: {
      // 返回
      goBack(){
        this.$router.replace('/login')
      },
      /*监听数据的长度*/
      getInputValue(){
        if(this.username.length > 0&& this.password.length > 0&& this.password2.length > 0&& this.mobile.length > 0){
          this.btnShow = true
        }else{
          this.btnShow = false
        }
      },
      // 提交
      async on_submit(){
        /*用户名正则验证*/
        var regExp1 = /^[a-z0-9_-]{5,20}$/;
        var regExp4 = /^[\u4e00-\u9fa5a-z0-9@\.\+_-]+$/gi;
        /*密码正则验证*/
        var regExp2 = /^[a-z0-9_-]{8,20}$/;
        /*手机号正则验证*/
        var regExp3 = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;

        if(regExp1.test(this.username) !== true){
          this.$toast({
            message:'用户名格式错误,请输入5-20位字符'
          })
          return
        }else if(regExp4.test(this.username) !== true){
          this.$toast({
            message:'用户名格式错误,不允许有特殊字符'
          })
          return
        }else if(regExp3.test(this.mobile) !== true){
          this.$toast({
            message:'手机号格式错误'
          })
          return
        }else if(regExp2.test(this.password) !== true){
          this.$toast({
            message:'密码格式错误,请输入8-20位字符'
          })
          return
        }else if(this.password !== this.password2){
          this.$toast({
            message:'两次密码不一致'
          })
          return
        }else{
          const forGet = await reqforGet(this.username,this.mobile,this.password,this.password2)
          console.log(forGet)
          if(forGet.message === '用户名错误' || forGet.message === 'mobile_is_error'){
            this.$toast({
              message:'用户名与手机号不匹配'
            })
            return
          }else if(forGet.message === 'update OK'){
            this.$toast({
              message:'密码修改成功'
            })
            this.$router.replace('/login')
          }
        }
      },
    }
  }
</script>
<style type="text/css">
  .van-nav-bar .van-icon{
    color: #222;
    font-size: 20px;
    cursor: pointer;
  }
  .van-field__label{
    width: 40px;
  }
  .van-field__control{
    text-align: left;
    margin-left: 0;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app{
    background-color #fff
    .header{
      width 100%
      height 40px
      line-height 40px
      background #fff
      color #fff;
    }
    .info{
      width 100%
      padding 20px
      .userName{
        height 40px
        margin-top 30px
        font-size 16px
        border-bottom 1px solid #efefef
        padding-top 0
      }
      .login{
        width 100%
        height 50px
        margin-top 30px
      }
    }
  }


</style>
