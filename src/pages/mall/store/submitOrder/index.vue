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
				title: '确认订单「当日」',
				model: 'model.store.shoppingCarts',
				storeId: null
			}
		},
		components: {
			'mp-title': MpTitle,
			'consignee': Consignee,
			'tab-delivery': TabDelivery,
			'payment': Payment
		},
		computed: {
			storeInfo() {
				return this.queryStore ? this.queryStore : this.$store.getters['model.nearestStore/store'](this.storeId);
			},
			userInfo() {
				return this.$store.getters['model.account/userInfo']
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
			addCart(merchandiseId, id = null) {
				console.log('加入购物车', merchandiseId, id);
				let count = this.$store.getters['model.store.shoppingCarts/quality'](merchandiseId) + 1;
				this.$command('STORE_SHOPPINGCART_CHANGE_MERCHANDISE', this.nearestStore['id'], merchandiseId, id, count);
			},
			reduceCart(merchandiseId, id = null) {
				let count = this.$store.getters['model.store.shoppingCarts/quality'](merchandiseId) - 1;
				this.$command('STORE_SHOPPINGCART_CHANGE_MERCHANDISE', this.nearestStore['id'], merchandiseId, id, count);
			},
			createOrder() {
				//

				this.storeId = this.$store.getters['model.nearestStore/store'].id;
				console.log('StoreId', this.storeId);

				return false;
				this.$command('CREATE_STORE_ORDER',
					this.storeInfo.id,
					this.userInfo.nickname,
					this.userInfo.mobile,
					this.storeInfo.address,
					this.storeInfo.buildNum,
					this.storeInfo.roomNum,
					this.usedTicketCode,
					this.usedCardId
				);
			},
			async initData() {
				this.storeId = this.$store.getters['model.nearestStore/store'].id;
				console.log('StoreId', this.storeId);
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