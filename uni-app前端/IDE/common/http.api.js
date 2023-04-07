
export default function install (Vue, vm)  {
	const init = (params = {}) => vm.$u.get('/api/common/init',params);
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$api(因为vm就是this，也即this.$api)下
	vm.$api = {init};
}

//exp:
/****************************************
			// this.$api.init().then(res => {
			// 	console.log(res);
			// })
****************************************/