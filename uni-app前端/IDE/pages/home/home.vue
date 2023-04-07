<template>

	<view class="wrap">
		<u-action-sheet :list="sheet_list" @click="sheet_click" v-model="sheet_show"></u-action-sheet>
		<u-row gutter="16" justify="space-between">
			<u-col span="5">
				<u-button class="demo-layout bg-purple" @click="back">返回</u-button>
			</u-col>
			<u-col span="7">
				<u-button class="demo-layout bg-purple-light" @click="sheet_open">{{btnadd}}</u-button>
			</u-col>
		</u-row>
			<u-modal v-model="modal_show":show-cancel-button="true" title="请输入文件(夹)名" @confirm="modal_confirm" @cancel="modal_cancel">
				<u-row justify="center">
					<u-col></u-col>
					<u-col>
						<u-dropdown>
							<u-dropdown-item v-model="listtext" title="listtext" :options="codelist"></u-dropdown-item>
						</u-dropdown>
						
					</u-col>
				</u-row>
				<u-row justify="center">
					
					<u-field
						v-model="addname"
						label="文件名"
						placeholder="请输入文件名"
					>
					</u-field>
				</u-row>
			</u-modal>
			<u-modal v-model="rename":show-cancel-button="true" title="请输入新文件名" @confirm="modal_confirm" @cancel="modal_cancel">
				
				<u-row justify="center">
					<u-field
						v-model="addname"
						label="文件名"
						placeholder="请输入文件名"
					>
					</u-field>
				</u-row>
			</u-modal>
			<u-swipe-action :show="item.show" :index="index" 
						v-for="(item, index) in list" :key="item.pos" 
						@click="swipe_click" @open="swipe_open"
						:options="options"
					>
						<view class="item u-border-bottom" @click="linkto(list[index].isfile,list[index].data)" >
							<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
							<view class="title-wrap">
								<text class="title u-line-2">{{ item.data }}</text>
							</view>
						</view>
			</u-swipe-action>
		
	</view>
</template>

<style scoped lang="scss">
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
	function getlist(s:string):Array<swipestr>{//更新目录表
			 	var list:Array<swipestr> = new Array<swipestr>(0);
			 	globaldata.data.fileempty = new emptyqueue(10);
			 	var len = 0;
			 	var l:Array<string> = s.split("\n");
			 	console.log(l,"yes");
			 	for(var i:number = 0;i<l.length-1;i++){
			 		list.push(new swipestr(l[i],globaldata.data.fileempty.dequeue(),l[i].indexOf(".cpp")>-1?true:false));
			 	}
				return list;
	};
	async function request(req:string,name:string,isfile:boolean):Promise<string>{
			return await new Promise((resolve, reject) =>{
				 uni.request({
				 	url: 'http://www.cloudcd.top:8080/getfile',
				 	data: {
				 		request:req,
				 		user:main.data.user,
				 		name:name,
				 		isfile:isfile
				 	},
				 	method: 'POST',
				 	header: {
				 		'custom-type': 'application/json'
				 	},
				 	success: (res) => {
				 		resolve(res.data);
				 	},fail:(res) => {
				 		reject(true);
				 	}
				 });
			}).catch((e)=>{});
	}
	 export default {
				OnReady(){
					//globaldata1.data.list = new list();
				},
				async onShow(){
					let s = await request("get","",false);
					console.log(main.data.user.key,this.user.password,this.user.root,this.user.src)
					this.list = getlist(s);
				},
				Onload(){
				},
				data() {
					return {
						listtext:1,
						listshow:false,
						codelist: [
							{
								value: 1,
								label: '江'
							},
							{
								value: 2,
								label: '湖'
							}
						],
						user:main.data.user,
						show:false,
						addtype:false,
						addname:'',
						btnadd:"add",
						list: new Array<swipestr>(0),
						disabled:false,
						options: [
							
							{
								text: '重命名',
								style: {
									backgroundColor: '#87CEFA'
								}
							},
							{
								text: '删除',
								style: {
									backgroundColor: '#dd524d'
								}
							}
						],
						sheet_list: [ {
							text: '新建文件夹'
						}, {
							text: '新建文件' 
						}],
						sheet_show:false,
						modal_show:false,
						rename:false
					};
				},
				methods: {
					async linkto(isfile,name) {	
						if(isfile){
							globaldata.data.name = name;
							uni.switchTab({
							    url: '/pages/edit/edit'
							});
						}else{
							this.user.src+=name+"/";
							//console.log(this.user.src,"yes");
							let s = await request("get","",false);
							this.list = await getlist(s);
						}
					},
					modal_cancel(){
						this.addname = "";
					},
					async modal_confirm(){
						//addtype为真是文件夹
						this.addname = this.addtype?this.addname+".cpp":this.addname;
						var len = globaldata.data.list.push(this.addname,this.addtype);
						//this.list.push(new swipestr(this.addname,len,this.addtype));
						//console.log(this.addname,this.addtype);
						await request("add",this.addname,this.addtype);
						let s = await request("get","",false);
						this.list = await getlist(s);
					},
					sheet_click(index){
						this.addtype = index?true:false;
						this.modal_show = true;
					},
					async back(){
						//console.log(this.user.src,this.user.root,"yse",this.user.src==(this.user.root));
						console.log(main.data.user.key,this.user.root);
						return;
						this.user.src = await request("back","",false);
						let s:string = await request("get","",false);
						console.log(typeof(s));
						this.list = await getlist(s);
						//console.log(this.list);
					},
					sheet_open(){
						this.addname = "";
						this.sheet_show = true;
						
						// if(index)
						// 	this.list.push(1);
						// else
						// 	this.name  =  "13243";
					},
					swipe_open(index){
						this.list[index].show = true;
						this.list.map((val, idx) => {
							if(index != idx) this.list[idx].show = false;
						})
					},
					async swipe_click(index,index1){
						
						if(index1){
							var name:string = this.list[index].data;
							this.list.splice(index, 1);
							this.$u.toast(`删除了${name}`);
							request("del",name,false);
						}else{
							this.rename = false;
						}
					},
					// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
					open(index) {
						// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
						// 原本为'false'，再次设置为'false'会无效
						this.list[index].show = true;
						this.list.map((val, idx) => {
							if(index != idx) this.list[idx].show = false;
						})
					}
				}
			};
</script>
