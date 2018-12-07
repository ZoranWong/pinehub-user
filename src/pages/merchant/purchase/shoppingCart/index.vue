<template>
	<div id="shopping_cart">
		<mp-title :title="title"></mp-title>
		<div id="shopping_cart_time">
			<ul>
				<li>
					<i class="shopping_cart_calendar_ico"></i>
					<i class="shopping_cart_date">2018/11/11</i>
				</li>
				<li>
					<i class="shopping_cart_time_ico"></i>
					<i class="shopping_cart_date">早上5:30到货</i>
				</li>
			</ul>
		</div>
		<div id="save_shopping_cart">保存为常用购物车</div>
	</div>
</template>
<script>
	import MpTitle from '@/components/MpTitle';
	export default {
		data() {
			return {
				title: '购物车'
			}
		},
		components: {
			'mp-title': MpTitle,
		},
		computed: {},
		methods: {

		},
		mounted() {}
	}
</script>
<style scoped>
	#shopping_cart {
		background: #F2F2F2;
		position: absolute;
		height: 100%;
		width: 100%;
	}
	
	#shopping_cart_time {
		margin: 20rpx;
		overflow: hidden;
	}
	
	#shopping_cart_time ul li {
		background: #FFFFFF;
		padding: 14rpx 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		clear: both;
		margin-bottom: 1rpx;
		font-size: 28rpx;
	}
	
	#shopping_cart_time ul li i {
		display: inline-block;
		float: left;
		line-height: 42rpx;
		height: 42rpx;
	}
	
	.shopping_cart_calendar_ico {
		width: 40rpx;
		height: 42rpx;
		background: url(../../../../../static/images/icon/ico_puechase_2.png) no-repeat center center;
		background-size: 40rpx 42rpx;
		margin-right: 20rpx;
	}
	
	.shopping_cart_time_ico {
		width: 42rpx;
		height: 42rpx;
		background: url(../../../../../static/images/icon/ico_time.png) no-repeat center center;
		background-size: 42rpx 42rpx;
		margin-right: 20rpx;
	}
	
	#save_shopping_cart {
		background: #FFD000;
		font-size: 32rpx;
		width: 710rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #111111;
		margin: 0 auto;
		border-radius: 10rpx;
	}
</style>