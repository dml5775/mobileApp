import Vue from "vue";
import Tpl from "./template.vue";
import "@assets/style/main.scss";
const FastClick = require("fastclick");
require("@mock/index.js");
import { Toast, Panel, Cell, CellGroup } from "vant";
Vue.use(Toast).use(Panel).use(Cell).use(CellGroup);
document.addEventListener("DOMContentLoaded", function() {
  FastClick.attach(document.body);
}, false);

new Vue({
  render: h => h(Tpl),
}).$mount("#app");