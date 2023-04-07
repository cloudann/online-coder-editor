<template>
	
	<view class="wrap">

			<view flex-direction="columm">
			<u-cell-group :show="item.show" :index="index" 
						v-for="(item, index) in list"  
					>
					<u-cell-item :title=item :arrow="false"></u-cell-item>
			</u-cell-group>
			</view>
	</view>
</template>

<style scoped lang="scss">
		
</style>
<script lang="ts">
	import globaldata from '@/components/global data/global data.vue';
	
	console.log(globaldata.data.default)
	globaldata.data.default.push("编译成功");
	export default {
				onReady(){
					//globaldata.data.list = new list();
				},
				onShow(){
					this.list= globaldata.data.default;
				},
				data() {
					return {
						list: globaldata.data.default
					}
				},
				methods: {
					
				}
			};
</script>
