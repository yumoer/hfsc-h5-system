<template>
  <div class="hf_app" id="app">
    <header class="header">
      <van-nav-bar :title="title" left-arrow @click-left="goBack" style="font-weight: bold">
      </van-nav-bar>
    </header>
    <div v-if="title === '新增地址'" class="content" style="width: 100%;height: 100%;margin-top: 5px">
      <van-address-edit
        :area-list="areaList"
        :address-info="list"
        show-search-result
        :search-result="searchResult"
        @save="onSave"
      >
        <van-cell-group>
          <van-field
            v-model="form_address.tel"
            clearable
            label="固定电话"
            placeholder="收货人固定电话"
            @click-right-icon="$toast('question')"
          ></van-field>

          <van-field
            v-model="form_address.email"
            label="邮箱地址"
            clearable
            placeholder="收货人邮箱地址"
          ></van-field>

        </van-cell-group>
      </van-address-edit>
    </div>
    <div v-if="title === '编辑地址'" class="content" style="width: 100%;height: 100%;margin-top: 5px">
      <van-address-edit
        :area-list="areaList"
        show-delete
        :address-info="list"
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @delete="onDelete"
      >
        <van-cell-group>
          <van-field
            v-model="form_address.tel"
            clearable
            label="固定电话"
            placeholder="收货人固定电话"
            @click-right-icon="$toast('question')"
          ></van-field>

          <van-field
            v-model="form_address.email"
            label="邮箱地址"
            clearable
            placeholder="收货人邮箱地址"
          ></van-field>

        </van-cell-group>
      </van-address-edit>
    </div>
  </div>
</template>

