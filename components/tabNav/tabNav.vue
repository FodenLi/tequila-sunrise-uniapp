<template>
	<view class="tavNav">
		<view class="header">
			<uni-icons type="search" size="30"></uni-icons>
			<input type="text" placeholder="请输入关键词" v-model="value">
			<button @click="search">搜索</button>
		</view>
		<!-- 排序栏 -->
		<view class="arrSort">
			<ul @click="changeActive">
				<!-- 默认排序 -->
				<li  val="default" active="1" :class="{'active':active == '1'}">综合</li>
				<!-- 销量排序 -->
				<li  val="sales" active="2" :class="{'active':active == '2'}">销量</li>
				<!-- 新品排序 -->
				<li  val="sate" active="3" :class="{'active':active == '3'}">新品</li>
				<!-- 价格排序 -->
				<li  val="price" active="4" :class="{'active':active == '4'}">
					价格
					<view class="imgSort">
						<image src="../../static/other/sheng2.png" mode="" v-show="imgflag1" @click="upArr"></image>
						<image src="../../static/other/sheng1.png" mode="" v-show="!imgflag1" ></image>
						<image src="../../static/other/jiang2.png" mode="" v-show="imgflag2" @click="downArr"></image>
						<image src="../../static/other/jiang1.png" mode="" v-show="!imgflag2"></image>
					</view>
				</li>
			</ul>
		</view>
		<!-- 展示列表 -->
		<view class="lists">
			<ul>
				<li v-for="(item,index) in list" :key="index" @click="navTo(item.commodity_id)">
					<image :src="baseUrl+item.picture_url" mode=""></image>
					<text>{{item.commodity_name}}</text>
					<view class="li-Botm">
						<text>￥{{item.commodity_price}}</text>
						<text>销量：{{item.commodity_sales}}</text>
					</view>
				</li>
			</ul>
		</view>
		<text v-show="bottom">到底了哦~~~~~~</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:1,
				imgflag1:true,
				imgflag2:true,
				// 存储当前的id
				id:0,
				// 酒精图片的路径前缀
				baseUrl:"https://dianjiu.oss-cn-beijing.aliyuncs.com",
				// 存放列表数据
				list:[],
				// input框中的值
				value:"",
				bottom:false,
			}
		},
		methods: {
			// 导航栏跳转
			navTo(id){
				// 将对象参数转为JSON字符串，并使用encodeURIComponent编码
				// const obj = encodeURIComponent(JSON.stringify(item));
				//在起始页面跳转到test.vue页面并传递参数
				uni.navigateTo({
					url: `../../components/Detail/Detail?id=${id}`
				});
			},
			// 初始化时，请求方法
			getList(){
				// console.log("挂载执行")
				uni.request({
					url: 'http://118.190.158.17:8006/AopAndMyBatis2/wxview/getWineClassify?id='+this.id, //仅为示例，并非真实接口地址。
					success: (res) => {
						this.list=res.data
						// console.log("初始化的请求",red.data)
						
					}
				});
			},
			// 分类请求方法
			setList(str){
				uni.request({
					url: ' http://118.190.158.17:8006/AopAndMyBatis2/wxview/'+ str,
					success: (res) => {
						// 然后再倒放数组
						this.list=res.data
					}
				});
			},
			changeActive(e){
				if(e.target.nodeName == "LI"){
					this.imgflag1 = true,
					this.imgflag2 = true
					// 拿到当前的active样式
					this.active =  e.target.getAttribute("active")  
					// 拿到当前dom的val值
					let val = e.target.getAttribute("val") 
					console.log("active值为", e.target.active)
					let str
					switch(val) {
					  case "default":
					  case "sate":
					    str = 'getWineClassify?id='+this.id
						  this.setList(str)
					    break;
					  case "sales":
					    str = 'getSalesClassify?id='+this.id
					    this.setList(str)
					    break;
					  case "price":
					    str = 'getDescClassify?id='+this.id
					    this.setList(str)
					    break;
					} 
				}
			},
			upArr(){
				console.log("升序")
				this.imgflag1 = false,
				this.imgflag2 = true
				// 升序请求
				let str = 'getDescClassify?id='+this.id
				this.setList(str)
			},
			downArr(){
				console.log("降序")
				this.imgflag1 = true,
				this.imgflag2 = false
				// 降序请求
				let str = 'getAscClassify?id='+this.id
				this.setList(str)
			},
			// 搜索
			search(){
				let str = "getWineClassify?name="+ this.value
				this.setList(str)
				this.value = ""
			}
		},
		// 注意与method同级
		// navigate.vue页面接受参数，页面被加载时触发
		onLoad: function (option) {
			this.id = option.id
			// console.log(option.id,"页面加载完毕")
			this.setList('getWineClassify?id='+this.id)
		},
		//下拉刷新
		onPullDownRefresh() {
			console.log("下拉")
			this.getList()
			setTimeout(function () {
					uni.stopPullDownRefresh();
			}, 1000);
		},
		// 上拉加载更多
		onReachBottom() {
			console.log("上拉")
			if(this.list.length >=15){
				this.bottom = true
			}else{
				//前端数据请求时，显示加载提示弹框
				uni.showLoading({
					title: '加载中...'
				});
				setTimeout(()=>{
					// 数据从后端接口返回后，提示弹框关闭
					uni.hideLoading();
					uni.request({
						url: 'http://118.190.158.17:8006/AopAndMyBatis2/wxview/getWineClassifys?id='+this.id+'&count=3',
						success: (res) => {
							// 然后再倒放数组
							this.list =  this.list.concat(res.data)
							console.log(res.data)
							
						}
					});
				},1000)
				
			}
		},

}
</script>

