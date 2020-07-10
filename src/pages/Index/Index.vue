<template>
  <div class="hf_app" id="app">
    <!--数据加载完成开始----------->
    <div class="sku" v-if="skus.length > 0">
      <!--头部-->
      <!--<header class="hf_header">
        <a @click="goto('/')" class="fl logo" >
          <img style="width: 100%;height: 46px" src="../../../static/images/logo.png" alt="">
        </a>
        <form action="" class="fl hf_search" >
          <input @click="goto('/search')" class="search_inp" type="search" placeholder="输入您想要的描述">
        </form>
        <a v-if="token === null" @click="goto('/login')" class="login fr">登录</a>
        <a v-if="token !== null" @click="goto('/my')" class="logins fr">
          <van-icon style="margin-top: 10px;" name="manager-o" ></van-icon>
        </a>
      </header>-->
      <header class="header">
        <div class="back">
          <img style="width: 100%;height: 40px;" src="../../../static/images/logo.png" alt="">
        </div>
        <div class="search">
          <van-search
            clearable
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            style="background: red"
            @click="goto('/search')"
          >
            <div class="login" style="color: #fff;font-size: 14px;" v-if="token === undefined" slot="action" @click="goto('/login?next=index')">登录</div>
            <div class="login" style="color: #fff;font-size: 20px;line-height: 20px;" v-if="token !== undefined" slot="action" @click="goto('/my')"><van-icon style="font-size: 20px!important;" name="manager-o" ></van-icon></div>
          </van-search>
        </div>
      </header>

      <!--banner图-->
      <Banner/>
      <!--icon定位图-->
      <nav class="nav">
        <ul class="clearfix">
          <li><a @click="goto('/Zfcg')"><img src="../../../static/images/zfcg.png" alt=""><p>政府采购</p></a></li>
          <li><a @click="goto('/Jdcg')"><img src="../../../static/images/jdcg.png" alt=""><p>军队采购</p></a></li>
          <li><a @click="goto('/Hzhb')"><img src="../../../static/images/hzhb.png" alt=""><p>合作伙伴</p></a></li>
          <li><a @click="goto('/Lpdz')"><img src="../../../static/images/lpdz.png" alt=""><p>礼品定制</p></a></li>
          <li><a @click="goto('/Wxfw')"><img src="../../../static/images/wxfw.png" alt=""><p>维修服务</p></a></li>
          <li><a @click="goto('/Cjcg')"><img src="../../../static/images/cjcg.png" alt=""><p>场景采购</p></a></li>
          <li><a @click="goto('/Gyhf')"><img src="../../../static/images/gyhf.png" alt=""><p>关于行丰</p></a></li>
          <li><a @click="goto('/Zprc')"><img src="../../../static/images/zprc.png" alt=""><p>招聘人才</p></a></li>
          <li><a @click="goto('/Bghc')"><img src="../../../static/images/bghc.png" alt=""><p>办公耗材</p></a></li>
          <li><a @click="goto('/Bgsb')"><img src="../../../static/images/bgsb.png" alt=""><p>办公设备</p></a></li>
        </ul>
      </nav>
      <!--限时秒杀-->
      <div class="product">
        <section class="product_box">
          <div class="tit"><h3>限时秒杀</h3></div>
          <div class="con kill">
            <ul class="miaosha clearfix">
              <li v-for="(kill,index) in timeKill" :key="index">
                <a @click="goto('indexDetails?id='+kill.id)">
                  <img v-lazy="kill.imgUrl" alt="">
                </a>
                <p class="now_price">&yen;{{kill.newPrice}}</p>
                <del class="old_price">&yen;{{kill.oldPrice}}</del>
              </li>
            </ul>
          </div>
        </section>
        <section class="product_box">
          <div class="tit"><h3>为你推荐</h3></div>
          <div class="con">
            <ul class="sku_s clearfix">
              <li v-for="sku in skus">
                <a @click="goto('/indexDetails?id='+sku.id)" ><!--{{ sku }}-->
                  <img v-lazy="sku.default_image_url" @error="onError('../../../static/images/timg.jpg')" alt="">
                  <p>{{ sku.name }}</p>
                  <i>&yen;{{ sku.price }}</i>
                </a>
              </li>
            </ul>
          </div>
        </section>
        <div >
        </div>
      </div>
      <!--回到顶部-->
      <ToTop/>
      <!--底部导航-->
      <Footer/>
    </div>
    <!--数据加载完成结束----------->

    <!--数据为空开始-------------->
    <div v-else style="width: 100%;height:100%;background: #fff"></div>
    <!--数据为空结束-------------->

    <!--数据占位开始-------------->
    <div v-else>
      <!--头部-->
      <header class="header" style="width: 100%;height: 40px;background: #d7d7d7"></header>
      <!--banner图-->
      <div style="width: 100%;height: 183px;background: #ddd"></div>
      <!--icon定位图-->
      <nav class="nav">
        <ul class="clearfix">
          <li style="width: 20%;height: 103px;" v-for="sku in 10">
            <a @click="noDev">
              <img style="width:60px;height:60px;background: #ddd">
              <p style="background: #ddd;width: 60px;display: block;margin: 10px auto"></p>
            </a>
          </li>
        </ul>
      </nav>
      <!--限时秒杀-->
      <div class="product">
        <section class="product_box">
          <div class="tit"><h3>限时秒杀</h3></div>
          <div class="con kill">
            <ul class="miaosha clearfix">
              <li v-for="(kill,index) in 3" :key="index">
                <a>
                  <img style="width: 73px;height: 73px;background: #ddd">
                </a>
                <p class="now_price" style="width: 73px;background: #ddd;height:15px;display: block;margin: 5px auto"></p>
                <del style="width: 73px;background: #ddd;height:15px;display: block;margin: auto"></del>
              </li>
            </ul>
          </div>
        </section>
        <section class="product_box">
          <div class="tit"><h3>为你推荐</h3></div>
          <div class="con">
            <ul class="sku_s clearfix">
              <li v-for="sku in 3">
                <a>
                  <img style="width: 154px;height: 154px;background: #ddd">
                  <p style="width: 154px;height: 15px;background: #ddd;margin: 5px auto"></p>
                  <i style="width: 154px;height: 15px;background: #ddd;margin: 5px auto"></i>
                </a>
              </li>
            </ul>
          </div>
        </section>
        <div >
        </div>
      </div>
      <!--回到顶部-->
      <ToTop/>
      <!--底部导航-->
      <Footer/>
    </div>
    <!--数据占位结束-------------->
  </div>
