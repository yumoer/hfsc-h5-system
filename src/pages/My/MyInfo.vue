<template>
  <div class="hf_app" id="app">
    <header class="header">
      <van-nav-bar class="head" fixed title="个人信息" left-arrow  @click-left="goBack"></van-nav-bar>
    </header>
    <div class="wrap">
      <van-cell-group>
        <van-field
          v-model="info.username"
          clearable
          maxlength="20"
          label="用户名"
          placeholder="请输入用户名"
        ></van-field>

        <van-field
          v-model="info.mobile"
          clearable
          label="手机号"
          maxlength="11"
          placeholder="请输入手机号"
        ></van-field>

        <van-field
          v-model="info.email"
          clearable
          label="电子邮件"
          placeholder="请输入电子邮件"
        >
          <van-button slot="button" size="small" type="danger" @click="goEmail" v-if="info.email_active === false">{{emailTxt}}</van-button>
        </van-field>
        <div class="button">
          <van-button class="btn" type="danger" @click="onEdit">确认修改</van-button>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {BASE_URL} from '../../api'
  import Footer from '../../components/Footer/Footer'
  export default {
    data () {
      return {
        token:localStorage.getItem('token') || sessionStorage.getItem('token'),
        shops:[],
        emailTxt:'重新发送',
        infoData:{},
        info:{
          user_id:'',
          username:'',
          mobile:'',
          email:'',
          email_active:''
        },
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    components:{Footer},
    mounted(){
      document.title = '行丰商城-个人信息'
      var Height = this.screeHeight - $('.header').height() - 5
      $('.wrap').height(Height)
      if (this.token) {
        this.getUser()
      }else{
        this.goto('/login')
      }
    },
    methods:{
      goto(path){
        this.$router.push(path)
        this.$router.go(0)
      },
      goBack(){
        this.$router.go(-1)
      },
      getUser(){
        axios.get(BASE_URL + '/user/', {
          // 向后端传递JWT token的方法
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json',
        })
          .then(response => {
            this.infoData = response.data
            // 加载用户数据
            this.info.user_id = response.data.id;
            this.info.username = response.data.username;
            this.info.mobile = response.data.mobile;
            this.info.email = response.data.email;
            this.info.email_active = response.data.email_active;
          })
          .catch(error => {
            console.log(error)
            if(error.response !== undefined){
              if (error.response.status===401 || error.response.status===403) {
                this.goto('/login')
                window.location.reload()
                localStorage.clear()
                sessionStorage.clear()
              }
            }else{
              this.$toast({
                message:'服务器错误'
              });
            }

          });
      },
      onEdit(){
        /*用户名长度验证*/
        var regExp1 =  /^[\u4E00-\u9FA5a-zA-Z0-9_]{3,20}$/;
        /*手机号正则验证*/
        var regExp3 = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        /*电子邮箱验证*/
        var regExp4 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        // 判断用户的登录状态
        if(regExp1.test(this.info.username) !== true){
          this.$toast({
            message:'用户名格式错误,3-20个字符不允许有特殊字符'
          })
        }else if(regExp3.test(this.info.mobile) !== true){
          this.$toast({
            message:'手机号格式错误'
          })
        }else if(regExp4.test(this.info.email) !== true){
          this.$toast({
            message:'电子邮件格式错误'
          })
        }else{
          console.log(this.info.username,this.infoData.username)
          console.log(this.info.mobile,this.infoData.mobile)
          console.log(this.info.email,this.infoData.email)
          let data = {
            username: this.info.username,
            mobile: this.info.mobile,
            email: this.info.email
          }
          axios.put(BASE_URL + '/users/update/info/', data, {
            headers: {
              'Authorization': 'JWT ' + this.token
            },
            responseType: 'json',
            withCredentials: true
          })
            .then(response => {
              console.log(response.data)
              this.$toast({
                message:'修改成功'
              })
              this.getUser()
              this.$router.go(-1)
            })
            .catch(error => {
              console.log(error.response.data.username);
              if(error.response.data.mobile){
                this.$toast({
                  message:error.response.data.mobile[0]
                })
              }else if(error.response.data.username){
                this.$toast({
                  message:error.response.data.username[0]
                })
              }else{
                this.$toast({
                  message:'服务器错误'
                })
              }
            })
        }

      },
      goEmail(){
        if(this.info.email === null){
          this.$toast({
            message:'请填写电子邮件',
            position:'bottom'
          })
          return
        }
        axios.put(BASE_URL + '/email/',
          { email: this.info.email },
          {
            headers: {
              'Authorization': 'JWT ' + this.token
            },
            responseType: 'json'
          })
          .then(response => {
            console.log(response)
            this.$toast({
              message:'已发送到邮箱',
              position:'bottom'
            })
            if(response.status === 200){
              this.emailTxt = '已发送'
            }
          })
          .catch(error => {
            console.log(error)
            this.$toast({
              message:error.data
            });
          });
      }
    },
  }
</script>

<style type="text/css">
  .van-nav-bar .van-icon{
    color: #222;
    font-size: 20px;
    cursor: pointer;
  }
  .van-field__label{
    width: 60px!important;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app{
    background-color #fff
    .header{
      width:100%;
      height:40px;
      line-height: 40px;
      background:#fff;
      position:relative;
      color:#fff;
      .head{
        font-weight bold
        width 100%
      }
    }
    .wrap{
      width 100%
      height 100%
      margin-top 5px
      .button{
        padding 0 10px
        margin 20px 0
        .btn{
          width 100%
        }
      }
    }
  }
</style>
