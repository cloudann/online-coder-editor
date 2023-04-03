# 下载解压导入Hbuilderx
## 然后运行
### 然后不明白的自己去看代码
#### 然后还是不明白+449107144@qq.com来我给解答


## 关于插件plugin.router.js

这个插件一共有以下几个方法

```json
{
	push 正常导航到下一个页面
	replace 关闭当前页面进入下一个页面
	closeAndTo 关闭所有页面进入下一个页面
	switchTab 导航到tabs上的页面
	back 返回上一个或者几个页面
	preload 预加载页面
}
```
你可以这么调用它，至于为啥要封装，是因为习惯了Vue的那种导航方式简洁方便。

你可以这么来使用他

```js
this.$routers.push(url,query);
this.$routers.replace(url,query);
this.$routers.closeAndTo(url,query);
this.$routers.switchTab(url,query);
this.$routers.back(delta);
this.$routers.preload(url,query);
```

## 关于plguin.tools.js

```json

	$formatTime -> 格式话日期（封装好以后才发现这玩意uview里面有了）
	$createGuid -> guid 和uview里面不同
	$chooseImages -> 选择图片 是一个异步方法
	$previewImages -> 预览图片 也是一个异步方法
```

直接使用
```js
console.log(this.$formatTime(date))
```

## 关于http.api.js

定义api接口

```js
const init = (params = {}) => vm.$u.get('/api/common/init',params);
```

使用

```js
this.$api.init().then(res => {
		console.log(res);
})
```

## http.interceptor.js

这个是uview里面的ajax请求框架的封装，主要是拦截器好评~~~

## 消息推送

> 消息推送这个功能还有一些需要去做的 你可能需要去看看 [Dcloud push](https://uniapp.dcloud.io/api/plugins/push)

使用：

```js

import MessagePush from '@/common/message.push.js';

// #ifdef APP-PLUS
			this.push = new MessagePush();
			const client = this.push.getClientInfo();
			console.log(client)
			this.push.createMessage('测试消息推送','测试消息推送','/static/Nr304OPr3m.png');
			this.push.clickMessage(res => {
				console.log(res);
				uni.showModal({
					content:JSON.stringify(res)
				})
			});
			// #endif

			// #ifdef H5
			this.show = true;
			// #endif
```

## 新增了扫码功能

```js
this.$scanQrCode()
				.then(res => {
				})
				.catch(err => {
				});
```

## 新增了开屏红包组件

```vue
	<redPacket :visible="visible" @close="close" money="30"></redPacket>
```


```js
data:()=>({
	visible:false
})


methods:{
	openRedPacket() {
		this.visible = true;
	},
	close() {
		this.visible = false;
	},
}
```

## 新增了icons组件

在components目录下面

## 新增几个常用格式转换管道方法

```js
FilterNullToEmpty - null转空字符串
FilterAmountFormat  - 金额格式化显示
FilterDateTimeFormat - 日期格式化显示
FilterMoneyFormat - 数字格式化显示
FilterTextMaxLength - 字符串过长截断
FilterWanFormat - 数字格式化显示,单位为万
FilterIdCard - 身份证隐藏
```
使用
```vue
<view>
	<text>申请日期：{{
                  propsInfo.createTime
                    | FilterDateTimeFormat("YYYY年MM月DD日 HH时mm分")
                }}</text>
</view>
```

