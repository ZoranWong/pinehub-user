<!--suppress ALL -->
<template>
    <div :style="{height: '100%'}">
        <CustomHeader :title="title" :needReturn="true" />
        <Auth v-if="getAuth" @close="closeAuth" />
        <div id="good_detail" v-if="goodDetail"  :style="{height: screenHeight - (navHeight + statusBarHeight) -100 + 'rpx'}">

            <div v-if="showBindMobile" class="bgff user-mobile-box">
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
            <div class="good_detail_banner">
                <!--            <Swiper :images="goodDetail.banners" />-->
                <Banner :img-urls="goodDetail.banners" ></Banner>
            </div>
            <div id="good_detail_info">
                <div class="intro">
                    <div class="name">{{goodDetail.name}}</div>
                </div>
                <i class="iconfont" @click="addToShoppingCart(goodDetail)" v-if="goodDetail['product_entities'] && goodDetail['product_entities'][0].stock">&#xe6d8;</i>
            </div>
            <div id="good_synopsis">
                {{goodDetail['intro']}}
            </div>
            <h4 class="good_detail_price">{{goodDetail['sell_price_format']}}</h4>
            <div id="good_detail_statictics">
                <span class="is-underline">{{goodDetail['origin_price_format']}}</span>
                <span>销量{{goodDetail['sell_num']}}</span>
                <span v-if="goodDetail['product_entities']">库存{{goodDetail['product_entities'][0].stock || 0}}</span>
            </div>
            <!-- 商品详情 -->
            <wxParse no-data="" :content="goodDetail.detail"  />

            <ShoppingCart v-if="registered && isMember" :type="this.options['type']" :actId="actId" />
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
			Auth
		},
        data() {
        	return {
				title: '商品详情',
				selectSpec:false,
				selectItem:{},
				showBindMobile: false,
                options: {},
				screenWitdh: 0,
				screenHeight: 0,
				getAuth: false,
                actId: '',
                selectActItem: {},
                selectActSpec: false
            }
        },
        onShareAppMessage: function (res) {
            let options = this.options;
            return {
                title: "青松易购预定商城商品",
                desc: "青松易购小程序",
                imageUrl: "分享要显示的图片，如果不设置就会默认截图当前页面的图片",
                path: `/pages/user/goodDetail/main?type=${options.type}&good_id=${options['good_id']}`,

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
				if (this.storeId&& this.registered) {
					this.bindConsumer()
                }
            },
            isMember (value) {
				if (value) {
				    this.showBindMobile = false
                }
            }
        },
        methods:{
			addToShoppingCart (item) {
                if (!this.registered) {
					this.getUserAuth()
				} else {
                    if (!this.isMember) {
						this.showBindMobile = true
					} else {
						this.showBindMobile = false
						if (item.specifications && item.specifications.length) {
                            console.log('xxxxxxxxxxxxx');
                            if (this.options['type'] === 'activity') {
                                console.log('xxcccccccccccccccccc');
                                this.selectActItem = item;
                                this.selectActSpec = true
                            } else {
                                this.selectItem = item;
                                this.selectSpec = true
                            }
                        } else {
							if (this.options['type'] === 'mall') {
								let goods = this.model.user.store.goodInShoppingCart
								if (goods.length) {
									_.map(goods, (product) => {
										product['product_stock_id'] === item['product_entities'][0]['product_stock_id']?
											this.$command('CHANGE_BUY_NUM_COMMAND',product,product['buy_num'] + 1,this.options['type'])
											:
											this.$command('ADD_GOODS_TO_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1,this.options['type'])
									})
								} else {
									this.$command('ADD_GOODS_TO_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1,this.options['type'])
								}
							} else if (this.options['type'] === 'breakfast') {
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
							} else if (this.options['type'] === 'activity') {
                                let goods = this.model.activity.goodInShoppingCart;
                                if (goods.length) {
                                    _.map(goods, (product) => {
                                        product['product_stock_id'] === item['product_entities'][0]['product_stock_id']?
                                            this.$command('CHANGE_ACTIVITY_BUY_NUM_COMMAND',product,product['buy_num'] + 1,'activity')
                                            :
                                            this.$command('ADD_GOODS_TO_ACTIVITY_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1,'activity',this.actId)
                                    })
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
		},
        closePoints () {
            this.showPoints = false
        },
        created () {

		},
        computed : {
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
			this.actId = options['actId'] ? options['actId'] : '';
			this.options = options;
			if (this.storeId) {
				this.initAccount();
			} else {
				this.loadPageData()
            }
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
        height: 400rpx;
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
        color: #ffcc00;
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
        border-bottom: 6rpx solid #f2f2f2;
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

</style>
