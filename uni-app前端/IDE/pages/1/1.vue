<template>
	<view>
		<u-button @click="back">back</u-button>
		<u-button @click="add">报错</u-button>
		<u-button @click="add">控制台</u-button>
	</view>
	
</template>



<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			back(){
				uni.switchTab({
				    url: '/pages/home/home'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	image {
		width: 100vw;
		height: 100vh;
	}
</style>
