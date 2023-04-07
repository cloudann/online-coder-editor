<template>
	<view>

	</view>
</template>

<script lang="ts">
	class queue<T>{
	  protected len:number;
	  protected maxlen:number;
	  protected node:Array<T>;
	  protected head:number;
	  protected rear:number;
	  constructor(n:number){//初始化
	    this.head=this.rear=0;
	    this.maxlen = n;
	    this.node = new Array<T>(n);
	    this.len = 0;
	  }
	  expand():boolean{
	    var len = (this.maxlen<<1)+this.len;
	    if((len<<1)>0){//空间扩充
	      for(;this.maxlen<len;this.maxlen++)
	          this.node.push(this.node[0]);
	      return true;
	    }
	    return false;
	  }
	  //入队
	  enqueue(n:T):void{
	    if(this.len==this.maxlen?this.expand():true){
	      this.len++;
	      this.head %=this.maxlen;
	      this.node[this.head++] = n;
	    }
	  };
	  dequeue():T{
	    this.rear %=this.maxlen;
	    this.len--;
	    return this.node[this.rear++];
	  }
	  
	}
	export class emptyqueue extends queue<number>{
	  private pos:number;
	  public constructor(n:number){
		 this.pos = 0;
	    super(n);
	  }
	  public dequeue():number{
	    if(this.pos==this.maxlen&&this.len==0)
	      super.expand()
		else if(this.pos <this.maxlen)
			return this.pos++;
		else
			return super.dequeue();
	  }
	}
	export class  list<T>{//循环列表
	  public len:number;
	  public maxlen:number;
	  public data:Array<T>;
	  protected head:number;
	  protected emptylist:emptyqueue;
	  protected next:Array<number>;
	  protected pre:Array<number>;
	
	  constructor(n:number){
	    this.data = new Array<T>(n+1); 
	    this.pre = new Array<number>(n+1);
	    this.next = new Array<number>(n+1);//0为head n+1为rear
	    this.emptylist = new emptyqueue(n+1);
	    this.len = this.head = 0;
	    this.maxlen  = n;
	    this.next[0] = 0;
	    this.pre[0] = 0;
	  }
	  getaddress(pos:number):number{//获取i点位置
	    var mid = (this.len>>1);
	    var target = 0;
	    if(mid>pos){//从前找
	      for(var i=0;i<pos;i++){
	        target = this.next[target];
	      }
	    }else{
	      pos = this.len-pos;
	      for(var i =0;i<pos;i++)//找到节点前一个位置
	        target = this.pre[target];
	      }
	    return target;
	  }
	  del(pos:number):void{
	    pos = this.getaddress(pos);//指向待删除的前一个节点
	    this.emptylist.enqueue(this.next[pos]);
	    this.len--;
	    var next:number = this.next[pos];//q = p-next;
	    this.next[pos] = this.next[next];//p->next = q->next
	    this.pre[this.next[next]] = pos;//q->next->pre
	  }
	  expand():boolean{
	    var len = (this.maxlen<<1)+this.len;
	    if((len<<1)>0){//空间扩充
	      for(;this.maxlen<len;this.maxlen++){
	          this.data.push(this.data[0]);
	          this.next.push(0);
	          this.pre.push(0);
	      }
	      return true;
	    }
	    return false;
	  }
	  
	  insert(pos:number,data:T):void{
	    if(this.len==this.maxlen?this.expand():true){
	      pos = this.getaddress(pos);
	      var address = this.emptylist.dequeue();
	      this.data[address] = data;
	      this.next[address] = this.next[pos];//p->next = head->next;
	      this.pre[address] = pos;//p->pre = head
	      this.next[pos] = address;//head->next = p
	      this.pre[this.next[address]] = address;//p->next->pre = p
	      this.len++;
	    }
	  }
	}
	export class file extends list<string>{
		public state:Array<boolean>
		insert(pos:number,data:string,state:boolean):number{
			if(data.length==0)
				return 0;
		  if(this.len==this.maxlen?this.expand():true){
		    pos = this.getaddress(pos);
		    var address = this.emptylist.dequeue();
			this.state[address] = state;
		    this.data[address] = data;
		    this.next[address] = this.next[pos];//p->next = head->next;
		    this.pre[address] = pos;//p->pre = head
		    this.next[pos] = address;//head->next = p
		    this.pre[this.next[address]] = address;//p->next->pre = p
		    this.len++;
			return address;
		  }
		}
		push(data:string,state:boolean):number{
			return this.insert(this.len,data,state);
		}
		public constructor(n:number){
		  super(n);
		  this.state = new Array<boolean> (n+1);
		}
		expand():boolean{
		  var len = (this.maxlen<<1)+this.len;
		  if((len<<1)>0){//空间扩充
		    for(;this.maxlen<len;this.maxlen++){
		        this.data.push(this.data[0]);
		        this.next.push(0);
		        this.pre.push(0);
				this.state.push(0);
		    }
		    return true;
		  }
		  return false;
		}
		print():Array<swipestr>{
			var result:Array<swipestr> = new Array<swipestr>(0);
			var head = 0;
			for(var i:number=0;i<this.len;i++){
				head = this.next[head];
				result.push(new swipestr(this.data[head],head,this.state[head]));
			}
			return result;
		}
	}
	export class codelist{
		public data:string
		public id:number
		public constructor(data:string,id:number){
			this.id =id;
			this.data = data;
		}
	}
	export class swipestr{
		public data:string
		public pos:number
		public show:boolean
		public isfile:boolean
		public constructor(data:string,pos:number,isfile:boolean){
			this.data = data;
			this.pos = pos;
			this.show = false;
			this.isfile = isfile;
		}
	}
	export default{
		data:{
		}
	}
</script>

<style>

</style>
