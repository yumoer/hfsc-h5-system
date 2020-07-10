<template>
  <div id="app">
    <header class="header">
      <van-nav-bar fixed class="nav" title="绑定用户" left-arrow @click-left="goBack" style="">
      </van-nav-bar>
    </header>
    <div class="content" style="width: 100%;padding:20px;">
      <van-field
        v-model="mobile"
        clearable
        label="+86"
        placeholder="请输入手机号"
        @keyup="getInputValue"
        @clear="getInputValue"
        maxlength = 11
        @click-right-icon="$toast('question')"
        style="height: 40px;margin-top: 30px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
      >
      </van-field>
      <van-field
        v-model="password"
        type="password"
        clearable
        placeholder="请输入密码"
        @keyup="getInputValue"
        @clear="getInputValue"
        maxlength = 20
        style="height: 40px;margin-top: 30px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
      >
      </van-field>
      <van-field
        v-model="sms_code"
        placeholder="请输入图形验证码"
        clearable
        @keyup="getInputValue"
        @clear="getInputValue"
        maxlength = 4
        style="height: 40px;line-height:20px;margin-top: 30px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;">
        <van-button slot="button" size="small" type="default" @click="generate_image_code()" style="border: none;border-left: 1px solid #ccc;padding-top: 0">
          <img style="width: 100px;height: 35px" v-lazy="image_code_url" alt="图形验证码" class="pic_code">
        </van-button>
      </van-field>

      <van-button v-if="!btnShow" @click="on_submit" disabled round type="danger" style="width: 100%;height:50px;margin-top: 30px" id="login">注册</van-button>
      <van-button v-if="btnShow" @click="on_submit" round type="danger" style="width: 100%;height:50px;margin-top: 30px" id="login">注册</van-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {reqRegister,reqText,reqMobile,requserName,BASE_URL} from '../../api'
  export default {
    data () {
      return {
        mobile: '', //手机号验证
        password: '', // 密码
        sms_code: '', // 验证码
        getText:'', //验证码文字
        btnShow:false, // 是否禁用按钮
        image_code_id: '', // uuid
        image_code_url: '', // 访问后端视图的地址，得到image
        access_token:'',
        is_show_waiting:true,
        error_sms_code_message:'',
        error_sms_code:'',
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    mounted(){
      document.title = '行丰商城-绑定用户'
      var Height = this.screeHeight - $('.header').height() - 42
      $('.content').height(Height)
      // 当模板渲染结束时会被调用的
      this.generate_image_code();
      this.get_code();
    },
    methods: {
      goBack(){
        this.$router.replace('/login')
        window.location.reload()
      },
      getInputValue(){
        if(this.password.length > 0&& this.mobile.length > 0&& this.sms_code.length > 0){
          this.btnShow = true
        }else{
          this.btnShow = false
        }
      },
      // 提取code,access_token,open_id
      get_code() {
        // 从路径中获取qq重定向返回的code
        var code = location.href.split('?code=')[1].split('&state=')[0];
        axios.get(BASE_URL + '/oauth/qq/user/?code=' + code, {
          responseType: 'json',
          // 告诉js携带cookie
          withCredentials: true
        })
          .then(response => {
            if (response.data.user_id){
              // 用户已绑定
              sessionStorage.clear();
              localStorage.clear();
              localStorage.user_id = response.data.user_id;
              localStorage.username = response.data.username;
              localStorage.token = response.data.token;
              this.$router.replace('/my');
            } else {
              // 用户未绑定
              this.access_token = response.data.access_token;
              this.is_show_waiting = false;
              this.$router.replace('/oauthCallback');
            }
          })
          .catch(error => {
            console.log(error.response.data);
            // alert('服务器异常');
          })
      },
      // 生成一个图片验证码的编号，并设置页面中图片验证码img标签的src属性
      async generate_image_code(){
        localStorage.flag = '1'
        // 生成一个编号
        // 严格一点的使用uuid保证编号唯一， 不是很严谨的情况下，也可以使用时间戳
        this.image_code_id = this.generate_uuid();
        // 设置页面中图片验证码img标签的src属性
        this.image_code_url = BASE_URL + "/image_codes/" + this.image_code_id + "/";
      },

      // 生成uuid
      generate_uuid: function(){
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
          d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c =='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
      },

      getCookie (name) {
        var value = '; ' + document.cookie
        var parts = value.split('; ' + name + '=')
        if (parts.length === 2) return parts.pop().split(';').shift()
      },

      async on_submit(){
        /*获取验证码文字*/
        const getText = await reqText(this.image_code_id)
        this.getText = getText.text.toLowerCase()

        this.allow = ''+this.checked

        /*手机号正则验证*/
        var regExp3 = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        /*密码正则验证*/
        var regExp2 = /^[a-zA-Z0-9_-]{8,20}$/;

        if(regExp2.test(this.password) !== true){
          this.$toast({
            message:'密码格式错误,请输入8-20位字符'
          })
          return
        }else if(regExp3.test(this.mobile) !== true){
          this.$toast({
            message:'手机号格式错误'
          })
          return
        }else if(this.sms_code.toLowerCase() !== this.getText){
          this.$toast({
            message:'验证码输入错误'
          })
          return
        }else{  // 检验重复
          const mobile = await reqMobile(this.mobile)
          // console.log(mobile)
          if(mobile.count>0){
            this.$toast({
              message:'手机号已存在'
            })
            return
          }else{  //验证格式完全正确
            axios.defaults.withCredentials = true;
            axios.post(BASE_URL + '/oauth/qq/user/', {
              password: this.password,
              mobile: this.mobile,
              // sms_code: this.sms_code,
              access_token: this.access_token
            }, {
              responseType: 'json',
              // 告诉js携带cookie
              withCredentials: true,
              headers:{'X-CSRFToken': this.getCookie('csrftoken')}
            })
              .then(response => {
                console.log(response)
                // 记录用户登录状态
                sessionStorage.clear();
                localStorage.clear();
                localStorage.token = response.data.token;
                localStorage.user_id = response.data.user_id;
                localStorage.username = response.data.username;
                this.$router.replace('/my')
              })
              .catch(error=> {
                this.generate_image_code()
                console.log(error)
                if (error.response.status === 400) {
                  this.error_sms_code_message = error.response.data.message;
                  this.error_sms_code = true;
                } else {
                  console.log(error.response.data);
                }
              })
          }
        }
        return false;
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
  .van-field__control{
    text-align: left;
    margin-left: 0;
  }
  .van-field__label{
    width: 40px;
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
  }

</style>
