<template>
  <div class="hf_app" id="apps">
    <div>
      <Header message="合作伙伴"/>
      <div class="nav">
        <van-tabs v-model="active" @click="goTabs" animated style="margin-top: 5px">
          <van-tab title="落地服务商" >
            <img style="width: 100%;height: 100%;" @click="ImagePreview(0)" src="../../../static/images/fuwushang/banner.jpg" alt="">
            <div style="padding: 10px">
                <div style="margin: 20px 0">
                <img style="width: 100%;height: 100%;" src="../../../static/images/fuwushang/company.jpg" @click="ImagePreview(1)" alt="">
                <p style="text-indent: 2em;">北京行丰银拓科技有限公司位于北京市丰台区中福丽宮品牌基地，自2008年成立以来一 直专注于办公物资采购，商务服务以及软件服务三大领域。致力于中央国家机关、政府部门，军队，金融系统、企事业单位、医疗机构、教育机构、卫生系统、公共事业部门等部门的综合服务。服务包括提供系统集成、软件开发、办公物资采购、办公采购方案，个性化定制、劳保用品采购、技术咨询服务等方面的业务。</p>
                <p style="text-indent: 2em;">目前，采购趋势平台化，系统化，公司把工作做在前边，提前部署，自主研发的电商平台www. hfyt365. com在2012年正式上线，现平台央采、政采、军队、央视等各部门各单位通过专属通道已实现直接下单，实现一键下达，提高效率，方便快捷。</p>
                <p style="text-indent: 2em;">我们坚信，在未来的发展中我们以科学的管理，创新的理念，完善的服务，充分发挥公司的各方面资源优势，提升行业影响力，必将拥有不可撼动的行业地位。</p>
              </div>
              <div style="margin: 20px 0">
                <img style="width: 100%;height: 100%" src="../../../static/images/fuwushang/fenbu.jpg" @click="ImagePreview(2)" alt="">
                <p style="text-indent: 2em;">2012年公司组织建设了一支专业的电商团队，行丰银拓商城于2012年9月上线运营，是业内较早成立的电商企业，多年来一直注重商城的建设及发展，现凭借专业的电商开发运营团队，已成为办公用品电商运营服务行业标杆之-。未来，行丰银拓商城继续专注于办公用品行业电商运营，努力打造成中国电商服务标杆企业，为客户提供优质的一一站式网上采购服务。</p>
                <p style="text-indent: 2em;">
                  行丰银拓办公商城旨在用心打造中国最超值办公用品、耗材、设备、电子、网络、数码产品的交易平台，根据行业終端客户的需求，我们更注重日常网上商城的运营及维护，全面贴近实际需求。电子商务网站的完善，需要长时间的用心运营维护、更迭，才能更好的满足行业的发展所需。我公司自2016年3月起自主研发了一套商城系统，同时拥有PC、手机、微信端的购物网站，客户在使用PC、手机，微信、pad设备购物中，均可实现良好的购物体验。而且会员、商品、订单等信息同步更新，不同设备间完美切换。
                </p>
                <p style="text-indent: 2em;">行丰银拓于2012年开始大力发展和推进电子商务，以公司独立开发电子商城为核心拓展全国市场。经过几年的发展，线上电子商城已经初具规模，为了打通线上线下，实现020闭环，行丰银拓采用了客户线上商城预订，线下落地服务的模式。目前，已经在全国建立了多个分支机构及线下落地服务商，覆盖全国大部分城市。</p>
              </div>
              <div style="margin: 20px 0">
                <img @click="ImagePreview(3)" style="width: 100%;height: 100%;" src="../../../static/images/fuwushang/join.jpg" alt="">
              </div>
              <div style="margin: 20px 0">
                <img @click="ImagePreview(4)" style="width: 100%;height: 100%" src="../../../static/images/fuwushang/value.jpg" alt="">
              </div>
            </div>
          </van-tab>
          <van-tab title="注册落地服务商">
            <van-cell-group style="padding: 10px">
              <van-field
                v-model="username"
                required
                clearable
                label="用户名"
                placeholder="请输入用户名"
                :error-message="error_username"
              ></van-field>

              <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                :error-message="error_pwd"
                required
              ></van-field>

              <van-field
                v-model="password2"
                type="password"
                label="确认密码"
                placeholder="请确认密码"
                :error-message="error_pwd_message"
                required
              ></van-field>

              <van-field
                v-model="companyName"
                required
                clearable
                label="企业全称"
                placeholder="请输入企业全称"
                :error-message="error_companyName"
              ></van-field>

              <van-field
                v-model="companyCode"
                required
                clearable
                label="企业执照注册号"
                placeholder="请输入企业执照注册号"
                :error-message="error_companyCode"
              ></van-field>

              <van-field
                v-model="companyCodeText"
                required
                clearable
                readonly
                is-link
                placeholder="请上传企业营业执照复印件"
                :error-message="error_companyCodeText"
              ></van-field>

              <!--上传企业营业执照复印件-->
              <van-uploader v-model="companyCodeTextImg" style="padding:20px 0 0 20px;" multiple></van-uploader>

              <van-field
                v-model="companyTime"
                required
                clearable
                readonly
                is-link
                @click="onShowPop"
                label="注册时间"
                placeholder="请选择注册时间"
                :error-message="error_companyTime"
              ></van-field>


              <van-field
                v-model="companyYear"
                required
                clearable
                label="注册期限(年)"
                placeholder="请输入注册期限"
                :error-message="error_companyYear"
              ></van-field>

              <van-field
                v-model="companyMoney"
                required
                clearable
                label="注册资金(万元)"
                placeholder="请输入注册资金"
                :error-message="error_companyMoney"
              ></van-field>

              <van-field
                v-model="companyAddress"
                required
                clearable
                label="注册地址"
                placeholder="请输入注册地址"
                :error-message="error_companyAddress"
              ></van-field>

              <van-field
                v-model="companyUser"
                required
                clearable
                label="法人姓名"
                placeholder="请输入法人姓名"
                :error-message="error_companyUser"
              ></van-field>


              <van-field
                v-model="companyUserText"
                required
                clearable
                readonly
                is-link
                placeholder="请上传企业法人身份证复印件"
                :error-message="error_companyUserText"
              ></van-field>

              <!--上传企业法人身份证复印件-->
              <van-uploader v-model="companyUserTextImg" style="padding:20px 0 0 20px;" multiple></van-uploader>

              <van-field
                v-model="companyOfficeArea"
                required
                clearable
                label="办公地址"
                placeholder="请输入办公地址"
                :error-message="error_companyOfficeArea"
              ></van-field>

              <van-field
                v-model="companyOfficeCopy"
                required
                clearable
                readonly
                is-link
                placeholder="请上传办公地址房租或房产证明复印件"
                :error-message="error_companyOfficeCopy"
              ></van-field>

              <!--上传办公地址房租或房产证明复印件-->
              <van-uploader v-model="companyOfficeCopyImg" style="padding:20px 0 0 20px;" multiple></van-uploader>

              <van-field
                v-model="companyAppliedArea"
                required
                clearable
                label="申请区域"
                placeholder="请输入申请区域"
                :error-message="error_companyAppliedArea"
              ></van-field>

              <van-field
                v-model="companyAppliedName"
                required
                clearable
                label="申请姓名"
                placeholder="请输入申请姓名"
                :error-message="error_companyAppliedName"
              ></van-field>

              <van-field
                v-model="companyAppliedCopy"
                required
                clearable
                readonly
                is-link
                placeholder="请上传申请人身份证复印件"
                :error-message="error_companyAppliedCopy"
              ></van-field>

              <!--上传申请人身份证复印件-->
              <van-uploader v-model="companyAppliedCopyImg" style="padding:20px 0 0 20px;" multiple></van-uploader>

              <van-field
                v-model="companyAppliedPhone"
                required
                clearable
                label="申请人联系方式"
                placeholder="请输入申请人联系方式"
                :error-message="error_companyAppliedPhone"
              ></van-field>

              <van-field
                v-model="companyAppliedEmail"
                required
                clearable
                label="申请人电子邮箱"
                placeholder="请输入申请人电子邮箱"
                :error-message="error_companyAppliedEmail"
              ></van-field>

              <van-field
                v-model="companyWarehouseArea"
                clearable
                label="仓储地址"
                placeholder="请输入仓储地址"
                :error-message="error_companyWarehouseArea"
              ></van-field>

              <van-field
                v-model="companyWarehouseAreaCopy"
                clearable
                readonly
                is-link
                placeholder="请输入上传仓储地址房租或房产证明复印件"
                :error-message="error_companyWarehouseAreaCopy"
              ></van-field>

              <!--上传申请人身份证复印件-->
              <van-uploader v-model="companyWarehouseAreaCopyImg" style="padding:20px 0 0 20px;" multiple></van-uploader>

              <van-checkbox v-model="checked" style="padding-left: 20px;color: red;" @change="onChange">
                勾选即代表您已同意<span @click="goXieYi" style="color: #409eff">行丰银拓服务商协议</span>
              </van-checkbox>
            </van-cell-group>

            <van-button round type="danger" disabled style="width: 90%;margin: 20px 5%;">注册服务商</van-button>
          </van-tab>
        </van-tabs>
      </div>
      <van-popup
        v-model="show"
        round
        position="bottom"
        custom-style="height: 20%"
        @close="onClose"
      >
        <van-datetime-picker
          type="date"
          v-model="currentDate"
          @input="onInput"
          @cancel="onCancel"
          @confirm="onConfirm"
          @formatter="formatter"
        >
        </van-datetime-picker>
      </van-popup>
      <van-image-preview
        v-model="showImg"
        :images="images"
        @change="onChange"
      >
      </van-image-preview>
    </div>
    <!--数据为空开始-------------->
    <!--<div v-else style="width: 100%;height:100%;background: #fff"></div>-->
    <!--数据为空结束-------------->
  </div>
