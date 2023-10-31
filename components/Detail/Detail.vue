<template>
	<view class="detail">
		<!-- 轮播图部分 -->
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item,index) in imgArr" :key="index">
					<view class="swiper-item ">
						<!-- {{item}} -->
						<image :src="baseUrl + item.url" mode="scoleImg" style="width: 100%;height: 100%; "></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分享图片 -->
		<image src="../../static/other/share.png" mode="scoleImg"></image>
		<!-- 中间的内容展示 -->
		<view class="money">
			<text>价格: ￥{{item.commodity_price}}</text>
			<text>销量: {{item.commodity_sales}}件</text>
		</view>
		<!-- 配送 -->
		<view class="peisong">
			配送：
			<image src="../../static/other/dui2.png" mode="scoleImg"></image>
			同城配送
		</view>
		<!-- 图片 -->
		<view class="imgShow">
			<image src="../../static/other/shangbiao.png" mode="scoleImg"></image>
			<image src="../../static/other/weix.png" mode="scoleImg"></image>
			雅酢直供
			<image src="../../static/other/phone.png" mode="scoleImg"></image>
		</view>
		<!-- 进入店铺 -->
		<view class="goshop">
			<view class="shop">
				进入店铺
			</view>
		</view>
		<!-- 详情 -->
		<view class="shopDetail">
			<view class="shopD">
				图文详情
			</view>
			<view class="shopD">
				商品评价
			</view>
		</view>
		<!-- 当前页的图片展示 -->
		<view class="imgShow2">
			<image v-for="(item,index) in imgArr2" :key="index" :src="baseUrl + item.url" mode="" ></image>
		</view>
		<!-- 底部导航 -->
		<view class="bottomDiv">
			<image src="../../static/other/cart1.png" mode=""></image>
			<image src="../../static/other/mine.png" mode=""></image>
			<view class="green" @click="addList">加入购物车</view>
			<view class="red" @click="navTo">立即购买</view>
		</view>
	</view>
</template>

