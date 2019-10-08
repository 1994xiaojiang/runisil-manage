import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    user: {},
    opened: sessionStorage.getItem('open')
        ? sessionStorage.getItem('open')
        : 'false',
    routes: [],
    secondpage: true
  },
  mutations: {
    SET_TOKEN(state, val) {
      state.token = val;
      localStorage.setItem('token', val)
    },
    SET_OPENED(state, payload) {
      state.opened = String(payload);
      sessionStorage.setItem('open', payload)
    },
    DEL_TOKEN(state){
      state.token = '';
      state.user = {};
      state.opened = '';
      localStorage.removeItem('token')
    }
  },
  actions: {

  },
  getters: {
    token: state => state.token,
    user: state => state.user,
    opened: state => {
      if (state.opened === 'false') {
        return false
      } else if (state.opened === 'true') {
        return true
      }
    },
    routes: state => state.routes,
  },
})