<style lang="scss" scoped>
	.tavNav{
		overflow-x: hidden;
		.header{
			width: 100%;
			height: 100rpx;
			box-sizing: border-box;
			padding: 15rpx 8rpx;
			position: relative;
			input{
				padding-left: 75rpx;
				box-sizing: border-box;
				display: inline-block;
				border-radius: 15rpx;
				height: 70rpx;
				width: 78%;
				background-color: rgb(225,225,225);
			}
			button{
				display: inline-block;
				width: 18%;
				height: 100%;
				text-align: center;
				line-height: 70rpx;
				background-color: rgb(235,235,235);
				margin-left: 20rpx;
				border-radius: 15rpx;
				// vertical-align: middle
			}
			uni-text{
				position: absolute;
				left: 18rpx;
				top: 20rpx;
			}
		}
		.arrSort{
			width: 100%;
			height: 100rpx;
			// border: 1px solid red;
			box-sizing: border-box;
			ul{
				padding: 0;
				width: 80%;
				height: 70rpx;
				margin: 15rpx auto;
				display: flex;
				justify-content: space-between;
				li{	
					list-style: none;
					height: 70rpx;
					line-height: 70rpx;
					&:last-child{
						display: flex;
						justify-content: center;
						align-items: center;
						
						.imgSort{
							margin-left: 20rpx;
							display: inline-block;
							width: 25rpx;
							height: 50rpx;
							font-size: 0;
							image{
								width: 100%;
								height: 50%;
								display: block;
							}
						}
					}
				}
				.active{
					font-weight: bold;
					color:  red;
				}
			}
		}
		.lists{
			height: 100%;
			background-color: rgb(225,225,225);
			overflow-x: hidden;
			margin-bottom: 50rpx;
			ul{
				margin-top: 10rpx;
				width: 100%;
				padding: 0;
				
				li{
					width: 100%;
					height: 200rpx;
					border: 1px solid gray;
					list-style: none;
					padding: 10rpx;
					box-sizing: border-box;
					background-color: white;
					// display: flex;
					position: relative;
					image{
						width: 180rpx;
						height: 180rpx;
						
						display: inline-block;
						vertical-align: top;
					}
					.li-Botm{
						// display: inline-block;
						width: 70%;
						height: 40rpx;
						line-height: 40rpx;
						position: absolute;
						right: 10rpx;
						bottom: 10rpx;
						text{
							&:first-child{
								color: orangered;
								font-size: 18px;
							
							}
							&:last-child{
								float: right;
								margin-right: 15rpx;
							}
						}
						
					}
				}
			}
		}
	}
</style>
