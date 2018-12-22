<template>
	<div class="body">
		<mp-title :title="title"></mp-title>
		<merchandises :model="model" @show-cart="hdlShowCart" :next="next" :height="screenHeight" :list="merchandises" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" categoryId="activity"></merchandises>
		<cart :model="model" v-if="isShowCart" @hdlShowPopup="hdlShowPopup" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :clearShoppingCarts="clearShoppingCarts"></cart>
		<pop-location v-if="isShow" @hdlHidePopup="hdlHidePopup" :activity-id="activityId">
		</pop-location>
		<div id="shopping_cart_height" v-if="isShow"></div>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle'
	import Merchandises from './Merchandises';
	import Cart from '@/components/ShoppingCarts'
	import PopupLocation from './PopupLocation'
	export default {
		data() {
			return {
				title: '新品预定',
				isShow: false,
				activityId: null,
				isShowCart: true,
				screenHeight: null,
				model: 'model.newEvents.shoppingCarts'
			}
		},
		components: {
			'mp-title': MpTitle,
			'merchandises': Merchandises,
			'cart': Cart,
			'pop-location': PopupLocation
		},
		computed: {
			merchandises() {
				return this.$store.getters['model.newEvents.merchandises/list']
			},
			currentPage() {
				let page = this.$store.getters['model.newEvents.merchandises/currentPage'];
				return page
			},
			isLoadedAll() {
				return this.$store.getters['model.newEvents.merchandises/isLoadedAll'];
			}
		},
		watch: {},
		methods: {
			async loadMerchandises(page = 1) {
				await this.$command('ACTIVITY_LOADING_MERCHANDISES', this.activityId, page)
			},
			hdlShowCart() {
				this.isShowCart = true;
			},
			async hdlShowPopup() {
				let stores = await this.mp.storage.get('activityReceiveStores');
				if(!stores || stores.length === 0) {
					this.mp.router.push('storesMap', {
						query: {
							next_route: 'newEvents.createOrder',
							activity_id: this.activityId
						}
					});
					return;
				}
				this.isShow = true;
			},
			hdlHidePopup() {
				this.isShow = false;
			},
			next() {
				console.log('load more merchandises');
				if(!this.isLoadedAll && this.activityId !== null) {
					this.loadMerchandises(this.currentPage + 1);
				}
			},
			async loadCartMerchandises(page = 1) {
				await this.$command('ACTIVITY_SHOPPINGCART_LOAD_MERCHANDISES', this.activityId, page);
			},
			addCart(merchandiseId, id = null) {
				let count = this.$store.getters['model.newEvents.shoppingCarts/quality'](merchandiseId) + 1;
				this.$command('ACTIVITY_SHOPPINGCART_CHANGE_MERCHANDISE', this.activityId, merchandiseId, id, count);
			},
			reduceCart(merchandiseId, id = null) {
				let count = this.$store.getters['model.newEvents.shoppingCarts/quality'](merchandiseId) - 1;
				this.$command('ACTIVITY_SHOPPINGCART_CHANGE_MERCHANDISE', this.activityId, merchandiseId, id, count);
			},
			clearShoppingCarts() {
				try {
					this.$command('ACTIVITY_SHOPPINGCART_CLEAR_MERCHANDISES', this.activityId);
				} catch(e) {
					console.log(e);
				}
			},
			async initData() {
				await this.loadMerchandises();
				await this.loadCartMerchandises();
			}
		},
		onShow() {
			this.isShow = false;
			this.activityId = this.$route.query['activity_id'];
			if(this.activityId) {
				this.initData();
			}
		},
		created() {
			this.screenHeight = (750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight) + 'rpx';
		}
	}
</script>

<style scoped>
	#shopping_cart_height {
		height: 68rpx;
	}
</style>