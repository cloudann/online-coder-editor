<script >
	import {User} from '@/components/user.ts';
	
	
export default{
	onLaunch: function() {
	},
	onShow: function() {

	},
	onHide: function() {
	},
	data:{
			user: new User(),
			src:"/project/ide/"
		
	},
	methods: {

	}
};
</script>
<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';
</style>
