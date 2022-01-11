import Vue from 'vue'
import App from './App.vue'
import Notifications from "vue-notification";
import axios from 'axios';
import store from './store.js';
import router from './router/router';

import VueEditor from 'vue2-editor'
import Quill from 'vue2-editor'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';


Vue.config.productionTip = false
Vue.use(Notifications);


window.url = "https://test.bpcard.ru/backEnd/request.php";
window.sendRequest = function (url, param) {
  let fd = new FormData();
  for (const item in param) {
    fd.append(item, param[item]);
  }
  return new Promise(function (resolve, reject) {
    axios.post(window.url + url,
      fd, {
      headers: {
        auth: `${localStorage.getItem('api_key') ? localStorage.getItem('api_key') : null}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
    ).then((response) => {
      if (response) {
        resolve(response.data ? response.data : null);
      }
    }).catch(function (error) {
      reject({ status: 1, errorText: error });
    });
  });
}

window.url2 = "https://test.bpcard.ru/backEnd/request_auth.php";
window.sendRequestAuth = function (url, param) {
  let fd = new FormData();
  for (const item in param) {
    fd.append(item, param[item]);
  }
  return new Promise(function (resolve, reject) {
    axios.post(window.url2 + url,
      fd, {
      headers: {
        auth: `${localStorage.getItem('api_key') ? localStorage.getItem('api_key') : null}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
    ).then((response) => {
      if (response) {
        if (response.data.auth) {
          resolve(null);
        } else {
          resolve(response.data);
        }
      }
    }).catch(function (error) {
      reject({ status: 1, errorText: error });
    });
  });
}

Vue.component('v-select', vSelect)

new Vue({
  render: h => h(App),
  store,
  router,
  VueEditor,
  Quill,
}).$mount('#app')
