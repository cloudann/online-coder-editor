<template>
	<view class="wrap">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录在线编译器</view>
			<u-form  >
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120"
					label="姓名" prop="name">
					<u-input  placeholder="请输入姓名" v-model="user.username" type="text"></u-input>
				</u-form-item>
				<u-form-item label="密码" prop="password">
					<u-input :password-icon="true"  type="password" v-model="user.password"
						placeholder="请输入密码"></u-input>
				</u-form-item>
				<!-- 此处switch的slot为right，如果不填写slot名，也即<u-switch v-model="model.remember"></u-switch>，将会左对齐 -->
			</u-form>
			<u-button class="getCaptcha" @click="login">登录</u-button>
			<view class="alternative">
				<u-row>
					<u-col span="7">
						<u-button @click="register">注册</u-button>
					</u-col>
					<u-col span="5">

					</u-col>
					<u-col span="7">
						<u-button @click="reset">重置</u-button>
					</u-col>
				</u-row>
			</view>
		</view>

	</view>
	</view>
</template>

<script lang="ts">
	import {
		User
	} from '@/components/user.ts';
	import main from '@/App.vue';
	var tip: any;
	export default {
		onReady() {
			tip = this;
		},
		data() {
			return {
				user: main.data.user,
				errorname: false,
				errorpwd: false
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				return style;
			}
		},
		methods: {
			check(data: string, label) {
				(label == 1 ? this.errorname = this.user.check(data) : this.errorpwd = this.user.check(data));
			},
			reset() {
				this.user.clear();
				//this.user.clear()
			},
			async login() {
				//switchto("pages/home/home");	
				
				let flag = await this.user.login();
				
				
				if (flag == false) {
					showtip("用户不存在或密码错误", "error");
				} else if (flag == true) {
					
					main.data.user.deepcopy(this.user);
					showtip("登录成功", "success");
					switchtotabar("/pages/home/home")
				} else {
					showtip("用户名或密码格式不正确", "warning");
				}
				//this.user.clear()
			},
			register() {
				switchtopage("/pages/register/register");
				//this.user.clear()
			}
		}
	};

	function switchtopage(src: string): void {
		uni.navigateTo({
			url: src
		});
	}

	function switchtotabar(src: string): void {
		 setTimeout(function() {
		         tip.$u.route({
		         	type: 'switchTab',
		         	url: src
		         });
	     }, 1000);
		
	}

	async function showtip(title: string, type: string): void {
		tip.$refs.uTips.show({
			title: title,
			type: type,
			duration: 3000
		});
	}
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 22rpx;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 200rpx;

				u-button {
					padding: 350rpx 150rpx 150rpx 150rpx;
				}
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
