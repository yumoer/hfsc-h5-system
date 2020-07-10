<template>
  <div class="hf_app" id="app">
    <div v-if="shops.length > 0 || havaShop">
      <header class="header">
        <van-nav-bar title="购物车" fixed left-arrow @click-left="goBack" style="font-weight: bold;width:100%;">
        </van-nav-bar>
      </header>
      <nav class="nav" style="width: 100%;height: 100%">
        <div v-if="havaShop" style="width: 100%;height: 100%;background: #f7f7f7">
          <div style="height: 100%">
            <img style="width:120px;height:120px;position: absolute; top: -60px;bottom: 0;left: 0;right: 0;margin: auto;background-size: 100% 100%" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-d6193bd6e4.png" alt="">
            <span style="position: absolute; top: 60px;color: #999;bottom: 0;left: 0;right: 0;display: flex;justify-content: center;align-items: center;">去首页逛逛添加点什么吧</span>
          </div>
        </div>
        <ToHome v-if="shops.length < 2"/>
        <ToLogin v-if="token === null"/>
        <ToMy v-else-if="shops.length < 2"/>
        <Footer/>
        <div v-if="!havaShop" style="background-color: #fff;margin-bottom: 50px;">
          <div style="position: relative;overflow: hidden;background: #fff;border-bottom:1px solid #ebedf0;padding: 20px 0;margin-top: 5px;" v-for="(shop,index) in shops" :key="index">
            <div style="float: left;width: 35%">
              <van-checkbox @change="update_selected(index)" style="left: -15px;position: absolute;width: 40px;height: 75%;" v-model="shop.selected"></van-checkbox>
              <img @click="goto('/indexDetails?id='+shop.id)" style="margin-left: 30px;width: 100px;height: 100px" v-lazy="shop.default_image_url" alt="">
            </div>
            <div style="float: right;width: 60%">
              <p class="name" style="margin-right: 10px;text-overflow: ellipsis;overflow: hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2" @click="goto('/indexDetails?id='+shop.id)">{{shop.name}}</p>
              <div style="margin-top: 30px">
                <!--普通用户-->
                <span v-if="code === '' || token === null" style="color: red">￥{{shop.price}}</span>
                <!--央采用户-->
                <span v-if="code !== '' && code !== undefined" style="color: red">￥{{shop.dis_price.toFixed(2)}}</span>
                <span v-if="code !== '' && code !== undefined" style="margin-left: 10px;font-size: 12px">原价 <span style="color: #000">￥{{shop.price}}</span></span>

                <van-stepper
                  v-model="shop.count"
                  @focus="origin_input=shop.count"
                  @blur="on_input(index)"
                  @plus="on_add(index)"
                  @minus="on_minus(index)"
                  integer
                  input-width="20px"
                  button-size="20px"
                  style="display: inline-block;float: right;margin-right: 10px"
                ></van-stepper>

                <span @click="goDel(shop.id)" style="float: right;font-size: 14px;margin-right: -60px;margin-top: 30px;">删除</span>
              </div>

            </div>
          </div>
        </div>
        <div v-if="!havaShop" id="goPrice">
          <van-submit-bar
            label="总计："
            :price="price"
            button-text="去结算"
            @submit="submit"
            :safe-area-inset-bottom=true
            style="width:100%;"
          >
            <van-checkbox id="checked" v-model="selected" @change="on_selected_all" style="margin-top: 5px">全选 ({{count}}件)</van-checkbox>
          </van-submit-bar>
        </div>
      </nav>
    </div>
    <div v-else style="width: 100%;height: 100%;background: #fff"></div>
  </div>
</template>

