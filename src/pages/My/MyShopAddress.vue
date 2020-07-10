<template>
  <div class="hf_app" id="app">
    <header class="header">
      <van-nav-bar title="收货地址" left-arrow fixed @click-left="goBack" style="font-weight: bold;width:100%;">
        <van-icon name="plus" slot="right"  @click="onAdd"></van-icon>
      </van-nav-bar>
    </header>
    <!--<div class="content" style="font-size: 16px;" v-if = 'show && addresses.length === 0'>
      <NoDate  type="1"/>
    </div>-->
    <div class="content" style="font-size: 16px;" v-if = 'show && addresses.length !== 0'>
      <van-notice-bar :scrollable="false" style="color: #000;" v-if="addresses.length > 0">
        <span style="line-height: 30px">您已创建了 <span style="color:#ed6a0c;font-weight: bold">{{addresses.length}}</span> 个收货地址，最多可创建 <span style="color:#ed6a0c;font-weight: bold">5</span> 个</span>
      </van-notice-bar>
      <!--<van-tag plain type="primary">默认地址</van-tag>-->
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :add-button-text="text"
        switchable
        @add="onChecked"
        @edit="onEdit"
        @select="onSelect"
      ></van-address-list>
    </div>
    <div class="content" style="font-size: 16px;" v-if = '!show && addresses.length === 0'>
      <NoDate  type="3"/>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {BASE_URL} from '../../api'
  import NoDate from '../../components/NoDate/NoDate'
  export default {
    data () {
      return {
        chosenAddressId:parseInt(localStorage.getItem('id')),
        token:localStorage.getItem('token') || sessionStorage.getItem('token'),
        addresses:[],
        list: [],
        item:[],
        text:'确认地址',
        index:0,
        show:true,
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    components:{NoDate},
    mounted(){
      document.title = '行丰商城-收货地址'
      if(localStorage.default !== undefined || localStorage.default === true){
        this.text = '设为默认'
      }
      if(this.show && this.addresses.length !== 0){
        var Height = this.screeHeight - $('.header').height() - 5
        $('.content').height(Height)
      }
      this.getAddress()
    },
    methods: {
      goBack(){
        this.$router.go(-1)
        localStorage.removeItem('default')
      },
      goto(path){
        this.$router.push(path)
        // this.$router.go(0)
      },
      onAdd() {
        let title = '新增地址'
        localStorage.setItem('title',title)
        this.goto('/shopaddress')
      },
      onEdit(item, index) {
        let title = '编辑地址'
        localStorage.setItem('index',index)
        localStorage.setItem('title',title)
        this.chosenAddressId = this.addresses[index].id
        this.goto('/shopaddress?id='+this.chosenAddressId)
      },
      /*选择当前的*/
      onSelect(item, index){
        console.log(item, index)
        this.item = item
        this.index = index
      },
      setDefault(){
        axios.put(BASE_URL + '/addresses/' + this.chosenAddressId + '/status/', {}, {
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json'
        })
          .then(response => {
            console.log(response)
            if(response.data.message === 'OK'){
              this.$toast({
                message:'默认地址设置成功'
              })
              localStorage.removeItem('default')
            }
          })
          .catch(error => {
            console.log(error.response);
            this.$toast({
              message:'服务器错误'
            });
          })
      },
      onChecked(){
        if(this.text === '确认地址'){
          localStorage.setItem('addIndex',this.index)
          this.goBack()
        }else if(this.text === '设为默认'){
          localStorage.setItem('addIndex',this.index)
          /*this.goBack()*/
          this.setDefault()
        }
      },
      getAddress(){
        // 获取地址信息
        axios.get(BASE_URL + '/addresses/', {
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json'
        })
          .then(response => {
            console.log(response.data)
            this.addresses = response.data.addresses
            if(this.addresses.length === 0){
              this.show = false
            }
            this.list = this.addresses
            this.list.forEach((ele,index)=>{
              ele.id = this.addresses[index].id
              ele.name = this.addresses[index].receiver
              ele.tel = this.addresses[index].mobile
              if(this.addresses[index].province !== this.addresses[index].city){
                ele.address = this.addresses[index].province+this.addresses[index].city+this.addresses[index].district+this.addresses[index].place
              }else{
                ele.address = this.addresses[index].city+this.addresses[index].district+this.addresses[index].place
              }
            })
          })
          .catch(error => {
            console.log(error)
            this.$toast({
              message:'服务器错误'
            });
          });
      }
    },
  }
</script>
<style type="text/css">
  .van-field__control{
    text-align: left;
    margin-left: 20px;
  }
  .van-field__label{
    width: 60px;
  }
  .van-cell__value{
    margin-left: 0!important;
  }
  .van-notice-bar__wrap{
    height: 30px;
  }
  .van-nav-bar .van-icon{
    color: #222;
    font-size: 20px;
    cursor: pointer;
  }
  .van-address-list{
    padding-bottom: 0;
  }
  .van-address-list__add{
    width:100%;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app{
    font-size 18px
    background-color #fff
  }
  /*header*/
  .header{
    width:100%;
    height:40px;
    line-height: 40px;
    background:#fff;
    position:relative;
    color:#fff;
  }
</style>
