// 把json转化为query参数
function obj2query(obj) {
	let arr = []
	if (JSON.stringify(obj) !== "{}") {

		for (let x in obj) {
			if (obj[x]) {
				arr.push(x + '=' + obj[x])
			}
		}
		return encodeURI('?' + arr.join('&'))
	};

	return "";
}
// 导出路由方法
// $routers 对象
// {
// 	push 正常导航到下一个页面
// 	replace 关闭当前页面进入下一个页面
// 	closeAndTo 关闭所有页面进入下一个页面
// 	switchTab 导航到tabs上的页面
// 	back 返回上一个或者几个页面
// 	preload 预加载页面
// }
// 所有的方法(back除外，back有delta【返回层级】参数，默认为1)都存在两个参数url query
// 
export default function install(Vue, vm) {
	Vue.prototype.$routers = {
		push: (url, query = {}) => {
			return new Promise((reslove, reject) => {
				uni.navigateTo({
					url: url + obj2query(query),
					success: (res) => {
						reslove(res)
					},
					fail: (err) => {
						reject(err)
					}
				})
			})
		},
		replace: (url, query = {}) => {
			return new Promise((reslove, reject) => {
				uni.redirectTo({
					url: url + obj2query(query),
					success: (res) => {
						reslove(res)
					},
					fail: (err) => {
						reject(err)
					}
				})
			})
		},
		closeAndTo: (url, query = {}) => {
			return new Promise((reslove, reject) => {
				uni.reLaunch({
					url: url + obj2query(query),
					success: (res) => {
						reslove(res)
					},
					fail: (err) => {
						reject(err)
					}
				})
			})
		},
		switchTab: (url, query = {}) => {
			return new Promise((reslove, reject) => {
				uni.switchTab({
					url: url + obj2query(query),
					success: (res) => {
						reslove(res)
					},
					fail: (err) => {
						reject(err)
					}
				})
			})
		},
		back: ({
			delta = 1
		}) => {
			return new Promise((reslove, reject) => {
				uni.navigateBack({
					delta: delta,
					success: (res) => {
						reslove(res)
					},
					fail: (err) => {
						reject(err)
					}
				})
			})
		},
		preload: (url, query = {}) => {
			return new Promise((reslove, reject) => {
				uni.preloadPage({
					url: url + obj2query(query),
					success: (res) => {
						reslove(res)
					},
					fail: (err) => {
						reject(err)
					}
				})
			})
		}
	}
}
