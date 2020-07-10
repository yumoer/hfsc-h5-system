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

        <div class="button">
          <van-button class="btn" type="danger" @click="onEdit" v-if="title === '编辑普票或电票'">确认修改</van-button>
          <van-button class="btn" type="danger" @click="onAdd" v-if="title === '新增普票或电票'">确认保存</van-button>
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
        invoice:{}, // 发票
        invoiceId:localStorage.getItem('invoiceId'),
        title:'新增普票和电票',
        invoice_title:'',//发票抬头
        invoice_org_code:'',//纳税人识别号
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
        localStorage.removeItem('invoiceId')
      },
      onLook(){
        if(this.invoiceId !== null){
          this.title = '编辑普票或电票'
          axios.get(BASE_URL + '/orders/invoice/'+this.invoiceId+'/',{
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
            })
            .catch(error => {
              console.log(error)
              this.$toast({
                message:'服务器错误'
              })
            });
        }else{
          this.title = '新增普票或电票'
        }
      },
      onEdit(){
        axios.put('api' + '/orders/invoice/'+this.invoiceId+'/',{
          invoice_title: this.invoice_title,
          invoice_org_code: this.invoice_org_code,
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
            localStorage.removeItem('invoiceId')
            this.$router.go(-1)
          })
          .catch(error => {
            console.log(error)
            this.$toast({
              message:'服务器错误'
            })
          });

      },
      onAdd(){
        var myregTitle = /^[0-9a-zA-Z\(\)\（\）\u4e00-\u9fa5]{0,50}$/;
        var myregCode = /^[0-9a-zA-Z]{15,20}$/;
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
        }
        if(this.invoice_org_code === ''){
          this.$toast({
            message:'纳税人识别号不能为空'
          })
          return
        }else if(myregCode.test(this.invoice_org_code) !== true){
          this.$toast({
            message:'纳税人识别号格式输入错误'
          })
          return
        }
        axios.post(BASE_URL + '/orders/invoice/',{
          invoice_title:this.invoice_title,
          invoice_org_code:this.invoice_org_code,
          register_address:null,
          invoice_phone:null,
          invoice_bank:null,
          invoice_bank_code:null,
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
          });
      }
    },
    mounted(){
      document.title = '行丰商城-新增普票或电票'
      var Height = this.screeHeight - $('.header').height()- 10
      $('.wrap').height(Height)
      this.onLook()
      /*const invoiceLookId = localStorage.getItem('invoiceLookId')
      const invoiceEditId = localStorage.getItem('invoiceEditId')
      if(invoiceLookId !== null){
        this.onLook()
      }else if(invoiceEditId !== null){
        this.onEdit()
      }*/
    },
  }
</script>

<style type="text/css">
  .van-nav-bar .van-icon{
    color: #222;
    font-size: 20px;
    cursor: pointer;
  }
  .van-cell__title .van-field__label{
    width: 100px;
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
