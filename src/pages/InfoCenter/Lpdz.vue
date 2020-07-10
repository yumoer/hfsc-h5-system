<template>
  <div class="hf_app" id="apps">
    <Header message="礼品定制"/>
    <div class="nav">
      <div style="width: 100%;height: 150px">
        <img style="width: 100%;height: 100%" @click="ImagePreview('../../../static/images/gift_customization/banner1.jpg')" src="../../../static/images/gift_customization/banner1.jpg" alt="">
      </div>
      <div style="float:left;height: 100%">
        <div style="text-align: center;background:#9C7408;color: #fff">
          <div>专业团队</div>
          <div>---- 高级顾问，出谋划策 ----</div>
        </div>
        <div style="width:100%;height:100%;float: left;">
          <div v-for="(OurTeam,index) in OurTeams" :key="index" style="padding: 10px;height: 100%;float: left">
            <div style="width: 30%;height: 100%;display: inline;float: left;">
              <img @click="ImagePreview(OurTeam.img_src)" style="width: 100%;" v-lazy="OurTeam.img_src" alt="">
            </div>
            <div style="width: 65%;float: right;display: inline">
              <p>{{OurTeam.name}} {{OurTeam.job}}</p>
              <p>联系我 {{OurTeam.cellphone}}<a target="_blank" href="http://sighttp.qq.com/authd?IDKEY=cab8f6e0781647451ed4f9036ec15c7d9d22877b345dc633">
                <img style="width: 20px;float: right" src="../../../static/images/qq.jpg" alt="">
              </a></p>
              <p style="font-size: 12px">{{OurTeam.introduce}}</p>
            </div>
          </div>
        </div>
      </div>

      <div style="float:left;width:100%;height: 100%">
        <div style="text-align: center;background:#C0D3FF;color: #fff">
          <div>热门定制</div>
          <div>---- 物美价廉，争先恐后 ----</div>
        </div>
        <div style="padding: 5px">
          <van-grid :border="false" :column-num="4">
            <van-grid-item v-for="(Popular,index) in Populars" @click="goto('/searchList?q='+Popular.name)"  :key="index">
              <van-image style="width: 60px;height: 60px" :src="Popular.src"></van-image>
              <span style="font-size: 16px;color: #2b66ea;text-align: center">{{Popular.name}}</span>
            </van-grid-item>
          </van-grid>
        </div>
      </div>

      <div style="float:left;width:100%;height: 100%">
        <div style="text-align: center;background:#C1F0E8;color: #fff">
          <div>定制流程</div>
          <div>---- 已有礼品，直接下单 ----</div>
        </div>
        <div style="padding: 10px">
          <img style="width: 100%" @click="ImagePreview('../../../static/images/gift_customization/dingzhiliucheng.png')" src="../../../static/images/gift_customization/dingzhiliucheng.png" alt="">
        </div>
      </div>

      <div style="float:left;width:100%;height: 100%">
        <div style="text-align: center;background:#FFE1B4;color: #fff">
          <div>礼品专题</div>
          <div>---- 逢年过节，一键搞定 ----</div>
        </div>
        <div style="padding: 10px">
          <div v-for="(SpecialGift,index) in SpecialGifts" :key="index" style="margin-bottom: 20px">
            <div @click="ImagePreview(SpecialGift.src)">
              <img style="width: 100%;" v-lazy="SpecialGift.src" alt="">
            </div>
            <div style="height: 30px;line-height: 30px">
              <span style="float: left;color: #ea9d2b">{{SpecialGift.name}}</span>
              <span style="float: right;color: red">进入专题(暂未开发)</span>
            </div>
          </div>
        </div>
      </div>

      <div style="float:left;width:100%;height: 100%">
        <div style="text-align: center;background:#F2D5FF;color: #fff">
          <div>万种礼品</div>
          <div>---- 种类丰富，任君挑选 ----</div>
        </div>
        <div style="padding: 10px">
          <van-collapse v-model="activeNames">
            <van-collapse-item v-for="(ThousandGift,index) in ThousandGifts" :key="index" :title="ThousandGift.head" :name="index">
              <span style="margin-right: 12px" v-for="(kind,index) in ThousandGift.kinds" :key="index" @click="goto('/searchList?q='+kind)">{{kind}}</span>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>

      <div style="float:left;width:100%;height: 100%">
        <div style="text-align: center;background:#D6E3FF;color: #fff">
          <div>经典案例</div>
          <div>---- 经典印象，连结你我 ----</div>
        </div>
        <div style="padding: 10px">
          <van-tabs v-model="active" animated>
            <van-tab v-for="(Case,index) in Cases" :key="index" :title="Case.head">
              <van-grid :border="false" :column-num="2">
                <van-grid-item v-for="(Ca,index) in Case.kinds" :key="index">
                  <van-image @click="ImagePreview(Ca.src)" style="width: 100%;height: 110px" :src="Ca.src"></van-image>
                  <span style="font-size: 14px;color: #6288dd">{{Ca.name}}</span>
                </van-grid-item>
              </van-grid>
            </van-tab>
          </van-tabs>
        </div>
      </div>

      <div style="float:left;width:100%;height: 100%">
        <div style="text-align: center;background:#FDFFB6;color: #fff">
          <div>部分客户</div>
          <div>---- 感恩呵护，积少成多 ----</div>
        </div>
        <div style="padding: 10px" @click="ImagePreview('../../../static/images/gift_customization/bufenkehu.jpg')">
          <img style="width: 100%" src="../../../static/images/gift_customization/bufenkehu.jpg" alt="">
        </div>
      </div>

      <div style="float:left;width:100%;height: 100%">
        <div style="text-align: center;background:#DDFEDF;color: #fff">
          <div>行业礼品</div>
          <div>---- 各行各业，礼多不怪 ----</div>
        </div>
        <div style="padding: 10px" @click="ImagePreview('../../../static/images/gift_customization/hangyelipin.jpg')">
          <img style="width: 100%" src="../../../static/images/gift_customization/hangyelipin.jpg" alt="">
        </div>
      </div>

      <div style="float:left;width:100%;height: 100%">
        <div style="text-align: center;background:#FFBADE;color: #fff">
          <div>合作伙伴</div>
          <div>---- 互帮互助，砥砺前行 ----</div>
        </div>
        <div style="padding: 10px" @click="ImagePreview('../../../static/images/gift_customization/hezuohuoban.jpg')">
          <img style="width: 100%" src="../../../static/images/gift_customization/hezuohuoban.jpg" alt="">
        </div>
      </div>

      <div style="float:left;width:100%;height: 100%">
        <div style="text-align: center;background:#96EACD;color: #fff">
          <div>送礼攻略</div>
          <div>---- 君子之间，恰如其分 ----</div>
        </div>
        <div style="padding: 10px">
          <div>
            <img style="width: 100%" src="../../../static/images/gift_customization/gonglue1.jpg" alt="">
          </div>
          <div>
            <div>企业年会礼品怎么选择</div>
            <div>定制礼品有哪几类</div>
            <div>礼品定制的意义何在</div>
            <div>商务礼品的选择有什么技巧</div>
            <div>礼品包装的注意事项</div>
            <div>给宝宝送礼有什么讲究</div>
          </div>
          <div>
            <img style="width: 100%" src="../../../static/images/gift_customization/gonglue2.jpg" alt="">
          </div>
          <div>
            <div>会议礼品有什么讲究</div>
            <div>节日礼品采购都有哪些特点</div>
            <div>企业定制礼品的优势</div>
            <div>商务送礼有什么规矩</div>
            <div>创意礼品哪种容易受到欢迎</div>
            <div>礼品茶具为何情有独钟</div>
          </div>
        </div>
      </div>

    </div>
    <van-image-preview
      v-model="show"
      :images="images"
      @change="onChange"
    ></van-image-preview>

  </div>
