<template>
	<div class="body">
		<mp-title :title="title"></mp-title>
		<mp-swiper></mp-swiper>
		<div class="goods">
			<menus @menusChange="menusChange"></menus>
			<m-list :model="model" :width="listwidth" :next="next" :list="merchandises" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :categoryId="'store_merchandises_' + categoryId">
			</m-list>
		</div>
		<cart :model="model" v-if="isShowCart" @hdlShowPopup="hdlShowPopup" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :clearShoppingCart="clearShoppingCart"></cart>
		<pop-delivery v-if="isShow" @hdlHidePopup="hdlHidePopup"></pop-delivery>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle';
	import PopupDelivery from './PopupDelivery';
	import Swiper from '@/components/Swiper';
	import MerchandiseList from '@/components/MerchandiseList';
	import Menus from './Menus';
	import Cart from '@/components/Cart'
	export default {
		data() {
			return {
				title: "预定商城",
				isShow: false,
				isShowCart: true,
				model: 'model.reservation.shoppingCarts'
			}
		},
		components: {
			'pop-delivery': PopupDelivery,
			'mp-swiper': Swiper,
			'menus': Menus,
			'm-list': MerchandiseList,
			'cart': Cart,
			"mp-title": MpTitle,

		},
		computed: {
			merchandises() {
				return this.$store.getters['model.reservation.merchandises/list'];
			},
			currentPage() {
				console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$', this.$store.state)
				let page = this.$store.getters['model.reservation.merchandises/currentPage'];
				return page;
			},
			categoryId() {
				console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$categoryId', this.$store.state)
				return this.$store.getters['model.categories/categoryId'](this.categoryIndex)
			},
			categoryIndex() {
				return this.$store.getters['model.reservation.merchandises/currentCategoryIndex'];
			}
		},
		watch: {
			categoryId(n, o) {
				if(n && !o) {
					this.loadMerchandises();
				}
			}
		},
		methods: {
			hdlShowCart: function() {
				this.isShowCart = false;
			},
			hdlShowPopup: function() {
				this.isShow = true;

			},
			hdlHidePopup: function() {
				this.isShow = false;
			},
			async loadMerchandises(page = 1) {
				console.log('++++RESERVATION_LOADING_MERCHANDISES++++++');
				try {
					await this.$command('RESERVATION_LOADING_MERCHANDISES',
						'model.reservation.merchandises/setList',
						'bookingMerchandises',
						this.categoryId,
						page);
				} catch(e) {
					console.log(e);
				}

			},
			menusChange: function(index) {
				console.log('产品切换', index);
				try {
					this.$command('CLEAR_MERCHANDISE', 'model.reservation.merchandises');
					this.$store.dispatch('model.reservation.merchandises/setCurrentCategory', {
						categoryIndex: index
					});
					this.loadMerchandises(index);
				} catch(e) {
					console.log(e);
					return false;
				}
			},
			async loadCartMerchandises(page = 1) {
				console.log('>>>>>>>>>>>>>>>>>>>加载购物车<<<<<<<<<<<<<<<<<<')
				try {
					await this.$command('RESERVATION_SHOPPINGCART_LOAD_MERCHANDISES', page)
				} catch(e) {
					console.log('抛出异常', e);
					return false;
				}

			},
			next() {
				this.loadMerchandises(this.currentPage + 1);
			},
			loadCartMerchandises(page = 1) {
				this.$command('RESERVATION_SHOPPINGCART_LOAD_MERCHANDISES', page);
			},
			addCart(merchandiseId, id = null) {
				let count = this.$store.getters['model.reservation.shoppingCarts/quality'](merchandiseId) + 1;
				this.$command('RESERVATION_SHOPPINGCART_CHANGE_MERCHANDISE', merchandiseId, id, count);
			},
			reduceCart(merchandiseId, id = null) {
				let count = this.$store.getters['model.reservation.shoppingCarts/quality'](merchandiseId) - 1;
				this.$command('RESERVATION_SHOPPINGCART_CHANGE_MERCHANDISE', merchandiseId, id, count);
			},
			clearShoppingCart() {
				console.log('清空购物车')
				try {
					this.$command('RESERVATION_SHOPPINGCART_CLEAR_MERCHANDISES');
				} catch(e) {
					console.log(e);
				}
			},
			async initData() {
				await this.$command('GET_CATEGORIES_TO_MEUN');
				this.loadMerchandises();
			}
		},
		mounted() {
			this.initData();
			this.loadCartMerchandises();
		}
	}
</script>

<style scoped>
	.goods {
		display: flex;
		width: 100%;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
		height: 100%;
		background: #f2f2f2;
	}
</style>