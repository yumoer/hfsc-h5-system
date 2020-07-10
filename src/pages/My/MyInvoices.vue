<template>
  <div class="hf_app" id="app">
    <header class="header">
      <van-nav-bar class="head" fixed title="我的发票" left-arrow @click-left="goBack">
        <van-icon name="plus" slot="right"  @click="getAdd"></van-icon>
      </van-nav-bar>
    </header>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
    ></van-action-sheet>
    <div class="wrap" v-if="bills.length !== 0">
      <van-panel title="普票和电子发票信息" v-if="generalVote.length > 0">
        <div class="invoices">
          <div class="info" v-for="(Vote,index) in generalVote" :key="index">
            <div class="info_left" @click="gotoInvoice('/myAddInvoice',index)">
              <div class="info_name">{{Vote.invoice_title}}</div>
              <div class="info_code">税号：{{Vote.invoice_org_code}}</div>
            </div>
            <div class="info_right">
              <span class="info_edit" @click="goEditInvoice('/myAddInvoice',index)">编辑</span>
              <van-icon class="info_cross" name="cross"  @click="goDel(index,1)"></van-icon>
            </div>
          </div>
        </div>
      </van-panel>
      <van-panel title="增值税发票信息" v-if="increaseTicket.length > 0">
        <div class="invoices">
          <div class="info" v-for="(Ticket,index) in increaseTicket" :key="index">
            <div class="info_left">
              <div class="info_name">{{Ticket.invoice_title}}</div>
              <div class="info_code">税号：{{Ticket.invoice_org_code}}</div>
            </div>
            <div class="info_right">
              <span class="info_edit" @click="goEditInvoice('/myAddTicket',index)">编辑</span>
              <van-icon class="info_cross" name="cross" @click="goDel(index,2)"></van-icon>
            </div>
          </div>
        </div>
      </van-panel>
    </div>
    <div class="wrap" v-else>
      <NoDate type="5"></NoDate>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { Dialog } from 'vant';
  import {BASE_URL} from '../../api'
  import NoDate from '../../components/NoDate/NoDate'
  export default {
    data () {
      return {
        token:localStorage.getItem('token') || sessionStorage.getItem('token'),
        generalVote:[], //普票
        increaseTicket:[], //增票
        show:false,
        actions: [
          { name: '新增普通发票' ,path:'myAddInvoice'},
          { name: '新增电子发票' ,path:'myAddInvoice'},
          { name: '新增增值税发票' ,path:'myAddTicket'},
        ],
        bills:[  // 发票信息
          {
            "id": 1, //发票id
            "invoice_title": "123hahaqwe", //发票抬头
            "invoice_org_code": "12331212312312",// 纳税人识别号
            "register_address": null, //注册地址
            "invoice_phone": null,//注册电话
            "invoice_bank": null,//开户银行
            "invoice_bank_code": null //开户银行账号
          },
        ],
        screeHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,    // 屏幕高
      }
    },
    components:{NoDate},
    mounted(){
      document.title = '行丰商城-我的发票'
      if(this.bills.length !== 0){
        var Height = this.screeHeight - $('.header').height()
        $('.wrap').height(Height)
      }
      // 判断用户的登录状态
      if (this.token) {
        this.getInvoice()
      }
    },
    methods:{
      goto(path){
        this.$router.push(path)
        // this.$router.go(0)
      },
      goBack(){
        this.$router.go(-1)
      },
      getAdd(){
        this.show = true
      },
      onSelect(item,path) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        this.show = false;
        this.goto(item.path)
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
            this.generalVote = []  // 普票
            this.increaseTicket = []  // 增票
            this.bills.forEach(ele=>{
              if(ele.invoice_bank === null && ele.invoice_bank_code === null && ele.invoice_phone === null && ele.register_address === null){
                this.generalVote.push(ele)
              }else{
                this.increaseTicket.push(ele)
              }
            })
            console.log(this.increaseTicket)
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
      goDel(index,id){
        Dialog.confirm({
          title: '删除',
          message: '是否删除该发票?'
        }).then(() => {
          // on confirm
          if(id === 1){
            axios.delete(BASE_URL + '/orders/invoice/'+this.generalVote[index].id+'/', {
              // 向后端传递JWT token的方法
              headers: {
                'Authorization': 'JWT ' + this.token
              },
              responseType: 'json',
            })
              .then(response => {
                // 加载用户数据
                console.log(response)
                this.getInvoice()
              })
              .catch(error => {
                console.log(error)
                this.$toast({
                  message:'服务器错误'
                });
              });
          }else{
            axios.delete(BASE_URL + '/orders/invoice/'+this.increaseTicket[index].id+'/', {
              // 向后端传递JWT token的方法
              headers: {
                'Authorization': 'JWT ' + this.token
              },
              responseType: 'json',
            })
              .then(response => {
                // 加载用户数据
                console.log(response)
                this.getInvoice()
              })
              .catch(error => {
                console.log(error)
                this.$toast({
                  message:'服务器错误'
                });
              });
          }

        }).catch(() => {

        });
      },
      gotoInvoice(path,index){
        this.$router.push(path)
        localStorage.setItem('invoiceId',this.generalVote[index].id)
        // localStorage.setItem('invoice_title',this.generalVote[index].invoice_title)
        // localStorage.setItem('invoice_org_code',this.generalVote[index].invoice_org_code)
      },
      goEditInvoice(path,index){
        this.$router.push(path)
        if(this.generalVote[index] !== undefined){
          localStorage.setItem('invoiceId',this.generalVote[index].id)
        }
        if(this.increaseTicket[index] !== undefined){
          localStorage.setItem('increaseId',this.increaseTicket[index].id)
        }
      }
    }
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
  .van-dialog{
    width: 80%;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app{
    background-color #f6f6f6
    .header{
      width 100%
      height 40px
      line-height 40px
      background #fff
      position relative
      color #fff
      .head{
        font-weight bold
        width 100%
      }
    }
    .wrap{
      width 100%
      height 100%
      margin-top 5px
      .noInvoices{
        width 160px
        position: absolute;
        top: 35%;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        img{
          width 100%
        }
        div{
          text-align center
          margin-top 10px
          a{
            color red
          }
        }
      }
      .invoices{
        width 100%
        height 100%
        border-bottom 1px solid #ddd
        .info{
          width 100%
          height 100px
          padding 20px
          border-bottom 1px solid #ddd
          .info_left{
            width 75%
            height 100%
            float left
            line-height 25px
          }
          .info_right{
            width 25%
            height 100%
            float right
            line-height 50px
            .info_default{
              margin-left 10px
            }
            .info_cross{
              margin-left 20px
            }
          }
        }
      }
    }
  }
</style>
