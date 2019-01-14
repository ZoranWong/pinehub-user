<template>
	<div id="shopping_cart">
		<mp-title :title="title"></mp-title>
		<favorite :display="display" @close="closeAddFavorite"></favorite>
		<div class="shopping_cart_time">
			<ul>
				<li>
					<i class="shopping_cart_calendar_ico"></i>
					<picker mode="date" :start="startDate" class="shopping_cart_date" @change="getSelectDate">{{selectDate}}</picker>
					<i class="select_shopping_cart_date_ico"></i>
				</li>
				<!--<li>
					<i class="shopping_cart_time_ico"></i>
					<i class="shopping_cart_date">早上5:30到货</i>
				</li>-->
			</ul>
		</div>
		<div v-for="(items, itemsIndex) in cartList" :key="itemsIndex">
			<div class="shopping_cart_time">
				<ul>
					<li>
						<i class="shopping_cart_time_ico"></i>
						<i class="shopping_cart_date">{{batch[items[0].batch]}} 到货</i>
					</li>
				</ul>
			</div>

			<div class="product bgff clearfix" v-for="(item, itemIndex) in items" :key="itemIndex">
				<img :src="item.thumbImage">
				<div class="product-details">{{item.name}}
					<p class="clearfix">
						<span class="amount">x {{item.count}}</span>
						<span class="sell-price">¥{{item.sellPrice}}</span>
					</p>
					<!--<div class="cartcontrol-warpper">
						<cart-control :model="model" @addCart="addCart" @reduceCart="reduceCart" :merchandiseId=" item['merchandiseId']" :shopId="item.shopId"></cart-control>
					</div>-->
				</div>
			</div>
		</div>

		<div id="save_shopping_cart" @click="favoriteBtn">保存为常用购物车</div>
		<div id="next_bottom">
			<div class="total_price">
				￥{{totalAmount}}
			</div>
			<div class="choose" @click="jumpNext">
				下一步
				<i class="i-icon next-icon"></i>
			</div>
		</div>
	</div>
</template>
<script>
	import MpTitle from '@/components/MpTitle';
	import Favorite from './Favorite';
	import CartControl from '@/components/CartControl'
	export default {
		data() {
			return {
				title: '购物车',
				selectDate: (new Date()).format('yyyy-MM-dd'),
				startDate: (new Date()).format('yyyy-MM-dd'),
				display: false,
				model: 'model.purchase.shoppingCarts',
			}
		},
		components: {
			'mp-title': MpTitle,
			'favorite': Favorite,
			'cart-control': CartControl
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
			closeAddFavorite() {
				this.display = false;
			},
			addCart(merchandiseId, storeId = null) {
				let count = this.$store.getters['model.purchase.shoppingCarts/quality'](merchandiseId, batch) + 1;
				this.$command('PURCHASE_SHOPPINGCART_CHANGE_MERCHANDISE', storeId, batch, merchandiseId, id, count, batch);
			},
			reduceCart(merchandiseId, storeId = null) {
				let count = this.$store.getters['model.purchase.shoppingCarts/quality'](merchandiseId, batch) - 1;
				this.$command('PURCHASE_SHOPPINGCART_CHANGE_MERCHANDISE', storeId, batch, merchandiseId, id, count, batch);
			},
			jumpNext() {
				let selectDate = this.selectDate;
				this.$command('REDIRECT_TO', 'merchant.purchase.createOrder', 'push', {
					query: {
						selectDate: selectDate
					}
				});
			}
		},
		mounted() {
		}
	}
</script>
<style scoped>
	#shopping_cart {
		background: #F2F2F2;
		position: absolute;
		height: 100%;
		width: 100%;
	}

	.shopping_cart_time {
		margin: 20rpx;
		overflow: hidden;
	}

	.shopping_cart_time ul li {
		background: #FFFFFF;
		padding: 14rpx 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		clear: both;
		margin-bottom: 1rpx;
		font-size: 28rpx;
	}

	.shopping_cart_time ul li i {
		display: inline-block;
		float: left;
		line-height: 42rpx;
		height: 42rpx;
	}

	.shopping_cart_time ul li picker {
		display: inline-block;
		float: left;
		line-height: 42rpx;
		width: 580rpx;
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

	.select_shopping_cart_date_ico {
		width: 12rpx;
		height: 22rpx;
		background: url(../../../../../static/images/icon/gary-next.png) no-repeat center center;
		background-size: 12rpx 22rpx;
		float: right !important;
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
	/*产品列表*/

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
		margin: 0 20rpx 10rpx;
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
		left: 5rpx;
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
