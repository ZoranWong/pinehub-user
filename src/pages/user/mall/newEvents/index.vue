<!--suppress ALL -->
<template>
	<div class="body">
		<mp-title :title="title"></mp-title>
		<merchandises :cartModel="cartModel" @show-cart="hdlShowCart" :next="next" :height="screenHeight" :list="merchandises" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" categoryId="activity"></merchandises>
		<pop-location v-if="isShow" @hdlHidePopup="hdlHidePopup" :activity-id="activityId">
		</pop-location>
		<div id="shopping_cart_height" v-if="totalCount>0"></div>
        <ShoppingCart :type="'breakfast'"/>
        <SelectSpecification
            :selectSpec="selectSpec"
            :item="selectItem"
            :type="'breakfast'"
            @close="closeSelectSpec" />
        <ChooseSelfRaisingPoint v-if="showPoints" @close="closePoints" />
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle'
	import Merchandises from './Merchandises';
	import ShoppingCart from '@/components/ShoppingCart';
	import PopupLocation from './PopupLocation'
    import _ from 'underscore'
	import ChooseSelfRaisingPoint from '@/components/ChooseSelfRaisingPoint';
	import SelectSpecification from '@/components/SelectSpecification';
	export default {
		data() {
			return {
				title: '新品预定',
				isShow: false,
				activityId: null,
				isShowCart: true,
				screenHeight: null,
                cartModel: 'model.newEvents.shoppingCarts',
				selectSpec:false,
				selectItem:{},
				merchandisesList: []
			}
		},
		components: {
			'mp-title': MpTitle,
			'merchandises': Merchandises,
			'pop-location': PopupLocation,
			SelectSpecification,
			ChooseSelfRaisingPoint,
			ShoppingCart
		},
		computed: {
			merchandises() {
				let merchandises = this.model.newEvents.merchandises.list;
				this.handleMerchandises(merchandises)
                console.log(merchandises, '=======111=====');
				return merchandises
			},
			totalCount() {
				return this.model.newEvents.shoppingCarts.totalCount;
			},
			currentPage() {
				let page = this.model.newEvents.merchandises.currentPage;
				return page
			},
			isLoadedAll() {
				return this.model.newEvents.merchandises.isLoadedAll;
			},
			goodInShoppingCart () {
				return  this.model.newEvents.shoppingCarts.goodInShoppingCart
            },
			showPoints () {
				return this.model.newEvents.shoppingCarts.showPoints
			}
		},
		watch: {},
		methods: {
			closePoints () {
				this.showPoints = false
			},
			handleMerchandises(list){
				_.map(list, function (product) {
					let productEntities = product['product_entities'];

					_.map(productEntities, function (itemEntities) {
						let specObj = {};
						_.map(itemEntities.specifications, function (spec) {
							specObj[spec.id] = spec['value'].value
						});
						itemEntities.specs = specObj
					});

					let minPrice = _.min(productEntities, (value) => {
						return value['market_price']
					});
					let maxPrice = _.max(productEntities, (value) => {
						return value['market_price']
					});

					let specifications = product['specifications'];
					if (specifications.length) {
						let spec = [];
						_.map(specifications, function (value) {
							spec.push(value.name)
							product['spec'] = spec.join(',');
						});
					}

					product['range'] = productEntities.length > 1 ? `￥${minPrice['market_price']}~￥${maxPrice['market_price']}` : `￥${minPrice['market_price']}`
				});
				this.merchandisesList = list
			},
			closeSelectSpec () {
				this.selectSpec = false
			},
			async loadMerchandises(page = 1) {
				await this.$command('ACTIVITY_LOADING_MERCHANDISES', page)
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
				await this.$command('ACTIVITY_SHOPPINGCART_LOAD_MERCHANDISES', page);
			},
			addCart(item) {
				if (item.specifications.length) {
					this.selectItem = item;
					this.selectSpec = true
				} else {
					let goods = this.model.newEvents.shoppingCarts.goodInShoppingCart;
					if (goods.length) {
						_.map(goods, (product) => {
							if (product['product_stock_id'] === item['product_entities'][0]['product_stock_id']) {
								this.$command('CHANGE_BREAKFAST_BUY_NUM_COMMAND',product,product['buy_num'] + 1)
                            } else {
								this.$command('ADD_GOODS_TO_BREAKFAST_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1)
                            }
						})
					} else {
						this.$command('ADD_GOODS_TO_BREAKFAST_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1)
					}
				}

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
				await this.loadMerchandises(1);
				await this.loadCartMerchandises(1);
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

<style>
	#shopping_cart_height {
		height: 68rpx;
	}

    #select_spec{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

    }

    #shopping_cart{
        position: fixed;
        width: 100%;
        transition: 1s;
    }
</style>
