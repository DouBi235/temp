// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    uid: "",
    userInfo: false,
    url: "https://xmp.ctbls.com",
    audit_status: '',
    openid: "",
    promo_code: "",
    skip: '',
    unionId: "",
  },
  getters: {
    hasUserInfo: state => {
      return state.userInfo;
    }
  },
  mutations: {
    setUid: (state, data) => {
      state.uid = data;
    },
    setAudit_status: (state, data) => {
      state.audit_status = data;
    },
    setUserInfo: (state, data) => {
      state.userInfo = data;
    },
    setOpenid: (state, data) => {
      state.openid = data;
    },
    setPromo_code: (state, data) => {
      state.promo_code = data;
    },
    setSkip: (state, data) => {
      state.skip = data;
    },
    setUnionId: (state, data) => {
      state.unionId = data;
    },
  }
})

export default store
