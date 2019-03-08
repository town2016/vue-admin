import Vue from 'vue'
import vuex from 'vuex'
import form from './module/form'
Vue.use(vuex)

const store = new vuex.Store({
  modules: {
    form
  }
})

export default store
