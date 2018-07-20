// import * as types from '../types'

const state = {
  blogList: []
}

const getters = {
  getSearchBlogList (state) {
    return state.blogList
  }
}

const mutations = {
  'SET_SEARCH_BLOG' (state, response) {
    if (response && response.data) {
      state.blogList = response.data
    }
  }
}

const actions = {
  searchBlog ({dispatch, state}, data) {
    dispatch('getBlogListAction', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
