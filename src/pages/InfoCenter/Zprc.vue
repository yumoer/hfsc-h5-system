<template>
  <div class="hf_app" id="apps">
    <Header message="招聘人才"/>
    <div class="nav">
      <div>
        <img style="width: 100%;height:150px" src="../../../static/images/join.jpg" alt="">
      </div>
      <van-collapse v-model="activeNames" accordion style="margin-top: -5px">
        <van-collapse-item v-for="(job,index) in jobs" :key="index" :name="job.id">
          <div slot="title"><span style="font-size: 16px">{{job.job}}</span></div>
          <van-row slot="title" style="margin-top: 5px">
            <van-col span="12"><van-icon style="font-size: 16px;vertical-align:middle;" name="location-o"></van-icon><span style="font-size: 14px;vertical-align:middle;">{{job.place}}</span></van-col>
            <van-col span="12"><van-icon style="font-size: 16px;vertical-align:middle;" name="friends-o"></van-icon><span style="font-size: 14px;vertical-align:middle;">{{job.num}}</span></van-col>
          </van-row>
          <div>
            <div style="font-size: 16px;margin-bottom: 10px" v-if="job.duty.length !== 0">
              <span style="color: #000">工作职责:</span>
              <p style="font-size: 14px;line-height: 24px" v-for="(duty,index) in job.duty" :key="index">{{duty}}</p>
            </div>
            <div style="font-size: 16px;" v-if="job.require.length !== 0">
              <span style="color: #000">职位要求:</span>
              <p style="font-size: 14px;line-height: 24px" v-for="(require,index) in job.require" :key="index">{{require}}</p>
            </div>
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
        activeNames: ['0'],
        // 内容开始
        jobs:[
          {job:'运营总监',num:'1人',place:'北京',hide:'false',id:1,
            duty:['1、规划、完善公司电商事业部的运营战略，年度经营目标及实施规划，年度费用计划与费用控制；' ,
              '2、电商事业部的人力资源架构管理，建立并完善电商各部门的工作流程；' ,
              '3、负责公司线上业务渠道的规划、拓展，带领团队实现线上整体销售目标；',
              '4、制定公司产品线上定位与市场细分，制定市场推广方案、媒体运营及相关预算的控制管理；',
              '5、管理电商事业部各部门的日常管理、部门内部的员工培训及团队建设；',
              '6、领导交代的其他事情。',],
            require:['1、有跨省市区域管理经验；',
              '2、本科或本科及以上学历，电子商务、营销相关专业；',
              '3、具有线上平台业务的整体运营工作经验及成功案例，相同岗位任职经验三年以上，有知名食品行业运营管理经验更佳；' ,
              '4、有加强的逻辑思维能力及数据分析能力；',
              '5、较强的创新精神及领导力，有强烈的事业心、责任心及团队合作精神；',
              '6、本科及以上学历，5-8年工作经验',]},
          {job:'产品经理',num:'1人',place:'北京',hide:'false',id:2,
            duty:['1、 深入理解公司战略、业务需求，整合公司资源搭建产品框架，完成产品从概念到落地过程；' ,
              '2、制定产品发展规划，整体把控市场调研、竞品分析、产品策划、产品设计、产品生命周期；' ,
              '3、根据业务需求设计产品关键功能、模块及业务流程规划，并时刻跟踪产品的设计、开发、发布、运营、测试环节；',
              '4、负责产品开发项目周期和进度把控，监控产品开发进度、成本、质量，确保产品按时、优质的上线运营；',
              '5、跨团队业务合作，与相关部门进行沟通协调，推动产品功能实时上线及产品上线后的跟踪、运营、数据分析工作，持续推进产品的优化和迭代；',
              '6、参与公司业务板块的商业模式分析，根据产品运营设计做出分析报告。',
              '7、建立规范的产品开发流程和相关制度',],
            require:['1、大学本科及以上学历，三年以上产品设计相关工作经验；',
              '2、熟悉互联网业务及产品的设计流程，能够独立进行新产品定义、规划、策划、设计和组织实施；',
              '3、敏锐把握市场需求，熟悉产品开发流程，对产品的解决方案有良好的判断力；' ,
              '4、重视用户体验，以用户需求为本，思维严密、逻辑清晰、理解、分析、表达能力强；',
              '5、熟练掌握AxureRP、MindManger、MS Visio、Photoshop等产品设计工具；',
              '6、跨部门沟通协作、项目推动能力强，强烈的责任感和工作热情',
              '7、  有成熟的第三方支付、互联网、电子商务、社区服务等互联网产品设计运营经验优先',]},
          {job:'招商经理',num:'1人',place:'北京',hide:'false',id:3,
            duty:['1、负责城市覆盖拓展，进行品牌阵地建设；' ,
              '2、针对所负责的城市，进行平台系统和服务市场的市场调研；' ,
              '3、制定招商策略与招商方案；',
              '4、指导区域进行招商拓展；',
              '5、对招商进来的合伙人进行评估审核；',
              '6、联系异业合作，组织招商会议。',],
            require:['1、有跨省市区域管理经验；',
              '2、有3C手机数码行业经验优先；',
              '3、沟通能力强，市场拓展能力强；' ,
              '4、能适应高频短途出差；',
              '5、有会务组织能力；',
              '6、本科及以上学历，3-5年工作经验',]},
          {job:'运营专员',num:'4人',place:'北京',hide:'false',id:4,
            duty:['1、多维度维护商城平台商品，丰富各个品类，制造爆品；' ,
              '2、商城,入住的平台装修美化工作，按照周期更换美化；' ,
              '3、对接商城平台，做好引流导入工作；',
              '4、制定商城营销计划，以达到增长销售的目的；',
              '5、粉丝客户激活、积累、转化工作；',
              '6、建立粉丝群，实现粉丝福利、粉丝营销等工作。',
              '7、每月汇总销售报表，对商品销售进行分析总结，制定次月营销计划',],
            require:['1、专科以上学历；',
              '2、诚信正直 爱岗敬业 认真仔细 高度的责任感 良好的职业道德；',
              '3、1年商城运营经验；' ,
              '4、具有社群营销者优先；',
              '5、擅长使用自媒体(例如抖音、小红书等)；',
              '6、性格活泼开朗，喜欢与人打交道',]},
          {job:'客服专员',num:'4人',place:'北京',hide:'false',id:5,
            duty:['1、多维度维护商城商品，丰富各个品类，制造爆品；' ,
              '2、商城,入住的平台装修美化工作，按照周期更换美化；' ,
              '3、对接商城平台，做好引流导入工作；',
              '4、制定商城营销计划，以达到增长销售的目的；',
              '5、粉丝客户激活、积累、转化工作；',
              '6、建立粉丝群，实现粉丝福利、粉丝营销等工作。',
              '7、每月汇总销售报表，对商品销售进行分析总结，制定次月营销计划',],
            require:['1、专科以上学历；',
              '2、诚信正直 爱岗敬业 认真仔细 高度的责任感 良好的职业道德；',
              '3、1年微商城运营经验；' ,
              '4、具有社群营销者优先；',
              '5、擅长使用自媒体(例如抖音、小红书等)；',
              '6、性格活泼开朗，喜欢与人打交道',]},
          {job:'销售代表',num:'4人',place:'北京',hide:'false',id:6,
            duty:['1、在上级的领导和监督下定期完成量化的工作要求，并能独立处理和解决所负责的任务；' ,
              '2、管理客户关系，完成销售任务；' ,
              '3、了解和发掘客户需求及购买愿望，介绍自己产品的优点和特色；',
              '4、对客户提供专业的咨询；',
              '5、收集潜在客户资料；',
              '6、收取应收帐款。',],
            require:['1、专科及以上学历，有办公用品销售优先考虑；',
              '2、1年以上销售行业工作经验；',
              '3、性格外向、反应敏捷、表达能力强，具有较强的沟通能力及交际技巧，具有亲和力；' ,
              '4、具备一定的市场分析及判断能力，良好的客户服务意识；',
              '5、有责任心，能承受较大的工作压力；',
            ]},
          {job:'销售助理',num:'2人',place:'北京',hide:'false',id:7,
            duty:['1、调查研究公司客户的相关意向；' ,
              '2、协助部门领导，维护客户关系以及标书的制作、投标；' ,
              '3、能够发现实际工作中的问题，并结合情况做出合理性的建议；',
              '4、指导区域进行招商拓展；',
              '5、完成临时交办的其他工作；',
            ],
            require:['1、大专以上学历；',
              '2、具备较强的工作责任心，出色的语言表达能力与沟通协调能力；',
              '3、具备独立处理复杂问题和危急事件的能力；' ,
              '4、具备较强的工作积极性和主动服务的意识；',
              '5、性格活泼开朗，愿意外出拜访客户；',
            ]},
          {job:'维修工程师',num:'2人',place:'北京',hide:'false',id:8,
            duty:['1、打印机、复印机、扫描仪、传真机等办公设备的维修与日常维护；' ,
              '2、良好的职业道德，工作积极主动，认真负责；' ,
              '3、学习能力强，具备良好的团队协作和客户服务意识；',
              '4、超强的动手能力和解决问题能力；',
              '5、很好沟通能力；',
            ],
            require:['1、具有一定的IT以及电路知识；',
              '2、热爱工作，吃苦耐劳；',
              '3、沟通能力强，市场拓展能力强；' ,
              '4、遵守纪律，诚实有责任心，有积极向上的乐观心态；',
              '5、高中以上学历，有办公设备维修经验者优先；',
            ]},
          {job:'招投标专员',num:'2人',place:'北京',hide:'false',id:9,
            duty:['1、招投标信息的收集，投标文件的制作及标书中涉及到的相应工作;；' ,
              '2、负责投标文件的编制、整体投标文件的排版、打印、复印、装订等工作，并按规定如期完成标书制作；' ,
              '3、协助销售主管做好项目的投标准备工作，会同销售部与客户进行商务谈判，确定项目质量、价格等相关事宜；',
              '4、处理投标过程中的定额单价、总价计算问题并及时汇报上级领导，确保报价准确、合理、具竞争性；',
              '5、负责与项目负责人、公司相关部门积极协调投标文件编制过程中的问题，确保投标文件按时投递；',
            ],
            require:['1、大专以上学历，有相关标书制作工作经验者优先考虑；',
              '2、PS技术精通优先；',
              '3、积极认真配合领导所安排的工作；' ,
              '4、熟悉电脑办公软件；',
            ]},
          {job:'财务出纳员',num:'1人',place:'北京',hide:'false',id:10,
            duty:['1、负责日常现金、支票及票据的收付、保管及费用报销；' ,
              '2、划转、核算内部往来款项，到款确认，及时登记现金、银行日记账；' ,
              '3、现金、银行凭证制作、装订、保管；',
              '4、协助会计准备每日、月单据及报表；',
              '5、办理与银行之间的所有相关业务；',
              '6、完成公司交办的其他事务性工作。',],
            require:['1、大专及以上学历 ，会计、财务等相关专业；',
              '2、诚信正直 爱岗敬业 认真仔细 高度的责任感 良好的职业道德；',
              '3、了解财务相关知识；' ,
              '4、熟练操作财务软件、 MS OFFICE（例如：Excel等 ），熟悉办理各项银行业务；',
              '5、具备日常现金管理、银行的收支、核算、记账、票据审核的知识和能力；',
              '6、良好的学习能力、独立工作能力和扎实的财务知识',]},
          {job:'库房理货员',num:'2人',place:'北京',hide:'false',id:11,
            duty:['1、负责库房货物出入库、盘点、装卸、配送、摆放、分类等工作；' ,
              '2、到货时，负责货物的清点、验收等操作，并快速准确的与装箱单据核对，并记录差异；' ,
              '3、出货时，负责客户订单的仓储内拣选、分拣、拼装、包装、运输前处理的操作；',
              '4、不断学习，充分了解仓库货品特性，保证仓库货品的安全存取等要求；',
              '5、领导交办的其他事情；',
            ],
            require:['1、具有较强安全意识和工作责任心；',
              '2、诚信正直 爱岗敬业 认真仔细 高度的责任感 良好的职业道德；',
              '3、具有吃苦耐劳和团队合作精神，有较强的团队协作能力，较强的执行力；' ,
              '4、熟练操作财务软件、 MS OFFICE（例如：Excel等 ），熟悉办理各项银行业务；',
              '5、为人诚实可靠、踏实稳重、责任心强，做事认真仔细；',
            ]},
          {job:'库房司机/物流司机',num:'3人',place:'北京',hide:'false',id:12,
            duty:['1、按公司派车任务，按时、保北京各店货品的正常配送工作；' ,
              '2、负责车况检查、保养、卫生工作；' ,
              '3、及时对收发、配送货品清点工作；',
              '4、发货帐实相符；',
              '5、随时关注车辆情况，发生事故及时维修，上报；',
            ],
            require:['1、具有较强安全意识和工作责任心；',
              '2、C1以上驾驶执照，熟悉北京市路况，特别熟悉北京各大商场周边环境；',
              '3、具有吃苦耐劳和团队合作精神，有较强的团队协作能力，较强的执行力；' ,
              '4、人品正直、豁达、明事理、吃苦耐劳体；',
              '5、遵守交通规则、保证安全驾驶无违章；',
            ]},
          {job:'福利待遇',num:'所有人',place:'北京',hide:'true',id:13,
            duty:['1、薪资构成：基本工资+绩效工资+公司奖励+饭补；' ,
              '2、缴纳五险：养老，医疗，失业，工商，生育保险；' ,
              '3、周末双休，按照国家法定节假日休息，每年组织两次游玩活动。；',
            ],
            require:[]},
          {job:'联系我们',num:'联系人',place:'北京',hide:'true',id:14,
            duty:['联系人：139-1053-6831（王先生）；' ,
              '联系人：158-1051-7314（王女士/刘女士）；' ,
              '地址：北京市丰台区中福丽宫品牌基地6号楼109室；',
              '乘车路线：4号线新宫地铁站西南角',
              '公司名字：北京行丰银拓科技有限公司',
            ],
            require:[]},

        ]
      }
    },
    components:{Header},
    methods: {}
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
