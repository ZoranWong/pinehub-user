<template>
	<div id="create_order">
		<mp-title :title="title"></mp-title>
		<favorite :display="display" @close="closeImportShoppingCart"></favorite>
		<div id="merchant_info">
			<i id="edit"></i>
			<ul>
				<li><em>收货单位：</em>(选填)</li>
				<li><em>收货人：</em>张雷</li>
				<li><em>联系电话：</em>15858585858</li>
				<li><em>配送地址：</em>安徽省合肥市高新区宁西路28号8栋5118</li>
			</ul>
		</div>
		<div id="select_tab">
			<ul>
				<li><i id="ico_product"></i><em>选择产品</em></li>
				<li @click="favoriteBtn"><i id="ico_shopping_cart"></i><em>导入常用购物车</em></li>
			</ul>
		</div>
		<!--<div id="shopping_cart_list">
			<ul>
				<li>
					<em class="shopping_cart_no">
						购物车编号：QJI2018121200932
					</em>
					<div class="shopping_cart_time">
						<i class="shopping_cart_ico"></i>
						<i class="shopping_cart_date">2018/11/11</i>
						<i class="shopping_cart_send_time">中午10:30</i>
						<i class="shopping_cart_status">到货</i>
					</div>
					<em class="shopping_cart_price">
						小计：￥2000.00
						<i class="shopping_cart_price_more"></i>
					</em>
				</li>
				<li>
					<em class="shopping_cart_no">
						购物车编号：QJI2018121200932
					</em>
					<div class="shopping_cart_time">
						<i class="shopping_cart_ico"></i>
						<i class="shopping_cart_date">2018/11/11</i>
						<i class="shopping_cart_send_time">中午10:30</i>
						<i class="shopping_cart_status">到货</i>
					</div>
					<em class="shopping_cart_price">
						小计：￥2000.00
						<i class="shopping_cart_price_more"></i>
					</em>
				</li>
			</ul>
		</div>-->
	</div>
</template>
<script>
	import MpTitle from '@/components/MpTitle';
	import Favorite from './Favorite';
	export default {
		data() {
			return {
				title: '订单',
				display: false
			}
		},
		components: {
			'mp-title': MpTitle,
			'favorite': Favorite
		},
		computed: {},
		methods: {
			favoriteBtn() {
				this.display = true;
			},
			closeImportShoppingCart() {
				this.display = false;
			}
		},
		mounted() {}
	}
</script>
<style scoped>
	#create_order {
		background: #F2F2F2;
		position: absolute;
		height: 100%;
		width: 100%;
	}
	
	#merchant_info {
		background: #FFFFFF;
		margin: 20rpx;
		overflow: hidden;
		border-radius: 10rpx;
		position: relative;
	}
	
	#edit {
		background: url(../../../../../static/images/icon/edit-icon.png) no-repeat center center;
		background-size: 23rpx 30rpx;
		width: 23rpx;
		height: 30rpx;
		position: absolute;
		top: 27rpx;
		right: 20rpx;
	}
	
	#merchant_info ul {
		padding: 32rpx;
	}
	
	#merchant_info ul li {
		font-size: 28rpx;
		font-weight: 300;
		line-height: 34rpx;
		margin-top: 22rpx;
		color: #111111;
	}
	
	#merchant_info ul li:first-child {
		margin-top: 0;
	}
	
	#merchant_info ul li em {
		display: inline-block;
	}
	
	#select_tab {
		margin: 20rpx;
	}
	
	#select_tab ul {
		overflow: hidden;
	}
	
	#select_tab ul li {
		background: #FFFFFF;
		width: 344rpx;
		height: 80rpx;
		text-align: center;
		border-radius: 10rpx;
		font-size: 28rpx;
		font-size: 300;
	}
	
	#select_tab ul li:first-child {
		float: left;
	}
	
	#select_tab ul li:last-child {
		float: right;
	}
	
	#select_tab ul li i {
		width: 48rpx;
		height: 48rpx;
		display: inline-block;
		/*background: #FECE00;*/
		vertical-align: middle;
		margin-top: 18rpx;
		margin-right: 20rpx;
	}
	
	#ico_product {
		background: url(../../../../../static/images/icon/ico_puechase_0.png) no-repeat center center;
		background-size: 48rpx;
	}
	
	#ico_shopping_cart {
		background: url(../../../../../static/images/icon/ico_puechase_1.png) no-repeat center center;
		background-size: 48rpx;
	}
	
	#select_tab ul li em {
		height: 48rpx;
		line-height: 48rpx;
		display: inline-block;
		vertical-align: middle;
		margin-top: 18rpx;
	}
	
	#shopping_cart_list {
		margin: 20rpx;
	}
	
	#shopping_cart_list ul li {
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 20rpx;
		font-size: 28rpx;
		font-weight: 300;
		margin-bottom: 10rpx;
	}
	
	#shopping_cart_list ul li:last-child {
		margin-bottom: 0;
	}
	
	.shopping_cart_time {
		height: 42rpx;
		line-height: 42rpx;
		margin-top: 16rpx;
	}
	
	.shopping_cart_time i {
		display: inline-block;
		margin-right: 20rpx;
		float: left;
	}
	
	.shopping_cart_ico {
		width: 40rpx;
		height: 42rpx;
		background: url(../../../../../static/images/icon/ico_puechase_2.png) no-repeat center center;
		background-size: 40rpx 42rpx;
	}
	
	.shopping_cart_send_time {
		color: #757575 !important;
	}
	
	.shopping_cart_status {
		float: right !important;
		margin-right: 0 !important;
	}
	
	.shopping_cart_price {
		margin-top: 16rpx;
	}
	
	.shopping_cart_price_more {
		width: 12rpx;
		height: 22rpx;
		background: url(../../../../../static/images/icon/ico_puechase_3.png) no-repeat center center;
		background-size: 12rpx 22rpx;
		float: right;
		margin-top: 8rpx;
	}
</style>