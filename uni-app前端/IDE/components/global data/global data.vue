<template>
	<view>

	</view>
</template>

<script lang="ts">
	import {file,emptyqueue} from '@/components/struct.vue';
	
	export default{
		data:{
			name:"",
			list:new file(10),
			fileempty:new emptyqueue(10),
			default:new Array<string>(0)
		}
	}
</script>

<style>

</style>
