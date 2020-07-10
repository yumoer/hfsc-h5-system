<template>
  <div class="hf_app" id="app">
    <header class="header">
      <van-nav-bar title="收银台" left-arrow @click-left="goBack" style="font-weight: bold">
      </van-nav-bar>
    </header>
    <van-cell-group class="content">
      <van-cell title="订单提交状态" value="成功"></van-cell>
      <van-cell title="订单号" :value="orderId"></van-cell>
      <van-cell title="订单总价" :value="price"></van-cell>
      <van-cell title="支付方式" v-if="parseInt(pay_method) === 1" value="货到付款"></van-cell>
      <van-cell title="支付方式" v-if="parseInt(pay_method) === 2" value="支付宝付款"></van-cell>
      <van-cell title="支付方式" v-if="parseInt(pay_method) === 4" value="支票"></van-cell>
      <van-cell title="支付方式" v-if="parseInt(pay_method) === 8" value="微信付款"></van-cell>
      <van-cell title="支付方式" v-if="parseInt(pay_method) === 5" value="支付宝支付"></van-cell>
      <van-cell title="支付方式" v-if="parseInt(pay_method) === 3" value="国库集中支付-转账"></van-cell>
      <van-cell title="发票信息" v-if="invoice_type === '0'" value="个人 不开发票"></van-cell>
      <van-cell title="发票信息" v-if="invoice_type === '1'" value="普通发票"></van-cell>
      <van-cell title="发票信息" v-if="invoice_type === '2'" value="增值税发票"></van-cell>
      <van-cell title="发票信息" v-if="invoice_type === '3'" value="电子发票"></van-cell>
      <van-cell title="发票抬头" v-if="invoice_type !== '0'" :value="invoice_title"></van-cell>
      <van-cell title="纳税人识别号" v-if="invoice_type !== '0'" :value="invoice_org_code"></van-cell>
      <van-cell title="订单查询"  @click="goto('/myOrder')" value="查看该订单"></van-cell>
      <!--央采用户-->
      <div style="width: 100%;position: fixed;bottom: 0;" v-if="code !== ''">
        <van-button @click="goto('/index')" style="width: 100%" type="danger" v-if="parseInt(pay_method) === 1 ||  parseInt(pay_method) === 2 ||  parseInt(pay_method) === 3 ||  parseInt(pay_method) === 4 ||  parseInt(pay_method) === 9">继续购物</van-button>
        <van-button @click="goPay" style="width: 100%" type="danger" v-if=" parseInt(pay_method) === 5">去支付</van-button>
      </div>
      <!--普通用户-->
      <div style="width: 100%;position: fixed;bottom: 0;" v-else>
        <van-button @click="goto('/index')" style="width: 100%" type="danger" v-if="parseInt(pay_method) === 1 ||  parseInt(pay_method) === 4 ||  parseInt(pay_method) === 3">继续购物</van-button>
        <van-button @click="goPay" style="width: 100%" type="danger" v-if="parseInt(pay_method) === 2 ||  parseInt(pay_method)=== 8">去支付</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
  import axios from 'axios'
  import {BASE_URL} from '../../api'
  export default {
    data () {
      return {
        token:localStorage.getItem('token') || sessionStorage.getItem('token'),
        orderId:location.href.split('?orderId=')[1].split('&price=')[0],
        code:localStorage.code || sessionStorage.code,
        price:location.href.split('&price=')[1].split('&pay_method=')[0],
        pay_method:location.href.split('&pay_method=')[1].split('&invoice_type=')[0],
        invoice_title:localStorage.getItem('invoice_title'),
        invoice_org_code:localStorage.getItem('invoice_org_code'),
        invoice_type:location.href.split('&invoice_type=')[1],
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    methods: {
      goBack(){
        this.goto('/myOrder')
        // localStorage.removeItem('invoice_type')
      },
      goto(path){
        this.$router.push(path)
        this.$router.go(0)
      },
      goPay(){
        if(this.code === ''){ // 普通用户
          if(parseInt(this.pay_method) ===2){ // 支付宝支付
            axios.get(BASE_URL+'/orders/'+this.orderId+'/payment/?mobile=1', {
              headers: {
                'Authorization': 'JWT ' + this.token
              },
              responseType: 'json'
            })
              .then(response => {
                console.log(response)
                // 跳转到支付宝支付
                location.href = response.data.alipay_url;
              })
              .catch(error => {
                console.log(error.response)
                this.$toast({
                  message:'服务器错误'
                });
              })
          }else if(parseInt(this.pay_method)===8){ // 微信支付
            axios.get(BASE_URL+'/wechat/h5/orders/'+this.orderId+'/payment/'+'?next=/#/myOrder', {
              headers: {
                'Authorization': 'JWT ' + this.token
              },
              responseType: 'json'
            })
              .then(response => {
                console.log(response.data)
                // 跳转到微信支付
                location.href = response.data.mweb_url;
              })
              .catch(error => {
                console.log(error.response);
                this.$toast({
                  message:'服务器错误'
                });
              })
          }
        }else if(this.code !== ''){ // 央采用户
          if(parseInt(this.pay_method) ===5) { // 支付宝支付
            axios.get(BASE_URL + '/orders/' + this.orderId + '/payment/?mobile=1', {
              headers: {
                'Authorization': 'JWT ' + this.token
              },
              responseType: 'json'
            })
              .then(response => {
                console.log(response)
                // 跳转到支付宝支付
                location.href = response.data.alipay_url;
              })
              .catch(error => {
                console.log(error.response);
                this.$toast({
                  message:'服务器错误'
                });
              })
          }
        }
      }
    },
    mounted(){
      document.title = '行丰商城-收银台'
      var Height = this.screeHeight - $('.header').height()
      $('.content').height(Height)
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
    text-align: right;
  }
  .van-field__label{
    width: 60px;
  }
  .van-cell__value{
    margin-left: -35px;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app{
    background-color #fff
  }
  /*header*/
  .header{
    width:100%;
    height:40px;
    line-height: 40px;
    background:#fff;
    /*position:fixed;*/
    position:relative;
    color:#fff;
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
  .addr::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: -webkit-repeating-linear-gradient(135deg,#ff6c6c 0,#ff6c6c 20%,transparent 0,transparent 25%,#1989fa 0,#1989fa 45%,transparent 0,transparent 50%);
    background: repeating-linear-gradient(-45deg,#ff6c6c 0,#ff6c6c 20%,transparent 0,transparent 25%,#1989fa 0,#1989fa 45%,transparent 0,transparent 50%);
    background-size: 80px;
    content: '';
  }
  .cash{
    background: url('../../../static/images/pay_icons.png') 8px top no-repeat #fff;
  }
  .zhifubao {
    background: url('../../../static/images/pay_icons.png') 12px -72px no-repeat #fff;
    width: 100px;
    height: 40px;
  }
  .weixinzhifu {
    padding-left: 12px;
    width: 130px;
    height: 38px;
    background: url('../../../static/images/weixinzhifu.jpg') 12px top/110px 36px no-repeat;
  }
  label{
    float: left;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 10px 10px 8px 40px;
    margin-right: 25px;
  }
</style>
