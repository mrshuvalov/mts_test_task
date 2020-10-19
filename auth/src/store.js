import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    user: "",
    data: [],
  },
  mutations: {
    write_data(state, response) {
      state.data = response;
    },
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
          url: "http://0.0.0.0:8000/login/",
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
          url: "http://0.0.0.0:8000/add_data/",
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
    getData({commit}, user) {
      new Promise((resolve, reject) => {
        axios({
          url: `http://0.0.0.0:8000/get_data/?username=${user}`,
          method: "GET",
        })
          .then((resp) => {
            commit("write_data", resp.data);
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      })
    }
  },
});
