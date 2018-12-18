<template>
	<div class="body">
		<title :title="title"></title>
		<div id="select_date">
			<i class="shopping_cart_calendar_ico"></i>
			<!--<picker mode="date" :start="startDate" class="shopping_cart_date" @change="getSelectDate">{{selectDate}}</picker>-->
			<i>当前选择的是</i>
			<picker class="shopping_cart_batch" @change="getselectBatch" :range="batchList" range-key="name" :key="index">
				{{selectBatch}}
			</picker>
			<i class="shopping_cart_status">到货</i>
		</div>
		<div class="merchandises">
			<categories @categoryChange="categoryChange"></categories>
			<merchandises :batch="selectBatchId" :model="model" :width="listwidth" :next="next" :list="merchandises" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :categoryId="'store_merchandises_' + categoryId">
			</merchandises>
		</div>
		<cart :model="model" v-if="isShowCart" @hdlShowPopup="hdlShowPopup" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :clearShoppingCart="clearShoppingCart"></cart>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle';
	import MerchandiseList from '@/components/MerchandiseList';
	import Categories from './Categories';
	import Cart from '@/components/PurchaseShoppingCarts'
	export default {
		data() {
			return {
				title: '选择产品',
				selectDate: (new Date()).format('yyyy/MM/dd'),
				startDate: (new Date()).format('yyyy-MM-dd'),
				batchList: [{
					'id': 1,
					'name': '5:30'
				}, {
					'id': 2,
					'name': '9:30'
				}, {
					'id': 3,
					'name': '15:30'
				}],
				selectBatch: null,
				selectBatchId: 1,
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
			},
			storeId() {
				return 1;
//				return this.$store.getters['model.account/shopInfo'].id;
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
				console.log(merchandiseId, id);
				let batch = this.selectBatchId;
				let storeId = this.storeId;
				let count = this.$store.getters['model.purchase.shoppingCarts/quality'](merchandiseId, batch) + 1;
				this.$command('PURCHASE_SHOPPINGCART_CHANGE_MERCHANDISE', storeId, batch, merchandiseId, id, count, batch);
			},
			reduceCart(merchandiseId, id = null) {
				let batch = this.selectBatchId;
				let storeId = this.storeId;
				let count = this.$store.getters['model.purchase.shoppingCarts/quality'](merchandiseId, batch) - 1;
				this.$command('PURCHASE_SHOPPINGCART_CHANGE_MERCHANDISE', storeId, batch, merchandiseId, id, count, batch);
			},
			clearShoppingCart() {
				
			},
			async initData() {
				this.selectBatch = this.batchList[0].name;
				console.log(1111111111111111110000000000000000000011111111111111100000000000000);
				this.$store.dispatch('model.purchase.merchandises/setCurrentCategory', {
					categoryIndex: -1
				});
				await this.$command('LOAD_PURCHASE_CATEGORIES');
				this.categoryChange(0);
				await this.loadCartMerchandises();
			},
			getSelectDate(e) {
				this.selectDate = (new Date(e.target.value)).format('yyyy/MM/dd');
			},
			getselectBatch(e) {
				this.selectBatch = this.batchList[e.target.value].name;
				this.selectBatchId = this.batchList[e.target.value].id;
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
	
	#select_date {
		height: 88rpx;
		background: #FFFFFF;
		border-bottom: 1rpx solid #E0E0E0;
	}
	
	#select_date i {
		display: inline-block;
		float: left;
		line-height: 42rpx;
		height: 42rpx;
		margin-top: 22rpx;
		font-size: 28rpx;
	}
	
	#select_date picker {
		display: inline-block;
		float: left;
		line-height: 42rpx;
		height: 42rpx;
		margin-top: 22rpx;
		font-size: 28rpx;
	}
	
	#select_date i:first-child {
		margin-left: 20rpx;
	}
	
	.shopping_cart_calendar_ico {
		width: 40rpx;
		height: 42rpx;
		background: url(../../../../static/images/icon/ico_puechase_2.png) no-repeat center center;
		background-size: 40rpx 42rpx;
		margin-right: 20rpx;
	}
	
	.shopping_cart_batch {
		color: #757575;
		margin-left: 16rpx;
	}
	
	.shopping_cart_status {
		margin-left: 22rpx;
	}
</style>