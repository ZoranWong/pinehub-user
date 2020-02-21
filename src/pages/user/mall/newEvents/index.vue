<!--suppress ALL -->
<template>
	<div class="body">
        <CustomHeader :title="title" :needReturn="true" />
        <Auth v-if="getAuth" @close="closeAuth" />
        <div v-if="!isMember && registered" class="bgff user-mobile-box">
            <div class="user_mobile_box_container">
                <form report-submit="true" @submit="uploadFormId">
                    <button form-type="submit" class="user-mobile-get-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
                        手机号授权
                    </button>
                </form>

                <em class="mobile_box_tips">
                    我们需要您的手机号来创建账号，累计积分
                </em>
            </div>

        </div>
        <merchandises :cartModel="cartModel" @show-cart="hdlShowCart" :next="next" :height="screenHeight" :list="merchandises" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" categoryId="activity" :statusBarHeight="statusBarHeight" :navHeight="navHeight"></merchandises>
		<pop-location v-if="isShow" @hdlHidePopup="hdlHidePopup" :activity-id="activityId">
		</pop-location>
		<div id="shopping_cart_height" v-if="totalCount>0"></div>
        <ShoppingCart v-if="registered && isMember" :type="'breakfast'"/>
        <SelectSpecification
            :selectSpec="selectSpec"
            :item="selectItem"
            :type="'breakfast'"
            @close="closeSelectSpec" />
        <ChooseSelfRaisingPoint v-if="showPoints" @close="closePoints" />
	</div>
</template>

<script>
	import CustomHeader from '../../../../components/CustomHeader';
	import Auth from '../../../../components/Auth';
	import Merchandises from './Merchandises';
	import ShoppingCart from '@/components/ShoppingCart';
	import PopupLocation from './PopupLocation'
    import _ from 'underscore'
	import ChooseSelfRaisingPoint from '@/components/ChooseSelfRaisingPoint';
	import SelectSpecification from '@/components/SelectSpecification';
	export default {
		data() {
			return {
				title: '早餐预定',
				isShow: false,
				activityId: null,
				isShowCart: true,
				screenHeight: null,
                cartModel: 'model.newEvents.shoppingCarts',
				selectSpec:false,
				selectItem:{},
				merchandisesList: [],
                getAuth: false,
			}
		},
		components: {
			CustomHeader,
			'merchandises': Merchandises,
			'pop-location': PopupLocation,
			SelectSpecification,
			ChooseSelfRaisingPoint,
			ShoppingCart,
			Auth
		},
		computed: {
            shopCode () {
                return this.model.account.shopCode
            },
			merchandises() {
				let merchandises = this.model.newEvents.merchandises.list;
				this.handleMerchandises(merchandises)
				return merchandises
			},
			totalCount() {
				return this.model.newEvents.shoppingCarts.totalCount;
			},
			statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
			},
			navHeight () {
				return this.model.global.barHeight.navHeight
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
			},
			registered () {
				return this.model.account.registered;
			},
			isMember () {
				return this.model.account.isMember;
			},
		},
		watch: {
			isMember (value) {
				if (value) {
				}
			},
            registered (value) {
                if (value) {
                    this.getAuth = false;
                }
            }
        },
        onShareAppMessage: function (res) {
            //可以先看看页面数据都有什么，得到你想要的数据
            console.log(this.shopCode, '==========>');
            return {
                title: "青松易购早餐预定",
                desc: "青松易购小程序",
                imageUrl: "分享要显示的图片，如果不设置就会默认截图当前页面的图片",
                path: `/pages/user/mall/newEvents/main?backHome=${true}&shop_code=${this.storeId || this.shopCode}`,

                success: function (res) {
                    // 转发成功
                    console.log("转发成功:" + JSON.stringify(res));
                },
                fail: function (res) {
                    // 转发失败
                    console.log("转发失败:" + JSON.stringify(res));
                }
            }
        },
		methods: {
			getUserAuth () {
				this.getAuth = true
			},
			closeAuth () {
				this.getAuth = false
			},
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
				if (!this.registered) {
					this.getUserAuth();
                } else {
					if (!this.isMember) {
					} else {
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
            let pages =  getCurrentPages();
            let options = pages[pages.length - 1]['options'];
            this.storeId = options['shop_code'] ? options['shop_code'] : '';
            if (this.storeId) {
                this.model.account.dispatch('saveShopCode', {
                    code: this.storeId
                })
            }
            if (this.storeId && this.registered && this.isMember ) {
                console.log('进来了吗');
                this.$command('BIND_CONSUMER', this.storeId)
            }
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

    .user-mobile-box{
        position: fixed;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, .3);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .user-mobile-box .user_mobile_box_container{
        position: absolute;
        background: #FFFFFF;
        width: 620rpx;
        border-radius: 10rpx;
        top: 338rpx;
        left: 65rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .user-mobile-get-btn {
        height: 80rpx;
        width: 320rpx;
        text-align: center;
        line-height: 80rpx;
        background: #FECE00;
        margin-top: 80rpx;
        margin-bottom: 40rpx;
        display: block;
        font-size: 32rpx;
        font-weight: 200;
        border: 0;
        border-radius: 80rpx;
        box-shadow: 0 10rpx 10rpx #fff6bd;
    }

    .mobile_box_tips {
        text-align: center;
        line-height: 96rpx;
        border-radius: 10rpx 10rpx 0 0;
        font-size: 29rpx;
        font-weight: 400;
    }
</style>
