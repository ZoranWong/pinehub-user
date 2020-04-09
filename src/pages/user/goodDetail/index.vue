<!--suppress ALL -->
<template>
    <div :style="{height: '100%'}">
<!--        <CustomHeader :title="title" :needReturn="true" />-->
        <div class="tranHeader" @click="back">
            <span  class="circle"  v-if="needBackHome"><i class="iconfont"  >&#xe664;</i></span>
            <span  class="circle"  v-else><i class="iconfont"  >&#xe679;</i></span>
        </div>
        <Auth v-if="getAuth" @close="closeAuth" />
        <GetUserMobile v-if="showBindMobile" @close="closeGetUserMobile" />
        <div id="good_detail" v-if="goodDetail" >
            <div class="good_detail_banner">
                <!--            <Swiper :images="goodDetail.banners" />-->
                <Banner :img-urls="goodDetail.banners" ></Banner>
            </div>
            <div id="good_detail_info">
                <div class="intro">
                    <div class="name">{{goodDetail.name}}</div>
                </div>
                <div v-if="showOperation(goodDetail)"></div>
                <div class="operation">
<!--                    <img src="../../../../static/icons/minus.png" class="minus" alt="" v-if="goodDetail.isInCart" @click.stop="addToShoppingCart(goodDetail, -1)" />-->
<!--                    <input type="number" v-if="goodDetail.isInCart" :value="goodDetail.inputNum" class="input" @blur="(e)=>changeItemBuyNum(e, goodDetail)"  >-->
                    <img src="../../../../static/icons/add.png" class="add" alt="" v-if="goodDetail.stock" @click.stop="addToShoppingCart(goodDetail, 1)" />
                    <img src="../../../../static/icons/disabledAdd.jpg" v-else alt="">
                </div>
            </div>
            <div id="good_synopsis">
                {{goodDetail['intro'] || ''}}
            </div>
            <h4 class="good_detail_price" v-if="actPrice === '暂无'">{{goodDetail['sell_price_format']}}</h4>
            <h4 class="good_detail_price" v-else>¥{{actPrice}}</h4>
            <div id="good_detail_statictics">
                <span class="is-underline" v-if="goodDetail['show_market_price'] && !goodDetail.specifications.length">{{goodDetail['origin_price_format']}}</span>
                <span>销量{{goodDetail['sell_num']}}</span>
                <span v-if="goodDetail['product_entities'] && goodDetail['product_entities'][0].stock < 6  && goodDetail['product_entities'][0].stock > 0">库存{{goodDetail['product_entities'][0].stock || 0}}</span>
            </div>

            <!--  促销信息  -->
            <div class="activity_info" v-if="options.type !== 'activity'">
                <span class="title">促销</span>
                <span class="tags">新人专享</span>
                <div class="desc">
                    新人专享一分钱超值购，每人每天购买
                    不超过1件，享受此优惠
                </div>
            </div>

            <!-- 商品详情 -->
            <wxParse no-data="" :content="goodDetail.detail"  />


            <ShoppingCart v-if="registered && isMember && options.type === 'activity'" :type="this.options['type']" :isDetail="actId? true : false" :actId="actId" />
            <SelectSpecification
                :selectSpec="selectSpec"
                :item="selectItem"
                :type="'mall'"
                @close="closeSelectSpec" />
            <Specification
                :selectSpec="selectActSpec"
                :item="selectActItem"
                :type="'activity'"
                :actId="actId"
                @close="closeSelectActSpec" />
            <ChooseSelfRaisingPoint v-if="showPoints" @close="closePoints" />
        </div>


        <div class="allCarts" @click="goShopppingCart" v-if="options.type !== 'activity'">
            <img src="../../../../static/icons/white_cart.png" alt="">
            <span v-if="total.quantity > 0">
                   {{total.quantity}}
                </span>

        </div>
    </div>

</template>

