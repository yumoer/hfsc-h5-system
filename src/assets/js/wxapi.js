// wxapi.js
import wx from 'weixin-js-sdk'
import axios from 'axios'
const wxApi = {
  wxRegister (callback) {
    let url = encodeURIComponent(window.location.href);
    axios.post('/api'+'/home/ajax_test_sign/?url='+url)
      .then(response => {
        wx.config({
          debug: false,
          appId: response.data.appid, // 和获取Ticke的必须一样------必填，公众号的唯一标识
          timestamp:response.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: response.data.nonce, // 必填，生成签名的随机串
          signature:response.data.sign,// 必填，签名，见附录1
          //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
          jsApiList: [
            'onMenuShareAppMessage','onMenuShareTimeline',
            'onMenuShareQQ','onMenuShareQZone'
          ]
        });
        //处理验证失败的信息
        wx.error(function (res) {
          console.log('验证失败返回的信息:',res);
        });
//处理验证成功的信息
        wx.ready(function (res) {
          if (callback) {
            callback()
          }
          /*//分享到朋友圈
          wx.onMenuShareTimeline({
            title: document.title, // 分享标题
            desc: '我正在看['+document.title+']，分享给你，一起来看看吧', // 分享描述
            link: response.data.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: this.images[0], // 分享图标
            success: function (res) {
              alert(res)
              // 用户确认分享后执行的回调函数
              console.log("分享到朋友圈成功返回的信息为:",res);
              console.log("分享成功!")
            },
            cancel: function (res) {
              alert(res)
              // 用户取消分享后执行的回调函数
              console.log("取消分享到朋友圈返回的信息为:",res);
            }
          });
          //分享给朋友
          wx.onMenuShareAppMessage({
            title: document.title+'111', // 分享标题
            desc: '我正在看['+document.title+']，分享给你，一起来看看吧', // 分享描述
            link: response.data.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: this.images[0], // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function (res) {
              // 用户确认分享后执行的回调函数
              alert(res)
              console.log("分享给朋友成功返回的信息为:",res);
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              alert(res)
              console.log("取消分享给朋友返回的信息为:",res);
            }
          });
          //分享到QQ
          wx.onMenuShareQQ({
            title: document.title, // 分享标题
            desc: '我正在看['+document.title+']，分享给你，一起来看看吧', // 分享描述
            link: response.data.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: this.images[0], // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              alert(res)
              console.log("分享到QQ好友成功返回的信息为:",res);
            },
            cancel: function (res) {
              alert(res)
              // 用户取消分享后执行的回调函数
              console.log("取消分享给QQ好友返回的信息为:",res);
            }
          });

          //分享到QQ空间
          wx.onMenuShareQZone({
            title: document.title, // 分享标题
            desc: '我正在看['+document.title+']，分享给你，一起来看看吧', // 分享描述
            link: response.data.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: this.images[0], // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              console.log("分享到QQ空间成功返回的信息为:",res);
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              console.log("取消分享到QQ空间返回的信息为:",res);
            }
          });*/
        });
      })
      .catch(error=> {
        console.log(error)
      })
  },

  // 接上面的代码
  /**
   * [ShareAppMessage 微信分享到朋友圈]
   * @param {[type]} opstion [分享信息]
   * @param {[type]} success [成功回调]
   * @param {[type]} error   [失败回调]
   */
  ShareAppMessage (opstion) {
    wx.onMenuShareAppMessage({
      title: opstion.title, // 分享标题
      link: opstion.link, // 分享链接
      desc:opstion.desc, // 分享描述
      imgUrl: opstion.imgUrl, // 分享图标
      success () {
        // 用户成功分享后执行的回调函数
        opstion.success()
      },
      cancel () {
        // 用户取消分享后执行的回调函数
        opstion.error()
      }
    })
  },
  ShareTimeline (opstion) {
    wx.onMenuShareTimeline({
      title: opstion.title, // 分享标题
      link: opstion.link, // 分享链接
      desc:opstion.desc, // 分享描述
      imgUrl: opstion.imgUrl, // 分享图标
      success () {
        // 用户成功分享后执行的回调函数
        opstion.success()
      },
      cancel () {
        // 用户取消分享后执行的回调函数
        opstion.error()
      }
    })
  },
  MenuShareQQ (opstion) {
    wx.onMenuShareQQ({
      title: opstion.title, // 分享标题
      link: opstion.link, // 分享链接
      desc:opstion.desc, // 分享描述
      imgUrl: opstion.imgUrl, // 分享图标
      success () {
        // 用户成功分享后执行的回调函数
        opstion.success()
      },
      cancel () {
        // 用户取消分享后执行的回调函数
        opstion.error()
      }
    })
  },
  MenuShareQZone (opstion) {
    wx.onMenuShareQZone({
      title: opstion.title, // 分享标题
      link: opstion.link, // 分享链接
      desc:opstion.desc, // 分享描述
      imgUrl: opstion.imgUrl, // 分享图标
      success () {
        // 用户成功分享后执行的回调函数
        opstion.success()
      },
      cancel () {
        // 用户取消分享后执行的回调函数
        opstion.error()
      }
    })
  }
}
export default wxApi
