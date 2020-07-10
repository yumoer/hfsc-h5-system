<template>
  <div class="hf_app" id="app">
    <div>
      <header class="header">
        <van-nav-bar title="确认订单" fixed left-arrow @click-left="goBack" style="font-weight: bold;width:100%;">
        </van-nav-bar>
      </header>
      <div class="content" style="width: 100%;height: 100%;margin-top: 5px">
        <div v-if="showHide">
          <van-contact-card
            :name="currentContact.name"
            :address="currentContact.address"
            @click="addAddress"
            add-text="添加收货地址"
          ></van-contact-card>
        </div>
        <div v-else @click="goto('/myShopAddress')" class="addr" style="width: 100%;height: 80px;padding:10px 20px;position: relative;">
          <div style="width: 94%;display: inline-block">
            <div>
              <span>{{addresses[addIndex].receiver}} ,</span>
              <span>{{addresses[addIndex].mobile}}</span>
            </div>
            <div style="margin-top: 10px">
              <van-tag plain type="primary" v-if="addressId === addresses[addIndex].id">默认</van-tag>
              <span v-if="addresses[addIndex].province !== addresses[addIndex].city">{{addresses[addIndex].province}}{{addresses[addIndex].city}}{{addresses[addIndex].district}}</span>
              <span v-else>{{addresses[addIndex].city}}{{addresses[addIndex].district}}{{addresses[addIndex].place}}</span>
            </div>
          </div>
          <div style="width: 5%;height: 100%;display: inline-block;float: right">
            <span style="text-align: center;line-height: 50px;font-size: 18px">
              <van-icon name="arrow" ></van-icon>
            </span>
          </div>
        </div>
        <!--普通用户-->
        <div v-if="code===''">
          <div style="background-color: #fff;">
            <div style="position: relative;overflow: hidden;background: #fff;border-bottom:1px solid #ebedf0;padding: 10px 0;margin-top: 5px" v-for="(shop,index) in shops" :key="index" v-if="skuId === ''" @click="goto('/indexDetails?id='+shop.id)">
              <div style="float: left;width: 30%">
                <img style="margin-left: 20px;width: 80px" v-lazy="shop.default_image_url" alt="">
              </div>
              <div style="float: right;width: 70%">
                <p class="name" style="margin-right: 10px;text-overflow: ellipsis;overflow: hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2">{{shop.name}}</p>
                <div style="margin-top: 26px">
                  <span style="color: red">￥{{shop.price}}</span>
                  <div style="display: inline-block;float: right;margin-right: 10px">x{{shop.count}}</div>
                </div>
              </div>
            </div>
            <div style="position: relative;overflow: hidden;background: #fff;border-bottom:1px solid #ebedf0;padding: 10px 0;margin-top: 5px" v-if="skuId !== '' ">
              <div style="float: left;width: 30%">
                <img style="margin-left: 20px;width: 80px" v-lazy="shops.image" alt="">
              </div>
              <div style="float: right;width: 70%">
                <p class="name" style="margin-right: 10px;text-overflow: ellipsis;overflow: hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2">{{shops.name}}</p>
                <div style="margin-top: 26px">
                  <span style="color: red" >￥{{(shops.price).toFixed(2)}}</span>
                  <div style="display: inline-block;float: right;margin-right: 10px">x{{count}}</div>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 100%;height: 100%;padding: 20px 0 0 20px">
            <van-radio-group v-model="radio">
              <van-radio style="display: inline-flex;padding-bottom: 10px" name="1" checked-color="rgb(238, 10, 36)" @click="check">
                <label class="cash">货到付款</label>
              </van-radio>
              <van-radio style="display: inline-flex;padding-bottom: 10px;padding-left: 20px;" name="2" checked-color="rgb(238, 10, 36)" @click="check">
                <label class="zhifubao"></label>
              </van-radio>
              <!--<van-radio style="display: inline-flex;padding-bottom: 10px" name="4" checked-color="rgb(238, 10, 36)" @click="check">
                <label class="cash">支票</label>
              </van-radio>-->
              <van-radio style="display: inline-flex;padding-bottom: 10px;padding-left: 18px;" name="8" checked-color="rgb(238, 10, 36)" @click="check">
                <label class="weixinzhifu"></label>
              </van-radio>
              <!--<van-radio style="display: inline-flex;padding-bottom: 10px;" name="3" checked-color="rgb(238, 10, 36)" @click="check">-->
                <!--<label class="cash">国库集中支付-转账</label>-->
              <!--</van-radio>-->
            </van-radio-group>
          </div>
          <div style="margin-top: 20px">
            <van-cell title="发票信息" is-link :value="receipt" v-model="receipt" @click="ifShow"></van-cell>
            <van-action-sheet
              v-model="show"
              style="width: 100%;"
              :actions="actions"
              @select="onSelect"
            ></van-action-sheet>
            <!--普通发票-->
            <van-cell-group v-if="receipt === '普通发票'">
              <van-radio-group v-model="checkedId" v-for="(bill,index) in bills" :key="index" style="width: 100%;height: 100%;padding: 20px;">
                <van-radio :name="bill.id" checked-color="rgb(238, 10, 36)" @click="getChangeId(bill.id)">
                  <div>{{bill.invoice_title}}</div>
                  <div>税号：{{bill.invoice_org_code}}</div>
                </van-radio>
              </van-radio-group>

              <van-radio-group v-if="bills.length === 0" v-model="checkedId" style="width: 100%;height: 100%;padding: 20px;">
                <a @click="goto('/myAddInvoice')" style="color: #000">增票为空,<span style="color: red">去新增普通发票</span></a>
              </van-radio-group>
            </van-cell-group >
            <!--增值税发票-->
            <van-cell-group v-if="receipt === '增值税发票'" >
              <van-radio-group v-if="increaseTicket.length > 0" v-model="checkedId" v-for="(Ticket,index) in increaseTicket" :key="index" style="width: 100%;height: 100%;padding: 20px;">
                <van-radio :name="Ticket.id" checked-color="rgb(238, 10, 36)" @click="getChangeId(Ticket.id)">
                  <div>{{Ticket.invoice_title}}</div>
                  <div>税号：{{Ticket.invoice_org_code}}</div>
                </van-radio>
              </van-radio-group>
              <van-radio-group v-if="increaseTicket.length === 0" v-model="checkedId" style="width: 100%;height: 100%;padding: 20px;">
                <a @click="goto('/myAddTicket')" style="color: #000">增票为空,<span style="color: red">去新增增值税发票</span></a>
              </van-radio-group>

            </van-cell-group>
            <!--电子发票-->
            <van-cell-group v-if="receipt === '电子发票'" >
              <van-radio-group v-model="checkedId" v-for="(bill,index) in bills" :key="index" style="width: 100%;height: 100%;padding: 20px;">
                <van-radio :name="bill.id" checked-color="rgb(238, 10, 36)" @click="getChangeId(bill.id)">
                  <div>{{bill.invoice_title}}</div>
                  <div>税号：{{bill.invoice_org_code}}</div>
                </van-radio>
              </van-radio-group>

              <van-radio-group v-if="bills.length === 0" v-model="checkedId" style="width: 100%;height: 100%;padding: 20px;">
                <a @click="goto('/myAddInvoice')" style="color: #000">增票为空,<span style="color: red">去新增电子发票</span></a>
              </van-radio-group>

            </van-cell-group>
            <!--购物车-->
            <div v-if="skuId === ''">
              <div style="padding: 15px">
                <span style="float: left">商品金额</span>
                <span style="float: right;color: #e93b3d">￥{{price}}</span>
              </div>
              <div style="padding: 15px">
                <span style="float: left">运费</span>
                <span style="float: right;color: #e93b3d">+￥{{freight}}</span>
              </div>
              <div style="padding: 15px">
            <span style="float: right;font-size: 14px;font-weight: bold">实付金额：
              <span style="color: #e93b3d" v-if="parseInt(freight) === 0">￥{{price}}</span>
              <span style="color: #e93b3d" v-if="parseInt(freight) !== 0">￥{{(parseInt(price)+parseInt(freight)).toFixed(2)}}</span>
            </span>
              </div>
            </div>
            <!--直接购买 价格-->
            <div v-if="skuId !== ''">
              <div style="padding: 15px">
                <span style="float: left">商品金额</span>
                <span style="float: right;color: #e93b3d">￥{{((shops.price*count) || '').toFixed(2)}}</span>
              </div>
              <div style="padding: 15px">
                <span style="float: left">运费</span>
                <span style="float: right;color: #e93b3d">+￥{{(parseInt(shops.freight).toFixed(2))}}</span>
              </div>
              <div style="padding: 15px">
            <span style="float: right;font-size: 14px;font-weight: bold">实付金额：
              <span style="color: #e93b3d">￥ {{(shops.price*count+parseInt(shops.freight)).toFixed(2)}}</span>
            </span>
              </div>
            </div>
          </div>
          <div style="width: 100%;margin-top: 30px;" >
            <van-button @click="onSubmit('/shoppaydetails')" style="width: 100%;background-color: #ee0a24;color: #fff;margin-bottom: 20px;">提交订单</van-button>
          </div>
        </div>
        <!--央采用户-->
        <div v-else>
          <!--购物车购买-->
          <div v-if="skuId === ''" style="background-color: #fff;">
            <div style="position: relative;overflow: hidden;background: #fff;border-bottom:1px solid #ebedf0;padding: 10px 0;margin-top: 5px" v-for="(shop,index) in shops" :key="index" @click="goto('/indexDetails?id='+shop.id)">
              <div style="float: left;width: 30%">
                <img style="margin-left: 20px;width: 80px" v-lazy="shop.default_image_url" alt="">
              </div>
              <div style="float: right;width: 70%">
                <p class="name" style="margin-right: 10px;text-overflow: ellipsis;overflow: hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2">{{shop.name}}</p>
                <div style="margin-top: 26px">
                  <span style="color: red">￥{{shop.dis_price.toFixed(2)}}</span>
                  <span style="color: red" v-if="skuId !== ''">￥{{shop.price.toFixed(2)}}</span>
                  <span style="margin-left: 10px;font-size: 12px">原价 <span style="">{{shop.price}}</span></span>
                  <div style="display: inline-block;float: right;margin-right: 10px">x{{shop.count}}</div>
                </div>
              </div>
            </div>
          </div>

          <!--直接购买-->
          <div v-if="skuId !== ''" style="background-color: #fff;">
            <div style="position: relative;overflow: hidden;background: #fff;border-bottom:1px solid #ebedf0;padding: 10px 0;margin-top: 5px" @click="goto('/indexDetails?id='+skuId)">
              <div style="float: left;width: 30%">
                <img style="margin-left: 20px;width: 80px" :src="shops.image" alt="">
              </div>
              <div style="float: right;width: 70%">
                <p class="name" style="margin-right: 10px;text-overflow: ellipsis;overflow: hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2">{{shops.name}}</p>
                <div style="margin-top: 26px">
                  <span style="color: red" v-if="0 < shops.price*count && shops.price*count <= 100000">￥{{(shops.price*shops.first_step).toFixed(2)}}</span>
                  <span style="color: red" v-if="100000 < shops.price*count && shops.price*count<= 300000">￥{{(shops.price*shops.second_step).toFixed(2)}}</span>
                  <span style="color: red" v-if="300000 < shops.price*count && shops.price*count <=600000">￥{{(shops.price*shops.third_step).toFixed(2)}}</span>
                  <span style="color: red" v-if="600000 < shops.price*count && shops.price*count <=1000000">￥{{(shops.price*shops.fourth_step).toFixed(2)}}</span>
                  <span style="margin-left: 10px;font-size: 12px">原价 <span style="">{{parseInt(shops.price).toFixed(2)}}</span></span>
                  <div style="display: inline-block;float: right;margin-right: 10px">x{{count}}</div>
                </div>
              </div>
            </div>
          </div>

          <div style="width: 100%;height: 100%;padding: 10px 0 0 10px">
            <van-radio-group v-model="radio">
              <van-radio style="display: inline-flex;padding-bottom: 10px" name="1" checked-color="rgb(238, 10, 36)"  @click="check">
                <label class="cash">到付-公务卡</label>
              </van-radio>
              <van-radio style="display: inline-flex;padding-bottom: 10px" name="2" checked-color="rgb(238, 10, 36)" @click="check">
                <label class="cash">到付-支票</label>
              </van-radio>
              <van-radio style="display: inline-flex;padding-bottom: 10px;" name="9" checked-color="rgb(238, 10, 36)" @click="check">
                <label class="cash">账期</label>
              </van-radio>
              <!--<van-radio style="display: inline-flex;padding-bottom: 10px;padding-left: 30px" name="8" checked-color="rgb(238, 10, 36)">
                <label class="weixinzhifu"></label>
              </van-radio>-->
              <van-radio style="display: inline-flex;padding-bottom: 10px;padding-left: 20px" name="3" checked-color="rgb(238, 10, 36)" @click="check">
                <label class="cash">到付-转账汇款</label>
              </van-radio>
              <van-radio style="display: inline-flex;padding-bottom: 10px;" name="5" checked-color="rgb(238, 10, 36)" @click="check">
                <label class="zhifubao"></label>
              </van-radio>
              <van-radio style="display: inline-flex;padding-bottom: 10px;" name="4" checked-color="rgb(238, 10, 36)" @click="check">
                <label class="cash">到付-现金折算</label>
              </van-radio>
            </van-radio-group>
          </div>
          <div style="margin-top: 20px">
            <van-cell title="发票信息" is-link :value="receipt" v-model="receipt" @click="ifShow"></van-cell>
            <van-action-sheet
              v-model="show"
              style="width: 100%;"
              :actions="actions"
              @select="onSelect"
            ></van-action-sheet>
            <!--普通发票-->
            <van-cell-group v-if="receipt === '普通发票'">
              <van-radio-group v-model="checkedId" v-for="(bill,index) in bills" :key="index" style="width: 100%;height: 100%;padding: 20px;">
                <van-radio :name="bill.id" checked-color="rgb(238, 10, 36)" @click="getChangeId(bill.id)">
                  <div>{{bill.invoice_title}}</div>
                  <div>税号：{{bill.invoice_org_code}}</div>
                </van-radio>
              </van-radio-group>

              <van-radio-group v-if="bills.length === 0" v-model="checkedId" style="width: 100%;height: 100%;padding: 20px;">
                <a @click="goto('/myAddInvoice')" style="color: #000">普票为空,<span style="color: red">去新增普通发票</span></a>
              </van-radio-group>
            </van-cell-group >
            <!--增值税发票-->
            <van-cell-group v-if="receipt === '增值税发票'" >
              <van-radio-group v-if="increaseTicket.length > 0" v-model="checkedId" v-for="(Ticket,index) in increaseTicket" :key="index" style="width: 100%;height: 100%;padding: 20px;">
                <van-radio :name="Ticket.id" checked-color="rgb(238, 10, 36)" @click="getChangeId(Ticket.id)">
                  <div>{{Ticket.invoice_title}}</div>
                  <div>税号：{{Ticket.invoice_org_code}}</div>
                </van-radio>
              </van-radio-group>
              <van-radio-group v-if="increaseTicket.length === 0" v-model="checkedId" style="width: 100%;height: 100%;padding: 20px;">
                <a @click="goto('/myAddTicket')" style="color: #000">增票为空,<span style="color: red">去新增增值税发票</span></a>
              </van-radio-group>

            </van-cell-group>
            <!--电子发票-->
            <van-cell-group v-if="receipt === '电子发票'" >
              <van-radio-group v-model="checkedId" v-for="(bill,index) in bills" :key="index" style="width: 100%;height: 100%;padding: 20px;">
                <van-radio :name="bill.id" checked-color="rgb(238, 10, 36)" @click="getChangeId(bill.id)">
                  <div>{{bill.invoice_title}}</div>
                  <div>税号：{{bill.invoice_org_code}}</div>
                </van-radio>
              </van-radio-group>

              <van-radio-group v-if="bills.length === 0" v-model="checkedId" style="width: 100%;height: 100%;padding: 20px;">
                <a @click="goto('/myAddInvoice')" style="color: #000">电子票为空,<span style="color: red">去新增电子发票</span></a>
              </van-radio-group>

            </van-cell-group>
            <!--购物车-->
            <div v-if="skuId === ''">
              <div style="padding: 15px">
                <span style="float: left">商品金额</span>
                <span style="float: right;color: #e93b3d">￥{{dis_price}}</span>
              </div>
              <div style="padding: 15px">
                <span style="float: left">运费</span>
                <span style="float: right;color: #e93b3d">+￥{{freight}}</span>
              </div>
              <div style="padding: 15px">
            <span style="float: right;font-size: 14px;font-weight: bold">实付金额：
              <span v-if="freight === '0.00'" style="color: #e93b3d">￥{{(price)}}</span>
              <span v-if="freight !== '0.00'" style="color: #e93b3d">￥{{(price+parseInt(freight))}}</span>
            </span>
              </div>
            </div>
            <!--直接购买-->
            <div v-if="skuId !== ''">
              <div style="padding: 15px">
                <span style="float: left">商品金额</span>
                <span style="float: right;color: #e93b3d">￥{{shops.price*count}}</span>
              </div>
              <div style="padding: 15px">
                <span style="float: left">运费</span>
                <span style="float: right;color: #e93b3d">+￥{{(parseInt(shops.freight).toFixed(2))}}</span>
              </div>
              <div style="padding: 15px">
            <span style="float: right;font-size: 14px;font-weight: bold">实付金额：
              <span style="color: #e93b3d" v-if="shops.freight !== '0.00' && 0 < shops.price*count && shops.price*count<= 100000">￥ {{(shops.price*count*shops.first_step).toFixed(2)}}</span>

              <span style="color: #e93b3d" v-if="shops.freight !== '0.00' && 100000 < shops.price*count && shops.price*count<= 300000">￥ {{(shops.price*count*shops.second_step).toFixed(2)}}</span>

              <span style="color: #e93b3d" v-if="shops.freight !== '0.00' && 300000 < shops.price*count && shops.price*count<= 600000">￥ {{(shops.price*count*shops.third_step).toFixed(2)}}</span>

              <span style="color: #e93b3d" v-if="shops.freight !== '0.00' && 600000 < shops.price*count && shops.price*count <= 1000000">￥ {{(shops.price*count*shops.fourth_step).toFixed(2)}}</span>
            </span>
              </div>
            </div>
          </div>
          <div style="width: 100%;margin-top: 30px;" >
            <van-button @click="onSubmit('/shoppaydetails')" style="width: 100%;background-color: #ee0a24;color: #fff;margin-bottom: 20px;">提交订单</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {BASE_URL} from '../../api'
  export default {
    data () {
      return {
        chosenContactId: null,
        token:localStorage.getItem('token') || sessionStorage.getItem('token'),
        code:localStorage.code || sessionStorage.code,
        currentContact:{
          name:'',
          address:''
        },
        count:location.href.split('&count=')[1],
        showHide:true,
        addIndex:parseInt(localStorage.getItem('addIndex')) || 0,
        radio:'1', //支付方式
        checkedId:'1',
        pay_method:1, //支付方式
        receipt:'个人 不开发票',
        shops:[],  //所有商品信息
        freight:0,  //运费
        editingContact: {},
        showList: false,
        showEdit: false,
        isEdit: false,
        addresses:[],
        skuId:location.href.split('?skuId=')[1].split('&price=')[0],
        addressId:0,
        price:location.href.split('&price=')[1].split('&count=')[0], //价格
        name:'', //发票姓名
        invoice_type:'0',//发票类型
        invoice_title:'',//发票抬头
        invoice_org_code:'',//纳税人识别号
        invoice_name:'', //增值税收票人
        invoice_phone:'', //注册电话
        invoice_bank:'', //开户银行
        invoice_bank_code:'',  //开户行账号
        invoice_address:'', // 注册地址
        invoice:'', //发票信息
        send_invoice_address:'',
        bill_id:'', //发票id
        show:false,
        actions: [
          { name: '个人 不开发票',invoice_type:'0' },
          { name: '普通发票',invoice_type:'1' },
          { name: '增值税发票',invoice_type:'2' },
          { name: '电子发票' ,invoice_type:'3'}
        ],
        dis_price:0,
        generalVote:[],  //发票
        increaseTicket:[], //增票
        checked:false,  //选择发票id
        bills:[],  // 发票信息
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    mounted(){
      document.title = '行丰商城-确认订单'
      this.pay_method= localStorage.pay_method
      this.radio = this.pay_method
      this.getShop()
      this.getAddress()
      this.getInvoice()
    },
    methods: {
      goBack(){
        this.$router.go(-1)
        /*localStorage.removeItem('skuId')
        localStorage.removeItem('price')
        localStorage.removeItem('count')*/
      },
      goto(path){
        this.$router.push(path)
      },
      check(){
        this.pay_method = parseInt(this.radio)
        localStorage.setItem('pay_method',this.pay_method)
      },
      addAddress(){
        this.goto('/myshopaddress')
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
            this.addressId = response.data.default_address_id
            this.addresses = response.data.addresses;
            console.log(this.addresses)
            if(this.addresses.length > 0){
              this.showHide = false

            }else{
              this.showHide = true
            }
            localStorage.setItem('id',this.addresses[this.addIndex].id)
          })
          .catch(error => {
            console.log(error.response === undefined)
            if(error.response !== undefined){
              if(error.response.status === 401 || error.response.status === 403){
                this.$toast({
                  message: '请您登陆'
                })
                this.goto('/login?next=shopping')
              }else{
                this.$toast({
                  message:'服务器错误'
                })
              }
            }
          });
      },

      getChangeId(id){
        console.log(id)
        localStorage.invoiceId = id
        axios.get(BASE_URL + '/orders/invoice/'+id+'/',{
          // 向后端传递JWT token的方法
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json',
        })
          .then(response => {
            console.log(response.data)
            this.invoice_title = response.data.invoice_title
            this.invoice_org_code = response.data.invoice_org_code
            this.invoice_phone = response.data.invoice_phone
            this.invoice_bank_code = response.data.invoice_bank_code
            this.invoice_bank = response.data.invoice_bank
            this.register_address = response.data.register_address
            localStorage.setItem('invoice_title',this.invoice_title)
            localStorage.setItem('invoice_org_code',this.invoice_org_code)
          })
          .catch(error => {
            console.log(error.response)
            if(error.response !== undefined || error.response !== null){
              const status = error.response.status;
              console.log(status)
              if (status === 401 || status === 403) {
                this.goto('/login?next=shopping')
              } else {
                this.$toast({
                  message:error.response.data.detail
                })
              }
            }else{
              this.$toast({
                message:'服务器错误'
              })
            }
          });

      },
      // 添加联系人
      onAdd() {
        this.editingContact = { id: this.list.length };
        this.isEdit = false;
        this.showEdit = true;
      },
      getShop(){
        console.log(this.skuId)
        if(this.skuId === ''){  // 购物车购买
          axios.get(BASE_URL+'/orders/settlement/', {
            headers: {
              'Authorization': 'JWT ' + this.token
            },
            responseType: 'json'
          })
            .then(response => {
              this.shops = response.data.skus;//所有sku
              console.log(this.shops)
              this.freight = response.data.freight
              this.shops.forEach(ele=>{
                this.dis_price += parseInt(ele.price)*ele.count
              })
            })
            .catch(error => {
              console.log(error.response)
              if(error.response !== undefined || error.response !== null) {
                status = error.response.status;
                console.log(status)
                if (status === 401 || status === 403) {
                  this.$toast({
                    message: '请您登陆'
                  })
                  this.goto('/login?next=shopping')
                }else{
                  console.log(error.response.data)
                }
              }else{
                this.$toast({
                  message: '服务器错误'
                })
              }
            })
        }else{ // 直接购买
          axios.get(BASE_URL+'/categories/get/goods/'+this.skuId+'/', {
            headers: {
              'Authorization': 'JWT ' + this.token
            },
            responseType: 'json',
          })
            .then(response => {
              this.shops = response.data
            })
            .catch(error => {
              console.log(error.response)
              if(error.response.status !== undefined || error.response.status !== null) {
                status = error.response.status;
                console.log(status)
                if (status === 401 || status === 403) {
                  this.$toast({
                    message: '请您登陆'
                  })
                  this.goto('/login?next=shopping')
                }else{
                  console.log(error.response.data)
                }
              }else{
                this.$toast({
                  message: '服务器错误'
                })
              }
            })
        }
      },
      onSubmit(path){
        this.actions.forEach(ele=>{
          if(ele.name === this.receipt){
            this.invoice_type = ele.invoice_type
          }
        })

        this.bills.forEach(ele=>{
          this.bill_id = ele.id
        })
        if(this.skuId === ''){
          if(this.addresses[this.addIndex] === undefined){
            this.$toast({
              message:'请选择收货地址'
            })

          }else if(this.pay_method === undefined){
            this.$toast({
              message:'请选择支付方式'
            })
          }else{  // 提交订单
            axios.post(BASE_URL+'/orders/', {
              address: this.addresses[this.addIndex].id,
              pay_method: this.pay_method,  // 1
              // 央采字段开始
              name:this.name,
              invoice:this.bill_id, //发票id
              invoice_type:this.invoice_type,//发票类型  //"0"
              invoice_title:this.invoice_title,//发票抬头
              invoice_org_code:this.invoice_org_code,//纳税人识别号
              invoice_phone:this.invoice_phone, // 注册电话
              invoice_back_code:this.invoice_bank_code,//开户银行账号
              invoice_bank:this.invoice_bank, // 注册银行
            }, {
              headers: {
                'Authorization': 'JWT ' + this.token
              },
              responseType: 'json'
            })
              .then(response => {
                if(this.invoice_type === '0'){
                  localStorage.removeItem('invoice_title')
                  localStorage.removeItem('invoice_org_code')
                }
                this.$router.replace(path+'?orderId='+response.data.order_id+'&price='+this.price+'&pay_method='+this.pay_method+'&invoice_type='+this.invoice_type)
                this.$router.go(0)
              })
              .catch(error => {
                if(error.response !== undefined){
                  if(error.response.status === 507){
                    this.goto('/shopping')
                    this.$toast({
                      message:'未选择商品'
                    })
                  }else if(error.response.status === 400){
                    this.$toast({
                      message:error.response.data.non_field_errors[0]
                    })
                  }
                }
              })
          }
        }else{ // 直接购买
          console.log(this.addresses[this.addIndex] )
          if(this.addresses[this.addIndex] === undefined){
            this.$toast({
              message:'请选择收货地址'
            })
          }else if(this.pay_method === undefined){
            this.$toast({
              message:'请选择支付方式'
            })
          }else {
            axios.post(BASE_URL+'/orders/directly/create/', {
              count:parseInt(this.count),
              goods_id:this.skuId,
              address: this.addresses[this.addIndex].id,
              pay_method: this.pay_method,  // 1
              // 央采字段开始
              name:this.name,
              invoice:this.bill_id, //发票id
              invoice_type:this.invoice_type,//发票类型  //"0"
              invoice_title:this.invoice_title,//发票抬头
              invoice_org_code:this.invoice_org_code,//纳税人识别号
              // invoice_name:this.invoice_name, // 收票人
              invoice_phone:this.invoice_phone, // 注册电话
              invoice_back_code:this.invoice_bank_code,//开户银行账号
              // invoice_address:this.invoice_address,//注册地址
              invoice_bank:this.invoice_bank, // 注册银行
            }, {
              headers: {
                'Authorization': 'JWT ' + this.token
              },
              responseType: 'json'
            })
              .then(response => {
                console.log(response)
                this.$router.replace(path+'?orderId='+response.data.order_id+'&price='+(this.shops.price*this.count).toFixed(2)+'&pay_method='+this.pay_method+'&invoice_type='+this.invoice_type)
              })
              .catch(error => {
                console.log(error.response)
                if(error.response !== undefined || error.response !== null) {
                  status = error.response.status;
                  console.log(status)
                  if (status === 401 || status === 403) {
                    this.$toast({
                      message: '请您登陆'
                    })
                    this.goto('/login?next=shopping')
                  }else{
                    this.$toast({
                      message:error.response.data.non_field_errors
                    })
                  }
                }else{
                  this.$toast({
                    message: '服务器错误'
                  })
                }
              })
          }
        }
      },
      ifShow(){
        this.show = true
      },
      onSelect(item) {
        console.log(item)
        // 点击选项时默认不会关闭菜单，可以手动关闭
        this.show = false;
        this.receipt = item.name
        this.invoice_type = item.invoice_type
      },
      getInvoice(){
        axios.get(BASE_URL + '/orders/invoice/', {
          // 向后端传递JWT token的方法
          headers: {
            'Authorization': 'JWT ' + this.token
          },
          responseType: 'json',
        })
          .then(response => {
            // 加载用户数据
            console.log(response.data)
            this.bills = response.data
            this.generalVote = []  //普票
            this.increaseTicket = []  // 增票
            this.bills.forEach(ele=>{
              if(ele.invoice_bank === null && ele.invoice_bank_code === null && ele.invoice_phone === null && ele.register_address === null){
                this.generalVote.push(ele)
              }else{
                this.increaseTicket.push(ele)
              }
            })
          })
          .catch(error => {
            console.log(error.response)
            if(error.response !== undefined || error.response !== null) {
              status = error.response.status;
              console.log(status)
              if (status === 401 || status === 403) {
                this.$toast({
                  message: '请您登陆'
                })
                this.goto('/login?next=shopping')
                // window.location.reload()
              }else{
                console.log(error.response.data)
              }
            }else{
              this.$toast({
                message: '服务器错误'
              })
            }
          });
      },
    },
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
  }
  .van-cell__value{
    margin-left: 0!important;
  }
  .van-field__label{
    width: 100px;
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
