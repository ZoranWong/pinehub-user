<template>
	<div class="pay-box width710">
		<div class="li-item bgff">
			微信支付<i class="select-icon"></i>
		</div>

		<div class="product bgff clearfix" v-for="(item, itemIndex) in cartList" :key="itemIndex">
			<img :src="item.thumbImage">
			<div class="product-details">{{item.name}}
				<p class="clearfix">
					<span class="amount">x {{item.count}}</span>
					<span class="sell-price">¥{{item.sellPrice}}</span>
				</p>
				<div class="cartcontrol-warpper">
					<cart-control :model="model" @addCart="addCart" @reduceCart="reduceCart" :merchandiseId=" item['merchandiseId']" :shopId="item.shopId"></cart-control>
				</div>
			</div>
		</div>

		<div v-if="!usedTicketTitle" class="li-item bgff coupon" @click="routeTicket" :disabled="ticketNum > 0">
			优惠券
			<span class="coupon-tips" v-if="ticketNum > 0">{{ ticketNum }}张可用</span>
			<span class="coupon-tips" v-else>无优惠券可使用</span>
			<label class="fr" v-if="ticketNum > 0">
				有可用<i class="arrow-icon"></i>
		    </label>
		</div>
		<div v-else class="li-item bgff coupon"  @click="routeTicket" :disabled="ticketNum > 0">
			优惠券
			<span class="coupon-tips">{{ usedTicketTitle }}</span>
			<label class="fr">
				- {{reduceAmount}}
			</label>
		</div>
		<div class="count-box">
			<p>合计<span class="fr">¥{{ totalAmount }}</span></p>
			<div class="tips">
				<i class="warn-icon"></i> 食品现制现售，不适合退货服务
			</div>
		</div>
		<div class="pay-bottom">
			实付<span class="total-price">¥{{ paymentAmount }}</span>
			<button v-if="hasMobile" class="nowpay choose fr" @click="pay">去支付<i class="i-icon next-icon"></i></button>
			<button v-if="!hasMobile" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="nowpay choose fr">去支付<i class="i-icon next-icon"></i></button>
		</div>
	</div>
</template>
<script>
	import CartControl from '@/components/CartControl'
	export default {
		name: 'Payment',
		components: {
			'cart-control': CartControl
		},
		props: {
			ticketNum: {
				default: 0,
				type: Number
			},
			addMerchandiseToCart: {
				default: null,
				type: Function
			},
			reduceMerchandiseToCart: {
				default: null,
				type: Function
			},
			createOrder: {
				default: null,
				type: Function
			},
			model: {
				default: null,
				type: String
			},
			redirectToTicket: {
				default: null,
				type: Function
			},
			usedTicketTitle: {
				default: null,
				type: String
			}
		},
		computed: {
			count(merchandiseId) {
				return this.$store.getters[`${this.model}/quality`](merchandiseId);
			},
			cartList() {
				return this.model ? this.$store.getters[`${this.model}/list`] : [];
			},
			totalAmount() {
				return this.model ? this.$store.getters[`${this.model}/totalAmount`] : 0;
			},
			paymentAmount() {
				return this.model ? this.$store.getters[`${this.model}/paymentAmount`] : 0;
			},
			reduceAmount() {
				let amount = this.totalAmount - this.paymentAmount;
				return amount.toFixed(2);
			},
			totalCount() {
				return this.model ? this.$store.getters[`${this.model}/totalCount`] : 0;
			},
			hasMobile() {
				return this.$store.getters['model.account/userInfo'].mobile ? true : false;
			}
		},
		methods: {
			routeTicket() {
				this.redirectToTicket();
			},
			jump(router) {
				this.$command('router', router, 'push');
			},
			addCart(merchandiseId, id) {
				this.addMerchandiseToCart(merchandiseId, id);
			},
			reduceCart(merchandiseId, id) {
				this.reduceMerchandiseToCart(merchandiseId, id);
			},
			pay() {
				this.createOrder()
			},
			async getPhoneNumber(e) {
				await this.$command('SET_USER_MOBILE', e);
				if(this.hasMobile) {
					this.pay()
				} else {
					wx.showToast({
						title: "手机号获取失败",
						icon: "none"
					})
				}
			}
		},
		created() {}

	}
