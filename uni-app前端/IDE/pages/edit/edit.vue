<template>
	<view class="content">
		<u-row gutter="16" justify="space-between">
			<u-col span="2">
				<u-button class="demo-layout bg-purple" @click="back">返回</u-button>
			</u-col>
			<u-col span="2">
				<u-button class="demo-layout bg-purple-light" @click="complier">{{btncomplier}}</u-button>
			</u-col>
			<u-col span="3">
				<u-button class="demo-layout bg-purple-light" @click="debug">报错</u-button>
			</u-col>
			<u-col span="3">
				<u-button class="demo-layout bg-purple-light" @click="console">控制台</u-button>
			</u-col>
		</u-row>
		<view class ="content">
		<u-swipe-action :show="item.show" :index="index"
					v-for="(item, index) in list" :key="item.id" 
					@click="swipe_click" @open="swipe_open"
					:options="options"
				>
					<view class="item u-border-bottom"  >
						<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
						<view class="title-wrap">
							
							<u-col span = "9">
							<u-input v-model="item.data"></u-input>
							</u-col>
						</view>
					</view>
		</u-swipe-action>
		</view>
		<!-- 底部聊天输入框 -->
		<view class="input-box" :class="{ 'input-box-mpInputMargin': mpInputMargin }">
			<u-input/>
			<view class="input-box-flex">
				<view class="input-box-flex-grow"> 
					<input
						class="content"
						id="input"
						v-model="name"
						:hold-keyboard="true"
						:confirm-type="'send'"
						:confirm-hold="true"
						placeholder-style="color:#DDDDDD;"
						:cursor-spacing="10"
					/>
				</view>
				
				<!-- 功能性按钮 -->
				<u-button class="btn" type="primary" @click="send" size="mini" >切换</u-button> 
				<u-button class="btn" type="primary" @click="send" size="mini" >发送</u-button>
				
			</view>
			
			

		</view>
		
	</view>
</template>

<script lang = "ts">
	import main from '@/App.vue';
	import globaldata from '@/components/global data/global data.vue';
	import {swipestr,file,emptyqueue,codelist} from '@/components/struct.vue';
	function getcodelist(list:Array<codelist>):string{
			var len = list.length;
			var s:string="";
			for(var i:number=0;i<len;i++){
				s=(s+list[i].data+"\n");
			}
			return s;
		};
