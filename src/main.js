// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// import { Swipe, SwipeItem } from 'mint-ui';
import { Swipe, SwipeItem } from 'vant';
import { Icon } from 'vant';
import { Tab, Tabs } from 'vant';
import { Grid, GridItem } from 'vant';
import { Field } from 'vant';
import { CellGroup } from 'vant';
import { NavBar } from 'vant';
import { Button } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { Toast } from 'vant';
import { TreeSelect } from 'vant';
import { SubmitBar } from 'vant';
import { Card } from 'vant';
import { Stepper } from 'vant';
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from 'vant';
import { Dialog } from 'vant';
import { ContactCard, ContactList, ContactEdit } from 'vant';
import { AddressEdit } from 'vant';
import { Area } from 'vant';
import { Tag } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Divider } from 'vant';
import { AddressList } from 'vant';
import { NoticeBar } from 'vant';
import { Image } from 'vant';
import { Cell} from 'vant';
import { ActionSheet } from 'vant';
import { Row, Col } from 'vant';
import { Step, Steps } from 'vant';
import { Panel } from 'vant';
import { Search } from 'vant';
import { Uploader } from 'vant';
import { Sku } from 'vant';
import { Lazyload } from 'vant';
import { Skeleton } from 'vant';
import { Loading } from 'vant';
import { Overlay } from 'vant';
import { Popup } from 'vant';
import { DatetimePicker } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { ImagePreview } from 'vant';
import WXConfig from './assets/js/wxapi'  //微信分享
Vue.prototype.WXConfig = WXConfig
Vue.use(ImagePreview);
Vue.use(Collapse).use(CollapseItem);
Vue.use(DatetimePicker );
Vue.use(Popup);
Vue.use(Overlay);
Vue.use(Loading);
Vue.use(Skeleton);
// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(Sku);
Vue.use(Uploader);
Vue.use(Search);
Vue.use(Panel);
Vue.use(Step).use(Steps);
Vue.use(Row).use(Col);
Vue.use(ActionSheet);
Vue.use(Cell);
Vue.use(Image);
Vue.use(NoticeBar);
Vue.use(AddressList);
Vue.use(Divider);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Tag);
Vue.use(Area);
Vue.use(AddressEdit);
Vue.use(ContactCard)
Vue.use(ContactList)
Vue.use(ContactEdit);
// 全局注册
Vue.use(Dialog);
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton);
Vue.use(Stepper);
Vue.use(Card);
Vue.use(SubmitBar);
Vue.use(TreeSelect);
Vue.use(Toast);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(CellGroup);
Vue.use(Grid).use(GridItem);
Vue.use(Tab).use(Tabs);
Vue.use(Icon);
Vue.use(Swipe).use(SwipeItem);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
