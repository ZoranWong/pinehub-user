<template>
	<div class="confirmation-order body">
		<mp-title :title="title"></mp-title>
		<!-- 收货人组件 -->
		<consignee></consignee>
		<ul class="Distribution-details">
			<li class="li-item bgff">
				自提地址
				<p class="details-item">
					<input type="text" placeholder="默认地址" readonly="readonly" disabled="">
				</p>
			</li>
			<li class="li-item bgff">
				自提时间
				<p class="details-item">
					<input type="text" placeholder="默认站点营业时间" readonly="readonly" disabled="">
				</p>
			</li>
			<li class="li-item bgff">
				站点联系电话
				<p class="details-item tel-num">
					16868686868
				</p>
			</li>
		</ul>

		<!-- 支付内容的显示组件 -->
		<payment :model="model" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart"></payment>

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
		computed: {},
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
			}

		},
		mounted() {
			this.loadCartMerchandises(1);
			this.loadMyInfo();
			//			this.$command('FILL_CART_FROM_CACHE');
			//			wx.chooseAddress({
			//				success(res) {
			//					console.log(res.userName)
			//					console.log(res.postalCode)
			//					console.log(res.provinceName)
			//					console.log(res.cityName)
			//					console.log(res.countyName)
			//					console.log(res.detailInfo)
			//					console.log(res.nationalCode)
			//					console.log(res.telNumber)
			//				}
			//			})
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