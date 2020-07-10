<template>
  <div class="hf_app" id="app">
    <header class="header">
      <van-nav-bar class="head" fixed :title="title" left-arrow  @click-left="goBack"></van-nav-bar>
    </header>
    <div class="wrap">
      <van-cell-group>
        <van-field
          v-model="invoice_title"
          clearable
          label="发票抬头"
          placeholder="请输入发票抬头"
        ></van-field>

        <van-field
          v-model="invoice_org_code"
          clearable
          label="纳税人识别号"
          placeholder="请输入纳税人识别号"
        ></van-field>

        <van-field
          v-model="register_address"
          clearable
          label="注册地址"
          placeholder="请输入注册地址"
        ></van-field>

        <van-field
          v-model="invoice_phone"
          clearable
          label="注册电话"
          type="number"
          placeholder="请输入注册电话"
        ></van-field>

        <van-field
          v-model="invoice_bank"
          clearable
          label="开户银行"
          placeholder="请输入开户银行"
        ></van-field>

        <van-field
          v-model="invoice_bank_code"
          clearable
          label="开户行账号"
          placeholder="请输入开户行账号"
        ></van-field>

        <!--<van-field
          v-model="invoice_name"
          clearable
          label="开票人"
          placeholder="请输入开票人"
        ></van-field>

        <van-field
          v-model="invoice_address"
          clearable
          label="收票地址"
          placeholder="请输入收票地址"
        ></van-field>-->
        <div class="button">
          <van-button class="btn" type="danger" @click="onEdit" v-if="title === '编辑增票'">确认修改</van-button>
          <van-button class="btn" type="danger" @click="onAdd" v-if="title === '新增增票'">确认保存</van-button>
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
        title:'新增增票',
        increaseId:localStorage.getItem('increaseId'),
        invoice_title:'',//发票抬头
        invoice_org_code:'',//纳税人识别号
        // invoice_name:'', //增值税收票人
        // invoice_address:'', // 收票地址
        invoice_phone:'', //注册电话
        invoice_bank:'', //开户银行
        invoice_bank_code:'',  //开户行账号
        register_address:'', // 注册地址
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
        localStorage.removeItem('increaseId')
      },
      onLook(){
        if(this.increaseId !== null){
          this.title = '编辑增票'
          axios.get(BASE_URL + '/orders/invoice/'+this.increaseId+'/',{
            // 向后端传递JWT token的方法
            headers: {
              'Authorization': 'JWT ' + this.token
            },
            responseType: 'json',
          })
            .then(response => {
              this.invoice = response.data
              this.invoice_title = this.invoice.invoice_title
              this.invoice_org_code = this.invoice.invoice_org_code
              this.register_address=this.invoice.register_address,
              this.invoice_phone=this.invoice.invoice_phone,
              this.invoice_bank=this.invoice.invoice_bank,
              this.invoice_bank_code=this.invoice.invoice_bank_code
            })
            .catch(error => {
              console.log(error)
              this.$toast({
                message:'服务器错误'
              });
              /*if (error.response.status===401 || error.response.status===403) {
                this.$router.push('/login')
              }*/
            });
        }else{
          this.title = '新增增票'
        }
      },
      onEdit(){
        const myregTitle = /^[0-9a-zA-Z\(\)\（\）\u4e00-\u9fa5]{0,50}$/;
        const myregCode =  /^[A-Z0-9]{15}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
        const myregPhone = /^(((\\+\\d{2}-)?0\\d{2,3}-\\d{7,8})|((\\+\\d{2}-)?(\\d{2,3}-)?([1][3,4,5,7,8][0-9]\\d{8})))$/;
        const myregBankCode = /^(\d{16}|\d{19})$/;
        if(this.invoice_title === ''){
          this.$toast({
            message:'发票抬头不能为空'
          })
          return
        }else if(myregTitle.test(this.invoice_title) !== true){
          this.$toast({
            message:'发票抬头格式输入错误'
          })
          return
        }else if(this.invoice_org_code === ''){
          this.$toast({
            message:'纳税人识别号不能为空'
          })
          return
        }else if(myregCode.test(this.invoice_org_code) !== true){
          this.$toast({
            message:'纳税人识别号格式输入错误'
          })
          return
        }else if(this.register_address === ''){
          this.$toast({
            message:'注册地址不能为空'
          })
          return
        }else if(this.invoice_phone === ''){
          this.$toast({
            message:'注册电话不能为空'
          })
          return
        }/*else if(myregPhone.test(this.invoice_phone) !== true){
          console.log(this.invoice_phone)
          this.$toast('注册电话格式输入错误')
          return
        }*/else if(this.invoice_bank === ''){
          this.$toast({
            message:'开户银行不能为空'
          })
          return
        }else if(this.invoice_bank_code === ''){
          this.$toast({
            message:'开户银行号不能为空'
          })
          return
        }else if(myregBankCode.test(this.invoice_bank_code) !== true){
          this.$toast({
            message:'开户银行号格式输入错误'
          })
          return
        }
        axios.put(BASE_URL + '/orders/invoice/'+this.increaseId+'/',{
          invoice_title: this.invoice_title,
          invoice_org_code: this.invoice_org_code,
          register_address:this.register_address,
          invoice_phone:this.invoice_phone,
          invoice_bank:this.invoice_bank,
          invoice_bank_code:this.invoice_bank_code
        },{
          // 向后端传递JWT token的方法
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json',
        })
          .then(response => {
            // console.log(response.data)
            this.$toast({
              message:'修改成功'
            })
            localStorage.removeItem('increaseId')
            this.$router.go(-1)
          })
          .catch(error => {
            if (error.response.status===401 || error.response.status===403) {
              this.$router.push('/login')
            }else{
              console.log(error)
              this.$toast({
                message:'服务器错误'
              });
            }
          });

      },
      onAdd(){
        const myregTitle = /^[0-9a-zA-Z\(\)\（\）\u4e00-\u9fa5]{0,50}$/;
        const myregCode =  /^[A-Z0-9]{15}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
        const myregPhone = /^(((\\+\\d{2}-)?0\\d{2,3}-\\d{7,8})|((\\+\\d{2}-)?(\\d{2,3}-)?([1][3,4,5,7,8][0-9]\\d{8})))$/;
        const myregBankCode = /^(\d{16}|\d{19})$/;
        if(this.invoice_title === ''){
          this.$toast({
            message:'发票抬头不能为空'
          })
          return
        }else if(myregTitle.test(this.invoice_title) !== true){
          this.$toast({
            message:'发票抬头格式输入错误'
          })
          return
        }else if(this.invoice_org_code === ''){
          this.$toast({
            message:'纳税人识别号不能为空'
          })
          return
        }else if(myregCode.test(this.invoice_org_code) !== true){
          this.$toast({
            message:'纳税人识别号格式输入错误'
          })
          return
        }else if(this.register_address === ''){
          this.$toast({
            message:'注册地址不能为空'
          })
          return
        }else if(this.invoice_phone === ''){
          this.$toast({
            message:'注册电话不能为空'
          })
          return
        }/*else if(myregPhone.test(this.invoice_phone)){
          this.$toast('注册电话格式输入错误')
          this.$toast({
            message:'发票抬头不能为空'
          })
          return
        }*/else if(this.invoice_bank === ''){
          this.$toast({
            message:'开户银行不能为空'
          })
          return
        }else if(this.invoice_bank_code === ''){
          this.$toast({
            message:'开户银行号不能为空'
          })
          return
        }else if(myregBankCode.test(this.invoice_bank_code) !== true){
          this.$toast({
            message:'开户银行号格式输入错误'
          })
          return
        }
        axios.post(BASE_URL + '/orders/invoice/',{
          invoice_title:this.invoice_title,
          invoice_org_code:this.invoice_org_code,
          register_address:this.register_address,
          invoice_phone:this.invoice_phone,
          invoice_bank:this.invoice_bank,
          invoice_bank_code:this.invoice_bank_code,
        },{
          // 向后端传递JWT token的方法
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json',
        })
          .then(response => {
            // console.log(response.data)
            this.$toast({
              message:'保存成功'
            })
            this.$router.go(-1)
          })
          .catch(error => {
            console.log(error)
            this.$toast({
              message:'服务器错误'
            })
            /*if (error.response.status===401 || error.response.status===403) {
              this.$router.push('/login')
            }*/
          });
      }
    },
    mounted(){
      document.title = '行丰商城-新增增票'
      var Height = this.screeHeight - $('.header').height() - 5
      $('.wrap').height(Height)
      // 判断用户的登录状态
      if (this.token) {
        this.onLook()
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
    width: 100px;
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
