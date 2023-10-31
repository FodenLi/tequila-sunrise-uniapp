<template>
	<view class="home">
		<!-- 轮播图部分 -->
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item,index) in swiperImg" :key="index">
					<view class="swiper-item ">
						<!-- {{item}} -->
						<image :src="item" mode="scoleImg" style="width: 100%;height: 100%; "></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 中间导航跳转部分 -->
		<view class="uni-tarNav">
			<navigator :url="'../../components/tabNav/tabNav?id='+(index+1)" v-for="(tabber,index) in tabberList" :key="index">
				<button type="default">
					<image :src="tabber.icon" mode="scoleImg"></image>
					<text>{{tabber.title}}</text>
				</button>
			</navigator>
		</view>
		<!-- 精选推荐 -->
		<view class="content">
			<!-- 啤酒 -->
			<jiuItem id="1">
				<!-- 插槽，插每一类的标题和跳转 -->
				<template v-slot:tit>啤酒精选</template>	
			</jiuItem>
			<!-- 白酒 -->
			<jiuItem id="2">
				<!-- 插槽，插每一类的标题和跳转 -->
				<template v-slot:tit>白酒精选</template>	
			</jiuItem>
			<!-- 红酒 -->
			<jiuItem id="3">
				<!-- 插槽，插每一类的标题和跳转 -->
				<template v-slot:tit>红酒精选</template>	
			</jiuItem>
			<!-- 洋酒 -->
			<jiuItem id="4">
				<!-- 插槽，插每一类的标题和跳转 -->
				<template v-slot:tit>洋酒精选</template>	
			</jiuItem>
		</view>
		
	</view>
</template>

<script>
	import jiuItem from "../../components/jiuItem/jiuItem.vue"
	export default {
		data() {
			return {
				swiperImg: [
					'/static/lunbotu/banner1.jpg',
					'/static/lunbotu/banner2.jpg',
					'/static/lunbotu/banner3.jpg',
					'/static/lunbotu/banner4.jpg'
				],
				// 是否显示面板指示点
				indicatorDots: true,
				// 是否自动切换
				autoplay: true,
				// 自动切换时间间隔
				interval: 3000,
				// 滑动动画时长
				duration: 800,
				
				// 中间导航跳转
				tabberList:[
					{
						"title":"啤酒",
						"icon":"/static/navWine/pijiu.png"
					},
					{
						"title":"白酒",
						"icon":"/static/navWine/baijiu.png"
					},
					{
						"title":"红酒",
						"icon":"/static/navWine/hongjiu.png"
					},
					{
						"title":"洋酒",
						"icon":"/static/navWine/yangjiu.png"
					},
					{
						"title":"全部",
						"icon":"/static/navWine/all.png"
					},
				]
			}
		},
		components:{
			jiuItem
		},
		methods: {
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
		
		methods: {

		}
	}
</script>

<style lang="scss">
	.content{
		overflow: hidden;
		
	}
	
	.uni-tarNav{
		width: 100%;
		height: 150rpx;
		display: flex;
		justify-content: space-between;
		a{
			width: 20%;
			height: 100%;
			border-radius: 10rpx;
			box-sizing: border-box;
			button{
				height: 148rpx;
				box-sizing: border-box;
				padding: 0px;
				line-height: 1rem;
				image{
					width: 60%;
					height: 60%;
					margin: 10rpx auto;
					display: block;
				}
				text{
					
					font-size: 14px;
				}
				&:after{
					border: 0px;
				}
			}
		}
	}
	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}
	.swiper {
		height: 300rpx;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
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
