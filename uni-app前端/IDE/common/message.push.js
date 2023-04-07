// TODO:
// 多端统合，小程序端实现微信推送，h5和微信公众号的推送
export default class MessagePush {
	// 获取client参数
	getClientInfo() {
		// #ifdef APP-PLUS
		return plus.push.getClientInfo();
		// #endif
		
		// #ifdef H5
		console.error('请在手机或模拟器上使用')
		// #endif
	}
	// 创建消息
	createMessage(title,message, icon) {
		// #ifdef APP-PLUS
		plus.push.createMessage(message, 'LocalMSG', {
			title:title,
			cover: false,
			icon: icon
		});
		// #endif
		// #ifdef H5
		console.error('请在手机或模拟器上使用')
		// #endif
	}
	// 点击消息
	clickMessage(cb) {
		// #ifdef APP-PLUS
		plus.push.addEventListener("click", (res) => {
			cb && cb(res);
		}, false);
		// #endif
		// #ifdef H5
		console.error('请在手机或模拟器上使用')
		// #endif
	}
	// 接收推送
	receiveMessage(cb) {
		// #ifdef APP-PLUS
		plus.push.addEventListener("receive", (msg) => {
			cb && cb(msg)
		}, false);
		// #endif
		// #ifdef H5
		console.error('请在手机或模拟器上使用')
		// #endif
	}
}
