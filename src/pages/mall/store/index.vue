<template>
	<div class="body">
		<mp-title :title="title"></mp-title>
		<mp-swiper></mp-swiper>
		<location></location>
		<div class="goods">
			<menus @menusChange="menusChange"></menus>
			<m-list :model="model" :width="listwidth" :next="next" :list="merchandises" :categoryId="'today_order_merchandises_' + categoryId" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart">
			</m-list>
		</div>
		<cart :model="model" v-if="isShowCart" @hdlShowPopup="hdlShowPopup" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :clearShoppingCart="clearShoppingCart"></cart>
		<popup v-if="isShow" @hdlHidePopup="hdlHidePopup" :store="nearestStore"></popup>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle';
	import Swiper from '@/components/Swiper';
	import MerchandiseList from '@/components/MerchandiseList';
	import Cart from '@/components/Cart';
	import Location from './Location';
	import Menus from './Menus';
	import Popup from './Popup';
	export default {
		data() {
			return {
				title: '当日下单',
				isShow: true,
				isShowCart: true,
				listwidth: '530rpx',
				model: 'model.store.shoppingCarts'
			};
		},
		components: {
			'popup': Popup,
			'mp-swiper': Swiper,
			'location': Location,
			'menus': Menus,
			'm-list': MerchandiseList,
			'cart': Cart,
			'mp-title': MpTitle
		},
		computed: {
			merchandises() {
				return this.$store.getters['model.store.merchandises/list'];
			},
			currentPage() {
				return this.$store.getters['model.store.merchandises/currentPage'];
			},
			categoryId() {
				return this.$store.getters['model.storeCategories/categoryId'](this.categoryIndex)
			},
			categoryIndex() {
				return this.$store.getters['model.store.merchandises/currentCategoryIndex'];
			},
			nearestStore() {
				return this.$store.getters['model.nearestStore/store'];
			},
			isLoadedAll() {
				return this.$store.getters['model.store.merchandises/isLoadedAll'];
			}
		},
		watch: {
			categoryId(n, o) {
				if(n && n !== o) {
					console.log(n, o);
					try {
						this.reloadMerchandises();
					} catch(e) {
						console.log(e);
					}
				}
			},
			nearestStore: {
				deep: true,
				handler(store) {
					if(store) {
						this.$command('STORE_SHOPPINGCART_LOAD_MERCHANDISES', store['id']);
					}
				}
			}
		},
		methods: {
			reloadMerchandises() {
				this.$command('CLEAR_MERCHANDISE', 'model.store.merchandises');
				this.loadMerchandises();
			},
			jump(router) {
				this.$command('router', router, 'push');
			},
			hdlShowCart() {
				this.isShowCart = true;
			},
			hdlShowPopup() {
				this.mp.router.push('todaySubmitOrder');
			},
			async hdlHidePopup(store) {
				this.isShow = false;
				await this.loadCategories(store.id);
				this.$store.dispatch('model.store.merchandises/setCurrentCategory', {
					categoryIndex: 0
				});
			},
			loadMerchandises(page = 1) {
				this.$command('LOAD_MERCHANDISE_LIST',
					'model.store.merchandises/setList',
					'storeMerchandises',
					this.nearestStore['id'],
					this.categoryId,
					page);
			},
			menusChange(index) {
				this.scrollTop = 0;
				this.$store.dispatch('model.store.merchandises/setCurrentCategory', {
					categoryIndex: index
				});
			},
			next() {
				if(this.isLoadedAll) {
					this.loadMerchandises(this.currentPage + 1);
				}
			},
			loadCartMerchandises(page = 1) {
				this.$command('STORE_SHOPPINGCART_LOAD_MERCHANDISES', page);
			},
			addCart(merchandiseId, id = null) {
				console.log('加入购物车')
				let count = this.$store.getters['model.store.shoppingCarts/quality'](merchandiseId) + 1;
				this.$command('STORE_SHOPPINGCART_CHANGE_MERCHANDISE', this.nearestStore['id'], merchandiseId, id, count);
			},
			reduceCart(merchandiseId, id = null) {
				let count = this.$store.getters['model.store.shoppingCarts/quality'](merchandiseId) - 1;
				this.$command('STORE_SHOPPINGCART_CHANGE_MERCHANDISE', this.nearestStore['id'], merchandiseId, id, count);
			},
			clearShoppingCart() {
				console.log('清空购物车')
				try {
					this.$command('STORE_SHOPPINGCART_CLEAR_MERCHANDISES', this.nearestStore['id']);
				} catch(e) {
					console.log(e);
				}
			},
			async loadCategories(storeId) {
				await this.$command('LOAD_STORE_CATEGORIES', storeId);
			},
			async getData() {
				try {
					await this.$command('GET_NEAREST_STORE');
					console.log('get nearest store', this.isShow);
				} catch(e) {
					console.log('抛出异常', e);
					return false;
				}
			}
		},
		mounted() {
			this.getData();
		}
	}
</script>

<style scoped>
	.goods {
		display: flex;
		width: 100%;
		overflow: hidden;
		box-sizing: border-box;
		height: 100%;
		background: #f2f2f2;
	}
</style>