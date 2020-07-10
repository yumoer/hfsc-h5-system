<template>
  <div class="hf_app" id="apps">
    <Header message="维修服务"/>
    <div class="nav">
      <div>
        <img style="width: 100%;height: 150px" src="../../../static/images/weixiu_banner.jpg" alt="">
      </div>
      <van-tabs v-model="active" style="margin-top: -5px">
        <van-tab title="申请维修">
          <van-cell-group style="padding: 10px">
            <van-field
              v-model="username"
              required
              clearable
              label="姓名"
              placeholder="请输入姓名"
            ></van-field>

            <van-field
              v-model="mobile"
              required
              clearable
              label="手机号"
              placeholder="请输入手机号"
            ></van-field>

            <div>
              <van-field
                v-model="username"
                clearable
                label="设备名称"
                placeholder="请输入设备名称"
              ></van-field>
              <van-field
                v-model="username"
                clearable
                label="规格型号"
                placeholder="请输入规格型号"
              ></van-field>
              <van-field
                v-model="username"
                clearable
                label="维修地址"
                placeholder="请输入维修地址"
              ></van-field>

              <!--<van-divider>请填写以下维修信息(非必选)</van-divider>-->
              <van-cell title="选择技术服务类型" is-link :value="value" @click="showHide"></van-cell>
              <van-action-sheet v-model="show" :actions="actions" @select="onSelect"></van-action-sheet>

              <van-cell title="选择仪器的品牌" is-link :value="value2" @click="showHide2"></van-cell>
              <van-action-sheet v-model="show2" :actions="actions2" @select="onSelect2"></van-action-sheet>

              <van-cell title="问题描述" is-link :value="value3" @click="showHide3"></van-cell>

              <van-action-sheet v-model="show3" :actions="actions3" @select="onSelect3"></van-action-sheet>

            </div>

            <van-button style="width: 100%;display: block;margin: 10px 0" round disabled type="danger">提交维修单</van-button>
          </van-cell-group>
        </van-tab>
        <van-tab title="查询维修记录">
          <van-cell-group style="padding: 10px">
            <van-field
              v-model="mobile"
              required
              clearable
              center
              label="手机号"
              placeholder="请输入下单手机号"
              @click-right-icon="$toast('question')"
            >
              <van-button slot="button" size="small" round disabled type="danger">查询维修单</van-button>
            </van-field>

          </van-cell-group>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import Header from '../../components/Header/Header'
  export default {
    data () {
      return {
        active: 0,
        radio: 1,
        username:'',
        mobile:'',
        value:'请选择',
        value2:'请选择',
        value3:'请选择',
        show:false,
        show2:false,
        show3:false,
        actions: [
          { name: '打印机维修' },
          { name: '打印机维修' },
          { name: '一体机维修'},
          { name: '绘图仪维修' },
          { name: '晒鼓加粉' },
          { name: '日常保养'}
        ],
        actions2: [
          { name: '得力' },
          { name: '惠普' },
          { name: '爱普生'},
          { name: '兄弟' },
          { name: '佳能' },
          { name: '理光'},
          { name: '联想' },
          { name: '东芝' },
          { name: '夏普'},
          { name: '三星' },
          { name: '松下' },
          { name: '奔图'},
          { name: '得实' },
          { name: '富士通' },
          { name: '小米'},
          { name: '华为' },
          { name: '震旦' },
          { name: '斯图'},
          { name: '六品堂' },
          { name: '天文' },
          { name: '正彩'},
        ],
        actions3: [
          { name: '打印机卡纸或不能走纸' },
          { name: '打印机输出空白纸' },
          { name: '打印纸输出变黑'},
          { name: '打印字符不全或字符不清晰' },
          { name: '打印时字迹一边清晰而另一边不清晰' },
          { name: '打印头移动受阻，停下长鸣或在原处震动'},
          { name: '更换新墨盒后“墨尽灯”仍亮' },
          { name: '无法打印' },
          { name: '其他问题'}
        ],
      }
    },
    components:{Header},
    methods: {
      showHide(){
        this.show = true
      },
      showHide2(){
        this.show2 = true
      },
      showHide3(){
        this.show3 = true
      },
      onSelect(item) {
        // 默认情况下，点击选项时不会自动关闭菜单
        // 可以通过 close-on-click-action 属性开启自动关闭
        this.show = false;
        this.value = item.name
        this.$toast(item.name);
      },
      onSelect2(item) {
        // 默认情况下，点击选项时不会自动关闭菜单
        // 可以通过 close-on-click-action 属性开启自动关闭
        this.show2 = false;
        this.value2 = item.name
        this.$toast(item.name);
      },
      onSelect3(item) {
        // 默认情况下，点击选项时不会自动关闭菜单
        // 可以通过 close-on-click-action 属性开启自动关闭
        this.show3 = false;
        this.value3 = item.name
        this.$toast(item.name);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .hf_app {
    background-color #fff
    height 100%
    width 100%
    overflow: auto;
    .nav{
      margin-top 5px
    }
  }
</style>
