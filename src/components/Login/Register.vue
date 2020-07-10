<template>
  <div id="app">
    <header class="header">
      <van-nav-bar title="注册" fixed left-arrow @click-left="goBack" style="font-weight: bold">
      </van-nav-bar>
    </header>

    <div class="login_box cur content" style="width: 100%;padding:20px;">
      <van-field
        v-model="username"
        clearable
        placeholder="请输入用户名"
        @clear="getInputValue"
        @keyup="getInputValue"
        maxlength = 20
        style="height: 40px;margin-top:10px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
      ></van-field>

      <van-field
        v-model="password"
        type="password"
        clearable
        placeholder="请输入密码"
        @clear="getInputValue"
        @keyup="getInputValue"
        maxlength = 20
        style="height: 40px;margin-top: 30px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
      >
      </van-field>

      <van-field
        v-model="password2"
        type="password"
        clearable
        placeholder="请确认密码"
        @clear="getInputValue"
        @keyup="getInputValue"
        maxlength = 20
        style="height: 40px;margin-top: 30px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
      >
      </van-field>

      <van-field
        v-model="mobile"
        clearable
        label="+86"
        placeholder="请输入手机号"
        @clear="getInputValue"
        @keyup="getInputValue"
        maxlength = 11
        @click-right-icon="$toast('question')"
        style="height: 40px;margin-top: 30px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
      >
      </van-field>

      <van-field
        v-model="sms_code"
        placeholder="请输入图形验证码"
        clearable
        @clear="getInputValue"
        @keyup="getInputValue"
        maxlength = 4
        style="height: 40px;line-height:20px;margin-top: 30px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;">
        <van-button slot="button" size="small" type="default" @click="generate_image_code()" style="border: none;border-left: 1px solid #ccc;padding-top: 0">
          <img style="width: 100px;height: 35px" v-lazy="image_code_url" alt="图形验证码" class="pic_code">
        </van-button>
      </van-field>

      <van-checkbox v-model="checked" checked-color="#fa436a" style="margin-top: 20px;color: #fa436a">同意"行丰银拓商城用户使用协议"</van-checkbox>

      <van-button v-if="!btnShow" @click="on_submit" disabled round type="danger" style="width: 100%;height:50px;margin-top: 30px" id="login">注册</van-button>
      <van-button v-if="btnShow" @click="on_submit" round type="danger" style="width: 100%;height:50px;margin-top: 30px" id="login">注册</van-button>
    </div>

  </div>
</template>

<script>
  import {reqRegister,reqText,reqMobile,requserName,BASE_URL} from '../../api'
  export default {
    data () {
      return {
        username: '', // 用户名
        password: '', // 密码
        password2: '', //确认密码
        mobile: '', //手机号验证
        image_code: '',
        sms_code: '', // 验证码
        allow:'', // 是否同意

        getText:'', //验证码文字
        checked:false, //复选框
        btnShow:false, // 是否禁用按钮

        image_code_id: '', // uuid
        image_code_url: '', // 访问后端视图的地址，得到image

        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高

        // sending_flag: false, // 是否正在发送短信的标识
        // sms_code_tip: '获取短信验证码', // 获取短信验证码的提示文字
      }
    },

    async mounted(){
      document.title = '行丰商城-注册账号'
      var Height = this.screeHeight - $('.header').height() - 42
      $('.content').height(Height)
      console.log(this.btnShow)
      // 当模板渲染结束时会被调用的
      this.generate_image_code();
    },
    created(){
      this.generate_image_code();
    },
    methods: {
      goBack(){
        this.$router.replace('/login')
      },
      getInputValue(){
        if(this.username.length > 0&& this.password.length > 0&& this.password2.length > 0&& this.mobile.length > 0 && this.sms_code.length > 0){
          this.btnShow = true
          console.log(this.btnShow)
        }else{
          this.btnShow = false
          console.log(this.btnShow)
        }
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
      // 生成一个图片验证码的编号，并设置页面中图片验证码img标签的src属性
      async generate_image_code(){
        localStorage.flag = '1'
        // 生成一个编号
        // 严格一点的使用uuid保证编号唯一， 不是很严谨的情况下，也可以使用时间戳
        this.image_code_id = this.generate_uuid();
        // 设置页面中图片验证码img标签的src属性
        this.image_code_url = BASE_URL + "/image_codes/" + this.image_code_id + "/";
      },

      // 注册
      async on_submit(){
        /*获取验证码文字*/
        const getText = await reqText(this.image_code_id)
        this.getText = getText.text.toLowerCase()

        this.allow = ''+this.checked

        /*用户名正则验证*/
        var regExp1 = /^[\u4E00-\u9FA5a-zA-Z0-9_]{4,20}$/;
        var regExp4 = /^[\u4e00-\u9fa5a-zA-Z0-9@\.\+_-]+$/gi;
        /*密码正则验证*/
        var regExp2 = /^[a-zA-Z0-9_-]{8,20}$/;
        /*手机号正则验证*/
        var regExp3 = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;

        if(regExp1.test(this.username) !== true){
          this.$toast({
            message:'用户名格式错误,请输入4-20位字符'
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
        }else if(this.allow !== 'true'){
          this.$toast({
            message:'请同意使用协议'
          })
          return
        }else{  // 检验重复
          const username = await requserName(this.username)
          console.log(username)
          if(username.count>0){
            this.$toast({
              message:'用户名已存在'
            })
            return
          }else{
            const mobile = await reqMobile(this.mobile)
            console.log(mobile)
            if(mobile.count>0){
              this.$toast({
                message:'手机号已存在'
              })
              return
            }else{  //验证格式完全正确
              const Register = await reqRegister(this.username,this.password,this.password2,this.mobile,this.sms_code,this.allow)
              if(Register !== undefined || Register !== null){
                this.$toast({
                  message:'注册成功，请登录',
                  position:'bottom'
                })
                this.$router.replace('/login')
              }
              console.log(Register)
            }
          }
        }
        return false;
      },
    },
    watch:{
      generate_image_code(){
        console.log('111')
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
    background-color #fff
  }
  /*header*/
  .header{
    width:100%;
    height:46px;
    line-height: 46px;
    background:#fff;
    /*position:fixed;*/
    position:relative;
    color:#fff;
    border-bottom 1px solid #ddd
  }
  .header a{
    position:absolute;
    width:40px;
    text-align: center;
    font-size: 1rem;
    left:0 ;
    top:0;
    color:#fff;
    font-weight:bold;
  }
  .header h1{
    width:100%;
    padding-left: 40px;
    text-align: center;
  }

</style>
