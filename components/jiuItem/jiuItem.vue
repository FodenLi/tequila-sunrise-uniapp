<template>
	<view class="uni-list">
		<!-- 列表头部部分 -->
		<view class="header">
			<view>
				<text class="title">
					<slot name="tit">tit插槽内容</slot>
				</text>
				<text class="more" @click="toNav">更多 >></text>
			</view>
			<!-- 展示图片 -->
			<image src="../../static/other/honggg.jpg" class="img" @click="toNav"></image>
		</view>
		
		<!-- 列表项部分 -->
		<view class="container">
			<ul>
				<li v-for="(item,index) in jiu" :key="index" @click="navTo(item.commodity_id)">
					<image :src="baseUrl+item.picture_url" mode=""></image>
					<text>{{item.commodity_name}}</text>
					<view class="li-Botm">
						<text>￥{{item.commodity_price}}</text>
						<image src="../../static/other/jiagou.png" class="img"></image>
					</view>
				</li>
			</ul>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"jiuItem",
		props:["id"],
		data() {
			return {
				// 酒精
				jiu:[],
				// 酒精图片的路径前缀
				baseUrl:"https://dianjiu.oss-cn-beijing.aliyuncs.com",
			};
		},
		created() {
			// console.log(this.id)
			uni.request({
				url: 'http://118.190.158.17:8006/AopAndMyBatis2/wxview/getWineClassify?id='+this.id, //仅为示例，并非真实接口地址。
				success: (res) => {
					// 然后再倒放数组
					this.jiu=res.data.reverse().slice(0,4)
					console.log(res.data)
					
				}
			});
		},
		methods:{
			// 导航栏跳转
			navTo(id){
				uni.navigateTo({
					url: `../../components/Detail/Detail?id=${id}`
				});
			},
			toNav(){
				//在起始页面跳转到test.vue页面并传递参数
				uni.navigateTo({
					url: '../../components/tabNav/tabNav?id='+this.id
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-list{
		width: 100%;
		overflow: hidden;
		.header{
			padding: 0px 20rpx;
			border-top: 10rpx solid lightgray;
			border-bottom: 10rpx solid lightgray;
			view{
				width: 100%;
				height: 70rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				background-color: white;
				.title{
					height: 40rpx;
					line-height: 40rpx;
					padding-left: 10rpx;
					
					border-left:4px solid orangered;
				}
			}
			image{
				width: 100%;
				height: 250rpx;
				border-radius: 10rpx;
				
			}
		}
		
		.container{
			width: 100%;
			height: 1000rpx;
			padding: 20rpx;
			box-sizing: border-box;
			border: 1px solid gray;
			ul{
				width: 100%;
				height: 100%;
				padding: 0;
				display: flex;
				flex-wrap: wrap;
				li{
					width: 50%;
					height: 50%;
					list-style: none;
					image{
						width: 90%;
						height: 350rpx;
						margin: 0 auto;
					}
					&>text{
						display: block;
						width: 100%;
						height: 17px;
						font-weight: bold;
						line-height: 17px;
						font-size:14px
					}
					.li-Botm{
						width: 100%;
						color: orangered;
						font-size: 18px;
						padding-right: 20rpx;
						box-sizing: border-box;
						text{
							font-size: 18px;
						}
						image{
							width: 50rpx;
							height: 50rpx;
							float: right;
						}
					}
				}
			}
		}
	}
</style>