</template>

<script>
  import {reqSearchResult,BASE_URL} from '../../api'
  import axios from 'axios'
  import Footer from '../../components/Footer/Footer'
  import Banner from '../../components/Banner/Banner'
  import ToTop from '../../components/ToRoute/ToTop/ToTop'
  export default {
    inject: ['reload'],
    data(){
      return{
        token:localStorage.token || sessionStorage.token,  //登陆标志
        query:'',  //搜索文本  默认为空
        page:1,  // 分页
        page_size: 100,  //页数
        skus: [], // 数据
        show:true,
        count:0, // 商品总数
        timeKill:[  // 限时秒杀
          {
            id:113103,
            oldPrice:'220.00',
            newPrice:'152.00',
            imgUrl:'http://47.94.106.106:8888/group1/M00/27/E4/rBHxiF0r8ZqAaeUoAAELd16iC4I529.jpg',
          },
          {
            id:20032,
            oldPrice:'2400.00',
            newPrice:'1800.00',
            imgUrl:'http://47.94.106.106:8888/group1/M00/06/BA/rBHxiF0kWmuAWOR4AABk9c9_MSg320.jpg',
          },
          {
            id:72942,
            oldPrice:'5800.00',
            newPrice:'4426.00',
            imgUrl:'http://47.94.106.106:8888/group1/M00/19/7C/rBHxiF0m1yOAOLJEAABi1sPiTTg783.jpg',
          },
        ]
      }
    },
    components:{
      Banner,
      Footer,
      ToTop
    },
    async mounted(){
      this.getDate()
      window.addEventListener('scroll', this.scrollTable, true)
      if(location.href.split('?state=')[1]){
        this.yangCai()
      }
    },
    methods:{
      /*路由导航*/
      goto(path){
        if(path === '/Jdcg' || path === '/Bghc' || path === '/Bgsb' || path === '/Lpdz' || path === '/Gyhf'){
          /*this.$toast({
            message:'暂未开发',
            position:'bottom'
          })*/
          this.$router.push(path)
        }else{
          this.$router.push(path)
        }
      },
      /*图片404返回默认*/
      onError(imageUrl){
        let img = event.srcElement
        img.src = imageUrl
      },
      yangCai(){
        const str1 = location.href.split('?state=')[1]
        console.log(str1)
        if(str1  === "c354afc58616830b12ed04f6a3b9e84b"){
          axios.get(BASE_URL+'/oauth/userinfo/')
            .then(response=>{
              console.log(response.data);//测试收到数据
              this.username = response.data.username;
              this.password = response.data.password;

              if(this.username !== '' && this.password !== ''){
                axios.post(BASE_URL+'/auth2/',{
                  username:this.username,
                  password:this.password
                },{
                  responseType:'json',
                  withCredentials:true
                })
                  .then(function(response){
                    console.log(response.data)
                    // 使用浏览器本地存储保存token
                    localStorage.clear();
                    sessionStorage.clear();
                    sessionStorage.token = response.data.token;
                    sessionStorage.user_id = response.data.user_id;
                    sessionStorage.username = response.data.username;
                    sessionStorage.expires_at = response.data.expires_at;
                    sessionStorage.code = response.data.code;
                    if(sessionStorage.code === undefined){
                      sessionStorage.code = ''
                    }
                    // const token = sessionStorage.token
                    // this.token = token
                    this.goto('/my')
                    window.location.reload()
                  })
                  .catch(function(error){
                    console.log(error);
                  })
              }else{
                console.log('没有有效的用户信息')
              }
            })
            .catch(
              error=>{
                console.log(error)
              }
            );
        }
      },
      async getDate(){
        const response = await reqSearchResult(this.query,this.page,this.page_size)
        // console.log(response.results)
        if(response !== undefined || response !== null){
          document.title = '行丰商城-商品首页'
          this.count = response.count
          let results = response.results;
          for(let i=0; i< results.length; i++){
            let sku = results[i].object;
            this.skus.push(sku);
          }
        }
      },
      async scrollTable() {
        // 浏览器窗口高度
        let visibleHeight = window.innerHeight||document.body.clientHeight || document.documentElement.clientHeight
        // 文档高度
        let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        // 滑动高度
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        if(scrollTop > 183){
          $('.header').css('background','rgba(205,37,37,1)')
        }else if(scrollTop <= 183){
          $('.header').css('background','rgba(205,37,37,0)')
        }
        // 发起请求前需要阻止页面滚动
        if (scrollHeight - (scrollTop + visibleHeight) === 0) {
          // 判断请求数量是否大于商品总数
          if(this.count <= (this.page*this.page_size)) {
            // this.$toast.fail('没有更多');
            return false
          }else{
            this.page = this.page + 1
            /*this.$toast.loading({
              mask: true,
              position:'middle',
              message: '加载中...'
            })*/
            // 加载数据
            this.getDate()
          }
        } else {
          return false
        }
      },
    },
    watch :{
      '$route': function (to, from) {
        console.log(to, from)
        if(to.name !== 'index'){
          window.location.reload()
        }else{
          //执行数据更新查询
          this.getDate();
        }
      }
    }
  }