<script>
  import { Dialog } from 'vant';
  import axios from 'axios';
  import ToHome from '../../components/ToRoute/ToHome/ToHome'
  import ToLogin from '../../components/ToRoute/ToLogin/ToLogin'
  import ToMy from '../../components/ToRoute/ToMy/ToMy'
  import Footer from '../../components/Footer/Footer'
  import {BASE_URL} from '../../api'
  export default {
    data () {
      return {
        query:'',
        code:localStorage.code || sessionStorage.code,
        page:1,
        page_size: 100,
        ifLogin:false,
        check:false,
        num:true,
        havaShop:false,
        shops:[],
        skuId:null,
        price:0,
        token:localStorage.getItem('token') || sessionStorage.getItem('token'),
        selected:false,
        count: 0,// 总选择物品数量
        total_selected_amount:'',
        /*selected_all(){ //全选
          var selected=false;
          for(var i=0; i<this.shops.length; i++){
            if(this.shops[i].selected===false){
              selected=false;
              break;
            }
          }
          console.log(selected)
          return selected;
        },*/
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    components:{
      ToHome,
      ToLogin,
      ToMy,
      Footer
    },
    mounted(){
      document.title = '行丰商城-购物车'
      console.log(this.code)
      var Height = this.screeHeight - $('.header').height() - 30
      $('.nav').height(Height)
      if(this.token !== undefined || this.token !== null){
        this.ifLogin = true
        this.getShop()
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      goto(path){
        this.$router.push(path)
        this.$router.go(0)
      },
      getShop(){
        axios.get(BASE_URL + '/cart/', {
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json',
          withCredentials: true
        })
          .then(response => {
            this.shops = response.data
            if(response.data.length <1){
              this.havaShop = true
            }else{
              var count = 0
              this.shops.forEach(ele=>{
                if(ele.selected === true){
                  count++;
                  this.count += ele.count
                  if(this.code === ''){
                    this.price += ele.price*ele.count
                  }else if(this.code === ''){
                    this.price += ele.price*ele.count
                  }else{
                    this.price += ele.dis_price*ele.count
                  }

                }
              })
              this.price = this.price*100
              if(count === this.shops.length){
                this.selected = true
              }
            }
          })
          .catch(error => {
            console.log(error)
            this.$toast({
              message:'服务器错误'
            })
          })
      },
      update_selected(index) {
        axios.put(BASE_URL + '/cart/', {
          sku_id: this.shops[index].id,
          count: this.shops[index].count,
          selected: this.shops[index].selected
        }, {
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json',
          withCredentials: true
        })
          .then(response => {
            this.shops[index].selected = response.data.selected;
            window.location.reload()
          })
          .catch(error => {
            if ('non_field_errors' in error.response.data) {
              this.$toast({
                message:error.response.data.non_field_errors[0]
              })
            } else {
              this.$toast({
                message:'修改购物车失败'
              })
            }
            console.log(error.response.data);
          })
      },
      on_selected_all(){  //全选
        var selected = this.selected;
        for (var i=0; i<this.shops.length;i++){
          this.shops[i].selected = selected;
          console.log(this.shops[i].selected)
          this.update_count(i, this.shops[i].count);
        }

      },
      // 更新购物车数据
      update_count(index, count){
        axios.put(BASE_URL+'/cart/', {
          sku_id: this.shops[index].id,
          count,
          selected: this.shops[index].selected
        }, {
          headers:{
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json',
          withCredentials: true
        })
          .then(response => {
            this.shops[index].count = response.data.count;
          })
          .catch(error => {
            if ('non_field_errors' in error.response.data) {
              this.shops.forEach(ele=>{
                if(ele.sku_id === this.shops[index].sku_id){
                  console.log(this.shops)
                  this.$toast({
                    message:'您有'+error.response.data.non_field_errors[0]+'，已删除'
                  })
                }
              })
            } else {
              this.$toast({
                message:'修改购物车失败'
              })
            }
            console.log(error.response.data);
          })
      },
      goDel(id){
        Dialog.confirm({
          title: '删除商品',
          message: '是否确认删除此商品',
          confirmButtonText:'删除',
          cancelButtonText:'取消'
        }).then(() => {  //删除
          axios.delete(BASE_URL+'/cart/', {
            headers: {
              'Authorization': 'JWT ' + this.token
            },
            data: {
              sku_id: id
            },
            responseType: 'json',
            withCredentials: true
          })
            .then(response => {
              window.location.reload()
            })
            .catch(error => {
              console.log(error.response.data);
            })
        }).catch(() => { //取消

        });
      },
      on_input(index){
        var count = parseInt(this.shops[index].count);
        console.log(count)
        this.count = count
        if(this.code === ''){
          this.price = this.shops[index].price*100*count
        }else{
          this.price = this.shops[index].dis_price*100*count
        }
        if (isNaN(count) || count <= 0) {
          this.shops[index].count = this.origin_input;
        } else {
          // 更新购物车数据
          axios.put(BASE_URL+'/cart/', {
            sku_id: this.shops[index].id,
            count: count,
            selected: this.shops[index].selected
          }, {
            headers:{
              'Authorization': 'JWT ' + this.token
            },
            responseType: 'json',
            withCredentials: true
          })
            .then(response => {
              console.log(response)
              this.shops[index].count = response.data.count;
            })
            .catch(error => {
              console.log(error)
              let err = error.response.data;
              if(typeof(err)==='string'){
                this.$toast({
                  message:err
                })

              }
              else if ('error_msg' in err || 'non_field_errors' in err) {
                // alert(error.response.data.non_field_errors[0]);
                this.$toast({
                  message:error.response.data.non_field_errors[0]
                })
              } else {
                this.$toast({
                  message:'修改购物车失败'
                })
              }
              this.shops[index].count = this.origin_input;
            })
        }
      },
      on_add(index){
        var count = this.shops[index].count + 1;
        this.count = this.count + 1
        if(this.code !== ''){
          this.price = this.price + this.shops[index].dis_price*100
        }else{
          this.price = this.price + this.shops[index].price*100
        }
        this.update_count(index, count);
      },
      // 减少操作
      on_minus(index){
        if (this.shops[index].count > 1) {
          var count = this.shops[index].count - 1;
          this.count = this.count - 1
          if(this.code !== ''){
            this.price = this.price - this.shops[index].dis_price*100
          }else{
            this.price = this.price - this.shops[index].price*100
          }
          this.update_count(index, count);
        }
      },
      submit(){
        if(this.price !== 0){
          // console.log(this.shops[0].id)
          this.goto('/shoppay?skuId=&price='+(this.price/100).toFixed(2)+'&count='+this.count)
          window.location.reload()
        }else{
          this.$toast({
            message:'请选择您要购买的商品'
          })
        }
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
  .van-dialog{
    width: 80%;
  }
  .van-field__label{
    width: 40px;
  }
  .van-checkbox__icon--checked .van-icon{
    background-color:#f2270c;
    border-color:#f2270c;
  }
  .van-checkbox{
    margin-left: 20px;
  }
  .van-submit-bar van-submit-bar--safe-area-inset-bottom{
    border-top: 1px solid #ddd;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .header{
    width:100%;
    height:40px;
    line-height: 40px;
    background:#fff;
    position:relative;
    color:#fff;
  }
</style>
