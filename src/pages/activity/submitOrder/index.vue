<template>
	<div class="confirmation-order body">
		<mp-title :title="title"></mp-title>
		<!-- 收货人组件 -->
		<consignee></consignee>
		<ul class="Distribution-details">
			<li class="li-item bgff">
				自提地址
				<p class="details-item">
					{{storeInfo ? storeInfo.address : ''}}
				</p>
			</li>
			<li class="li-item bgff">
				自提时间
				<p class="details-item">
					<!--{{storeInfo.openDaily}}-->
				</p>
			</li>
			<li class="li-item bgff">
				站点联系电话
				<p class="details-item tel-num">
					{{storeInfo ? storeInfo.mobile : ''}}
				</p>
			</li>
		</ul>

		<!-- 支付内容的显示组件 -->
		<payment :model="model" :sendOrder="sendOrder" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart"></payment>

	</div>
</template>
<script>
	import MpTitle from '@/components/MpTitle';
	import Consignee from '@/components/Consignee';
	import TabDelivery from '@/components/TabDelivery';
	import Payment from '@/components/Payment';
	export default {
		name: "confirmationOrder",
		data() {
			return {
				title: '确认订单「新品活动」',
				model: 'model.activity.shoppingCarts'
			}
		},
		components: {
			'mp-title': MpTitle,
			'consignee': Consignee,
			'tab-delivery': TabDelivery,
			'payment': Payment,
		},
		computed: {
			storeInfo() {
				return this.$store.getters['model.nearbyStores/store'](parseInt(this.$route.query['store_id']));
			},
			hasShoppingCarts() {
				return this.$store.getters['model.activity.shoppingCarts/list'].length > 0;
			}
		},
		methods: {
			radioChange(e) {
				console.log('radio发生change事件，携带value值为：', e.target.value)
			},
			bindPickerChange(e) {
				// console.log(e)
				this.index = e.target.value

			},
			loadCartMerchandises(page = 1) {
				this.$command('ACTIVITY_SHOPPINGCART_LOAD_MERCHANDISES', page);
			},
			loadMyInfo() {
				this.$command('MYINFO');
			},
			addCart(merchandiseId) {
				let count = this.$store.getters['model.activity.shoppingCarts/quality'](merchandiseId) + 1;
				this.$command('ACTIVITY_SHOPPINGCART_ADD_MERCHANDISE', merchandiseId, count);
			},
			reduceCart(merchandiseId) {
				let count = this.$store.getters['model.activity.shoppingCarts/quality'](merchandiseId) - 1;
				this.$command('ACTIVITY_SHOPPINGCART_REDUCE_MERCHANDISE', merchandiseId, count);
			},
			sendOrder() {
				this.$command('CREATE_ORDER', 'activity');
			}
		},
		mounted() {
			console.log('shopping carts has been loaded', this.hasShoppingCarts);
			if(!this.hasShoppingCarts) {
				this.loadCartMerchandises(1);
			}

			console.log('store_id = ', this.$route.query['store_id'], 'store = ', this.storeInfo);
		}
	}
</script>
<style scoped>
	.confirmation-order {
		font-size: 28rpx;
		padding: 20rpx 0rpx 20rpx 20rpx;
	}
	
	.li-item {
		width: 710rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 10rpx;
		margin-bottom: 4rpx;
		box-shadow: 0rpx 8rpx 36rpx rgba(204, 202, 202, 0.3);
		box-sizing: border-box;
	}
	
	.li-item .details-item {
		display: inline-block;
		height: 80rpx;
		margin-left: 100rpx;
		vertical-align: middle;
	}
	
	.Distribution-details {
		margin-bottom: 20rpx;
		box-shadow: 0rpx 8rpx 36rpx rgba(204, 202, 202, 0.3);
		/*border:1rpx solid black;*/
	}
	
	.li-item p input {
		display: inline-block;
		vertical-align: middle;
	}
	
	.big-input {
		width: 460rpx;
		height: 40rpx;
		border-radius: 10rpx;
		border: 2rpx solid #cccccc;
	}
	
	.li-item .tel-num {
		margin-left: 44rpx;
	}
</style>