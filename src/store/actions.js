import promise from 'es6-promise';
promise.polyfill();
import {
  RECEIVE_SEARCHRESULT,
} from './mutation-types'
import {
  reqSearchResult,
} from '../api'
// 异步获取
export default {
  /*搜索*/
  async getSearchResult({text,page,page_size}) {
    const {text,page,page_size} = state
    const result = await reqSearchResult(text,page,page_size)
    if(result.code===0){
      const searchResult = result.data[0]
      if(searchResult !== undefined){
        commit(RECEIVE_SEARCHRESULT, {searchResult})
      }
    }
    // callback && callback()
  },

}


