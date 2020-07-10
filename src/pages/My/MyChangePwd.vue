<template>
  <div class="hf_app" id="app">
    <header class="header">
      <van-nav-bar class="head" fixed title="修改密码" left-arrow  @click-left="goBack"></van-nav-bar>
    </header>
    <div class="wrap">
      <van-cell-group>
        <van-field
          v-model="info.oldPwd"
          type="password"
          clearable
          label="当前密码"
          placeholder="请输入当前密码"
        ></van-field>

        <van-field
          v-model="info.newPwd"
          type="password"
          clearable
          label="新密码"
          placeholder="请输入新密码"
        ></van-field>

        <van-field
          v-model="info.confirmPwd"
          type="password"
          clearable
          label="确认密码"
          placeholder="请确认密码"
        ></van-field>
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
  export default {
    data () {
      return {
        token:localStorage.getItem('token') || sessionStorage.getItem('token'),
        user_id:localStorage.getItem('user_id') || sessionStorage.getItem('user_id') ,
        info:{
          oldPwd:'',
          newPwd:'',
          confirmPwd:'',
        },
        screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,     // 屏幕宽
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
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
      onEdit(){
        var regExp1 = /^[a-zA-Z0-9_-]{8,20}$/;
        if(regExp1.test(this.info.oldPwd) !== true){
          this.$toast({
            message:'当前密码格式错误'
          })
        }else if(regExp1.test(this.info.newPwd) !== true){
          this.$toast({
            message:'新密码格式错误'
          })
        }else if(this.info.newPwd !== this.info.confirmPwd){
          this.$toast({
            message:'两次密码不一致'
          })
        }else if(this.info.oldPwd === this.info.newPwd){
          this.$toast({
            message:'当前密码与新密码一致'
          })
        }else{
          axios.put(BASE_URL + '/users/'+this.user_id+'/password/',
            {
              old_password: this.info.oldPwd,
              password: this.info.newPwd,
              password2: this.info.confirmPwd
            },
            {
              headers: {
                'Authorization': 'JWT ' + this.token
              },
              responseType: 'json'
            }
          )
            .then(response=>{
              if(response.status === 200){
                this.$toast({
                  message:'密码修改成功,请重新登陆'
                })
                this.goto('/login')
                localStorage.clear()
                sessionStorage.clear()
              }
            })
            .catch(error=>{
              console.log(error.response)
              if(error.response !== undefined){
                if (error.response.status === 400) {
                  console.log(error.response.data.non_field_errors[0])
                  this.$toast({
                    message:error.response.data.non_field_errors[0]
                  })
                } else {
                  this.$toast({
                    message:error.response.data.message
                  });
                }
              }else{
                this.$toast({
                  message:'服务器错误'
                });
              }

            })
        }

      },
    },
    mounted(){
      document.title = '行丰商城-修改密码'
      var Height = this.screeHeight - $('.header').height() - 5
      $('.wrap').height(Height)
      // 判断用户的登录状态
      if (this.token) {
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
          })
          .catch(error => {
            if (error.response.status===401 || error.response.status===403) {
              this.goto('/login')
              window.location.reload()
              localStorage.clear()
              sessionStorage.clear()
            }else{
              console.log(error)
              this.$toast({
                message:'服务器错误'
              });
            }
          });
      }else{
        this.goto('/login')
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
