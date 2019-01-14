<template>
	<div id="create_order">
		<mp-title :title="title"></mp-title>
		<favorite :display="display" @close="closeImportShoppingCart"></favorite>
		<div id="merchant_info">
			<i id="edit" @click="changeBuyInfo"></i>
			<ul v-show="editStatus">
				<li><em>收货单位：</em>{{storeName}}</li>
				<li><em>收货人：</em>{{storeAdmin}}</li>
				<li><em>联系电话：</em>{{storeMobile}}</li>
				<li><em>配送地址：</em>{{storeAddress}}</li>
				<li><em>配送时间：</em>{{sendDate}}</li>
			</ul>
			<ul v-show="!editStatus">
				<li><em>收货单位：</em><input class="merchant_info_input" v-model="storeName" type="text" /></li>
				<li><em>收货人：</em><input class="merchant_info_input" v-model="storeAdmin" type="text" /></li>
				<li><em>联系电话：</em><input class="merchant_info_input" v-model="storeMobile" type="text" /></li>
				<li><em>配送地址：</em><input class="merchant_info_input" v-model="storeAddress" type="text" /></li>
			</ul>
		</div>
		<div id="select_tab">
			<ul>
				<li @click="jump('merchant.purchase')"><i id="ico_product"></i><em>选择产品</em></li>
				<li @click="favoriteBtn"><i id="ico_shopping_cart"></i><em>导入常用购物车</em></li>
			</ul>
		</div>
		<div id="shopping_cart_list">
			<div v-for="(items, itemsIndex) in cartList" :key="itemsIndex">
				<div class="shopping_cart_title">
					<i class="shopping_cart_title_date"></i>
					<i class="shopping_cart_title_send_time">{{batch[items[0].batch]}} 到货</i>
				</div>
				<ul>
					<li v-for="(item, itemIndex) in items" :key="itemIndex">
						<em class="shopping_cart_info">
						{{item.name}} * {{item.count}}
					</em>
						<em class="shopping_cart_price">
						￥{{item.sellPrice}}
					</em>
					</li>
				</ul>
			</div>
		</div>
		<div id="next_bottom">
			<div class="total_price">
				合计 {{totalAmount}} 元
			</div>
			<div class="choose" @click="createOrder">
				提交订单
				<i class="i-icon next-icon"></i>
			</div>
		</div>
	</div>
</template>
<script>
	import MpTitle from '@/components/MpTitle';
	import Favorite from './Favorite';
	export default {
		data() {
			return {
				title: '订单',
				display: false,
				editStatus: true,
				storeId: null,
				storeName: '',
				storeAdmin: '',
				storeMobile: '',
				storeAddress: '',
				sendDate: '',
				model: 'model.purchase.shoppingCarts',
			}
		},
		components: {
			'mp-title': MpTitle,
			'favorite': Favorite
		},
		computed: {
			cartList() {
				return this.model ? this.$store.getters[`${this.model}/groupList`] : [];
			},
			totalAmount() {
				return this.model ? this.$store.getters[`${this.model}/totalAmount`] : 0;
			},
			batch() {
				return this.config['app']['batch'];
			}
		},
		methods: {
			favoriteBtn() {
				this.display = true;
			},
			closeImportShoppingCart() {
				this.display = false;
			},
			changeBuyInfo() {
				let status = this.editStatus
				if(status) {
					this.editStatus = false;
				} else {
					this.editStatus = true;
				}
			},
			jump(router) {
				this.$command('REDIRECT_TO', router, 'push');
			},
			getStoreSendInfo() {
				let storeInfo = this.$store.getters['model.account/shopInfo'];
				this.storeId = storeInfo.id;
				this.storeName = storeInfo.name ? storeInfo.name : '暂无';
				this.storeAddress = storeInfo.address ? storeInfo.address : '暂无';
				let userInfo = this.$store.getters['model.account/userInfo'];
				this.storeAdmin = userInfo.nickname ? userInfo.nickname : '暂无';
				this.storeMobile = userInfo.mobile ? userInfo.mobile : '暂无';
				this.sendDate = this.$route.query['selectDate'];
			},
			createOrder() {
				this.$command(
					'CREATE_MERCHANT_ORDER',
					1,
					this.storeId,
					this.storeAdmin,
					this.storeMobile,
					this.storeAddress
				);
			}
		},
		mounted() {
			this.getStoreSendInfo();
		}
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

	.merchant_info_input {
		border: 1rpx solid #CCCCCC;
		display: inline-block;
		width: 100%;
		border-radius: 10rpx;
		margin-top: 10rpx;
		background: #f0f0f0;
		padding: 0 10rpx;
		box-sizing: border-box;
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
		overflow: hidden;
	}

	#merchant_info ul li:first-child {
		margin-top: 0;
	}

	#merchant_info ul li em {
		display: inline-block;
		float: left;
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

	.shopping_cart_title {
		background: #FFD000;
		color: #FFFFFF;
		border-radius: 10rpx;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 32rpx;
		font-weight: 400;
		text-shadow: 1rpx 1rpx 1rpx #FFC000;
		padding: 0 20rpx;
		margin-bottom: 10rpx;
	}

	.shopping_cart_title i {
		display: inline-block;
	}

	.shopping_cart_title_send_time {
		float: right;
	}

	#shopping_cart_list ul li {
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 20rpx;
		font-size: 28rpx;
		font-weight: 300;
		margin-bottom: 10rpx;
		overflow: hidden;
	}

	#shopping_cart_list ul {
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

	.shopping_cart_info {
		float: left;
	}

	.shopping_cart_price {
		float: right;
	}

	.shopping_cart_price_more {
		width: 12rpx;
		height: 22rpx;
		background: url(../../../../../static/images/icon/ico_puechase_3.png) no-repeat center center;
		background-size: 12rpx 22rpx;
		float: right;
		margin-top: 8rpx;
	}

	#next_bottom {
		width: 750rpx;
		height: 90rpx;
		background: #000000;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.total_price {
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
		position: absolute;
		bottom: 5rpx;
		left: 20rpx;
	}

	.choose {
		display: inline-block;
		width: 26%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: right;
		color: #fece00;
		position: absolute;
		bottom: 5rpx;
		right: 0;
		padding-right: 64rpx;
	}

	.next-icon {
		width: 20rpx;
		height: 35.6rpx;
		background: url(../../../../../static/images/icon/next-icon.png) no-repeat;
		background-size: contain;
		position: absolute;
		bottom: 22rpx;
		right: 23rpx;
	}
</style>
