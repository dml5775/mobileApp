import Vue from "vue";
import Tpl from "./template.vue";
import "@assets/style/main.scss";
const FastClick = require("fastclick");
require("@mock/index.js");

import { Swipe, SwipeItem, Toast, Lazyload, Popup } from "vant";

Vue.use(Swipe).use(SwipeItem).use(Toast).use(Lazyload).use(Popup);

document.addEventListener("DOMContentLoaded", function() {
  FastClick.attach(document.body);
}, false);

new Vue({
  render: h => h(Tpl),
}).$mount("#app");