</template>

<script>
  import axios from 'axios'
  import {BASE_URL} from '../../api'
  import Header from '../../components/Header/Header'
  export default {
    data () {
      return {
        user_id: sessionStorage.user_id || localStorage.user_id,
        token: sessionStorage.token || localStorage.token,
        active:0, // 默认tab页 0/1
        checked: false, // 协议
        show:false, // 是否显示时间选择器
        showImg:false, // 图片预览
        index: 0,
        images:[],
        /*images: [
          '../../../static/images/fuwushang/banner.jpg',
          '../../../static/images/fuwushang/company.jpg',
          '../../../static/images/fuwushang/fenbu.jpg',
          '../../../static/images/fuwushang/join.jpg',
          '../../../static/images/fuwushang/value.jpg'
        ],*/
        currentDate: new Date().getTime(), // 当前时间
        companyCodeTextImg: [], // 上传企业营业执照复印件
        companyUserTextImg: [], // 上传企业法人身份证复印件
        companyOfficeCopyImg:[], // 上传办公地址房租或房产证明复印件
        companyAppliedCopyImg:[], // 上传申请人身份证复印件
        companyWarehouseAreaCopyImg:[], // 上传仓储地址房租或房产证明复印件

        username: '', // 用户名
        password: '', // 密码
        password2: '', // 确认密码
        companyName: '', // 企业全称
        companyCode: '', // 企业执照注册号
        companyTime: '', // 注册时间
        companyYear: '', // 注册期限(年)
        companyMoney: '', // 注册资金(万元)
        companyAddress: '', // 注册地址
        companyCodeText: '', // 上传企业营业执照复印件
        companyUser: '', // 法人姓名
        companyUserText: '', // 上传企业法人身份证复印件
        companyOfficeArea: '', // 办公地址
        companyOfficeCopy: '', // 上传办公地址房租或房产证明复印件
        companyAppliedArea: '', // 申请区域
        companyAppliedName: '', // 申请人姓名
        companyAppliedCopy: '', // 上传申请人身份证复印件
        companyAppliedPhone: '', // 申请人联系方式
        companyAppliedEmail: '', // 申请人电子信箱
        companyWarehouseArea: '', // 仓储地址
        companyWarehouseAreaCopy:'', // 上传仓储地址房租或房产证明复印件

        /*错误提示*/
        error_username: '',
        error_pwd: '',
        error_pwd_message: '',
        error_companyName: '',
        error_companyCode: '',
        error_companyTime: '',
        error_companyYear: '',
        error_companyMoney: '',
        error_companyAddress: '',
        error_companyCodeText: '',
        error_companyUser: '',
        error_companyUserText: '',
        error_companyOfficeArea: '',
        error_companyOfficeCopy: '',
        error_companyAppliedArea: '',
        error_companyAppliedName: '',
        error_companyAppliedCopy: '',
        error_companyAppliedPhone: '',
        error_companyAppliedEmail: '',
        error_companyWarehouseArea: '',
        error_companyWarehouseAreaCopy:'',
      }
    },
    components:{Header},
    mounted(){
      console.log(this.show)
      console.log(new Date().getTime())
      console.log(this.active,parseInt(localStorage.tabs))
      this.active = parseInt(localStorage.tabs)
    },
    methods: {
      goBack(){
        this.$router.go(-1)
      },
      goTabs(value){
        localStorage.tabs = value
      },
      onChange(index) {
        this.index = index;
      },
      ImagePreview(index){
        if(index === 0){
          this.images = ['../../../static/images/fuwushang/banner.jpg']
        }else if(index === 1){
          this.images = ['../../../static/images/fuwushang/company.jpg']
        }else if(index === 2){
          this.images = ['../../../static/images/fuwushang/fenbu.jpg']
        }else if(index === 3){
          this.images = ['../../../static/images/fuwushang/join.jpg']
        }else if(index === 4){
          this.images = ['../../../static/images/fuwushang/value.jpg']
        }
        this.showImg = true
      },
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`;
        }
        return value;
      },
      onShowPop(){
        this.show=true;
      },
      onInput(event) {
        console.log(event)
      },
      onConfirm(event){
        console.log(event)
        this.show = false
        const d = new Date(event)
        this.companyTime = d.getFullYear()+ '-' + (d.getMonth() + 1) + '-' + d.getDate()+''
      },
      onCancel(){
        this.show = false
      },
      onClose(){
        this.show = false
      },
      goXieYi(){
        console.log('协议已同意')
      },
    }
  }
</script>
<style type="text/css">
  .van-nav-bar .van-icon{
    color: #000;
    font-size: 20px;
  }
  .van-field__label{
    width: 100px;
  }
  .van-checkbox__icon--checked .van-icon{
    background-color:red;
    border: red;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .hf_app {
    background-color #fff
    height 100%
    width 100%
    overflow: auto;
    .nav{

    }
  }
</style>