<script>
  import areaList from '../../../static/js/area'
  import axios from 'axios'
  import {BASE_URL} from '../../api'
  export default {
    data () {
      return {
        areaList,
        searchResult: [],
        chosenAddressId:'1',
        show1:false,
        content:{},
        token:localStorage.getItem('token') || sessionStorage.getItem('token'),
        value:'',
        index:localStorage.getItem('index'),
        list:{},
        title:'新增地址',
        ifShowAdd:false,
        addresses:[],
        addressId:0,
        form_address: {
          receiver: '',
          province_id: '',
          city_id: '',
          district_id: '',
          place: '',
          mobile: '',
          tel: '',
          email: '',
        },
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    mounted(){
      document.title = '行丰商城-新增地址'
      var Height = this.screeHeight - $('.header').height() - 10
      $('.content').height(Height)
      this.setAddresses()
      this.getAddresses()
    },
    methods: {
      goBack(){
        this.$router.go(-1)
      },
      getAddress(content){
        console.log(content)
        this.form_address = {
          title:content.name,
          receiver: content.name,
          province_id: content.province,
          city_id: content.city,
          district_id: parseInt(content.areaCode),
          place: content.addressDetail,
          mobile: content.tel,
          tel: this.form_address.tel,
          email: this.form_address.email,
        }
        this.getProvinceId(this.form_address)
        this.getCityId(this.form_address)
        this.getDistrictId(this.form_address)
        // 获取地址信息
        axios.post(BASE_URL + '/addresses/',this.form_address, {
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json'
        })
          .then(response => {
            console.log(response.data)
            this.$toast({
              message:'地址新增成功',
              position:'bottom'
            });
            this.addIndex = 0
            this.$router.go(-1)

          })
          .catch(error => {
            console.log(error.response)
            if(error.response !== undefined){

            }else{
              this.$toast({
                message:'服务器错误'
              });
            }
          });
      },
      setAddress(content){
        console.log(content)
        this.form_address = {
          title:content.name,
          receiver: content.name,
          province_id: content.province,
          city_id: content.city,
          district_id: parseInt(content.areaCode),
          place: content.addressDetail,
          mobile: content.tel,
          tel: this.form_address.tel,
          email: this.form_address.email,
        }
        this.getProvinceId(this.form_address)
        this.getCityId(this.form_address)
        axios.put(BASE_URL + '/addresses/' + this.addresses[this.index].id + '/',this.form_address, {
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json'
        })
          .then(response => {
            console.log(response.data)
            this.$toast('地址编辑成功');
            // 从数组中移除地址
            this.$router.go(-1)
          })
          .catch(error => {
            console.log(error);
          })
      },
      onAdd() {
        this.ifShowAdd = true
        this.title = '新增地址'
        document.title = '行丰商城-新增地址'
      },
      onSave(content) {
        console.log(content)
        if(this.title === '编辑地址'){
          document.title = '行丰商城-编辑地址'
          this.setAddress(content)
        }else{
          this.getAddress(content)
        }
      },
      onDelete(item,index){
        console.log(item)
        axios.delete(BASE_URL + '/addresses/' + this.addresses[this.index].id + '/', {
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json'
        })
          .then(response => {
            // 从数组中移除地址
            this.addresses.splice(index, 1);
            this.$router.go(-1)
          })
          .catch(error => {
            console.log(error.response.data);
            this.$toast({
              message:'服务器错误'
            });
          })
      },
      getDistrictId(content){
        console.log(content)
        var obj = this.areaList.county_list;
        for(var key in obj){
          if(obj[key] === content.district_id){
            content.district_id = parseInt(key)
            console.log(content.district_id)
          }
        }
      },
      getProvinceId(content){
        var obj = this.areaList.province_list;
        for(var key in obj){
          if(obj[key] === content.province_id){
            content.province_id = parseInt(key)
            console.log(content.province_id)
          }
        }
      },
      getCityId(content){
        var obj = this.areaList.city_list;
        for(var key in obj){
          if(obj[key] === content.city_id){
            content.city_id = parseInt(key)
            console.log(content.city_id)
          }
        }
      },
      // 新增
      getAddresses(){
        // 获取地址信息
        axios.get(BASE_URL + '/addresses/', {
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json'
        })
          .then(response => {
            this.addressId = response.data.default_address_id
            this.addresses = response.data.addresses
            this.content = this.addresses[localStorage.getItem('index')]
            this.title = localStorage.getItem('title')
            console.log(this.title)
            if(this.title === '新增地址'){
              this.list = {}
              const id = location.href.split('?id=')[1]
              if(this.addressId === parseInt(id)){
                this.list.isDefault = true
              }else{
                this.list.isDefault = false
              }
            }else{
              this.list={
                name:this.content.title,
                tel:this.content.mobile,
                province:this.content.province,
                city:this.content.city,
                county:this.content.district,
                addressDetail:this.content.place,
                areaCode:''+this.content.district_id,
              }

              const id = location.href.split('?id=')[1]
              if(this.addressId === parseInt(id)){
                this.list.isDefault = true
              }else{
                this.list.isDefault = false
              }
              this.form_address.tel = this.content.tel
              this.form_address.email = this.content.email
            }
          })
          .catch(error => {
            console.log(error.title)
            if(error.status === 401){
              this.goto('/login')
            }
          });
      },
      // 编辑
      setAddresses(){
        console.log(this.areaList)
        axios.get(BASE_URL + '/mobile/get/carts/name/all/', {}, {
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json'
        })
          .then(response => {
            console.log(response)
            var _that = this
            response.data.map(function (e) {
              _that.areaList.province_list[e.id] = e.name;
              e.subs.map(function (o) {
                _that.areaList.city_list[o.id] = o.name;
                o.subs.map(function (a) {
                  _that.areaList.county_list[a.id] = a.name;
                })
              })
            })
          })
          .catch(error => {
            console.log(error.response)
            if(error.response !== undefined || error.response !== null){

            }else{
              this.$toast({
                message:'服务器错误'
              });
            }
          })
      }
    }
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
  .van-nav-bar .van-icon{
    color: #222;
    font-size: 20px;
    cursor: pointer;
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
    /*position:fixed;*/
    position:relative;
    color:#fff;
  }
</style>