export default {
	
	data() {
		return {
			pos:0,
			emptylist:new emptyqueue(50),
			list:new Array<codelist>(0),
			filename:"",
			btncomplier:"run",
			name:"",
			fromUserInfo: {},
			formData: {
				content: '',
				limit: 15,
				index: 1
			},
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			],
			filename:"",
			messageList: [],
			loading: true, //标识是否正在获取数据
			imgHeight: '1000px',
			mpInputMargin: false, //适配微信小程序 底部输入框高度被顶起的问题
			Recorder: uni.getRecorderManager(),
			isStopVoice: false, //加锁 防止点击过快引起的当录音正在准备(还没有开始录音)的时候,却调用了stop方法但并不能阻止录音的问题
			voiceInterval:null,
			showFunBtn:false, //是否展示功能型按钮
			funList: [
				{ icon:"photo-fill",title:"照片",uploadType:["album"] },
				{ icon:"camera-fill",title:"拍摄",uploadType:["camera"] },
			],
		};
	},
	methods: {
		//拼接消息 处理滚动
		
		//处理滚动
		complier(){
			uni.request({
				url: 'http://www.cloudcd.top:8080/complier',
				data: {
					request:"complier",
					user:main.data.user,
				    src: "/home/ide/cloudann/data/"+main.data.src,
					filename:this.filename+"1.cpp",
					code:getcodelist(this.list)
				},
				method: 'POST',
				header: {
					'custom-type': 'application/json'
				},
				success: (res) => {
					console.log(res.data);
					globaldata.data.default = res.data.split("\n");
					console.log(globaldata.data.default);
				}
			})
		},
			back(){
				uni.switchTab({
				    url: '/pages/home/home'
				});
			},
		
		debug(){
			uni.switchTab({
			    url: '/pages/debug/debug'
			});
		},
		console(){
			uni.switchTab({
			    url: '/pages/console/console'
			});
		},
		swipe_open(index){
			this.list[index].show = true;
			this.list.map((val, idx) => {
				if(index != idx) this.list[idx].show = false;
			})
		},
		swipe_click(index,index1){
			var name:string = this.list[index].data;
			this.list.splice(index, 1);
			this.$u.toast(`删除了${name}`);
		},
		send(){
			console.log(this.pos);
				this.list.splice(this.pos++,0,new codelist(this.name,this.emptylist.dequeue()));
			this.name = "";
		},
		switchFun(){
			this.chatType = 'keyboard'
		},
		//用户触摸屏幕的时候隐藏键盘
		touchstart() {
			uni.hideKeyboard();
		},
		// userid 用户id
		linkToBusinessCard(userId) {
			this.$u.route({
				url: 'pages/businessCard/businessCard',
				params: {
					userId
				}
			});
		}

	},
	onPageScroll(e) {
		if (e.scrollTop < 50) {
			this.joinData();
		}
	},
	onNavigationBarButtonTap({ index }) {
		if (index == 0) {
			//用户详情 设置
		} else if (index == 1) {
			//返回按钮
			this.$u.route({
				type: 'switchTab',
				url: 'pages/home/home'
			});
		}
	},
	//返回按钮事件
	onBackPress(e) {
		//以下内容对h5不生效
		//--所以如果用浏览器自带的返回按钮进行返回的时候页面不会重定向 正在寻找合适的解决方案
		this.$u.route({
			type: 'switchTab',
			url: 'pages/home/home'
		});
		return true;
	},
	onLoad() {
		// { messageId,fromUserName,fromUserHeadImg } = info
		


	},
	onReady() {
		//自定义返回按钮 因为原生的返回按钮不可阻止默认事件
		
		uni.getSystemInfo({
			success: res => {
				this.imgHeight = res.windowHeight + 'px';
			}
		});
		
		uni.onKeyboardHeightChange(res => {
			if (res.height == 0) {
				// #ifdef MP-WEIXIN
				this.mpInputMargin = false;
				// #endif
			}else{
				this.showFunBtn = false;
			}
		});
	}
};
</script>

