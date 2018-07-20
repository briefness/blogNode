import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import getBlogList from '@/store/modules/getBlogList'

Vue.use(Vuex)

// const state = {
// }

export default new Vuex.Store({
  // state,
  actions,
  modules: {
    getBlogList
  }
})
