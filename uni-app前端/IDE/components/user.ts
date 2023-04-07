
	export  class User{
		public key:boolean;
		public request:boolean;
		public username:string;//5~10位
		public password:string;//5~10位
		public root:string;
		public src:string//username+space用户src
		constructor(){
			this.clear();
		}
		public deepcopy(object:User):void{
			this.key = object.key;
			this.request = object.request;
			this.username = object.username;
			this.password = object.password;
			this.root = object.root;
			this.src = object.src;
			
		}
		getsrc(data:string):void{
			var src:string = "/home/ide/space/";
			for(var i:number=0;i<data.length;i+=4)
				src+=(data.substring(i,i+4)+"/");
				//console.log(src);
			this.root = src;
			this.src = this.root+"space/";
			this.key = "/home/ide/key/";
			console.log(this.key);
		}
		public clear():void{
			this.src = "";
			this.password = "";
			this.username = "";
			this.root = "";
			this.key = "";
		}
		public check(data:string):any{
			if(/^[a-zA-Z_][0-9a-zA-Z_]{5,14}$/.test(data))
				return false;
			return "请输入以字母或者下划线开头 6~15位由数字或者字母组成的字符串"
		}
		public async login():Promise<Boolean>{
			if(this.check(this.username)!=false||this.check(this.password)!=false){
				return "none";
			}
			this.getsrc(this.username);
			console.log(this.key);
			return await new Promise((resolve, reject) =>{
				 uni.request({
				 	url: 'http://www.cloudcd.top:8080/login',
				 	data: {
				 	    user:this,
				 	},
				 	method: 'POST',
				 	header: {
				 		'custom-type': 'application/json'
				 	},
				 	success: (res) => {
						if(res.data == "True")
							this.key = this.root+this.password+"/";
						console.log(this.key,"login");
				 		resolve(res.data=="True");
				 	},fail:(res) => {
						console.log("a");
				 		reject(true);
				 	}
				 });
			}).catch((e)=>{});
		}
	}
	export class Register extends User{
		public repassword:string;
		constructor(){
			 this.clear();
		 }
		 
		public clear(){
			super.clear();
			this.repassword = "";
		} 
		
		public async userexist():Promise<Boolean>{
			
			this.getsrc(this.username);
			return new Promise((resolve, reject) =>{
				 uni.request({
					url: 'http://www.cloudcd.top:8080/register',
					data: {
						user:this
					},
					method: 'POST',
					header: {
						'custom-type': 'application/json'
					},
					success: (res) => {
						console.log("Register",res.data);
						resolve(res.data=="True");
					},fail:(res) => {
						reject(true);
					}
				});
			}).catch((e)=>{});
		}
		public async register(username:string,Password:string):Promise<Boolean>{
			this.username = username;
			this.password = Password;
			return await this.userexist()!=true;
		}
	}