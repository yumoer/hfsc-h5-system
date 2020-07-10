<template>
  <div class="hf_app" id="app">
    <header class="header">
      <van-nav-bar class="head" fixed title="我的订单" right-text="全部" left-arrow  @click-left="goBack"></van-nav-bar>
    </header>
    <NoDate v-if="order_list.length === 0 && show" type="4"></NoDate>
    <div v-if="order_list.length > 0" class="wrap">
      <div class="order" v-for="(order_num,index) in order_list" :key="index">
        <div class="order_code">
          <span>订单号：{{order_num}}</span>
          <span style="color: red;float: right" @click="oederDetails(order_num)">订单详情</span>
        </div>
        <van-action-sheet v-model="showDetails" title="订单详情">
          <div>
            <van-cell title="订单号" :value="order_info.order_id"></van-cell>
            <van-cell title="订单状态" v-if="order_info.status===1" value="待支付"></van-cell>
            <van-cell title="订单状态" v-if="order_info.status===2" value="待发货"></van-cell>
            <van-cell title="订单状态" v-if="order_info.status===3" value="待收货"></van-cell>
            <van-cell title="订单状态" v-if="order_info.status===4" value="待评价"></van-cell>
            <van-cell title="订单状态" v-if="order_info.status===5" value="已完成"></van-cell>
            <van-cell title="订单状态" v-if="order_info.status===6" value="已取消"></van-cell>
            <!--<van-cell title="合同" value="点击下载"></van-cell>-->
            <van-cell title="总价" :value="(order_info.total_price)+'元'"></van-cell>
          </div>
          <div v-for="(order,index) in order_info.skus" :key="index">
            <van-cell title="商品名称" :value="order.sku"></van-cell>
            <van-cell title="商品单价" :value="(order.price).toFixed(2)+'元'"></van-cell>
            <van-cell title="商品数量" :value="order.num"></van-cell>
          </div>
        </van-action-sheet>
        <div class="order_time">下单时间：{{order_id[order_num].create_time}}</div>
        <van-row class="order_shop" @click="goto('indexDetails?id='+order_good.sku_id)" v-for="(order_good,index) in order_id[order_num].goods" :key="index">
          <van-col span="6">
            <img :src="order_good.image_url" alt="">
          </van-col>
          <van-col span="12">
            <span class="shop_name">{{order_good.name}}</span>
            <div class="shop_tag">
              <span class="tagOne">{{order_id[order_num].pay_method}}</span>
              <span class="tagTwo">{{order_id[order_num].status}}</span>
            </div>
          </van-col>
          <van-col span="6" class="shop_price">
            <div>￥<span class="price">{{order_good.price.toFixed(2)}}</span></div>
            <div class="count">共{{order_good.count}}件</div>
            <div class="priceAdd">总计￥{{(order_good.price*order_good.count).toFixed(2)}}</div>
          </van-col>
        </van-row>
        <van-row type="flex" class="shop_btn">
          <van-col span="6"><van-tag plain round size="large" @click="Logistics(order_num)">物流信息</van-tag></van-col>
          <van-action-sheet v-model="showInfo" title="物流信息">
            <van-steps direction="vertical" :active="0">
              <div style="margin-left: -30px">
                <van-cell style="margin-right: 20px" title="订单号" :value="logistics.orderId"></van-cell>
                <van-cell title="信息" :value="logistics.returnMsg"></van-cell>
                <van-cell title="物流状态查询" v-if="logistics.isSuccess === true" value="成功"></van-cell>
              </div>
              <van-step v-for="(logistic,index) in logistics.orderLogisticStatus" :key="index">
                <h3>{{logistic.operateTime}}</h3>
                <p>{{logistic.operateState}}</p>
              </van-step>
            </van-steps>
          </van-action-sheet>
          <van-col span="6">
            <van-tag plain round size="large" @click="cancelOrder(order_num)">取消订单</van-tag>
          </van-col>
          <van-col span="6" v-if="order_id[order_num].status === '待支付'">
            <van-tag plain round size="large" @click="goPay(order_num)">去支付</van-tag>
          </van-col>
          <van-col span="6" v-if="order_id[order_num].status === '待评价'">
            <van-tag plain round size="large" @click="goPay(order_num)">去评价</van-tag>
          </van-col>
        </van-row>
      </div>
    </div>
    <div v-if="order_list.length > 0 && !show" style="width: 100%;height: 100%;background: #fff"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {BASE_URL,CASE_URL} from '../../api'
  import NoDate from '../../components/NoDate/NoDate'
  export default {
    data () {
      return {
        token:localStorage.getItem('token') || sessionStorage.getItem('token'),
        order_id:0,// 整个订单对象 keyi
        order_list:[],// 订单列表,
        code:localStorage.code || sessionStorage.code,
        showInfo:false,
        show:false,
        showDetails:false,
        logistics:{},
        order_info:{},
        key:'',
        pay_method:localStorage.pay_method || sessionStorage.pay_method,
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    components:{NoDate},
    methods:{
      goto(path){
        this.$router.push(path)
      },
      goBack(){
        this.goto('/my')
      },
      getData(){
        axios.get(BASE_URL + '/orders/info/', {
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json'
        }).then((response) => {
          this.order_id = response.data.order_id;//所有订单对象
          if(this.order_id.length > 0){
            this.show = false
          }else{
            this.show = true
          }
          for (var key in this.order_id) {
            this.key = key
            this.order_list.push(key);
          }
        }).catch(error => {
          console.log(error)
        })
      },
      // 去支付
      goPay(id){
        if(this.code  === ''){ // 普通用户
          if(parseInt(this.order_id[id].pay_method_id) ===2){
            axios.get(BASE_URL+'/orders/'+id+'/payment/?mobile=1', {
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
          }else if(parseInt(this.order_id[id].pay_method_id)===8){
            axios.get(BASE_URL+'/wechat/h5/orders/'+id+'/payment/'+'?next=/#/myOrder', {
              headers: {
                'Authorization': 'JWT ' + this.token
              },
              responseType: 'json',
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
          if(parseInt(this.order_id[id].pay_method_id) === 5) {
            axios.get(BASE_URL + '/orders/' + id + '/payment/?mobile=1',{
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
          }/*else if(parseInt(this.order_id[id].pay_method_id) === 8){
            axios.get(BASE_URL + '/wechat/h5/orders/' + id + '/payment/'+'?next=/#/myOrder', {
              headers: {
                'Authorization': 'JWT ' + this.token
              },
              responseType: 'json'
            })
              .then(response => {
                console.log(response)
                // 跳转到微信支付
                location.href = response.data.mweb_url;
              })
              .catch(error => {
                console.log(error.response);
                this.$toast({
                  message:'服务器错误'
                });
              })
          }*/
        }
      },
      // 物流信息
      Logistics(id){
        this.showInfo = true
        axios({
          method:'post',
          url:BASE_URL+'/yangcai/order/track/',
          responseType:'json',
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          data:{
            order_id:id,
            accessToken:this.token
          }
        }).then(response=>{
          this.logistics = response.data;
          console.log(this.logistics)
        }).catch(function(err){
          console.log(err.response);
          this.$toast({
            message:'服务器错误'
          });
        })
      },
      // 取消订单
      cancelOrder(id){
        axios({
          url:BASE_URL+'/orders/cancel/?order_id='+id,
          method:'patch',
          headers: {
            'Authorization': 'JWT ' + this.token
          },
        }).then(response=>{
          this.$toast({
            message:response.data.massage
          })
          axios.get(BASE_URL + '/orders/info/', {
            headers: {
              'Authorization': 'JWT ' + this.token
            },
            responseType: 'json'
          }).then((response) => {
            console.log(response.data)
            this.order_id = response.data.order_id;//所有订单对象
            console.log(this.order_id)
          }).catch(error => {
            if(error.response.status === 401 || error.response.status === 403 ){
              this.goto('/login')
            }else{
              console.log(error.response)
              this.$toast({
                message:'服务器错误'
              });
            }
          })
        }).catch(err=>{
          console.log(err.response)
          this.$toast({
            message:'服务器错误'
          });
        })
      },
      // 订单详情
      oederDetails(id){
        this.showDetails = true
        axios({
          method:'post',
          url:BASE_URL+'/yangcai/order/details/',
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          data:{
            order_id:id
          }
        }).then(response=>{
          if(response.data.success === true){
            this.order_info = response.data.result;
          }
          console.log(response.data);
        }).catch(err=>{
          console.log(err)
          this.$toast({
            message:'查找订单失败'
          });
        })
      }
    },
    mounted(){
      document.title = '行丰商城-我的订单'
      if(this.token) {
        this.getData()
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
    width: 80px;
  }
  .van-tag--default.van-tag--plain{
    color: #000;

  }
  .van-tag{
    padding:5px 10px;
  }
  .van-nav-bar__text{
    color: #323233;
  }
  .van-cell__value{
    margin-left: -35px;
  }
  .van-action-sheet{
    width: 100%;
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
      .noOrder{
        width 140px
        height 140px
        position absolute
        top -40px
        bottom 0
        left 0
        right 0
        margin auto
        img{
          width 100%
          height 100%
        }
        div{
          margin-top 10px
          text-align center
          span{
            font-size 16px
          }
        }
      }
      .order{
        width 100%
        height 100%
        padding 20px
        border-bottom 1px solid #f6f6f6
        .order_code{
          font-family PingFangSC-Regular
          font-size 13px
          font-weight 600
          color #333
        }
        .order_time{
          font-family PingFangSC-Regular
          font-size 13px
          color #333
          font-weight 600
          margin-top 6px
        }
        .order_shop{
          width 100%
          height 70px
          margin-top 10px
          img{
            width 70px
            height 100%
          }
          .shop_name{
            font-family PingFangSC-Regular
            font-size 14px
            color #333
            font-weight 400
            text-overflow ellipsis
            overflow hidden
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 2
          }
          .shop_tag{
            font-family PingFangSC-Regular
            font-size 13px
            color #333
            font-weight 600
            margin-top 10px
            .tagOne{

            }
            .tagTwo{
              margin-left 5px
            }
          }
          .shop_price{
            text-align right
            color #000
            line-height 22px
            .price{
              font-size 16px
            }
            .count{
              font-size 12px
              color #d6d6d6
            }
            .priceAdd{
              font-size 12px
            }
          }
        }
        .shop_btn{
          width 100%
          margin-top 10px
          margin-left 5px
        }
      }
    }
  }
</style>
