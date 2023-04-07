<template>
	<view class="wrap">
		<u-toast ref="error" />
		<u-toast ref="message" />
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="['border']">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120"
				:label-position="labelPosition" label="用户名" prop="name">
				<u-input :border="border" placeholder="请输入用户名" v-model="model.name" type="text"></u-input>
			</u-form-item>

			<u-form-item :label-position="labelPosition" label="密码" prop="password">
				<u-input :password-icon="true" :border="border" type="password" v-model="model.password"
					placeholder="请输入密码"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="确认密码" label-width="150" prop="rePassword">
				<u-input :border="border" type="password" v-model="model.rePassword" placeholder="请确认密码"></u-input>
			</u-form-item>
			<!-- 此处switch的slot为right，如果不填写slot名，也即<u-switch v-model="model.remember"></u-switch>，将会左对齐 -->

		</u-form>
		<u-button @click="submit">提交</u-button>

	</view>
</template>

<script lang="ts">
	
	import {
		User,
		Register
	} from '@/components/user.ts';
	import main from '@/App.vue';
	var tip: any;
	var register: Register = new Register();
	
	export default {
		data() {
			tip = this;
			return {
				model: {
					name: "",
					password: "",
					rePassword: ""
				},
				rules: {
					name: [{
							required: true,
							message: '请输入用户名',
							trigger: ['change', 'blur'],
						},
						{
							// 正则不能含有两边的引号
							pattern: /^[a-zA-Z_][0-9a-zA-Z_]{5,14}$/,
							message: '需同时含有字母和数字，长度在6-12之间',
							trigger: ['change', 'blur'],
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: ['change', 'blur'],
						},
						{
							// 正则不能含有两边的引号
							pattern: /^[a-zA-Z_][0-9a-zA-Z_]{5,14}$/,
							message: '需同时含有字母和数字，长度在6-12之间',
							trigger: ['change', 'blur'],
						}
					],
					rePassword: [{
							required: true,
							message: '请重新输入密码',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.model.password;
							},
							message: '两次输入的密码不相等',
							trigger: ['change', 'blur'],
						}
					],
				},
				border: true,
				labelPosition: 'top'
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			async submit() {
				 this.$refs.uForm.validate(valid => {
					if (valid) {
						reg();
					}else {
						if(register.check(this.model.name)!=false){
							showerror("用户名");
						}else if(register.check(this.model.password)!=false)
							showerror("密码");
						else{
							showerror("确认密码");
							clear();
							return ;
						}
						showmessage("错误");
						clear();
						return;
					}
				});
			}
		}
	};
	function clear():void{
		tip.model.name = "";
		tip.model.password = "";
		tip.model.rePassword = "";
	}
	function showerror(data:string) {//-1 用户名格式不正确 -2 密码不正确 -3确认密码与密码不一致 0 已存在用户名 1注册成功
		if(data=="确认密码"){
			data+="与密码不一致"
		}else{
			data +="格式错误";
		}
		tip.$refs.error.show({
			title: data,
			type: 'error',
			icon:true
			//url: '/pages/register/register'
		})
		
	};
	function showmessage(data:string):Boolean {//-1 用户名格式不正确 -2 密码不正确 -3确认密码与密码不一致 0 已存在用户名 1注册成功
		var url:string =  "/pages/register/register";
		var type:string  = "";
		if(data=="成功"){
			data = "注册成功";
			url = "/pages/login/login";
			type = "success";
		}else if(data!="用户名已存在"){
			data = "请输入以字母或者下划线开头 \n6~15位由数字或者字母组成的字符串";
			type = "warning";
		}else
			type = "error";
		tip.$refs.message.show({
			title: data,
			type: type,
			icon:true,
			url: url,
			position:"bottom",
			duration: 3000
 		});
		return true;
	};
	async function reg():void{
		if(await register.register(tip.model.name,tip.model.password))
		{
			showmessage("成功");
		}
		else{
			showmessage("用户名已存在");
			//clear();
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		padding: 30rpx;
	}

	.agreement {
		display: flex;
		align-items: center;
		margin: 40rpx 0;

		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}
	}
</style>