</script>
<style type="text/css">
  .van-search{
    padding: 5px 12px;
    background: none!important;
  }
  .van-icon{
    font-size: 20px;
  }
  .van-search__action{
    font-size:20px;
    line-height:30px;
    padding-left: 10px;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .hf_app{
    width:100%;
    margin:auto;
    background #f6f6f6
    .sku{
      position:relative;
      .header{
        width:100%;
        height:46px;
        line-height: 46px;
        position:fixed;
        z-index 1
        .back{
          float left
          height 46px
          width 22%
          font-size 22px
          /*background: #fff*/
          /*margin-top: 2px;*/
          padding-top 3px
        }
        .search{
          width 78%
          height 46px
          float right
          display inline-block
          padding-top: 2px;
        }
      }
      .nav{
        width:100%;
        ul{
          width:100%;
          padding:10px 0;
          background #fff
          border-bottom:1px solid #ccc;
          li{
            float:left;
            width:20%;
            padding:6px 0;
            a{
              width:100%;
              img{
                display: block;
                /*width:72%;*/
                width:60px;
                margin:0 auto;
              }
              p{
                padding:6px 0;
                text-align: center;
              }
            }
          }
        }
      }
      .product{
        padding:0 5px;
        margin-bottom 40px
        .product_box{
          margin-top:10px;
          box-shadow: 0 0 2px #ccc;
          /*min-height:200px;*/
          background:#fff;
          margin-bottom 10px
          .tit{
            line-height: 34px;
            height:34px;
            /*border-bottom:1px solid #ddd;*/
            h3{
              position:relative;
              padding-left:20px;
              ::before{
                content:'';
                width:4px;
                height:12px;
                background:red;
                position:absolute;
                left:10px;
                top:11px;
              }
            }
          }
          .kill{
            .miaosha{
              padding: 10px 0;
              width:100%;
              li{
                width:33.3333%;
                float:left;
                a{
                  display: block;
                }
                img{
                  display: block;
                  width:60%;
                  margin:0 auto;

                }
                p{
                  text-align: center;
                  padding:4px 0;
                  color:red;
                }
                del{
                  display: block;
                  text-align: center;
                }
              }
            }
          }
          .con{
            .sku_s{
              width:100%;
              padding:8px;
              li{
                border:2px solid #f7f7f7;
                width:50%;
                float:left;
                /*background:pink;*/
                a{
                  display: block;
                  width:100%;
                  img{
                    width:90%;
                    display: block;
                    margin:0 auto;
                  }
                  p{
                    width:90%;
                    margin:0 auto;
                    text-align: center;
                    line-height: 1rem;
                    height:2rem;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2
                  }
                  i{
                    display: block;
                    width:90%;
                    margin:0 auto;
                    text-align: left;
                    line-height: 1rem;
                    height:2rem;
                    overflow: hidden;
                    color:red;
                    font-style:normal;
                  }
                }
              }
            }
          }
        }
      }
    }

  }
</style>
