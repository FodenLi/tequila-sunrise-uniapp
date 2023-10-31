<template>
	<view>
		<view class="top">
			<view class="top_left">
				<icon type="search"></icon>				
				<input type="text" placeholder="亲输入关键字">
			</view>
			<view class="top_right">搜索</view>
		</view>
		
		<view class="nav">
			<view class="item" :class="navIndex==index ? 'active' :''" v-for="(item,index) in navArr" :key="item.id" @click="clickNav(index)">
				<!-- {{item.title}} -->
				<view v-if="item.id===3">
					<view class="xiaoliang">
						{{item.title}}
						<view class="pic_nav">
							<image class="pic" :src="sheng" mode=""></image>
							<image class="pic" :src="jiang" mode=""></image>
						</view>
					</view>									
				</view>
				<view v-else>{{item.title}}</view>
			</view>
		</view>
		
		<view class="content" v-for="(item,index) in contents" :key="item.index">
			<image :src="baseUrl+item.picture_url" mode=""></image>
			<view class="mid">
				<view class="name">
					{{item.commodity_name}}
				</view>				
				<view class="price">
					<view class="price_left">￥{{item.commodity_price}}</view>
					<view class="price_right">销量 {{item.commodity_sales}}</view>
				</view>
			</view>		
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navArr:[
					{id:0,title:'综合'},
					{id:1,title:'销量'},
					{id:2,title:'新品'},
					{id:3,title:'价格'}
					],
					navIndex:0,
					contents:[],
					baseUrl:"https://dianjiu.oss-cn-beijing.aliyuncs.com",
					pageId:0,
					sheng:"../../static/other/sheng2.png",
					jiang:"../../static/other/jiang2.png",
					issheng:true
			}
		},
		methods: {
			clickNav(e){
				this.navIndex=e;
				let that=this;	
				if(e==0||e==2){
					that.sheng="../../static/other/sheng2.png";
					that.jiang="../../static/other/jiang2.png";
					that.issheng=true;
					uni.request({
				    url: 'http://118.190.158.17:8006/AopAndMyBatis2/wxview/getWineClassify?id='+that.pageId,
				    success: (res) => {		        
						that.contents=res.data;	
				    },
					fail:(err)=>{
						console.log(err);
					}
				});
				}
				else if(e==1){
					that.sheng="../../static/other/sheng2.png";
					that.jiang="../../static/other/jiang2.png";
					that.issheng=true;
					uni.request({
					    url: 'http://118.190.158.17:8006/AopAndMyBatis2/wxview/getSalesClassify?id='+that.pageId,
					    success: (res) => {		        
							that.contents=res.data;	
					    },
						fail:(err)=>{
							console.log(err);
						}
					});
				}
				else{
					if(that.issheng){
						that.issheng=false;
						that.sheng="../../static/other/sheng1.png";
						that.jiang="../../static/other/jiang2.png";
						uni.request({
					    url: 'http://118.190.158.17:8006/AopAndMyBatis2/wxview/getDescClassify?id='+that.pageId,
					    success: (res) => {		        
							that.contents=res.data;
					    },
						fail:(err)=>{
							console.log(err);
						}
					});
					}else{
						that.issheng=true;
						that.sheng="../../static/other/sheng2.png";
						that.jiang="../../static/other/jiang1.png";
							uni.request({
						    url: 'http://118.190.158.17:8006/AopAndMyBatis2/wxview/getAscClassify?id='+that.pageId,
						    success: (res) => {		        
								that.contents=res.data;
						    },
							fail:(err)=>{
								console.log(err);
							}
						});
					}
					
				}
				
			}
		},
		onLoad(option){
			console.log("我是首页传过来的"+option.id);
			this.pageId=option.id;
			let that=this;
			//发起网络请求
			uni.request({
			    url: "http://118.190.158.17:8006/AopAndMyBatis2/wxview/getWineClassify?id="+this.pageId, 
			    success: (res) => {		        
					that.contents=res.data;	
					// console.log(that.contents);
			    },
				fail:(err)=>{
					console.log(err);
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	.top{
		width: 750rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 10rpx;
	
		.top_left{
			display: flex;
			align-items: center;
			width: 600rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 5rpx;
			border: 2rpx solid lightgrey;
			background-color: lightgrey;
			icon{
				width: 60rpx;
				height: 60rpx;
				margin-left:15rpx  ;
				margin-top:10rpx  ;
			}
		}
		.top_right{
			width: 100rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			border-radius: 5rpx;
			border: 2rpx solid lightgrey;
		}
	}
	
	.nav{
		display: flex;
		justify-content: space-around;
		align-items: center;
		line-height: 90rpx;
		.item{
			&.active{
			color: red;
			}
			
		}	
	}
	.xiaoliang{
		display: flex;
		.pic_nav{
		    display: flex;
		    flex-direction:column;
			justify-content: center;
		.pic{
		    width: 30rpx;
		    height: 30rpx;
		}
	}
	}
	
	
	.content{
		margin: 10rpx auto;
		height: 200rpx;
		display: flex;
		justify-content: space-around;	
		border-bottom: 6rpx solid gainsboro;
		image{
			width: 200rpx;
			height: 200rpx;		
		}
		.mid{
			display: flex;
			flex-direction:column;
			justify-content: space-between;
			width: 450rpx;
			.name{
				font-size: 25rpx;
				line-height: 60rpx;
			}
			.price{
				display: flex;
				justify-content: space-between;
				
				.price_left{
					color: red;
					line-height: 60rpx;
				}
				.price_right{
					line-height: 60rpx;
				}
			}
		}
	}
</style>