<style lang="scss" scoped>
 page {
 	background-color: #f3f3f3;
 }
 
 .content {
	 
	 		.item {
	 			display: flex;
	 			padding: 20rpx;
	 		}
	 		
	 		image {
	 			width: 0rpx;
	 			flex: 0 0 120rpx;
	 			height: 0rpx;
	 			margin-right: 0rpx;
	 			border-radius: 0rpx;
	 		}
	 		
	 		.title {
	 			text-align: left;
	 			font-size: 28rpx;
	 			color: $u-content-color;
	 			margin-top: 20rpx;
	 		}
	 	.wrap {
	 		padding: 24rpx;
	 	}
	 
	 	.u-row {
	 		margin: 40rpx 0;
	 	}
	 
	 	.demo-layout {
	 		height: 80rpx;
	 		border-radius: 8rpx;
	 	}
	 
	 	.bg-purple {
	 		background: #d3dce6;
	 	}
	 
	 	.bg-purple-light {
	 		background: #e5e9f2;
	 	}
	 
	 	.bg-purple-dark {
	 		background: #99a9bf;
	 	}
 	&-showfn{
 		padding-bottom: 0rpx;
 		padding-bottom: calc(420rpx + constant(safe-area-inset-bottom));
 		padding-bottom: calc(420rpx + env(safe-area-inset-bottom) );
 		/* #ifdef MP-WEIXIN */
 		/* #endif */
 	}
 	&-box {
 		width: 100%;
 		height: auto;
 		min-height: calc(100vh - env(safe-area-inset-top) - 200rpx);
 		box-sizing: content-box;
 		position: relative;
 		padding-bottom: 120rpx;
 		
 		/* #ifdef APP-PLUS  */
 		margin-bottom: 0rpx;
 		margin-bottom: constant(safe-area-inset-bottom);
 		margin-bottom: env(safe-area-inset-bottom);
 		/* #endif */
 		/* #ifdef MP-WEIXIN */
 		padding-bottom: 0rpx;
 		padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
 		padding-bottom: calc(120rpx + env(safe-area-inset-bottom) );
 		/* #endif */
 	
 		&-bg {
 			width: 100%;
 			position: fixed;
 			/* #ifdef MP-WEIXIN */
 			bottom: 0;
 			bottom: constant(safe-area-inset-bottom);
 			bottom: env(safe-area-inset-bottom);
 			/* #endif */
 			/* #ifndef MP-WEIXIN */
 			top: 0;
 			left: 0;
 			/* #endif */
 		}
 
 		&-loading {
 			text-align: center;
 			padding: 20rpx 0;
 		}
 
 		.message {
 			padding: 13rpx 20rpx;
 		}
 		
 		.message-item {
 			display: flex;
 			justify-content: flex-start;
 			align-items: flex-start;
 			align-content: flex-start;
 			flex-wrap: nowrap;
 			flex-direction: row;
 
 			.img {
 				width: 80rpx;
 				height: 80rpx;
 				border-radius: 5rpx;
 			}
 
 			.content {
 				padding: 20rpx;
 				max-width: 500rpx;
 				border-radius: 10rpx;
 				font-size: 28rpx;
 			}
 			
 			// 语音
 			.contentType2 {
 				display: flex;
 				flex-direction: row;
 				align-items: center;
 				.voice_icon {
 					height: 34rpx;
 					width: 34rpx; 
 					background-repeat: no-repeat;
 					background-size: 100%;
 				}
 				.voice_icon_right {
 					background-image: url(../../static/voice-left-3.png);
 					margin-left: 10rpx;
 				}
 				.voice_icon_left {
 					background-image: url(../../static/voice-right-3.png);
 					margin-right: 10rpx;
 				}
 				.voice_icon_right_an {
 					animation: voiceAn_right 1s linear alternate infinite;
 				}
 				.voice_icon_left_an {
 					animation: voiceAn_left 1s linear alternate infinite;
 				}
 				@keyframes voiceAn_right {
 					0% {
 						background-image: url(../../static/voice-left-1.png);
 					}
 					50% {
 						background-image: url(../../static/voice-left-2.png);
 					}
 					100% {
 						background-image: url(../../static/voice-left-3.png);
 					}
 				}
 				@keyframes voiceAn_left {
 					0% {
 						background-image: url(../../static/voice-right-1.png);
 					}
 					50% {
 						background-image: url(../../static/voice-right-2.png);
 					}
 					100% {
 						background-image: url(../../static/voice-right-3.png);
 					}
 				}
 			}
 			
 			//图片
 			.contentType3{
 				padding: 0;
 				border-radius: 2rpx;
 				background-color: transparent !important;
 				.img{
 					width: 200rpx;
 					height: auto;
 					max-width: 300rpx;
 					max-height: 400rpx;
 				}
 			}
 			.contentType3::after{
 				border: none !important;
 				display: none !important;
 			}
 			.content-type-right {
 				flex-direction: row-reverse;
 			}
 
 			&.right {
 				flex-direction: row-reverse;
 
 				.content {
 					background-color: $uni-color-success;
 					margin-right: 28rpx;
 					word-break: break-all;
 					line-height: 36rpx;
 					position: relative;
 
 					&::after {
 						content: '';
 						display: block;
 						width: 0;
 						height: 0;
 						border-top: 10rpx solid transparent;
 						border-bottom: 10rpx solid transparent;
 						border-left: 16rpx solid $uni-color-success;
 						position: absolute;
 						right: -16rpx;
 						top: 30rpx;
 					}
 				}
 			}
 
 			&.left {
 				.content {
 					background-color: $uni-text-color-inverse;
 					margin-left: 28rpx;
 					word-break: break-all;
 					line-height: 36rpx;
 					position: relative;
 
 					&::after {
 						content: '';
 						display: block;
 						width: 0;
 						height: 0;
 						border-top: 10rpx solid transparent;
 						border-bottom: 10rpx solid transparent;
 						border-right: 16rpx solid $uni-text-color-inverse;
 						position: absolute;
 						left: -16rpx;
 						top: 30rpx;
 					}
 				}
 			}
 		}
 	}
 
 	.input-box {
 		position: fixed;
 		bottom: 0;
 		left: 00;
 		width: 100%;
 		box-sizing: content-box;
 		z-index: 999;
 		background-color: #eaeaea;
 		
 		/* #ifdef APP-PLUS */
 		margin-bottom: 0rpx;
 		margin-bottom: constant(safe-area-inset-bottom);
 		margin-bottom: env(safe-area-inset-bottom);
 		/* #endif */
 		/* #ifdef MP-WEIXIN */
 		padding-bottom: 0rpx;
 		padding-bottom: constant(safe-area-inset-bottom);
 		padding-bottom: env(safe-area-inset-bottom);
 		/* #endif */
 
 		&-flex {
 			display: flex;
 			justify-content: flex-start;
 			align-items: center;
 			flex-wrap: nowrap;
 			flex-direction: row;
 			padding: 20rpx;
 			box-sizing: border-box;
 			image{
 				width: 56rpx;
 				height: 56rpx;
 			}
 			.icon_img {
 				margin-right: 20rpx;
 			}
 			.icon_btn_add{
 				margin-left: 20rpx;
 			}
 			&-grow {
 				flex-grow: 1;
 
 				.content {
 					box-sizing: border-box;
 					background-color: #fff;
 					height: 80rpx;
 					padding: 0 20rpx;
 					border-radius: 12rpx;
 					font-size: 28rpx;
 					caret-color: $uni-color-success;
 				}
 
 				.voice_title {
 					text-align: center;
 					background-color: #ffffff;
 					height: 80rpx;
 					line-height: 80rpx;
 					border-radius: 12rpx;
 				}
 			}
 
 			.btn {
 				margin-left: 20rpx;
 				background-color: $u-type-success;
 				border: none;
 			}
 		}
 		
 		.fun-box{
 			opacity: 0;
 			transition: all 0.1s ease-in-out;
 			height: 0;
 			.grid-text{
 				padding-top: 10rpx;
 				color: $uni-text-color-grey;
 			}
 			
 		}
 		.show-fun-box{
 			opacity: 1;
 			height: 300rpx;
 		}
 	}
 
 	.input-box-mpInputMargin {
 		/* #ifdef MP-WEIXIN */
 		padding-bottom: 0rpx;
 		/* #endif */
 	}
 	.voice_an{
 		width: 300rpx;
 		height: 300rpx;
 		position: fixed;
 		top: 50%;
 		left: 50%;
 		transform: translate(-50%,-55%);
 		background-color: rgba(41,41,41,0.7);
 		color: white;
 		display: flex;
 		flex-direction: column;
 		align-items: center;
 		text-align: center;
 		border-radius: 10rpx;
 		.text{
 			padding-top: 30rpx;
 		}
 		@keyframes runVoice{
 			0%{
 				height: 10%;
 			}
 			20%{
 				height: 50%;
 			}
 			50%{
 				height: 100%;
 			}
 			80%{
 				height: 50%;
 			}
 			100%{
 				height: 0%;
 			}
 		}	
 		.wave{
 			width:6rpx;
 			height: 100%;
 			margin-left: 10rpx;
 			border-radius: 50rpx;
 			background-color: #999;
 			vertical-align: middle;
 			display: inline-block;
 		}
 		.voice_an_icon{
 			width: 200rpx;
 			height: 100rpx;
 			line-height: 50rpx;
 			margin: 50rpx 0;
 		}
 		.voice_an_icon #one{
 			animation:runVoice 0.6s infinite 0.1s;
 		}
 		.voice_an_icon #two{
 			animation:runVoice 0.6s infinite 0.3s;
 		}
 		.voice_an_icon #three{
 			animation:runVoice 0.6s infinite 0.6s;
 		}
 		.voice_an_icon #four{
 			animation:runVoice 0.6s infinite 0.1s;
 		}
 		.voice_an_icon #five{
 			animation:runVoice 0.6s infinite 0.3s;
 		}
 		.voice_an_icon #six{
 			animation:runVoice 0.6s infinite 0.6s;
 		}
 		.voice_an_icon #seven{
 			animation:runVoice 0.6s infinite 0.1s;
 		}
 	}
 }
</style>
