/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> and
// <%= stylesheet_pack_tag 'hello_vue' %> to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.http.headers.common['X-CSRF-Token'] = $('[name="csrf-token"]').attr('content');

import App from './tasks.vue'

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue(App).$mount('#tasks')
})
