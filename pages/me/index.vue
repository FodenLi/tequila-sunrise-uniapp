<template>
	<view class="box">
		<view class="box_top">
			<button @click="getUser">点击微信授权</button>
		</view>
		<view class="box_content">
			<p>我的订单</p>
			<ul>
				<li>
					<image src="../../static/other/personal_pay.png" mode=""></image>
					<span>全部订单</span>
				</li>
				<li>
					<image src="../../static/other/personal_service.png" mode=""></image>
					<span>待发货</span>
				</li>
				<li>
					<image src="../../static/other/personal_receipt.png" mode=""></image>
					<span>待收货</span>
				</li>
				<li>
					<image src="../../static/other/personal_comment.png" mode=""></image>
					<span>待评价</span>
				</li>
			</ul>

		</view>
		<view class="box_but">
			<ul>

				<li>
					<image src="../../static/other/personal_site.png" mode=""></image>
					收货地址
				</li>
			</ul>
		</view>
		<view class="box_but">
			<ul>
				<li>
					<image src="../../static/other/personal_evaluated.png" mode=""></image>
					我的评价
				</li>
			</ul>
		</view>
		<view class="box_but">

			<ul>
				<li>
					<image src="../../static/other/personal_customer.png" mode=""></image>
					在线客户
				</li>
			</ul>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			getUser() {
				// console.log("111")
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes.authResult);
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								console.log('用户昵称为：' + infoRes.userInfo.nickName);
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.box {
		width: 100%;
	}

	.box_top {
		width: 100%;
		height: 300rpx;
		background: #1b9d62;
		padding-top: 50rpx;

		button {
			width: 350rpx;
			background: #1b9d62;
			color: white;

		}
	}

	.box_content {
		p {
			margin: 20rpx;
		}

		ul {
			padding: 0;
			margin: 0;
			display: flex;
			justify-content: space-between;

			li {
				list-style: none;
				width: 180rpx;
				text-align: center;

				image {
					display: block;
					width: 90rpx;
					height: 90rpx;
					margin: 0 auto;
				}
			}
		}
	}

	.box_but {
		margin-top: 6%;
		display: flex;
		padding-left: 2%;

		ul {
			padding: 0;
			margin: 0;
			margin-left: 5%;
			border-bottom: 1px solid #ccc;
			width: 90%;

			li {
				height: 90rpx;
				line-height: 90rpx;
				list-style: none;

				image {
					display: inline-block;
					width: 80rpx;
					height: 80rpx;
					vertical-align: middle;
				}
			}
		}
	}
</style>