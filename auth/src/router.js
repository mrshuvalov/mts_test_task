import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
