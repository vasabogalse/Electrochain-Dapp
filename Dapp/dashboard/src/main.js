/*
 =========================================================
 * Vue Black Dashboard - v1.1.2
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2023 Creative Tim (http://www.creative-tim.com)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import {Vue, h} from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import App from "./App";
// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/index";
import "vue-connect-wallet/dist/style.css";
import VueConnectWallet from "vue-connect-wallet";
import BlackDashboard from "./plugins/blackDashboard";
// import i18n from "./i18n"
import './registerServiceWorker'
// Vue.use(BlackDashboard);
// Vue.use(VueRouter);
// Vue.use(RouterPrefetch);
//Vue.use(VueConnectWallet);


/* eslint-disable no-new */
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount("#app"); 
const { createApp } = Vue

const app = createApp({
  router,
})

app.use(BlackDashboard);
app.use(VueRouter);
app.use(RouterPrefetch);

app.mount('#app')
export default {
  render() {
    return h('div')
  }
}