</template>

<script>
  import Header from '../../components/Header/Header'
  export default {
    data () {
      return {
        activeNames: ['0'],
        show: false,
        active: 0,
        images:[''],
        index:0,
        // 专业团队
        OurTeams:[
          {name:'王经理',cellphone:'188-0116-5199',job:'资深顾问',img_src:'./static/images/gift_customization/guwen1.jpg',introduce:'礼品行业多年担任顾问，从基层礼品销售做到资深礼品顾问，具有多年扎实的实战经验和项目经验，屡次带领团队参与大型礼品采购项目，并在项目中取得了骄人的成绩，参与过奔驰，中央电视台，中国人民银行，浦发银行等重大礼品采购项目，现已担任公司核心职务，继续带领团队驰骋为礼品事业作出贡献。'},
          {name:'曾经理',cellphone:'188-0120-9155',job:'资深顾问',img_src:'./static/images/gift_customization/guwen2.jpg',introduce:'二十余年礼品设计，销售和采购经验，一直以周到和全面的优质服务回馈客户，行业里多年的不断努力和打拼，挖掘和沉淀了大量其他行业可信赖的客户，曾亲自多次操刀北京协和医院，嘉华地产，大众汽车等大型企业的重大采购项目，为公司做出重大贡献现已跻身公司高层，并将继续在礼品业发光发热。'},
          {name:'李经理',cellphone:'188-0116-9322',job:'资深顾问',img_src:'./static/images/gift_customization/guwen3.jpg',introduce:'10多年礼品行业的工作经验，具备资深的礼品销售经验并对行业趋势有着全面科学前瞻性的战略眼光，为本行业不可多得的佼佼者，每次都能给客户排忧解难，曾参与过国家电网，平安保险，中石化等大企事业单位的礼品项目，并取得巨大成果和成功。'},
          {name:'于经理',cellphone:'183-0116-6560',job:'资深顾问',img_src:'./static/images/gift_customization/guwen4.jpg',introduce:'曾任职于500强企业，并成功转战于礼品行业多年，一直以来注重考虑客户的体验和礼品的细节，有着超乎常人的毅力和洞察力，多年工作中积累了很多央企国企客户，现在正在服务于交通银行，中国移动，中国石油等的礼品项目，为公司的发展和前进做出了巨大贡献。'},
          {name:'王经理',cellphone:'188-0120-1033',job:'资深顾问',img_src:'./static/images/gift_customization/guwen5.jpg',introduce:'多年礼品行业担任顾问，具备资深的礼品销售经验并对行业趋势有着全面科学前瞻性的战略眼光，曾多次带领团队参与大型礼品采购项目，并在建设银行，链家地产，北京大学人民医院项目中取得了骄人的成绩，现在在公司已经担任重要的核心职务，继续带领公司团队为礼品方案，策划，设计等礼品事业作出贡献。'},
          {name:'窦经理',cellphone:'188-0120-2033',job:'资深顾问',img_src:'./static/images/gift_customization/guwen6.jpg',introduce:'10多年礼品行业的工作经验，从基层礼品销售做到高级礼品顾问，一直以周到和全面的优质服务回馈客户，具有多年扎实的实战经验和项目经验，曾多次带领团队参与大型礼品采购项目，并在项目中取得了骄人的成绩，曾参与过雪铁龙汽车，清华大学，海军医院，武警总署医院等大企事业单位的礼品项目。'},
        ],
        // 热门定制
        Populars:[
          {name:'奖杯奖牌',src:'./static/images/gift_customization/remen01.png'},
          {name:'台历挂历',src:'./static/images/gift_customization/remen02.png'},
          {name:'箱包皮具',src:'./static/images/gift_customization/remen03.png'},
          {name:'服装服饰',src:'./static/images/gift_customization/remen04.png'},
          {name:'本子册子',src:'./static/images/gift_customization/remen05.png'},
          {name:'纪念币',src:'./static/images/gift_customization/remen06.png'},
          {name:'U盘',src:'./static/images/gift_customization/remen07.png'},
          {name:'水杯',src:'./static/images/gift_customization/remen08.png'},
          {name:'雨伞',src:'./static/images/gift_customization/remen09.png'},
          {name:'一次性水杯',src:'./static/images/gift_customization/remen10.png'},
          {name:'坚果',src:'./static/images/gift_customization/remen11.png'},
          {name:'大闸蟹',src:'./static/images/gift_customization/remen12.png'},
          {name:'粽子',src:'./static/images/gift_customization/remen13.png'},
          {name:'月饼',src:'./static/images/gift_customization/remen14.png'},
          {name:'红酒',src:'./static/images/gift_customization/remen15.png'},
        ],
        // 礼品专题
        SpecialGifts:[
          {name:'年终礼品',src:'./static/images/gift_customization/zhuanti01.jpg'},
          {name:'丽人礼品',src:'./static/images/gift_customization/zhuanti02.jpg'},
          {name:'端午礼品',src:'./static/images/gift_customization/zhuanti03.jpg'},
          {name:'中秋礼品',src:'./static/images/gift_customization/zhuanti04.jpg'},
          {name:'校庆礼品',src:'./static/images/gift_customization/zhuanti05.jpg'},
          {name:'聚会礼品',src:'./static/images/gift_customization/zhuanti06.jpg'},
        ],
        // 万种礼品数据：
        ThousandGifts:[
          {head:'创意礼品',kinds:['奖杯奖牌','创意电子','创意家居','创意办公']},
          {head:'数码电子',kinds:['U盘定制','移动电源','智能设备','音箱设备','数码周边','手机周边']},
          {head:'商务礼品',kinds:['书写定制','本册定制','水杯定制','办公收纳','台历挂历','名片架定制']},
          {head:'箱包皮具',kinds:['单肩背包','双肩背包','多功能包','电脑包定制','皮具定制','手提袋定制']},
          {head:'家居日常',kinds:['雨具定制','工具定制','家纺定制','餐具定制','毛绒玩具','茶具杯具']},
          {head:'汽车周边',kinds:['车载电子','车载精品','车载工具','车载收纳']},
          {head:'运动户外',kinds:['户外装备','体育用品','建身器材','按摩保健']},
          {head:'服装服饰',kinds:['衬衣','短袖','T恤','套装']},
        ],
        //经典案例数据：
        Cases:[
          {head:'房地产案例',kinds:[
              {name:'新景祥-凌美笔+16GU盘案例',src:'./static/images/gift_customization/anli01.jpg'},
              {name:'嘉华房地产-凌美笔案例',src:'./static/images/gift_customization/anli02.jpg'},
              {name:'中南房地产-鲁班锁案例',src:'./static/images/gift_customization/anli03.jpg'},
              {name:'链家地产-水晶U盘案例',src:'./static/images/gift_customization/anli04.jpg'},
            ]},
          {head:'银行案例',kinds:[
              {name:'光大银行-膳魔师保温杯案例',src:'./static/images/gift_customization/anli05.jpg'},
              {name:'中国农业银行-抱枕案例',src:'./static/images/gift_customization/anli06.jpg'},
              {name:'招商银行-商务笔记本案例',src:'./static/images/gift_customization/anli07.jpg'},
              {name:'中国银行-促销礼品广告伞',src:'./static/images/gift_customization/anli08.jpg'},
            ]},
          {head:'医药案例',kinds:[
              {name:'北京大学人民医院+双立人炒锅案例',src:'./static/images/gift_customization/anli09.jpg'},
              {name:'北京协和医院-毕加索宝珠笔案例',src:'./static/images/gift_customization/anli10.jpg'},
              {name:'武警总署医院-飞利浦电饭煲案例',src:'./static/images/gift_customization/anli11.jpg'},
              {name:'北京协和医院-红木礼品案例',src:'./static/images/gift_customization/anli12.jpg'},
            ]},
          {head:'汽车案例',kinds:[
              {name:'奔驰汽车-三件套咖啡杯礼品案例',src:'./static/images/gift_customization/anli13.jpg'},
              {name:'大众汽车-钥匙扣案例',src:'./static/images/gift_customization/anli14.jpg'},
              {name:'帝豪汽车-商务签字笔案例',src:'./static/images/gift_customization/anli15.jpg'},
              {name:'雪铁龙汽车-水杯案例',src:'./static/images/gift_customization/anli16.jpg'},
            ]},
        ],
      }
    },
    components:{Header},
    mounted(){

    },
    methods: {
      onChange(index) {
        console.log(index)
        this.index = index;
      },
      ImagePreview(path){
        this.show = true
        this.images = [path]
      },
      goto(path){
        this.$router.push(path)
        window.location.reload()
        this.$toast.loading({
          mask: true,
          position:'middle',
          message: '加载中...'
        })
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

    }
  }
</style>
