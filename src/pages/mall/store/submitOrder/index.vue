<template>
	<div class="confirmation-order body">
		<mp-title :title="title"></mp-title>
		<!-- 收货人组件 -->
		<consignee select-method="true"></consignee>
		<!-- 配送和自提的tab切换组件-->
		<tab-delivery :position="position"></tab-delivery>
		<!-- 支付内容的显示组件 -->
		<payment :model="model" :usedTicket="usedTicket" :totalNum="totalNum" :createOrder="createOrder" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :redirectToTicket="redirectToTicket"></payment>
	</div>
</template>
<script>
	import MpTitle from '@/components/MpTitle';
	import Consignee from '@/components/Consignee';
	import TabDelivery from '@/components/TabDelivery';
	import Payment from '@/components/Payment';
	export default {
		name: 'confirmationOrder',
		data() {
			return {
				title: '确认订单「当日」'

			}
		},
		components: {
			'mp-title': MpTitle,
			'consignee': Consignee,
			'tab-delivery': TabDelivery,
			'payment': Payment
		},
		computed: {
			userInfo() {
				return this.$store.getters['model.account/userInfo']
			},
		},
		methods: {
			radioChange(e) {
				console.log('radio发生change事件，携带value值为：', e.target.value)
			},
			bindPickerChange(e) {
				// console.log(e)
				this.index = e.target.value
			},
			next() {
				this.$command('LOAD_MERCHANDISE_LIST');
			},
			async loadCartMerchandises(page = 1) {
				await this.$command('STORE_SHOPPINGCART_LOAD_MERCHANDISES', this.activityId, page);
			},
			addCart(merchandiseId, id = null) {
				console.log('加入购物车')
				let count = this.$store.getters['model.store.shoppingCarts/quality'](merchandiseId) + 1;
				this.$command('STORE_SHOPPINGCART_CHANGE_MERCHANDISE', this.nearestStore['id'], merchandiseId, id, count);
			},
			reduceCart(merchandiseId, id = null) {
				let count = this.$store.getters['model.store.shoppingCarts/quality'](merchandiseId) - 1;
				this.$command('STORE_SHOPPINGCART_CHANGE_MERCHANDISE', this.nearestStore['id'], merchandiseId, id, count);
			},
			clearShoppingCart() {
				console.log('清空购物车')
				try {
					this.$command('STORE_SHOPPINGCART_CLEAR_MERCHANDISES', this.nearestStore['id']);
				} catch(e) {
					console.log(e);
				}
			},
			async initData() {
				await this.$command('GET_NEAREST_STORE');
				await this.$command('MYINFO');
				console.log('mounted order component');
				await this.$command('FILL_CART_FROM_CACHE');
				if(!this.hasShoppingCarts) {
					await this.loadCartMerchandises();
				}

			}
		},
		created() {},
		mounted() {
			this.initData();
		}
	}
</script>
<style scoped>
	.confirmation-order {
		font-size: 28rpx;
		padding: 20rpx 0rpx 20rpx 20rpx;
	}
</style>