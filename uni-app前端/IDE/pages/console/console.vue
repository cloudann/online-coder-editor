<template height="100%">
	<view>
	<view><u-row><u-button @click="send">send</u-button></u-row></view>
	<view  style="flex: auto;height:50%">
		<u-field
			:disabled="true"
			type="textarea"
			label="output"
			:border-bottom="true"
			:border-top="true"
			:clearable="true"
			:auto-heigt="true"
			:fixed="true"
			v-model="output"
		>
		</u-field>
	</view>
	<view>
		<u-field
			type="textarea"
			:border-bottom="true"
			label="input"
			:border-top="true"
			:clearable="true"
			:auto-heigt="true"
			:fixed="true"
			v-model="input"
		>
		</u-field>
		
	</view>
		
	</view>
</template>

<style scoped lang="scss">
	page{
			height: 100%!important;
		}
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
</style>
<script lang="ts">
	import main from '@/App.vue';
	import globaldata from '@/components/global data/global data.vue';
	import {swipestr,file,emptyqueue} from '@/components/struct.vue';
	

	
	export default {
				onReady(){
					//globaldata.data.list = new list();
				},
				onShow(){
					//this.list= globaldata.data.list.print();
				},
				data() {
					return {
						show:false,
						input:"",
						output:""
					};
				},
				methods: {
					linkto(isfile) {
						
						if(isfile){
							uni.switchTab({
							    url: '/pages/edit/edit'
							});
						
						}
					},
					send(){
						uni.request({
							url: 'http://www.cloudcd.top:8080/complier',
							data: {
								request:"run",
								user:main.data.user,
							    src: "/home/ide/cloudann/data/"+main.data.src,
								filename:this.filename+"1.cpp",
								in:this.input
							},
							method: 'POST',
							header: {
								'custom-type': 'application/json'
							},
							success: (res) => {
								this.output = res.data;
							}
						})
					}

				}
			};
</script>
