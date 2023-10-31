<template>
	<view class="shopList">
		<view class="noDetail" v-if="!list.length">
			<image src="../../static/other/chartEmpty.png" mode="scoleImg"></image>
			购物车空空如也~~~
			<button @click="navTo">去抢购</button>
		</view>
		<view class="hasDetail" v-if="list.length">
			<ul>
				<li v-for="(item,index) in list" :key="index">
					<!-- v-model="item.flag" -->
					<checkbox value="cb" :checked="item.flag"  @click="itemchoose(item)"/>
					<image :src="baseUrl+item.picture_url" mode="" class="shopItem"></image>
					<view class="text">
						<text>{{item.commodity_name}}</text>
						<text>￥{{item.commodity_price * item.num}} </text>
					</view>
					<view class="num">
						<image src="../../static/other/del.png" mode="" class="del" @click="del(item)"></image>
						<view class="changeNum">
							<view class="reduce" @click="reduce(item)">-</view>
							<view class="number"> {{item.num}}</view>
							<view class="add" @click="add(item)">+</view>
						</view>
					</view>
				</li>
			</ul>
			<!-- 底部全选 -->
			<view class="giveMoney">
				<!-- v-model="flag1" -->
				<checkbox value="checked" :checked="flag1"  @click="allchoose"/>
				<text>全选</text>
				<text>
					合计:￥<text style="color: red;">{{price}}</text>
				</text>
				<view >去结算</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				// vuex仓库中的数据
				list:[],
				flag1:false,
				// 选中个数
				chooseNum:0,
				//总价
				// price:2000,
				// 酒精图片的路径前缀
				baseUrl:"https://dianjiu.oss-cn-beijing.aliyuncs.com",
			}
		},
		watch:{
			chooseNum:{
				deep:true,
				handler(newVal,oldVal){
					// console.log("改变了",newVal)
					if(this.chooseNum == this.list.length && this.chooseNum != 0){
						console.log("相等了")
						this.flag1 = true
					}else{
						this.flag1 = false
						console.log("不等")
					}
				},
				// immediate:true
				
			}
		},
		computed:{
			price(){
				let all = 0
				this.list.forEach(item=>{
					if(item.flag){
						all += item.commodity_price * item.num
					} 
				})
				return all
			}
		},
		methods:{
			del(item){
				if(confirm("确定删除该商品吗？")){
					this.list =  this.list.filter(li=> li.commodity_id != item.commodity_id )
					// console.log(this.list)
				}else{
					alert("已取消删除")
				}
			},
			allchoose(){
				this.flag1 = ! this.flag1
				// console.log("点击全选")
				if(this.flag1){
					this.chooseNum = this.list.length
					console.log(this.chooseNum)
				}else{
					this.chooseNum = 0
					console.log(this.chooseNum)
				}
				this.list.forEach(item=>{
					item.flag = this.flag1 
				})
			},
			itemchoose(item){
				item.flag = !item.flag
				
				if(item.flag){
					this.chooseNum += 1
				}else{
					this.chooseNum -=1
				}
				console.log(this.chooseNum)
			},
			// 导航栏跳转
			navTo(){
				// switchTab地址后不能携带参数
				uni.switchTab({
					url: '../../pages/index/index'
				});
			},
			// 减少数量
			reduce(item){
				if(item.num <=1){
					if(confirm("确定删除该商品吗？")){
						this.list =  this.list.filter(li=> li.commodity_id != item.commodity_id )
						// console.log(this.list)
					}
				}else{
					item.num --
				}
			},
			// 添加数量
			add(item){
				if(item.num>=9){
					alert("商品达到最大数量")
				}else{
					item.num ++
				}
			}
		},
		
		onLoad: function (option) {
			this.list = this.$store.state.List
			console.log(this.list)
		}
	}
</script>

<style lang="scss" scoped>
	.shopList{
		.noDetail{
			width: 100%;
			height: 700rpx;
			// border: 1px solid gray;
			text-align: center;
			image{
				margin: 0 auto;
				display: block;
				margin-bottom: 20rpx;
			}
			button{
				display: block;
				width: 250rpx;
				height: 80rpx;
				margin-top: 20rpx;
			}
		}
		.hasDetail{
			width: 100%;
			// height: 400px;
			// border: 1px solid gray;
			ul{
				padding: 0px;
				margin-bottom: 50rpx;
				li{
					padding: 15rpx 25rpx;
					width: 100%;
					height: 200rpx;
					box-sizing: border-box;
					list-style: none;
					display: flex;
					border-bottom: 20rpx solid rgb(235, 235, 235);
					position: relative;
					checkbox{
						display: block;
						width: 30rpx;
						height: 30rpx;
						margin: auto 10rpx;
					}
					.shopItem{
						width: 150rpx;
						height: 150rpx;
						margin-left: 30rpx;
					}
					.text{
						// width: 300rpx;
						height: 150rpx;
						text{
							height: 70rpx;
							line-height: 70rpx;
							display: block;
							&:last-child{
								color: orangered;
								font-size: 19px;
							}
						}
					}
					.num{
						width: 150rpx;
						height: 150rpx;
						// border: 1px solid gray;
						position: absolute;
						right: 30rpx;
						.del{
							width: 40rpx;
							height: 40rpx;
							float: right;
						}
						.changeNum{
							width:200rpx ;
							height: 70rpx;
							position: absolute;
							right: 0;
							bottom: 0;
							display: flex;
							text-align: center;
							view{
								width: 50rpx;
								height: 50rpx;
								line-height: 50rpx;
								// border: 1px solid gray;
								display:inline-block;
							}
							.number{
								width: 100rpx;
								height: 50rpx;
							}
						}
					}
					
				}
			}
			.giveMoney{
				width: 100%;
				height: 100rpx;
				border: 1px solid gray;
				position: fixed;
				bottom: 100rpx;
				right: 0;
				display: flex;
				align-items: center;
				padding: 0 15rpx;
				box-sizing: border-box;
				checkbox{
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
				text{
					&>text{
						color: orangered;
					}
				}
				text:first-of-type {
					font-size: 15px;
					margin: 0 20rpx;
				}
				text:last-of-type{
					margin-left: 20rpx;
					font-size: 20px;
					
				}
				view{
					font-size: 15px;
					width: 200rpx;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					color: white;
					background-color: orangered;
					position: absolute;
					right: 0;
					top: 0;
				}
			}
		}
	}
</style>