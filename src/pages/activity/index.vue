<template>
	<div class="body">
		<mp-title :title="title"></mp-title>
		<new-list :model="model" @show-cart="hdlShowCart" :next="next" :height="screenHeight" :list="merchandises" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" categoryId="activity"></new-list>
		<cart :model="model" v-if="isShowCart" @hdlShowPopup="hdlShowPopup" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :emptyMerchandiseCart="clearShoppingCart"></cart>
		<pop-location v-if="isShow" @hdlHidePopup="hdlHidePopup"></pop-location>
		<div id="shopping_cart_height"></div>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle';
	import NewFoods from './NewFoods';
	import Cart from '@/components/Cart'
	import PopupLocation from './PopupLocation';
	export default {
		data() {
			return {
				title: '新品预定',
				isShow: false,
				isShowCart: true,
				activityId: 1,
				screenHeight: null,
				model: 'model.activity.shoppingCarts'
			}
		},
		components: {
			'mp-title': MpTitle,
			'new-list': NewFoods,
			'cart': Cart,
			'pop-location': PopupLocation

		},
		computed: {
			merchandises() {
				return this.$store.getters['model.activity.merchandises/list'];
			},
			currentPage() {
				let page = this.$store.state['model.activity.merchandises'].currentPage;
				return page;
			}
		},
		watch: {},
		methods: {
			loadMerchandises(page = 1) {
				this.$command('ACTIVITY_LOADING_MERCHANDISES', page);
				//				this.$command('GET_ACTIVITY_MERCHANDISE_LIST', page);
			},
			hdlShowCart() {
				this.isShowCart = true;
			},
			hdlShowPopup() {
				this.isShow = true;
			},
			hdlHidePopup() {
				this.isShow = false;
			},
			next() {
				console.log('下一页', this.currentPage);
				this.loadMerchandises(this.currentPage + 1);
			},
			loadCartMerchandises(page = 1) {
				console.log('加载活动购物车');
				this.$command('ACTIVITY_SHOPPINGCART_LOAD_MERCHANDISES', page);
			},
			addCart(merchandiseId) {
				let count = this.$store.getters['model.activity.shoppingCarts/quality'](merchandiseId) + 1;
				this.$command('ACTIVITY_SHOPPINGCART_ADD_MERCHANDISE', merchandiseId, count);
			},
			reduceCart(merchandiseId) {
				let count = this.$store.getters['model.activity.shoppingCarts/quality'](merchandiseId) - 1;
				this.$command('ACTIVITY_SHOPPINGCART_REDUCE_MERCHANDISE', merchandiseId, count);
			},
			clearShoppingCart() {
				this.$command('ACTIVITY_SHOPPINGCART_CLEAR');
			}
		},
		mounted() {
			this.loadMerchandises();
			this.loadCartMerchandises();
		},
		created() {
			console.log('ddddd--------ddddd');
			this.screenHeight = (750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight) + 'rpx';
			console.log('屏幕高度', this.screenHeight);
		}
	}
</script>

<style scoped>
	#shopping_cart_height {
		height: 68rpx;
	}
</style>