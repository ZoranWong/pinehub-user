<!--suppress ALL -->
<template>
	<scroll-view class="merchandises-wrapper" :style="{ width: width, height: '100%' }" :scroll-y="true" @scrolltolower="scrolltolower">
		<div class="merchandises-item clearfix bgff" v-for="(item, index) in list" :key="index" @click="redirectTo('user.goodDetail', {query: {type:'breakfast', good_id: item.id}})">
			<div class="merchandises-item-top">
				<img mode="widthFix" class="merchandises-pic" :src="item.thumbImage" :style="{ width: widthPic, height: heightPic }">
			</div>
			<div class="merchandises-item-bottom">
				<h4 class="merchandises-name">{{item.name}}</h4>
				<span class="tag color00" v-if="item.specifications.length > 0">规格 : {{item.spec}}</span>
				<div style="position:absolute;color: #484848;bottom: 100rpx;right:32rpx;font-size:24rpx;"><span >剩余 {{item.stockNum || 0}} 份</span></div>
				<div class="content ">
					<div class="sell-price color00">{{item.sell_price_format}}</div>
					<div class="origin-price">{{item.origin_price_format}}</div>
					<div class="cartcontrol-warpper ">
						<cart-control v-if="item.stockNum > 0" :model="model" @addCart="addCart" @reduceCart="reduceCart" :product="item"></cart-control>
						<div v-else class="sell-out"><span style = "color: #6b6b6b; font-size: 32rpx;">已售完</span></div>
					</div>
				</div>
			</div>
		</div>
	</scroll-view>
</template>
<script>
	import CartControl from '@/components/CartControl'
	export default {
		props: {
			width: {
				default: '100%',
				type: String
			},
			height: {
				default: '100%',
				type: String
			},
			next: {
				default: null,
				type: Function
			},
			list: {
				default: function() {
					return []
				},
				type: Array
			},
			addMerchandiseToCart: {
				default: null,
				type: Function
			},
			reduceMerchandiseToCart: {
				default: null,
				type: Function
			},
			widthPic: {
				default: '100%',
				type: String
			},
			heightPic: {
				default: 'auto',
				type: String
			},
			model: {
				default: null,
				type: String
			}
		},
		data() {
			return {
				pageCount: 15
			};
		},
		components: {
			'cart-control': CartControl
		},
		created() {
			this.next();
		},
		methods: {
			cartShow: function() {
				this.$emit('show-cart')
			},
			scrolltolower() {
				this.next();
			},
			scroll(e) {
				console.log(e)
			},
			addCart(product) {
				this.addMerchandiseToCart(product);
			},
			reduceCart(merchandiseId, id) {
				this.reduceMerchandiseToCart(merchandiseId, id);
			},
			redirectTo (router, options = {}) {
				this.$command('REDIRECT_TO', router, 'push', options);
			}
		}
	}
</script>

<style scoped>
	.merchandises-wrapper {
		padding: 20rpx;
		box-sizing: border-box;
		overflow-y: auto;
	}

	.merchandises-item {
		width: 100%;
		border-radius: 10rpx;
		box-shadow: 0rpx 8rpx 36rpx rgba(204, 202, 202, 0.6);
		margin-bottom: 40rpx;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
	}

	.merchandises-item-top {
		width: 100%;
		height: 400rpx;
		overflow-y: hidden;
	}

	.merchandises-item-bottom {
		width: 100%;
		padding: 20rpx 20rpx 0rpx;
		box-sizing: border-box;
	}

	.merchandises-item-bottom h4 {
		font-size: 32rpx;
		font-weight: 400;
		margin-bottom: 12rpx;
	}

	.tag {
		font-size: 22rpx;
        color: #757575;
		display: inline-block;
		margin-right: 20rpx;
	}

	.describe {
		font-size: 22rpx;
	}

	.content {
		width: 100%;
		margin-top: 20rpx;
		height: 100rpx;
		position: relative;
	}

	.origin-price {
		font-size: 20rpx;
		font-weight: 400;
		position: absolute;
		bottom: 68rpx;
		left: 0rpx;
		text-decoration: line-through;
	}

	.sell-price {
		font-size: 36rpx;
		font-weight: 400;
		position: absolute;
		bottom: 24rpx;
		left: 0rpx;
	}

	.sell-price span {
		font-size: 28rpx;
		font-weight: 400;
	}

	.cartcontrol-warpper {
		position: absolute;
		bottom: 30rpx;
		right: 12rpx;
	}

	image {
		display: block;
	}
</style>
