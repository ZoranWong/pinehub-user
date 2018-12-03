<template>
	<div class="body">
		<title :title="title"></title>
		<banner></banner>
		<location @nearbyStores = "nearbyStores"></location>
		<div class="goods">
			<categories @categoryChange="categoryChange"></categories>
			<merchandises :model = "model" :width = "listwidth" :next = "next" :list = "merchandises" :categoryId = "'today_order_merchandises_' + categoryId" :addMerchandiseToCart = "addCart" :reduceMerchandiseToCart = "reduceCart">
			</merchandises>
		</div>
		<cart :model="model" v-if="isShowCart" @hdlShowPopup="hdlShowPopup" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :clearShoppingCart="clearShoppingCart"></cart>
		<popup v-if = "isShow" @hdlHidePopup = "hdlHidePopup" :store = "nearestStore"></popup>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle';
	import Banner from '@/components/Banner';
	import MerchandiseList from '@/components/MerchandiseList';
	import Cart from '@/components/Cart';
	import Location from './Location';
	import Categories from './Categories';
	import Popup from './Popup';
	export default {
		data() {
			return {
				title: '邻里优鲜',
				isShow: false,
				isShowCart: true,
				listwidth: '530rpx',
				model: 'model.storeMarket.shoppingCarts'
			};
		},
		components: {
			'popup': Popup,
			'banner': Banner,
			'location': Location,
			'categories': Categories,
			'merchandises': MerchandiseList,
			'cart': Cart,
			'title': MpTitle
		},
		computed: {
			merchandises() {
				return this.$store.getters['model.storeMarket.merchandises/list'];
			},
			currentPage() {
				return this.$store.getters['model.storeMarket.merchandises/currentPage'];
			},
			categoryId() {
				return this.$store.getters['model.storeMarket.categories/categoryId'](this.categoryIndex)
			},
			categoryIndex() {
				console.log(this.$store.getters['model.storeMarket.merchandises/currentCategoryIndex']);
				return this.$store.getters['model.storeMarket.merchandises/currentCategoryIndex'];
			},
			nearestStore() {
				return this.$store.getters['model.nearestStore/store'];
			},
			isLoadedAll() {
				return this.$store.getters['model.storeMarket.merchandises/isLoadedAll'];
			}
		},
		watch: {
			categoryId(n, o) {
				console.log('categoryId', n);
				if(n && n !== o) {
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
					console.log('======= store ======== ', store);
					if(store) {
						this.$command('STORE_SHOPPINGCART_LOAD_MERCHANDISES', store['id']);
					}
				}
			}
		},
		methods: {
			reloadMerchandises() {
				this.$command('CLEAR_MERCHANDISE', 'model.storeMarket.merchandises');
				this.loadMerchandises();
			},
			nearbyStores () {
	            this.$command('REDIRECT_TO', 'storesMap', 'push', {query: {
	                'next_route': 'storeMarket'
	            }});
	        },
			jump(router) {
				this.$command('REDIRECT_TO', router, 'push');
			},
			hdlShowCart() {
				this.isShowCart = true;
			},
			hdlShowPopup() {
				this.mp.router.push('todaySubmitOrder');
			},
			async hdlHidePopup(store) {
				this.isShow = false;
				await this.loadCategories(this.nearestStore.id);
				if(!this.hasShoppingCarts) {
					await this.loadCartMerchandises();
				}
				this.$store.dispatch('model.storeMarket.merchandises/setCurrentCategory', {
					categoryIndex: 0
				});
			},
			loadMerchandises(page = 1) {
				this.$command('LOAD_MERCHANDISE_LIST',
					'model.storeMarket.merchandises/setList',
					'storeMerchandises',
					this.nearestStore['id'],
					this.categoryId,
					page);
			},
			categoryChange(index) {
				this.scrollTop = 0;
				console.log('categoryIndex = ', index);
				this.$store.dispatch('model.storeMarket.merchandises/setCurrentCategory', {
					categoryIndex: index
				});
			},
			next() {
				if(this.isLoadedAll) {
					this.loadMerchandises(this.currentPage + 1);
				}
			},
			loadCartMerchandises(page = 1) {
				this.$command('STORE_SHOPPINGCART_LOAD_MERCHANDISES', this.nearestStore.id, page);
			},
			addCart(merchandiseId, id = null) {
				let count = this.$store.getters['model.storeMarket.shoppingCarts/quality'](merchandiseId) + 1;
				this.$command('STORE_SHOPPINGCART_CHANGE_MERCHANDISE', this.nearestStore['id'], merchandiseId, id, count);
			},
			reduceCart(merchandiseId, id = null) {
				let count = this.$store.getters['model.storeMarket.shoppingCarts/quality'](merchandiseId) - 1;
				this.$command('STORE_SHOPPINGCART_CHANGE_MERCHANDISE', this.nearestStore['id'], merchandiseId, id, count);
			},
			clearShoppingCart() {
				try {
					this.$command('STORE_SHOPPINGCART_CLEAR_MERCHANDISES', this.nearestStore['id']);
				} catch(e) {
					console.log(e)
					this.popup.toast('购物车清空失败', 'warn', 2000);
				}
			},
			async loadCategories(storeId) {
				await this.$command('LOAD_STORE_CATEGORIES', storeId);
			},
			async location(storeId) {
				try {
					await this.$command('GET_NEAREST_STORE', storeId);
					if (!storeId) {
						this.isShow = true;
					}else{
						await this.loadCategories(storeId);
					}
				} catch(e) {
					console.log('抛出异常', e);
					return false;
				}
			}
		},
		mounted () {
			this.$store.dispatch('model.storeMarket.merchandises/setCurrentCategory', {categoryIndex: -1});
			let storeId = typeof this.$route.query['store_id'] === 'undefined' ?
			 null : parseInt(this.$route.query['store_id']);
			this.location(storeId);
			this.categoryChange(0);

		},
		destroyed () {
			this.$command('CLEAR_MERCHANDISE', 'model.storeMarket.merchandises');
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
