<template>
	<div class="body">
		<title :title="title"></title>1
		<div class="merchandises">
			<categories @categoryChange="categoryChange"></categories>
			<merchandises :model="model" :width="listwidth" :next="next" :list="merchandises" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :categoryId="'store_merchandises_' + categoryId">
			</merchandises>
		</div>
		<cart :model="model" v-if="isShowCart" @hdlShowPopup="hdlShowPopup" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :clearShoppingCart="clearShoppingCart"></cart>
		<pop-delivery v-if="isShow" @hdlHidePopup="hdlHidePopup"></pop-delivery>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle';
	import MerchandiseList from '@/components/MerchandiseList';
	import Categories from './Categories';
	import Cart from '@/components/ShoppingCarts'
	export default {
		data() {
			return {
				title: '选择产品',
				isShow: false,
				isShowCart: true,
				model: 'model.purchase.shoppingCarts',
			}
		},
		components: {
			'categories': Categories,
			'merchandises': MerchandiseList,
			'cart': Cart,
			'title': MpTitle

		},
		computed: {
			merchandises() {
				console.log('AAA', this.$store.getters['model.purchase.merchandises/list'])
				return this.$store.getters['model.purchase.merchandises/list'];
			},
			currentPage() {
				let page = this.$store.getters['model.purchase.merchandises/currentPage'];
				return page;
			},
			categoryId() {
				return this.$store.getters['model.purchase.categories/categoryId'](this.categoryIndex)
			},
			categoryIndex() {
				return this.$store.getters['model.purchase.merchandises/currentCategoryIndex'];
			},
			isLoadedAll() {
				return this.$store.getters['model.purchase.merchandises/isLoadedAll'];
			}
		},
		watch: {
			categoryId(n, o) {
				if(n && n !== o) {
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
				try {
					await this.$command(
						'LOAD_PURCHASE_MERCHANDISES',
						'model.purchase.merchandises/setList',
						'purchaseMerchandises',
						this.categoryId,
						page
					);
				} catch(e) {
					console.log(e);
				}
			},
			categoryChange: function(index) {
				try {
					this.$command('CLEAR_MERCHANDISE', 'model.purchase.merchandises');
					this.$store.dispatch('model.purchase.merchandises/setCurrentCategory', {
						categoryIndex: index
					});
				} catch(e) {
					console.log(e);
					return false;
				}
			},
			async loadCartMerchandises(page = 1) {
				try {
					await this.$command('PURCHASE_SHOPPINGCART_LOAD_MERCHANDISES', page)
				} catch(e) {
					console.log('抛出异常', e);
					return false;
				}
			},
			next() {
				if(!this.isLoadedAll) {
					this.loadMerchandises(this.currentPage + 1);
				}
			},
			addCart(merchandiseId, id = null) {
				let count = this.$store.getters['model.purchase.shoppingCarts/quality'](merchandiseId) + 1;
				this.$command('PURCHASE_SHOPPINGCART_CHANGE_MERCHANDISE', merchandiseId, id, count);
			},
			reduceCart(merchandiseId, id = null) {
				let count = this.$store.getters['model.purchase.shoppingCarts/quality'](merchandiseId) - 1;
				this.$command('PURCHASE_SHOPPINGCART_CHANGE_MERCHANDISE', merchandiseId, id, count);
			},
			clearShoppingCart() {
				try {
					this.$command('PURCHASE_SHOPPINGCART_CLEAR_MERCHANDISES');
				} catch(e) {
					console.log(e);
				}
			},
			async initData() {
				console.log(1111111111111111110000000000000000000011111111111111100000000000000);
				this.$store.dispatch('model.purchase.merchandises/setCurrentCategory', {
					categoryIndex: -1
				});
				await this.$command('LOAD_PURCHASE_CATEGORIES');
				this.categoryChange(0);
				await this.loadCartMerchandises();
			}
		},
		onShow() {
			this.isShow = false;
			this.initData();
		},
		destroyed() {
			this.$command('CLEAR_MERCHANDISE', 'model.purchase.merchandises');
		}
	}
</script>

<style scoped>
	.merchandises {
		display: flex;
		width: 100%;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
		height: 100%;
		background: #f2f2f2;
	}
</style>