</script>

<style scoped>
	.pay-box {
		margin-bottom: 118rpx;
	}

	.pay-box .li-item {
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 10rpx;
		margin-bottom: 4rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		position: relative;
		margin-bottom: 10rpx;
		box-shadow: 0rpx 8rpx 36rpx rgba(204, 202, 202, 0.3);
		/*border:1rpx solid red;*/
	}

	.select-icon {
		width: 48rpx;
		height: 48rpx;
		background: url(../../static/images/icon/selected.png) no-repeat;
		background-size: contain;
		position: absolute;
		top: 16rpx;
		right: 19rpx;
	}

	.product {
		height: 160rpx;
		display: flex;
		background-color: #ffffff;
		padding: 20rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		box-shadow: 0rpx 8rpx 36rpx rgba(204, 202, 202, 0.3);
		margin-bottom: 10rpx;
		position: relative;
		/*border:1rpx solid red;*/
	}

	.product img {
		width: 180rpx;
		height: 120rpx;
		margin-right: 42rpx;
		/*border:1rpx solid red*/
	}

	.product-details {
		width: 648rpx;
		height: 100%;
		float: right;
		/*border:1rpx solid blue;*/
	}

	.product-details p {
		width: 100%;
	}

	.amount {
		font-size: 22rpx;
		color: #757575;
	}

	.product-details p .sell-count {
		font-size: 22rpx;
		position: relative;
	}

	.product-details p .sell-price {
		float: right;
		margin-right: 203rpx;
	}

	.cartcontrol-warpper {
		position: absolute;
		bottom: 56rpx;
		right: 20rpx;
		/*border:1rpx solid red;*/
	}

	.coupon {
		font-size: 28rpx;
	}

	.coupon-tips {
		border-radius: 10rpx;
		padding: 4rpx;
		background-color: #fece00;
		font-size: 22rpx;
		margin-left: 20rpx;
	}

	.coupon label {
		color: #757575;
		margin-right: 60rpx;
	}

	.nowpay {
		margin: 0;
		padding: 0;
		border: 0;
		outline: none;
		line-height: 98rpx;
		background: none;
		width: 190rpx;
		font-size: 38rpx;
	}

	.arrow-icon {
		width: 28rpx;
		height: 26rpx;
		background: url(../../static/images/icon/gary-next.png)no-repeat;
		background-size: contain;
		position: absolute;
		top: 28rpx;
		right: 20rpx;
	}

	.count-box {
		height: 120rpx;
		background-color: #ffffff;
		padding: 20rpx;
		font-size: 32rpx;
		/*border:1rpx solid red;*/
		box-sizing: border-box;
		border-radius: 10rpx;
	}

	.count-box p {
		height: 32rpx;
		line-height: 32rpx;
		margin-bottom: 20rpx;
	}

	.count-box .tips {
		font-size: 22rpx;
		color: #757575;
	}

	.warn-icon {
		width: 26rpx;
		height: 26rpx;
		background-size: contain;
		display: inline-block;
		margin: 10rpx 10rpx -4rpx 0rpx;
	}

	.pay-bottom {
		width: 750rpx;
		height: 98rpx;
		line-height: 98rpx;
		background-color: #000000;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		color: #ffffff;
		font-size: 32rpx;
		padding: 0rpx 40rpx 0rpx 40rpx;
		box-sizing: border-box;
	}

	.total-price {
		margin-right: 20rpx;
	}

	.choose {
		color: #fece00;
	}

	.next-icon {
		width: 18rpx;
		height: 32rpx;
		background: url(../../static/images/icon/next-icon.png) no-repeat;
		background-size: contain;
		position: absolute;
		top: 33rpx;
		right: 5rpx;
	}
</style>