<script>
	import CustomHeader from '../../../components/CustomHeader';
	import ShoppingCart from '@/components/ShoppingCart';
	import ChooseSelfRaisingPoint from '@/components/ChooseSelfRaisingPoint';
	import SelectSpecification from '@/components/SelectSpecification';
	import Swiper from '../../../components/Swiper';
	import Banner from '../../../components/Banner';
	import wxParse from 'mpvue-wxparse'
    import Auth from '../../../components/Auth';
	import _ from 'underscore';
	import Specification from '../QingSongKungfu/components/Specification';
	import GetUserMobile from '../../../components/GetUserMobile';
	export default {
        name: 'goodDetail',
		components: {
			CustomHeader,
			ShoppingCart,
			SelectSpecification,
            Specification,
			ChooseSelfRaisingPoint,
			Swiper,
			Banner,
			wxParse,
			Auth,
            GetUserMobile
		},
        data() {
        	return {
				title: '商品详情',
				selectSpec:false,
				selectItem:{},
                options: {},
				screenWitdh: 0,
				screenHeight: 0,
				getAuth: false,
                actId: '',
                selectActItem: {},
                selectActSpec: false,
                showBindMobile: false,
                actPrice: '暂无'
            }
        },
        onShareAppMessage: function (res) {
            let options = this.options;
            return {
                title: "青松易购预定商城商品",
                desc: "青松易购小程序",
                imageUrl: "分享要显示的图片，如果不设置就会默认截图当前页面的图片",
                path: `/pages/user/goodDetail/main?type=${options.type}&good_id=${options['good_id']}&actId=${this.actId}&backHome=${true}&shop_code=${this.storeId || this.shopCode}`,

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
        watch: {
			accessToken (value) {
				if (this.storeId && value) {
					this.$command('SIGN_IN', this.accessToken);
				}
			},
			hasToken (value) {
				if (this.storeId && this.hasToken) {
					this.loadPageData()
				}
			},
			registered (value) {
                if (value) {
                    this.getAuth = false;
                }
            },
            isMember () {
                if (this.storeId&& this.registered && this.isMember) {
                    this.bindConsumer()
                }
                if (this.registered && this.isMember) {
                    this.showBindMobile = false
                }
            }
        },
        methods:{
            closeGetUserMobile () {
                this.showBindMobile = false
            },
            back(){
                if (this.needBackHome) {
                    this.$command('REDIRECT_TO','index','replace')
                } else {
                    this.$command('REDIRECT_TO','','back')
                }
            },
            changeItemBuyNum (e, item) {
                let value = e.target.value;
                if (value <= 0 || !value) {
                    value = 0;
                };
                if (value > item.isInCartProduct['stock_num']) {
                    value = item.isInCartProduct['stock_num']
                }
                this.$command('CHANGE_BUY_NUM_COMMAND',item['isInCartProduct'],  Number(value),'mall');
            },
			addToShoppingCart (item, num) {
                if (!this.registered) {
					this.getUserAuth()
                } else {
                    if (!this.isMember) {
                        this.showBindMobile = true
                    } else {
						if (item.specifications && item.specifications.length) {
                            if (this.options['type'] === 'activity') {
                                this.selectActItem = item;
                                this.selectActSpec = true
                            } else {
                                this.selectItem = item;
                                this.selectSpec = true
                            }
                        } else {
							if (this.options['type'] === 'mall') {
                                let goods = this.model.user.store.goodInShoppingCart;
                                if (goods.length) {
                                    let isInCart = false;
                                    let inCartProduct = {}
                                    for (let i = 0; i < goods.length; i++) {
                                        let product = goods[i];
                                        if (product['product_stock_id'] === item['product_entities'][0]['product_stock_id']) {
                                            isInCart = true
                                            inCartProduct = product;
                                            break
                                        } else {
                                            isInCart = false
                                        }
                                    }
                                    if (isInCart) {
                                        this.$command('CHANGE_BUY_NUM_COMMAND',inCartProduct,inCartProduct['buy_num'] + num,'mall');
                                    } else {
                                        this.$command('ADD_GOODS_TO_CART_COMMAND',item['product_entities'][0]['product_stock_id'],num,'mall')
                                    }
                                } else {
                                    this.$command('ADD_GOODS_TO_CART_COMMAND',item['product_entities'][0]['product_stock_id'],num,'mall')
                                }
							} else if (this.options['type'] === 'breakfast') {
								let goods = this.model.newEvents.shoppingCarts.goodInShoppingCart;
                                if (goods.length) {
                                    let isInCart = false;
                                    let inCartProduct = {}
                                    for (let i = 0; i < goods.length; i++) {
                                        let product = goods[i];
                                        if (product['product_stock_id'] === item['product_entities'][0]['product_stock_id']) {
                                            isInCart = true
                                            inCartProduct = product;
                                            break
                                        } else {
                                            isInCart = false
                                        }
                                    }
                                    if (isInCart) {
                                        this.$command('CHANGE_BREAKFAST_BUY_NUM_COMMAND',inCartProduct,inCartProduct['buy_num'] + 1)
                                    } else {
                                        this.$command('ADD_GOODS_TO_BREAKFAST_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1)
                                    }
                                } else {
                                    this.$command('ADD_GOODS_TO_BREAKFAST_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1)
                                }
							} else if (this.options['type'] === 'activity') {
                                let goods = this.model.activity.goodInShoppingCart;
                                if (goods.length) {
                                    let isInCart = false;
                                    let inCartProduct = {}
                                    for (let i = 0; i < goods.length; i++) {
                                        let product = goods[i];
                                        if (product['product_stock_id'] === item['product_entities'][0]['product_stock_id']) {
                                            isInCart = true
                                            inCartProduct = product;
                                            break
                                        } else {
                                            isInCart = false
                                        }
                                    }
                                    if (isInCart) {
                                        this.$command('CHANGE_ACTIVITY_BUY_NUM_COMMAND',inCartProduct,inCartProduct['buy_num'] + 1,'activity')
                                    } else {
                                        this.$command('ADD_GOODS_TO_ACTIVITY_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1,'activity',this.actId)
                                    }
                                } else {
                                    this.$command('ADD_GOODS_TO_ACTIVITY_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1,'activity',this.actId)
                                }
                            }
						}
					}
                }

			},
			closeSelectSpec(){
				this.selectSpec = false
			},
            closeSelectActSpec(){
				this.selectActSpec = false
			},
			async uploadFormId (e) {
				let formId = e.mp.detail.formId;
				if (formId !== "the formId is a mock one"){
					await this.http.account.saveFormId(formId);
				} else {
					console.log('form id 不合法')
				}
			},
			getNewUserInfo (e) {
				let self = this;
				this.$command('USER_REGISTER', e , this.options);
			},
			getPhoneNumber (e) {
				this.$command('SET_USER_MOBILE', e);
			},
            loadPageData () {
				this.$command('GOOD_DETAIL_COMMAND', this.options['type'], this.options['good_id'], this.options.actId || '')
            },
            bindConsumer () {
				this.$command('BIND_CONSUMER', this.storeId);
            },
			async initAccount () {
				let result = await this.map.getLocation();
				await this.$store.dispatch('model.account/resetFromCache', {
					initAccount: async () => {
						if (((this.accessTokenTTL - Date.now()) <= 0) || !this.accessToken) {
							this.$command('APP_ACCESS');
						} else {
							this.$command('SIGN_IN', this.accessToken);
						}
					}
				});
			},
			getUserAuth () {
				this.getAuth = true
			},
			closeAuth () {
				this.getAuth = false
			},
            goShopppingCart () {
                if (!this.registered) {
                    this.getUserAuth()
                } else {
                    if (!this.isMember) {
                        this.showBindMobile = true
                    } else {
                        this.$command('REDIRECT_TO', 'user.shoppingCart', 'reLaunch');
                    }
                }
            }
		},
        closePoints () {
            this.showPoints = false
        },
        created () {

		},
        computed : {
            goodInShoppingCart () {
                console.log('xxxxxx  this is the product details');
                return this.model.user.store.goodInShoppingCart;
            },
            total () {
                let products = this.goodInShoppingCart;
                console.log(products, '=======================>');
                let quantity = 0;
                _.map(products, (product)=>{
                    if (product.checked) {
                        quantity += Number(product['buy_num'])
                    }
                });
                console.log(quantity, '----- quantity ------');
                return {quantity}
            },
            isCartEmpty () {
                let type = this.options['type'];
                let isCartEmpty = false
                if (type === 'mall') {
                    isCartEmpty = !!(this.model.user.store.goodInShoppingCart.length)
                } else {
                    isCartEmpty = !!(this.model.newEvents.shoppingCarts.goodInShoppingCart.length)
                }
                return isCartEmpty
            },
            needBackHome () {
                let pages =  getCurrentPages();
                let options = pages[pages.length - 1]['options'];
                let need = options.backHome ? true : false;
                return need
            },
            showOperation(item){
                if (this.model.user.store.goodInShoppingCart && !this.model.user.store.goodInShoppingCart.length) {
                    return function (item) {
                        item.inputNum = 0
                        item.isInCart = false
                        item.isInCartProduct = {}
                    }
                }
                return function (item) {
                    let products = this.model.user.store.goodInShoppingCart;
                    let isInCart = false
                    if (item['product_entities']) {
                        for (let i = 0; i < item['product_entities'].length; i++) {
                            for (let k = 0; k < products.length; k++) {
                                let product = products[k];
                                let entity = item['product_entities'][i];
                                if (product['product_entity_id'] === entity.id) {
                                    item.inputNum = product['buy_num']
                                    item.isInCart = true
                                    item.isInCartProduct = product
                                    break;
                                } else {
                                    item.isInCart = false
                                }
                            }
                        }
                    }
                }
            },
            shopCode () {
                return this.model.account.shopCode
            },
			accessToken () {
				return this.$store.getters['model.app/accessToken'];
			},
			hasToken () {
				let overDate = this.$store.getters['model.account/overDate'];
				return overDate ? overDate > Date.now() : false;
			},
			accessTokenTTL () {
				return this.$store.getters['model.app/overDate'];
			},
			statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
			},
			navHeight () {
				return this.model.global.barHeight.navHeight
			},
			isMember () {
				return this.model.account.isMember;
			},
            goodDetail () {
				return this.model.user.goodDetail.goodDetail
            },
            detailRichText () {
                let detail = this.goodDetail.detail;
                return detail ? detail.replace(/\<img/gi, '<img style="max-width:100%;height:auto"') : '';
            },
			showPoints () {
				let breakfast = this.model.newEvents.shoppingCarts.showPoints;
				let mall = this.model.user.store.showPoints;
				if (this.options['type'] === 'mall') {
					return mall
                } else {
					return breakfast
                }
			},
			registered () {
				return this.model.account.registered;
			},
        },
        onShow () {
			this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
			this.screenWitdh = wx.getSystemInfoSync().windowHeight;
			this.screenHeight = (this.rpxRate * this.screenWitdh);
			let pages =  getCurrentPages();
			let options = pages[pages.length - 1]['options']
            this.storeId = options['shop_code'] ? options['shop_code'] : this.storeId;
			this.actPrice = (options['price'] || options['price'] === 0) || '暂无';

            if (this.storeId) {
                if(this.registered && this.isMember) {
                    this.$command('BIND_CONSUMER', this.storeId)
                }
                 this.model.account.dispatch('saveShopCode', {
                    code: this.storeId
                })
            }
            if (this.registered && this.isMember ) {
                this.$command('LOAD_CART_COMMAND', 'mall')
            }
			this.actId = options['actId'] ? options['actId'] : '';
			this.options = options;
			if (!this.registered) {
				this.initAccount();
			}
            this.loadPageData()

		},
		onLoad (options) {
			if (options.q) {
				let scan_url = decodeURIComponent(options.q);
				//提取链接中的数字，也就是链接中的参数id，/\d+/ 为正则表达式
				this.storeId = scan_url.match(/\d+/)[0];
			}
            this.model.user.goodDetail.dispatch('setGoodDetail', {
                good: {}
            })
		}
	}
</script>

<style>
    @import url("~mpvue-wxparse/src/wxParse.css");
    #good_detail{
        width: 750rpx;
        box-sizing: border-box;
        overflow: auto;
    }

    #good_synopsis {
        padding: 0 40rpx;
        color: #757575;
        font-size: 28rpx;
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

    #select_spec_act{
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

    #detailImage{
        width: 100%;
        height: auto;
    }

    #good_detail .good_detail_banner{
        width: 100%;
        height: 750rpx;
    }

    #good_detail .good_detail_banner img{
        width: 100%;
        display: block !important;
    }

    #good_detail #good_detail_info{
        display: flex;
        padding: 10rpx 40rpx;
        width: 670rpx;
        justify-content: space-between;
        align-items: center;
    }

    .operation{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .operation .input {
        width: 44rpx;
        margin: 0 3rpx;
        border: none;
        text-align: center;
        z-index: 1;
    }

    #good_detail #good_detail_info .intro{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    rich-text{
        width: 100%;
    }

    #good_detail #good_detail_info .intro .image-wrap {
        width: 100% !important;
        height: auto !important;
        background: #ffcc00;
    }

    #good_detail #good_detail_info .intro .image-wrap img{
        width: 600rpx !important;
        height: auto !important;
        display: block;
    }

    #detailImage{
        width: 600rpx;
    }



    #good_detail #good_detail_info .intro .name{
        font-size: 32rpx;
        color: #111111;
        margin: 19rpx 0;
    }

    #good_detail #good_detail_info .intro .desp{
        font-size: 28rpx;
        color: #757575;
    }

    #good_detail #good_detail_info i{
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 48rpx;
    }

    #good_detail .good_detail_price{
        font-size: 36rpx;
        width: 670rpx;
        color: #fe4a2c;
        padding: 0 40rpx;
        margin-top: 40rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #good_detail #good_detail_statictics{
        padding: 0 40rpx;
        width: 670;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 22rpx;
        padding-bottom: 30rpx;
    }

    #good_detail #good_detail_statictics .is-underline{
        text-decoration: line-through;
    }


    #good_detail #good_detail_statictics span {
        font-size: 28rpx;
        color: #757575;
    }

    .toast_area {
        position: fixed;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, .3);
        z-index: 1000;
    }

    .toast {
        position: absolute;
        background: #FFFFFF;
        width: 620rpx;
        border-radius: 10rpx;
        top: 338rpx;
        left: 65rpx;
    }

    .toast_title {
        background: #FECE00;
        text-align: center;
        line-height: 96rpx;
        border-radius: 10rpx 10rpx 0 0;
        font-size: 34rpx;
        font-weight: 400;
    }

    .toast_content {
    }

    .add,.minus{
        width: 24px;
        height: 24px;
    }

    .toast_content_info {
        padding: 20rpx 40rpx;
    }

    .input_change_info {
        font-size: 32rpx;
        font-weight: 300;
        color: #111111;
        margin-bottom: 20rpx;
    }

    .input_change_tips{
        font-size: 22rpx;
        font-weight: 300;
        color: #828282;
        text-align: center;
        line-height: 68rpx;
    }

    .input_change_btn_detail {
        background: #FECE00;
        line-height: 78rpx;
        text-align: center;
        font-size: 34rpx;
        font-weight: 400;
        border-radius: 10rpx;
    }

    .mobile_box_tips {
        text-align: center;
        line-height: 96rpx;
        border-radius: 10rpx 10rpx 0 0;
        font-size: 29rpx;
        font-weight: 400;
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

    .tranHeader{
        position: fixed;
        left: 20rpx;
        top: 100rpx;
        z-index: 10000;
    }

    .tranHeader .circle{
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        background: rgba(17,17,17,0.2);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tranHeader .circle i{
        font-size: 40rpx;
        color: #fff;
    }

    .allCarts{
        position: fixed;
        left: 20px;
        bottom: 125px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: rgba(17,17,17,0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .allCarts img{
        width: 24px;
        height: 24px;
    }

    .allCarts span{
        position: absolute;
        top: 4px;
        right: -5px;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background: #FE3B32;
        color: #fff;
        border: 1px solid #fff;
        display: flex;
        justify-content: center;
        align-items: center
    }

    .activity_info{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 30rpx 40rpx;
        box-sizing: border-box;
        border-top: 10rpx solid #F4F1F4;
        border-bottom: 10rpx solid #F4F1F4;
    }

    .activity_info .title{
        font-size: 28rpx;
        color: #999;
        height: 36rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .activity_info .tags{
        margin-left: 30rpx;
        margin-right: 20rpx;
        padding: 0 8rpx;
        box-sizing: border-box;
        border: 2rpx solid #FFB7A9;
        border-radius: 10rpx;
        font-size: 18rpx;
        color: #FB4E26;
        height: 36rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .activity_info .desc{
        width: 465rpx;
        font-size: 28rpx;
        color: #333;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
    }
</style>
