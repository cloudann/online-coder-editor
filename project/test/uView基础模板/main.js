import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import httpInterceptor from '@/common/http.interceptor.js'
import tools from '@/common/plugins.tools.js';
import api from '@/common/http.api.js';
import router from '@/common/plugin.router.js';


Vue.use(uView);

Vue.config.productionTip = false;

App.mpType = 'app';

import {swipestr,file,emptyqueue} from '@/components/struct.vue';
import main from '@/App.vue';
const app = new Vue({
	...App
});

Vue.use(httpInterceptor, app);
Vue.use(tools, app);
Vue.use(api, app);
Vue.use(router, app);

app.$mount()
