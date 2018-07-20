import {
  searchBlog
} from '../service/fetchData'

export const getBlogListAction = async ({ commit }, keywords) => {
  commit('SET_SEARCH_BLOG', await searchBlog(keywords))
}
