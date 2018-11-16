<template>
	<div class="body">
		<mp-title :title="title"></mp-title>
		<new-list :model="model" @show-cart="hdlShowCart" :next="next" :height="screenHeight" :list="merchandises" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" categoryId="activity"></new-list>
		<cart :model="model" v-if="isShowCart" @hdlShowPopup="hdlShowPopup" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :clearShoppingCart="clearShoppingCart"></cart>
		<pop-location v-if="isShow" @hdlHidePopup="hdlHidePopup"></pop-location>
		<div id="shopping_cart_height" v-if="isShowCart"></div>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle'
	import NewFoods from './NewFoods'
	import Cart from '@/components/Cart'
	import PopupLocation from './PopupLocation'
	export default {
		data() {
			return {
				title: '新品预定',
				isShow: false,
				activityId: 1,
				isShowCart: true,
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
				return this.$store.getters['model.activity.merchandises/list']
			},
			currentPage() {
				let page = this.$store.getters['model.activity.merchandises/currentPage'];
				return page
			}
		},
		watch: {},
		methods: {
			loadMerchandises(page = 1) {
				console.log('==============加载活动商品=================')
				this.$command('ACTIVITY_LOADING_MERCHANDISES', page)
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
				this.loadMerchandises(this.currentPage + 1);
			},
			loadCartMerchandises(page = 1) {
				this.$command('ACTIVITY_SHOPPINGCART_LOAD_MERCHANDISES', page);
			},
			addCart(merchandiseId, id = null) {
				let count = this.$store.getters['model.activity.shoppingCarts/quality'](merchandiseId) + 1;
				this.$command('ACTIVITY_SHOPPINGCART_CHANGE_MERCHANDISE', merchandiseId, id, count);
			},
			reduceCart(merchandiseId, id = null) {
				let count = this.$store.getters['model.activity.shoppingCarts/quality'](merchandiseId) - 1;
				this.$command('ACTIVITY_SHOPPINGCART_CHANGE_MERCHANDISE', merchandiseId, id, count);
			},
			clearShoppingCart() {
				try{
					this.$command('ACTIVITY_SHOPPINGCART_CLEAR_MERCHANDISES');
				}catch(e) {
					console.log(e);
				}
				
			}
		},
		mounted() {
			console.log('===========活动页面挂载成功=============')
			this.loadMerchandises();
			this.loadCartMerchandises();
		},
		created() {
			console.log('===========活动页面创建成功=============')
			this.screenHeight = (750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight) + 'rpx';
		}
	}
</script>

<style scoped>
	#shopping_cart_height {
		height: 68rpx;
	}
</style>