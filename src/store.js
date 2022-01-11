import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isModalShow: false,
    isAuth: false,
    user: null,
    progress: false,
    student_balance: null,
    notify: [],
    preloader: true,
    modal_id: 0,
    update_lk: false
  },
  mutations: {
    CHANGE_MODAL: (state) => {
      state.isModalShow = !state.isModalShow
    },
    CHANGE_MODAL_ID: (state, modal_id) => {
      state.modal_id = modal_id;
    },

    CHANGE_AUTH: (state, auth) => {
      state.isAuth = auth
    },
    CHANGE_USER: (state, user) => {
      state.user = user
    },
    CHANGE_PROGRESS: (state, progress) => {
      state.progress = progress
    },
    CHANGE_BALANCE: (state, balance) => {
      state.student_balance = balance
    },
    CHANGE_NOTIFY: (state, notify) => {
      state.notify = notify
    },
    CHANGE_PRELOADER: (state, preloader) => {
      state.preloader = preloader
    },
    CHANGE_UPDATE_LK: (state, update_lk) => {
      state.update_lk = update_lk
    },
  },
  actions: {
    TOGGLE_MODAL({ commit }) {
      commit('CHANGE_MODAL')
    },
    TOGGLE_AUTH({ commit }, auth) {
      commit('CHANGE_AUTH', auth)
    },
    TOGGLE_USER({ commit }, user) {
      commit('CHANGE_USER', user)
    },
    TOGGLE_PROGRESS({ commit }, progress) {
      commit('CHANGE_PROGRESS', progress)
    },
    TOGGLE_BALANCE({ commit }, balance) {
      commit('CHANGE_BALANCE', balance)
    },
    TOGGLE_NOTIFY({ commit }, notify) {
      commit('CHANGE_NOTIFY', notify)
    },
    TOGGLE_PRELOADER({ commit }, preloader) {
      commit('CHANGE_PRELOADER', preloader)
    },
    TOGGLE_UPDATE_LK({ commit }, update_lk) {
      commit('CHANGE_UPDATE_LK', update_lk)
    },
  },
  getters: {
    MODAL_STATE(state) {
      return state.isModalShow;
    },
    MODAL_ID_STATE(state) {
      return state.modal_id;
    },
    AUTH_STATE(state) {
      return state.isAuth;
    },
    USER_STATE(state) {
      return state.user;
    },
    PROGRESS_STATE(state) {
      return state.progress;
    },
    BALANCE_STATE(state) {
      return state.student_balance;
    },
    NOTIFY_LENGTH_STATE(state) {
      let i = 0;
      if (state.notify.length > 0) {
        state.notify.forEach(item => {
          if (!item.view) {
            i++;
          }
        });
      }
      return i;
    },
    NOTIFY_STATE(state) {
      return state.notify;
    },
    PRELOADER_STATE(state) {
      return state.preloader;
    },
    UPDATE_LK_STATE(state) {
      return state.update_lk;
    }
  }

});

export default store;