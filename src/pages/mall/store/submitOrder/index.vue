<template>
	<div class="confirmation-order body">
		<mp-title :title="title"></mp-title>
		<!-- 收货人组件 -->
		<consignee select-method="true"></consignee>
		<!-- 配送和自提的tab切换组件-->
		<tab-delivery v-model="addressInfo"></tab-delivery>
		<!-- 支付内容的显示组件 -->
		<payment :model="model" :usedTicket="usedTicket" :totalNum="totalNum" :ticketNum="ticketNum" :createOrder="createOrder" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :redirectToTicket="redirectToTicket"></payment>
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
				storeId: null,
				roomNum: null,
				buildNum: null,
				addressInfo: {
					address: null,
					buildingNum: null,
					roomNum: null,
					sendBatch: 0,
					currentTab: 0
				}
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
			storeInfo() {
				return this.$store.getters['model.nearestStore/store']
			},
			ticketNum() {

				console.log('数量', this.$store.getters['model.store.tickets/totalNum'], this.$store.getters);
				return this.$store.getters['model.store.tickets/totalNum'];
			},
			totalAmount() {
				return this.model ? this.$store.getters[`model.store.shoppingCarts/totalAmount`] : 0;
			},
			usedTicket() {
				return this.$store.getters['model.store.shoppingCarts/usedTicketTitle'];
			},
			usedTicketCode() {
				return this.$store.getters['model.store.shoppingCarts/ticketCode'];
			},
			usedCardId() {
				return this.$store.getters['model.store.shoppingCarts/cardId'];
			}
		},
		methods: {
			redirectToTicket() {
				console.log('storeCoupon');
				this.mp.router.push('storeCoupon', {
					query: {
						back_to: 'todaySubmitOrder'
					}
				});
			},
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
				let type = null;
				if(this.addressInfo.currentTab == 0) {
					type = 4;
				} else if(this.addressInfo.currentTab == 1) {
					type = 3;
				}
				console.log('StoreId', this.storeInfo.id, this.userInfo.nickname, this.userInfo.mobile, this.storeInfo.address, this.addressInfo.buildingNum, this.addressInfo.roomNum, this.addressInfo.sendBatch, type);
				if(this.addressInfo.buildingNum == null || this.addressInfo.roomNum == null) {
					wx.showToast({
						title: "楼号或房号不得为空",
						icon: "none"
					})
					return false;
				}
				// 
				this.$command('CREATE_STORE_ORDER',
					type,
					this.storeInfo.id,
					this.userInfo.nickname,
					this.userInfo.mobile,
					this.storeInfo.address,
					this.addressInfo.buildingNum,
					this.addressInfo.roomNum,
					this.addressInfo.sendBatch,
					this.usedTicketCode,
					this.usedCardId
				);
			},
			async initData() {
				//				this.storeId = this.$store.getters['model.nearestStore/store']['id'];
				//				console.log('StoreId', this.storeId);
				await this.$command('LOAD_STORE_TICKETS', this.storeInfo.id);
				this.addressInfo.address = this.storeInfo.address;
				console.log('-=-=-=-=-=-=-=-=-=-----=-=-=-=-=-=-=-=-=-=-=-=-', this.storeInfo);
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