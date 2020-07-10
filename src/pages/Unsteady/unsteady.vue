<template>
  <div id="wrap">
    <div class="back">
      <div class="junp">
        <span class="join" @click="goHome">跳 过</span>
      </div>
      <div class="registy">
        <div style="text-align: center;color: black" v-if="userInfo === undefined">如果您还未注册，<span style="color: #44abe6" @click="registy">请注册!</span><br>注册用户可立即免费领取</div>

        <div style="text-align: center;color: black" v-else>您好，尊敬的 <span style="color:#3fade4 ">{{ userInfo.username }}</span> 用户<br>请点击下方按钮免费领取</div>
      </div>

      <div class="look" @click="look">
        <span style="color: black;font-size: 16px;line-height: 50px;display: block;text-align: center">查看礼品</span>
      </div>

      <div class="pay" v-if="userInfo" @click="pay">
        <span style="color: black;font-size: 16px;line-height: 50px;display: block;text-align: center">免费领取</span>
      </div>

    </div>
    <van-dialog v-model="show" title="注册" confirmButtonText="去注册"  show-cancel-button :beforeClose="beforeClose">
      <div class="login_box cur content" style="width: 100%;padding:20px;">
        <van-field
          v-model="username"
          left-icon="contact"
          clearable
          placeholder="请输入用户名"
          maxlength = 20
          style="height: 40px;margin-top:10px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
        ></van-field>

        <van-field
          v-model="password"
          left-icon="closed-eye"
          type="password"
          clearable
          placeholder="请输入密码"
          maxlength = 20
          style="height: 40px;margin-top: 30px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
        >
        </van-field>

        <van-field
          v-model="password2"
          left-icon="closed-eye"
          type="password"
          clearable
          placeholder="请确认密码"
          maxlength = 20
          style="height: 40px;margin-top: 30px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
        >
        </van-field>

        <van-field
          v-model="mobile"
          clearable
          left-icon="phone-o"
          placeholder="请输入手机号"
          maxlength = 11
          @click-right-icon="$toast('question')"
          style="height: 40px;margin-top: 30px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
        >
        </van-field>

        <van-field
          v-model="sms_code"
          placeholder="请输入图形验证码"
          clearable
          maxlength = 4
          style="height: 40px;line-height:20px;margin-top: 30px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;">
          <van-button slot="button" size="small" type="default" @click="generate_image_code()" style="border: none;border-left: 1px solid #ccc;padding-top: 0">
            <img style="width: 100px;height: 35px" v-lazy="image_code_url" alt="图形验证码" class="pic_code">
          </van-button>
        </van-field>

        <!--<van-checkbox v-model="checked" checked-color="#ff2000" style="margin-top: 20px">同意"行丰银拓商城用户使用协议"</van-checkbox>

        <van-button v-if="!btnShow" @click="on_submit" disabled round type="danger" style="width: 100%;height:50px;margin-top: 30px" id="login">注册</van-button>
        <van-button v-if="btnShow" @click="on_submit" round type="danger" style="width: 100%;height:50px;margin-top: 30px" id="login">注册</van-button>-->
      </div>
    </van-dialog>

    <van-popup v-model="show1" position="bottom">
      <van-area title="请先选择地址"  confirm-button-text="确认地址" :area-list="areaList" @confirm="confirm" @cancel="cancel" @change="onChange"></van-area>
    </van-popup>

    <van-dialog v-model="show2" title="提交订单" confirmButtonText="去支付"  show-cancel-button :beforeClose="beforeClose1">
      <div class="login_box cur content" style="width: 100%;padding:20px;">
        <van-field
          v-model="shopname"
          left-icon="contact"
          clearable
          placeholder="请输入收货人姓名"
          maxlength = 20
          style="height: 40px;margin-top:10px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
        ></van-field>

        <van-field
          v-model="mobile"
          clearable
          left-icon="phone-o"
          placeholder="请输入收货人手机号"
          maxlength = 11
          @click-right-icon="$toast('question')"
          style="height: 40px;margin-top: 10px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
        >
        </van-field>

        <van-field
          v-model="area"
          left-icon="location-o"
          clearable
          placeholder="请选择省市区地址"
          @click="classify"
          maxlength = 20
          style="height: 40px;margin-top:10px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
        ></van-field>

        <van-field
          v-model="place"
          left-icon="wap-home-o"
          clearable
          placeholder="请输入详细地址"
          maxlength = 20
          style="height: 40px;margin-top:10px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
        ></van-field>

        <van-field
          v-model="money"
          center
          clearable
          style="height: 40px;margin-top:10px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;"
        >
          <van-button slot="button" size="small"  left-icon="free-postage">包含运费 ￥22</van-button>
        </van-field>


        <van-field name="radio" style="height: 40px;margin-top: 10px;font-size: 16px;border-bottom: 1px solid #efefef;padding-top: 0;">
          <van-radio-group v-model="radio" direction="horizontal" slot="input">
            <van-radio style="display: inline-flex" name="8">微信支付</van-radio>
            <van-radio style="display: inline-flex;margin-left: 20px" name="2">支付宝支付</van-radio>
          </van-radio-group>
        </van-field>


      </div>
    </van-dialog>

  </div>