<script>

	export default {
		name:"Detail",
		data() {
			return {
				// 记录当前商品的id
				id:0,
				// 记录当前的商品
				item:{},
				// 轮播图数组
				imgArr: [],
				// 展示详情数组
				imgArr2:[],
				// 是否显示面板指示点
				indicatorDots: true,
				// 是否自动切换
				autoplay: true,
				// 自动切换时间间隔
				interval: 2000,
				// 滑动动画时长
				duration: 800,
				// 酒精图片的路径前缀
				baseUrl:"https://dianjiu.oss-cn-beijing.aliyuncs.com",
			}
		},
		methods:{
			// 向vuex仓库中添加东西
			addList(){
				this.$store.commit("addList",this.item)
				uni.showToast({
					title: '加购成功',
					//将值设置为 success 或者直接不用写icon这个参数
					icon: 'success',
					//显示持续时间为 2秒
					duration: 2000
				})
				console.log(this.$store.state.item)
			},
			// 导航栏跳转
			navTo(){
				// const obj = encodeURIComponent(JSON.stringify(this.item));
				// console.log(obj)
				// switchTab地址后不能携带参数
				uni.switchTab({
					url: '../../pages/shoplist/index'
				});
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			}
		},
		
		onLoad: function (option) { 
			// const obj = JSON.parse(decodeURIComponent(option.obj));
			//打印出上个页面传递的参数。
			this.id = option.id
			// console.log(option.id)
			uni.request({
				url: 'http://118.190.158.17:8006/AopAndMyBatis2/wxview/getOneWine?id='+this.id,
				success: (res) => {
					// 然后再倒放数组
					this.item =  res.data
					console.log(res.data)
					// 轮播图数组
					this.imgArr = res.data.imgDetail
					// 展示详情
					this.imgArr2 = res.data.slideDetail
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	.detail{
		// position: relative;
		&>image{
			width: 100rpx;
			height: 100rpx;
			float: right;
			margin-right: 20rpx;
			// position: absolute;
			// top: 500rpx;
			// right: 20rpx;
		}
		.money{
			margin-top: 100rpx;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			text{
				&:first-child{
					font-size: 20px;
					color: orangered;
				}
				&:last-child{
					color: gray;
					float: right;
				}
			}
		}
		.imgShow{
			width: 100%;
			height: 130rpx;
			// line-height: 100rpx;
			padding: 15rpx;
			box-sizing: border-box;
			font-size: 18px;
			border-top: 25rpx solid rgb(235, 235, 235);
			border-bottom: 15rpx solid rgb(235, 235, 235);
			image{
				width: 70rpx;
				height: 70rpx;
				vertical-align: middle;
				&:first-child{
					width: 100rpx;
					height: 70rpx;
				}
				&:last-child{
					float: right;
					margin-right: 15rpx;
				}
			
			}
		}
		.peisong{
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			border-top: 1px solid darkgray;
			padding: 0 20rpx;
			box-sizing: border-box;
			image{
				width: 50rpx;
				height: 50rpx;
				margin-left: 15rpx;
				vertical-align: middle;
			}
		}
		.goshop{
			width: 100%;
			height: 100rpx;
			// line-height: 110rpx;
			font-size: 0;
			box-sizing: border-box;
			border-bottom: 25rpx solid rgb(235, 235, 235);
			.shop{
				width: 200rpx;
				height: 75rpx;
				line-height: 75rpx;
				font-size: 17px;
				border-radius: 10rpx;
				text-align: center;
				margin: 0 auto;
				background-color: orangered;
				color: white;
			}
			
		}
		.shopDetail{
			width: 100%;
			height: 120rpx;
			line-height: 120rpx;
			border-bottom: 20rpx solid rgb(235, 235, 235);
			.shopD{
				width: 250rpx;
				height: 90rpx;
				line-height: 90rpx;
				background-color: green;
				color: white;
				font-size: 20px;
				text-align: center;
				display: inline-block;
				border-radius: 10rpx;
				margin: 5rpx auto;
				&:first-child{
					margin-left: 120rpx;
				}
				&:last-child{
					margin-left: 20rpx;
				}
			}
		}
		.imgShow2{
			width: 100%;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			image{
				width: 710rpx;
				height: 700rpx;
				&:last-child{
					margin-bottom: 100rpx;
				}
			}
		}
		.bottomDiv{
			width: 100%;
			height: 120rpx;
			border: 1px solid gray;
			box-sizing: border-box;
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;
			image{
				background-color: gray;
				width: 60rpx;
				height: 60rpx;
				display: inline-block;
				padding: 30rpx  30rpx;
				border: 1px solid rgb(235, 235, 235);
			}
			.green{
				width: 250rpx;
				height: 120rpx;
				text-align: center;
				line-height: 120rpx;
				color: white;
				// padding: 20rpx;
				box-sizing: border-box;
				background-color: rgb(76,175,80);
				&:active{
					background-color: green;
				}
			}
			.red{
				width: 250rpx;
				height: 120rpx;
				text-align: center;
				line-height: 120rpx;
				color: white;
				// padding: 20rpx;
				box-sizing: border-box;
				background-color: orangered;
				&:active{
					background-color: red;
				}
			}
		}
	}
	.uni-margin-wrap {
			width: 750rpx;
			margin: 0 auto;
			
		}
		.swiper {
			height: 600rpx;
		}
		.swiper-item {
			display: block;
			height: 600rpx;
			line-height: 600rpx;
			text-align: center;
		}
		.swiper-list {
			margin-top: 40rpx;
			margin-bottom: 0;
		}
		.uni-common-mt {
			margin-top: 60rpx;
			position: relative;
		}
		.info {
			position: absolute;
			right: 20rpx;
		}
		.uni-padding-wrap {
			width: 550rpx;
			padding: 0 100rpx;
		}
</style>