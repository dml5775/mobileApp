import Vue from "vue";
import Tpl from "./template.vue";
import "@assets/style/main.scss";
const FastClick = require("fastclick");
require("@mock/index.js");
import "jquery";

import { Toast } from "vant";
Vue.use(Toast);
document.addEventListener("DOMContentLoaded", function() {
  FastClick.attach(document.body);
}, false);

new Vue({
  render: h => h(Tpl),
}).$mount("#app");