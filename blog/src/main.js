// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
// import store from './store/'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(iView)
Vue.use(mavonEditor)
Vue.use(VueLazyLoad)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
