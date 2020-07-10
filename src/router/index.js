import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import Index from '../pages/Index/Index'
import Classify from '../pages/Classify/Classify'
import ClassifyList from '../pages/Classify/ClassifyList'
import Search from '../pages/Search/Search'
import SearchList from '../pages/Search/SearchList'
import Shopping from '../pages/Shopping/Shopping'
import ShopPay from '../pages/Shopping/shopPay'
import shopPayDetails from '../pages/Shopping/shopPayDetails'
import ShopAddress from '../pages/Shopping/shopAddress'
import My from '../pages/My/My'
import MyShopAddress from '../pages/My/MyShopAddress'
import MyInfo from '../pages/My/MyInfo'
import MyChangePwd from '../pages/My/MyChangePwd'
import MyOrder from '../pages/My/MyOrder'
import MyInvoices from '../pages/My/MyInvoices'
import MyAddInvoice from '../pages/My/MyAddInvoice'
import MyAddTicket from '../pages/My/MyAddTicket'
import Login from '../components/Login/Login'
import Register from '../components/Login/Register'
import Forget from '../components/Login/Forget'
import OauthCallback from '../components/Login/oauthCallback'
import NoDate from '../components/NoDate/NoDate'

import ZFCG from '../pages/InfoCenter/Zfcg'
import JDCG from '../pages/InfoCenter/Jdcg'
import HZHB from '../pages/InfoCenter/Hzhb'
import LPDZ from '../pages/InfoCenter/Lpdz'
import WXFW from '../pages/InfoCenter/Wxfw'
import CJCG from '../pages/InfoCenter/Cjcg'
import GYHF from '../pages/InfoCenter/Gyhf'
import ZPRC from '../pages/InfoCenter/Zprc'
import BGHC from '../pages/InfoCenter/Bghc'
import BGSB from '../pages/InfoCenter/Bgsb'

import Unsteady from '../pages/Unsteady/Unsteady'
import LookDetails from '../pages/Unsteady/lookDetails'

import IndexDetails from '../pages/Index/IndexDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'index'
      },
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        keepAlive: true, // 需要缓存
      }
    },
    {
      path: '/indexDetails',
      name: 'indexDetails',
      component: IndexDetails,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/classify',
      name: 'classify',
      component: Classify,
      meta: {
        keepAlive: true, // 需要缓存
      }
    },
    {
      path: '/classifyList',
      name: 'classifyList',
      component: ClassifyList,
      meta: {
        keepAlive: true, // 需要缓存
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/searchList',
      name: 'searchList',
      component: SearchList,
      meta: {
        keepAlive: true, // 需要缓存
        // scollTopPosition: 0
      }
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: Shopping,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/shopPay',
      name: 'shopPay',
      component: ShopPay,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/shopPayDetails',
      name: 'shopPayDetails',
      component: shopPayDetails,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/shopAddress',
      name: 'shopAddress',
      component: ShopAddress,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/my',
      name: 'my',
      component: My,
      meta: {
        keepAlive: true, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/myShopAddress',
      name: 'myShopAddress',
      component: MyShopAddress,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/myInfo',
      name: 'myInfo',
      component: MyInfo,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/myChangePwd',
      name: 'myChangePwd',
      component: MyChangePwd,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: MyOrder,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/myInvoices',
      name: 'myInvoices',
      component: MyInvoices,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/myAddInvoice',
      name: 'myAddInvoice',
      component: MyAddInvoice,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/myAddTicket',
      name: 'myAddTicket',
      component:MyAddTicket,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/oauthCallback',
      name: 'oauthCallback',
      component: OauthCallback,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/noDate',
      name: 'NoDate',
      component: NoDate,
      meta: {
        keepAlive: false, // 需要缓存
        scollTopPosition: 0
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        keepAlive: true, // 需要缓存
      }
    },
    {
      path: '/Zfcg',
      name: 'Zfcg',
      component: ZFCG,
      meta: {
        keepAlive: false, // 需要缓存
      }
    },
    {
      path: '/Jdcg',
      name: 'Jdcg',
      component: JDCG,
      meta: {
        keepAlive: false, // 需要缓存
      }
    },
    {
      path: '/Hzhb',
      name: 'Hzhb',
      component: HZHB,
      meta: {
        keepAlive: false, // 需要缓存
      }
    },
    {
      path: '/Lpdz',
      name: 'Lpdz',
      component: LPDZ,
      meta: {
        keepAlive: false, // 需要缓存
      }
    },
    {
      path: '/Wxfw',
      name: 'Wxfw',
      component: WXFW,
      meta: {
        keepAlive: false, // 需要缓存
      }
    },
    {
      path: '/Cjcg',
      name: 'Cjcg',
      component: CJCG,
      meta: {
        keepAlive: false, // 需要缓存
      }
    },
    {
      path: '/Gyhf',
      name: 'Gyhf',
      component: GYHF,
      meta: {
        keepAlive: false, // 需要缓存
      }
    },
    {
      path: '/Zprc',
      name: 'Zprc',
      component: ZPRC,
      meta: {
        keepAlive: false, // 需要缓存
      }
    },
    {
      path: '/Bghc',
      name: 'Bghc',
      component: BGHC,
      meta: {
        keepAlive: false, // 需要缓存
      }
    },

    {
      path: '/Bgsb',
      name: 'Bgsb',
      component: BGSB,
      meta: {
        keepAlive: false, // 需要缓存
      }
    },
    {
      path: '/unsteady',
      name: 'unsteady',
      component: Unsteady,
      meta: {
        keepAlive: false, // 需要缓存
      }
    },
    {
      path: '/lookDetails',
      name: 'lookDetails',
      component: LookDetails,
      meta: {
        keepAlive: false, // 需要缓存
      }
    },
  ],
  scrollBehavior(to, from,savedPosition) {
    if (savedPosition) {
      console.log(savedPosition)
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
})

