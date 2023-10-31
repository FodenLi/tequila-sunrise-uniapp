<template>
	<!--顶部滚动图 -->
	<view class="content">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular indicator-dots="true" autoplay="true" interval="2000"
				duration="500">
				<swiper-item>					
					<image src="../../static/lunbotu/banner1.jpg" mode="aspectFill"></image>				
				</swiper-item>
				<swiper-item>				
					<image src="../../static/lunbotu/banner2.jpg" mode="aspectFill"></image>				
				</swiper-item>
				<swiper-item>				
					<image src="../../static/lunbotu/banner3.jpg" mode="aspectFill"></image>				
				</swiper-item>
			</swiper>
		</view>
		
		<view class="middle">
			<view class="" v-on:click="clickgo(1)">
				<image src="../../static/navWine/pijiu.png" ></image>
				<view class="des">
					啤酒
				</view>
			</view>
			<view class="" v-on:click="clickgo(2)">
				<image src="../../static/navWine/baijiu.png"></image>
				<view class="des">
					白酒
				</view>
			</view>
			<view class="" v-on:click="clickgo(3)">
				<image src="../../static/navWine/hongjiu.png"></image>
				<view class="des">
					红酒
				</view>
			</view>
			<view class="" v-on:click="clickgo(4)">
				<image src="../../static/navWine/yangjiu.png"></image>
				<view class="des">
					洋酒
				</view>
			</view>
			<view class="" v-on:click="clickgo(0)">
				<image src="../../static/navWine/all.png"></image>
				<view class="des">
					全部
				</view>
			</view>				
		</view>
		
		<view class="foot"  v-for="(item, index) in commodities" :key="index">
			<view class="more">
				<text>{{item.wineType}}精选</text>
				<view class="go" v-on:click="clickgo(index+1)">更多<image src="../../static/other/youjan.png" mode="aspectFill"></image></view>
			</view>
			<view class="longpic">
				<image src="../../static/other/honggg.jpg" mode="widthFix"></image>
			</view>
			<view class="commodity_box">
				<view class="commodity" v-for="(i, inde) in item.data" :key="inde">
					
						<image :src="baseUrl+i.picture_url" mode="aspectFill" @click="toGoodsInfo(item.commodity_id)"></image>
						<view class="name">{{i.commodity_name}}</view>
						<view class="price">
							<text>￥{{i.commodity_price}}</text>
						<navigator url="#">
							<image src="../../static/other/jiagou.png" mode="aspectFill" @click="addCart(item)"></image>
						</navigator>
						</view>					
				</view>
			</view>	
		</view>
		
	</view>	
</template>

<script>
export default {
    data() {
        return {
			commodities:[],
			baseUrl:"https://dianjiu.oss-cn-beijing.aliyuncs.com",
        }
    },
    methods: {
		    clickgo(n){
			   console.log(n);
			   //在起始页面跳转到test.vue页面并传递参数
			   uni.navigateTo({
					url: '/pages/tabNav-mine/tabNav-mine?id='+n+'&name=uniapp'
			   });
		   }
		    // toGoodsInfo(id){
		   	// 			uni.navigateTo({
		   	// 				url: "/subPack/goodsInfo/goodsInfo?id="+id,
		   	// 			})
		   	// 		},
		   	// 		// 添加到购物车
		    // addCart(item){
		   	// 			this.itemArr.unshift(item)
		   	// 			uni.setStorageSync("itemArr",this.itemArr)	
		   	// 		}
    },
		
	onLoad(){
		let that=this;
		//发起网络请求
		uni.request({
		    url: 'http://118.190.158.17:8006/AopAndMyBatis2/wxview/getFoursWine',
		    success: (res) => {		        
				that.commodities=res.data;	
		    },
			fail:(err)=>{
				console.log(err);
			}
		});

	}
}
</script>

<style lang="scss">
	@import "index-mine.scss";
	
</style>
