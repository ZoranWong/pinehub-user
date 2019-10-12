<!--suppress ALL -->
<template>
	<div class="shopping-carts" v-show="totalCount>0" :style="{visiable:visiable}">
		<div class="shopping-carts-bottom clearfix">
			<div class="content" @click="toggleListShow">
				<span class="black-circle"></span>
				<i class="i-icon cart"></i>
				<i class="i-icon num-icon  theme-color color11">{{ totalCount }}</i>
				<span class="total-price">¥{{ totalAmount }}</span>
			</div>
			<label class="choose fr" @click="popShow">
                选好了
                <i class="i-icon next-icon" @click="orderShow"></i>
            </label>
		</div>
		<div class="selected-merchandises  bgff" v-if="toggleList">
			<div class="selected-title clearfix">
				<div class="flag fl">
					已选产品
				</div>
				<label class="clear fr" @click="clear">清空</label>
			</div>
			<div class="add-box">
				<div class="add-merchandises color11" v-for="(item, itemIndex) in shoppingCarts" :key="itemIndex">
					<span class="merchandises-name">{{ item.name }}</span>
					<span class="sell-price">¥{{ item.sellPrice }}</span>
					<div class="cartcontrol-warpper">
						<cart-control :model="model" @addCart="addCart" @reduceCart="reduceCart" :merchandiseId=" item['merchandiseId']" :shopId="item.shopId"></cart-control>
					</div>
				</div>
			</div>
		</div>
		<div class="mask" v-if="maskBg" @click="toggleListShow"></div>
	</div>
</template>
<script>
	import CartControl from '@/components/CartControl'
	export default {
		data() {
			return {
				toggleList: false,
				maskBg: false
			}
		},
		props: {
			addMerchandiseToCart: {
				default: null,
				type: Function
			},
			reduceMerchandiseToCart: {
				default: null,
				type: Function
			},
			clearShoppingCarts: {
				default: null,
				type: Function
			},
			model: {
				default: null,
				type: String
			}
		},
		components: {
			'cart-control': CartControl
		},
		computed: {
			visiable() {
				return this.totalCount > 0 ? 'block' : 'none';
			},
			shoppingCarts() {
				return this.model ? this.$store.getters[`${this.model}/list`] : [];
			},
			totalAmount() {
				return this.model ? this.$store.getters[`${this.model}/totalAmount`] : 0;
			},
			totalCount() {
				return this.model ? this.$store.getters[`${this.model}/totalCount`] : 0;
			}
		},
		methods: {
			popShow: function() {
				this.$emit('hdlShowPopup')
			},
			orderShow() {
				this.$emit('hdlShowOrder')
			},
			toggleListShow: function() {
				this.toggleList = !this.toggleList;
				this.maskBg = !this.maskBg;
			},
			clear() {
				this.clearShoppingCarts();
			},
			addCart(item) {
				this.addMerchandiseToCart(item);
			},
			reduceCart(merchandiseId, id) {
				this.reduceMerchandiseToCart(merchandiseId, id);
			}
		}
	}
</script>
<style scoped>
	.shopping-carts {
		width: 100%;
		height: auto;
		position: fixed;
		bottom: 0rpx;
		right: 0rpx;
	}
	/*底部的购物车*/

	.shopping-carts-bottom {
		width: 100%;
		height: 98rpx;
		background-color: #000000;
		background-size: contain;
		position: relative;
		z-index: 99;
	}

	.black-circle {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		background-color: #000000;
		position: absolute;
		top: -20rpx;
		left: 20rpx;
	}

	.cart {
		width: 70rpx;
		height: 70rpx;
		background: url(../../static/images/icon/cart.png) no-repeat;
		background-size: contain;
		position: absolute;
		top: -10rpx;
		left: 30rpx;
	}

	.num-icon {
		width: 36rpx;
		height: 36rpx;
		line-height: 36rpx;
		border-radius: 50%;
		text-align: center;
		font-size: 22rpx;
		font-weight: 400;
		position: absolute;
		top: -20rpx;
		left: 78rpx;
	}

	.content {
		width: 70%;
		font-size: 32rpx;
		margin-top: 20rpx;
	}

	.total-price {
		margin-left: 140rpx;
		color: #ffffff;
	}

	.choose {
		display: inline-block;
		width: 30%;
		color: #fece00;
		margin-top: -40rpx;
	}

	.next-icon {
		width: 20rpx;
		height: 35.6rpx;
		background: url(../../static/images/icon/next-icon.png) no-repeat;
		background-size: contain;
		position: absolute;
		bottom: 30rpx;
		right: 23rpx;
	}
	/*商品数量*/

	.mask {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		box-sizing: border-box;
		background-color: rgba(7, 17, 27, 0.6);
	}

	.add-box {
		margin-top: 60rpx;
	}

	.selected-merchandises {
		width: 100%;
		max-height: 400rpx;
		overflow: hidden;
		position: absolute;
		bottom: 98rpx;
		z-index: 20;
		box-sizing: border-box;
		overflow-y: auto;
	}

	.selected-title {
		width: 100%;
		height: 58rpx;
		line-height: 58rpx;
		font-size: 24rpx;
		background-color: #f2f2f2;
		padding: 0rpx 40rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 2;
	}

	.flag {
		background: url(../../static/images/icon/flag.png) 0rpx 14rpx no-repeat;
		background-size: 26rpx 30rpx;
		text-indent: 36rpx;
	}

	.clear {
		background: url(../../static/images/icon/del-icon.png) 0rpx 14rpx no-repeat;
		background-size: 26rpx 30rpx;
		text-indent: 36rpx;
	}

	.add-merchandises {
		height: 98rpx;
		line-height: 98rpx;
		position: relative;
	}

	.merchandises-name {
		font-size: 28rpx;
		margin-left: 40rpx;
	}

	.sell-price {
		font-size: 32rpx;
		position: absolute;
		bottom: 0rpx;
		right: 300rpx;
	}

	.cartcontrol-warpper {
		position: absolute;
		bottom: -10rpx;
		right: 20rpx;
	}
</style>
