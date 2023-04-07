/**
 * 格式化时间日期
 * @param {Date} date
 * @return {String} 2020-02-04 13:30:33
 * */

function formatTime(date) {
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()

	let hour = date.getHours()
	let minute = date.getMinutes()
	let second = date.getSeconds();


	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/**
 * 格式化数字
 * @param {number} n
 * @return {String} 0n
 * */
function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}

/**
 * 生成guid
 * @return {String} guid
 * */
function createGuid() {
	let s = []
	const hexDigits = '0123456789abcdef'

	for (let i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
	}

	s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = '-'

	return s.join('')
}

/**
 * 选择图片
 * @param {Number} count 1
 * @param {Object} useCamera true
 */

function chooseImages(count = 1, useCamera = true) {
	const sourceType = useCamera ? ['album', 'camera'] : ["album"];
	return new Promise((reslove, recject) => {
		uni.chooseImage({
			count: count, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: sourceType, //从相册选择
			success: (res) => {
				reslove(res);
			},
			fail: (err) => {
				recject(err)
			}
		});
	})
}

/**
 * @param {array<string>} urls  
 * @param {array<string>} longPressItemList default:  ['发送给朋友', '保存图片', '收藏']
 * */
function previewImages(urls, longPressItemList = ['发送给朋友', '保存图片', '收藏']) {
	return new Promise((reslove, recject) => {
		uni.previewImage({
			urls: urls,
			longPressActions: {
				itemList: longPressItemList,
				success: (data) => {
					reslove(data);
				},
				fail: (err) => {
					recject(err);
				}
			}
		});
	})
}

/**
 * 用户扫码
 * 不支持h5
 * 异步方法
 * */
function scanQrCode() {
	// 允许从相机和相册扫码
	return new Promise((reslove, recject) => {
		uni.scanCode({
			success: (res) => {
				reslove(res);
			},
			fail: (err) => {
				recject(err);
			}
		});
	})
}

// export Vue plugins
export default function install(Vue, vm) {
	Vue.prototype.$formatTime = formatTime;
	Vue.prototype.$createGuid = createGuid;
	Vue.prototype.$chooseImages = chooseImages;
	Vue.prototype.$previewImages = previewImages;
	Vue.prototype.$scanQrCode = scanQrCode;
}
