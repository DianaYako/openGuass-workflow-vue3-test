import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index';

import '@antv/x6-vue-shape'


createApp(App)
    .use(router)
    .mount('#app')
