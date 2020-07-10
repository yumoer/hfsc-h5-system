/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import {Promise} from 'es6-promise';
Promise.polyfill();
import ajax from './ajax'
// const BASE_URL = process.env.API_BASE;
export const BASE_URL = 'http://47.94.106.106:8000';
// export const BASE_URL = 'api';
export const CASE_URL = 'http://192.168.1.119:8888';
// export const BASE_URL = 'api';

/*获取*/
export const reqSearchResult = (text,page,page_size) => ajax(BASE_URL+'/skus/search/',{text,page,page_size})

export const reqSearch = (text,page,page_size) => ajax(BASE_URL+'/skus/search/',{text,page,page_size})

/*登陆*/
export const reqLogin = (username,password) => ajax(BASE_URL+'/auth2/',{username,password},'POST')

/*注册*/
export const reqRegister = (username,password,password2,mobile,sms_code,allow) => ajax(BASE_URL+'/users/',{username,password,password2,mobile,sms_code,allow},'POST')

/*忘记密码*/
export const reqforGet = (username,mobile,password,password2) => ajax(BASE_URL+'/forget_password/',{username,mobile,password,password2},'POST')

/*图片验证码*/
export const reqallow = (id) => ajax(BASE_URL+'/image_codes/'+id,{id},'POST')

/*图片验证码文字*/
export const reqText = (id) => ajax(BASE_URL+'/image_codes/text/'+id,{id},'POST')

/*用户名检查重复*/
export const requserName = (username) => ajax(BASE_URL+'/usernames/'+username+'/count/',{username})

/*手机号检查重复*/
export const reqMobile = (mobile) => ajax(BASE_URL+'/mobiles/'+mobile+'/count/',{mobile})

/*主页详情*/
export const reqDetails = (pk) => ajax(BASE_URL+'/mobile/get/goods/'+pk+'/')

/*购物车更新*/
export const reqcartShop = () => ajax(BASE_URL+'/cart/')

