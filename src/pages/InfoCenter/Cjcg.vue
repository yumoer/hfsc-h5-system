<template>
  <div class="hf_app" id="apps">
    <Header message="场景采购"/>
    <div class="nav">
      <van-collapse v-model="activeNames">
        <van-collapse-item v-for="(bg_pic,index) in bg_pics" :key="index" :title="bg_pic.title" :name="bg_pic.id">
          <div>
            <img style="width: 100%" v-lazy="bg_pic.src" alt="">
            <span v-for="(text,index) in bg_pic.msg" :key="index" style="font-size: 14px;line-height:24px;margin-right: 20px">{{text.name}}</span>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
  import Header from '../../components/Header/Header'
  export default {
    data () {
      return {
        activeNames: ['1','2','3','4','5','6'],
        bg_pics:[
          {src:'./static/images/scene_purchase/bg01.jpg',title:'公共办公区',id:'1',msg:[
              {name:'盆栽',x:'100px',y:'180px',show:false},
              {name:'饮水机',x:'153px',y:'259px',show:false},
              {name:'打印纸',x:'183px',y:'389px',show:false},
              {name:'硒鼓',x:'400px',y:'190px',show:false},
              {name:'打印机',x:'440px',y:'240px',show:false},
              {name:'台灯',x:'500px',y:'190px',show:false},
              {name:'水杯',x:'500px',y:'245px',show:false},
              {name:'垃圾桶',x:'460px',y:'489px',show:false},
              {name:'碎纸机',x:'350px',y:'350px',show:false},
              {name:'电脑',x:'550px',y:'220px',show:false},
              {name:'椅子',x:'380px',y:'320px',show:false},
              {name:'显示器',x:'640px',y:'220px',show:false},
              {name:'电话',x:'600px',y:'310px',show:false},
              {name:'笔',x:'670px',y:'310px',show:false},
              {name:'插排',x:'664px',y:'349px',show:false},
              {name:'键盘',x:'664px',y:'276px',show:false},
              {name:'鼠标',x:'754px',y:'276px',show:false},
              {name:'文件夹',x:'804px',y:'220px',show:false},
              {name:'文件框',x:'864px',y:'249px',show:false},
              {name:'计算器',x:'898px',y:'248px',show:false},
              {name:'胶带',x:'906px',y:'280px',show:false},
              {name:'空气净化器',x:'916px',y:'368px',show:false},
              {name:'底柜',x:'660px',y:'468px',show:false},
            ]},
          {src:'./static/images/scene_purchase/bg02.jpg',title:'财务办公区',id:'2',msg:[
              {name:'切纸机',x:'50px',y:'210px',show:false},
              {name:'电脑',x:'126px',y:'168px',show:false},
              {name:'键盘',x:'146px',y:'228px',show:false},
              {name:'鼠标',x:'210px',y:'218px',show:false},
              {name:'记账本',x:'240px',y:'180px',show:false},
              {name:'印泥',x:'248px',y:'228px',show:false},
              {name:'点钞机',x:'280px',y:'208px',show:false},
              {name:'碎纸机',x:'280px',y:'368px',show:false},
              {name:'胶棒',x:'344px',y:'208px',show:false},
              {name:'装订机',x:'380px',y:'190px',show:false},
              {name:'液晶显示器',x:'440px',y:'168px',show:false},
              {name:'计算器',x:'490px',y:'204px',show:false},
              {name:'发票打印机',x:'560px',y:'202px',show:false},
              {name:'支票打印机',x:'680px',y:'208px',show:false},
              {name:'三联打印纸',x:'740px',y:'114px',show:false},
              {name:'传真机',x:'780px',y:'208px',show:false},
              {name:'保险柜',x:'784px',y:'308px',show:false},
              {name:'一体机',x:'1060px',y:'218px',show:false},
              {name:'净化器',x:'1070px',y:'408px',show:false},
              {name:'文件柜',x:'800px',y:'88px',show:false},
              {name:'文件盒',x:'700px',y:'68px',show:false},
              {name:'办公椅',x:'60px',y:'298px',show:false},
            ]},
          {src:'./static/images/scene_purchase/bg03.jpg',title:'前台接待区',id:'3',msg:[
              {name:'胶垫',x:'30px',y:'288px',show:false},
              {name:'台签',x:'184px',y:'238px',show:false},
              {name:'加湿器',x:'230px',y:'460px',show:false},
              {name:'图钉',x:'290px',y:'460px',show:false},
              {name:'大头钉',x:'330px',y:'440px',show:false},
              {name:'工型钉',x:'360px',y:'468px',show:false},
              {name:'回型针',x:'340px',y:'488px',show:false},
              {name:'A4打印纸',x:'318px',y:'284px',show:false},
              {name:'A5打印纸',x:'348px',y:'308px',show:false},
              {name:'记事本',x:'360px',y:'388px',show:false},
              {name:'铅笔',x:'368px',y:'258px',show:false},
              {name:'文件框',x:'300px',y:'348px',show:false},
              {name:'剪刀',x:'480px',y:'378px',show:false},
              {name:'刀片',x:'390px',y:'318px',show:false},
              {name:'签字笔',x:'454px',y:'360px',show:false},
              {name:'笔筒',x:'490px',y:'414px',show:false},
              {name:'燕尾夹',x:'530px',y:'400px',show:false},
              {name:'便利贴',x:'510px',y:'348px',show:false},
              {name:'无线电话',x:'580px',y:'368px',show:false},
              {name:'鼠标垫',x:'670px',y:'348px',show:false},
              {name:'便签纸',x:'780px',y:'308px',show:false},
              {name:'钉书机',x:'830px',y:'288px',show:false},
              {name:'电话',x:'960px',y:'228px',show:false},
              {name:'名片架',x:'940px',y:'168px',show:false},
              {name:'闹钟',x:'640px',y:'98px',show:false},
              {name:'纸杯',x:'1050px',y:'208px',show:false},
              {name:'对讲机',x:'890px',y:'68px',show:false},
              {name:'考勤机',x:'960px',y:'28px',show:false},
              {name:'办公桌',x:'109px',y:'408px',show:false},
            ]},
          {src:'./static/images/scene_purchase/bg04.jpg',title:'会议室',id:'4',msg:[
              {name:'电视机',x:'280px',y:'168px',show:false},
              {name:'电视机',x:'590px',y:'258px',show:false},
              {name:'音响',x:'440px',y:'178px',show:false},
              {name:'投影仪',x:'580px',y:'132px',show:false},
              {name:'抽纸',x:'590px',y:'436px',show:false},
              {name:'真皮椅',x:'940px',y:'428px',show:false},
              {name:'矿泉水',x:'440px',y:'488px',show:false},
              {name:'烟灰缸',x:'550px',y:'478px',show:false},
              {name:'激光笔',x:'590px',y:'538px',show:false},
              {name:'白板笔',x:'1060px',y:'388px',show:false},
              {name:'白板',x:'1100px',y:'188px',show:false},
            ]},
          {src:'./static/images/scene_purchase/bg05.jpg',title:'茶水间',id:'5',msg:[
              {name:'榨汁机',x:'200px',y:'338px',show:false},
              {name:'保温杯',x:'240px',y:'358px',show:false},
              {name:'豆浆机',x:'340px',y:'308px',show:false},
              {name:'电冰箱',x:'430px',y:'208px',show:false},
              {name:'卫生纸',x:'470px',y:'366px',show:false},
              {name:'饮料机',x:'530px',y:'289px',show:false},
              {name:'洗手液',x:'640px',y:'308px',show:false},
              {name:'料理机',x:'600px',y:'268px',show:false},
              {name:'微波炉',x:'580px',y:'318px',show:false},
              {name:'净水壶',x:'690px',y:'290px',show:false},
              {name:'热水壶',x:'720px',y:'268px',show:false},
              {name:'饮水机',x:'700px',y:'358px',show:false},
              {name:'咖啡机',x:'950px',y:'308px',show:false},
            ]},
          {src:'./static/images/scene_purchase/bg06.jpg',title:'总经理室',id:'6',msg:[
              {name:'保险箱',x:'240px',y:'338px',show:false},
              {name:'吸尘器',x:'170px',y:'520px',show:false},
              {name:'扫地机器人',x:'420px',y:'568px',show:false},
              {name:'老板椅',x:'430px',y:'358px',show:false},
              {name:'红酒',x:'580px',y:'308px',show:false},
              {name:'苹果电脑',x:'520px',y:'368px',show:false},
              {name:'空调',x:'700px',y:'188px',show:false},
              {name:'空气净化器',x:'640px',y:'408px',show:false},
              {name:'沙发',x:'820px',y:'388px',show:false},
            ]}
        ],
      }
    },
    components:{Header},
    methods: {
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