</template>

<script>
  import {reqRegister,reqText,reqMobile,requserName,BASE_URL} from '../../api'
  import areaList from '../../../static/js/area'
  import axios from 'axios'
  export default {
    data() {
      return {
        areaList,
        userInfo: undefined ,// {"id":297,"username":"username6","mobile":"13678945612","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyOTcsInVzZXJuYW1lIjoidXNlcm5hbWU2IiwiZW1haWwiOm51bGwsImV4cCI6MTU4MjIwOTIzNX0.n5YdHEhPolY3VAcO5kNMhx3BDhjRKt268QOD-hvb7r8"}
        show: false,
        show1:false,
        show2:false,
        place:'',
        area:'',
        username: '', // 用户名

        password: '', // 密码
        password2: '', //确认密码
        mobile: '', //手机号验证
        image_code: '',
        sms_code: '', // 验证码
        allow:'true', // 是否同意
        getText:'', //验证码文字

        shopname:'', // 收货人姓名
        radio: '8', // 支付方式
        money:'总价 22元', // 运费
        province_id:'',
        city_id:'',
        district_id:'',
        btnShow:false,

        image_code_id: '', // uuid
        image_code_url: '', // 访问后端视图的地址，得到image
      };
    },
    created(){
      this.generate_image_code();
      console.log(this.userInfo,localStorage.userInfo)
      if(localStorage.userInfo !== undefined){
        this.userInfo = JSON.parse(localStorage.userInfo)
        this.userInfo.username = JSON.parse(localStorage.userInfo).username
        console.log(this.userInfo.username)
      }
      this.getplace()
    },
    methods: {
      registy(){
        this.show = true
        this.generate_image_code()
      },
      classify(){
        this.show1 = true
      },
      pay(){
        this.show2 = true
      },
      goHome(){
        this.$router.push('/index')
      },
      look(){
        this.$router.push('/lookDetails')
      },
      confirm(values){
        console.log(values)
        this.area = values[0].name+'/'+values[1].name+'/'+values[2].name
        this.province_id = values[0].code
        this.city_id = values[1].code
        this.district_id = values[2].code
        this.show1 = false
      },
      cancel(){
        this.show1 = false
      },
      onChange(picker,values,index){
        console.log(picker,values,index)
      },
      beforeClose(action, done) {
        if(action === 'confirm') {
          if(!this.username || !this.password) {
            this.$toast("请输入用户名和密码")
            done(false) //不关闭弹框
          }
          this.on_submit()
        } else if(action === 'cancel') {
          done() //关闭
        }
      },
      beforeClose1(action,done){
        if(action === 'confirm') {
          /*手机号正则验证*/
          var regExp3 = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;


          if( !this.shopname) {
            this.$toast("请输入收货人姓名")
            done(false) //不关闭弹框
            return
          }

          if(regExp3.test(this.mobile) !== true){
            this.$toast({
              message:'收货人手机号格式错误'
            })
            done(false) //不关闭弹框
            return
          }

          if( !this.mobile) {
            this.$toast("请输入收货人手机号")
            done(false) //不关闭弹框
            return
          }
          if( !this.area) {
            this.$toast("请选择省市区地址")
            done(false) //不关闭弹框
            return
          }
          if( !this.place) {
            this.$toast("请输入详细地址")
            done(false) //不关闭弹框
            return
          }
          if( !this.radio) {
            this.$toast("请选择支付方式")
            done(false) //不关闭弹框
            return
          }
          this.goBuy()
        } else if(action === 'cancel') {
          done() //关闭
        }
      },

      goBuy(){
        axios.post(BASE_URL + '/orders/login/create/ ',
          {
            "receiver": this.shopname,
            "province_id": this.province_id,
            "city_id": this.city_id,
            "district_id": this.district_id,
            "place": this.place,
            "mobile": this.mobile,
            "pay_method": this.radio
          },
          {
          responseType: 'json',
          headers: {
            'Authorization': 'JWT ' + this.userInfo.token
          },
        })
          .then(response => {
            console.log(response)
            if(response.status === 200 && response.data.message === 'ok'){
              console.log(response.data.order_id)
              if(parseInt(this.radio) ===2){
                axios.get(BASE_URL+'/orders/'+response.data.order_id+'/payment/?mobile=1&next=http://m.hfyt365.com/#/index', {
                  headers: {
                    'Authorization': 'JWT ' + this.userInfo.token
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
              }else if(parseInt(this.radio)===8){
                axios.get(BASE_URL+'/wechat/h5/orders/'+response.data.order_id+'/payment/'+'?next=http://m.hfyt365.com/#/index', {
                  headers: {
                    'Authorization': 'JWT ' + this.userInfo.token
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
            }
          })
          .catch(error => {
            console.log(error.response)
          })
      },

      goBack(){
        this.$router.replace('/home')
      },

      getplace(){
        axios.get(BASE_URL + '/mobile/get/carts/name/all/', {}, {
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
        console.log(this.areaList)
      },
      // 生成uuid
      generate_uuid: function(){
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
          d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c =='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
      },
      // 生成一个图片验证码的编号，并设置页面中图片验证码img标签的src属性
      async generate_image_code(){
        localStorage.flag = '1'
        // 生成一个编号
        // 严格一点的使用uuid保证编号唯一， 不是很严谨的情况下，也可以使用时间戳
        this.image_code_id = this.generate_uuid();
        // 设置页面中图片验证码img标签的src属性
        this.image_code_url = BASE_URL + "/image_codes/" + this.image_code_id + "/";
      },

      // 注册
      async on_submit(){
        /*获取验证码文字*/
        const getText = await reqText(this.image_code_id)
        this.getText = getText.text.toLowerCase()

        /*用户名正则验证*/
        var regExp1 = /^[\u4E00-\u9FA5a-zA-Z0-9_]{4,20}$/;
        /*密码正则验证*/
        var regExp2 = /^[a-zA-Z0-9_-]{8,20}$/;
        /*手机号正则验证*/
        var regExp3 = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;

        if(regExp1.test(this.username) !== true){
          this.$toast({
            message:'用户名格式错误,请输入4-20位字符'
          })
          return
        }else if(regExp2.test(this.password) !== true){
          this.$toast({
            message:'密码格式错误,请输入8-20位字符'
          })
          return
        }else if(this.password !== this.password2){
          this.$toast({
            message:'两次密码不一致'
          })
          return
        }else if(regExp3.test(this.mobile) !== true){
          this.$toast({
            message:'手机号格式错误'
          })
          return
        }else if(this.sms_code.toLowerCase() !== this.getText){
          this.$toast({
            message:'验证码输入错误'
          })
          return
        }else if(this.allow !== 'true'){
          this.$toast({
            message:'请同意使用协议'
          })
          return
        }else{  // 检验重复
          const username = await requserName(this.username)
          console.log(username)
          if(username.count>0){
            this.$toast({
              message:'用户名已存在'
            })
            return
          }else{
            const mobile = await reqMobile(this.mobile)
            console.log(mobile)
            if(mobile.count>0){
              this.$toast({
                message:'手机号已存在'
              })
              return
            }else{  //验证格式完全正确
              const Register = await reqRegister(this.username,this.password,this.password2,this.mobile,this.sms_code,this.allow)
              console.log(Register)
              localStorage.userInfo =JSON.stringify(Register)
              if(Register !== undefined || Register !== null){
                this.$toast({
                  message:'注册成功',
                  position:'bottom'
                })
                this.show = false
                this.userInfo = JSON.parse(localStorage.userInfo)
                this.userInfo.username = JSON.parse(localStorage.userInfo).username
                this.userInfo.mobile = JSON.parse(localStorage.userInfo).mobile

                console.log(this.userInfo)
              }
              console.log(Register)
            }
          }
        }
        return false;
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  app{
    width 100%
    height 100%
  }
  #wrap{
    width 100%
    height 100%
    background:url("../../../static/images/index/activity.png") no-repeat
    background-size 100% 100%

    .back{
      width 100%
      height 700px
      position relative
      .registy{
        width 80%
        height 300px
        /*background #ddd*/
        position absolute
        top -100px
        bottom 0
        left 0
        right 0
        margin auto
        opacity 0.5
      }
      .look{
        width 100px
        height 50px
        background #ea5504
        position absolute
        top -120px
        bottom 0
        left 0
        right 0
        margin auto
        opacity 0.5
      }
      .pay{
        width 100px
        height 50px
        background #ea5504
        position absolute
        top 20px
        bottom 0
        left 0
        right 0
        margin auto
        opacity 0.5
      }
    }

    .junp{
      width 100%
      height 100px
      .join{
        width: 60px;
        height: 32px;
        padding: 8px 8px 8px 12px;
        line-height 18px
        position: absolute;
        right: 40px;
        color #fff
        border: solid 1px #fff;
        border-radius: 20px;
        top: 20px;
      }
    }
  }
</style>
