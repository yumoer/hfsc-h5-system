
import {
  RECEIVE_SEARCHRESULT,
} from './mutation-types'

export default{
  /*搜索*/
  [RECEIVE_SEARCHRESULT](state,{searchResult}) {
    state.searchResult = searchResult
  },
}

