// common/http.interceptor.js
function getToken() {
	return uni.getStorageSync("token") || "";
}
export default function install (Vue, vm){
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://youzhihui.cnerha.com', // 请求的本域名
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		// 配置请求头信息
		header: {
			'content-type': 'application/json;charset=UTF-8'
		},
	});

	// 请求拦截部分，如配置，每次请求前都会执行，见上方说明
	Vue.prototype.$u.http.interceptor.request = (config) => {
		const token = getToken();
		if(token) {
			config.header['token'] = token;
		}
		return config;
	}

	// 响应拦截，如配置，每次请求结束都会执行本方法
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.code == 200) {
			return res.data;
		} else if (res.code == 201) {
			// 假设201为token失效，这里跳转登录
			vm.$u.toast('验证失败，请重新登录');
			setTimeout(() => {
				// 此为uView的方法，详见路由相关文档
				// vm.$u.route('/pages/user/login')
			}, 1500)
			return false;
		} else {
			vm.$u.toast("请求失败！")
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
	}
}

