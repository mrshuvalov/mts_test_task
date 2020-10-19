import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    user: "",
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, user) {
      state.status = "success";
      state.user = user;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://0.0.0.0:8009/login/",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            commit("auth_success", resp.data);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    addValue(_, data) {
      new Promise((resolve, reject) => {
        axios({
          url: "http://0.0.0.0:8009/add_data/",
          data: data,
          method: "POST",
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      })
    },
    getData(_, user) {
      new Promise((resolve, reject) => {
        axios({
          url: "http://0.0.0.0:8009/get_data/",
          data: user,
          method: "GET",
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      })
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
});
