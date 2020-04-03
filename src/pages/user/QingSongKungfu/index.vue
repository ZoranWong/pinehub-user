<!--suppress ALL -->
<template>
    <div>
        <CustomHeader :title="title" :needReturn="true" />
        <scroll-view
            :scroll-y="!isForbid"
            @scroll="bindScroll"
            enable-back-to-top="true"
            :style="{'height': mainHeight + 'px'}"
            class="scroll_wrapper"
        >
            <div class="cakes" >
                <div class="header">
                    <img class="images" src="./img/22305823.jpg" alt="">
                </div>
                <div class="banners">
                    <swiper
                        class="swiper"
                        circular="true"
                        :indicator-dots="false"
                        autoplay="true"
                        interval="5000"
                        duration="1000"
                        beforeColor="red"
                        indicator-color="#fff"
                        indicator-active-color="#ffcc00"
                        @animationfinish="bannerChange"
                        afterColor="coral">
                        <block v-for="(item, index) in activityBanners" :index="index" :key="index" >
                            <swiper-item >
                                <image :src="item.image" class="slide-image" mode="aspectFill" @click="bannerJump(item)"/>
                            </swiper-item>
                        </block>
                    </swiper>
                    <div class="dots">
                        <span class="dotsnum">{{current}}</span> / {{activityBanners.length}}
                    </div>
                </div>

                <div class="middle">
                        <img class="middleImage" src="./img/964024279.jpg" alt="">
<!--                    <Classification-->
<!--                        :top="toTop"-->
<!--                        @forbidScroll="forbidScroll"-->
<!--                        :headerHeight="headerHeight"-->
<!--                    />-->
                </div>

                <ul class="products" :style="{marginBottom: goodInShoppingCart.length ? '150rpx': '30rpx'}">
                    <li v-for="(item, key) in activityProducts" :key="key" class="product" @click="redirectTo('user.goodDetail', {query: {type:'activity', good_id: item.id, actId: actId}})">
                        <img :src="item['main_image']" alt="" class="productImg">
                        <div class="selledout" v-if="!item.stock">
                            <span class="selloutConent">已抢光</span>
                        </div>
                        <h3 class="name">{{item.name}}</h3>
                        <div class="statictics">
                            <span class="data">销量  {{item['sell_num']}}</span>
                            <span v-if="item.stock < 6  && item.stock > 0" class="data">仅剩{{item.stock}}件</span>
                            <span class="data origin" v-if="item['show_market_price'] && !item.specifications.length" >{{item['origin_price_format']}}</span>
                        </div>
                        <div class="bottom">
                            <h4 class="price" v-if="item['sell_price_reformat']">{{item['sell_price_reformat']}}
                            <span class="qi">起</span></h4>
                            <h4 class="price" v-else>{{item['sell_price_format']}}</h4>
                            <img class="add" src="../../../../static/icons/add.png" v-if="item.stock" alt="" @click.stop="addToShoppingCart(item)">
                            <img class="add" src="../../../../static/icons/disabledAdd.jpg" v-else alt="">
                        </div>
                    </li>
                </ul>



                <div class="cakeService" @touchstart="start" @touchmove="move" @touchend="end" :style="{'right': right +'px', 'top': top+'px'}">
                    <img class="service"  src="../../../../static/icons/cakeService.png" alt="" @click="connectKf">
                </div>


                <Specification
                    :selectSpec="selectSpec"
                    :item="selectItem"
                    :type="'activity'"
                    :actId="actId"
                    @close="closeSelectSpec" />

            </div>
        </scroll-view>
        <ShoppingCart
            :type="'activity'"
            :actId="actId"
        />
        <Auth v-if="getAuth" @close="closeAuth" />
        <GetUserMobile v-if="showBindMobile" @close="closeGetUserMobile" />
    </div>

</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';
	import Specification from './components/Specification';
	import ShoppingCart from '../../../components/ShoppingCart';
	import Auth from '../../../components/Auth';
	import GetUserMobile from '../../../components/GetUserMobile';
	import Classification from './components/Classification';
    import _ from 'underscore';
	export default {
		components: {
			CustomHeader,
            Specification,
            ShoppingCart,
            Auth,
            GetUserMobile,
            Classification,
		},
		data() {
			return {
				title: '生日蛋糕预定',
				screenHeight: 0,
				rpxRate: 1,
                actId: '',
                banners: [],
                phone: '17368878588',
				screenWitdh: 0,
                startPoint: {},
                right: 0,
                top: 450,
                selectItem:{},
                selectSpec: false,
                getAuth: false,
                current: 1,
                showBindMobile: false,
                toTop: 0,
                isForbid: false
			};
		},
		watch: {
            accessToken (value) {
                if (this.storeId && value) {
                    this.$command('SIGN_IN', this.accessToken);
                }
            },
            hasToken (value) {
                // if (this.storeId && this.hasToken) {
                //     this.loadPageData()
                // }
            },
            registered (value) {
                if (value) {
                    console.log(value, 'xxxxx');
                    this.getAuth = false;
                }

            },
            isMember (value) {
                if (value) {
                    this.actId && this.$command('LOAD_ACTIVITY_CART_COMMAND','', this.actId);
                }
                if (this.storeId&& this.registered && this.isMember) {
                    this.bindConsumer()
                }
            }
		},
        onShareAppMessage: function (res) {
            let options = this.options;
            console.log(this.shopCode, '==========>');
            return {
                title: "青松易购预定商城商品",
                desc: "青松易购小程序",
                // imageUrl: "https://kingdomcloud.oss-cn-hangzhou.aliyuncs.com/54401585878961_.pic_hd.jpg?Expires=1585880329&OSSAccessKeyId=TMP.3KjvjtDCPipDe6DfgJyaZbt8bgQXToaQjwj2okHxNEqdTZKRNxzeHrhsQq366w6MMy5dMZxf28oSgkMS1KNReQL744Vi1k&Signature=yHpl8R6lPtaTifUoWrQEyE9m5C0%3D",
                path: `/pages/user/QingSongKungfu/main?id=${this.actId}&backHome=${true}&shop_code=${this.storeId || this.shopCode}`,

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
		computed: {
            shopCode () {
                return this.model.account.shopCode
            },
			statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
			navHeight () {
                return this.model.global.barHeight.navHeight
			},
            headerHeight () {
                return this.statusBarHeight + this.navHeight;
            },
            mainHeight () {
                let systemInfo = wx.getSystemInfoSync();
                let height = systemInfo.windowHeight;
                return height - this.headerHeight - this.btnHeight;
            },
            btnHeight() {
                let systemInfo = wx.getSystemInfoSync();
                let isShow = this.goodInShoppingCart && this.goodInShoppingCart.length ? 100 : 0
                return isShow * systemInfo.windowWidth / 750;
            },
            activityBanners () {
                return this.model.activity.banners
            },
            activityProducts () {
			    return this.model.activity.products
            },
            goodInShoppingCart () {
			    return this.model.activity.goodInShoppingCart
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
            isMember () {
                return this.model.account.isMember;
            },
            registered () {
                return this.model.account.registered;
            },
		},
		methods: {
            forbidScroll (isForbid) {
                this.isForbid = isForbid
            },
            bindScroll (e) {
                let scrollTop = e.target.scrollTop;
                this.toTop = scrollTop;
            },
            closeGetUserMobile () {
                this.showBindMobile = false
            },
            bannerChange (e) {
                let event = e.mp.detail;
                this.current = event.current + 1;
            },
            bindConsumer () {
                this.$command('BIND_CONSUMER', this.storeId);
            },
            start(e){
                this.startPoint = e.touches[0];
            },
            bannerJump (banner) {
                console.log(banner);
                if (!banner['can_jump']) return;
                if (banner['action_type'] === 'PRODUCT_DETAIL') {
                    this.redirectTo('user.goodDetail', {query: {type:'activity', good_id: banner.link, actId: this.actId}})
                }
            },
            connectKf () {
                wx.makePhoneCall({
                    phoneNumber: this.phone,
                    success: function () {
                    }
                })
            },
            move (e) {
                let endPoint = e.touches[e.touches.length - 1];
                let translateX = endPoint.clientX - this.startPoint.clientX
                let translateY = endPoint.clientY - this.startPoint.clientY
                this.startPoint = endPoint
                let top = this.top + translateY
                let right = this.right - translateX
                //判断是移动否超出屏幕
                if (right + 90 >= this.screenWitdh/ 2) {
                    right = this.screenWitdh/2 - 90;
                }
                if (right <= 0) {
                    right = 0;
                }
                if (top <= 85) {
                    top = 85
                }
                if (top + 60 >= this.screenHeight /2) {
                    top = this.screenHeight/2 - 60;
                }
                this.top = top;
                this.right = right;
            },
            end () {
                console.log('11111111111111111');
            },
            closeSelectSpec(){
                this.selectSpec = false
            },
            addToShoppingCart(item){
                if (!this.registered) {
                    this.getUserAuth()
                } else {
                    if (!this.isMember) {
                        this.showBindMobile = true
                    } else {
                        if (item.specifications && item.specifications.length) {
                            this.selectItem = item;
                            this.selectSpec = true
                        } else {
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

            },
            redirectTo (router, options = {}) {
                this.$command('REDIRECT_TO', router, 'push', options);
            },
            getPhoneNumber (e) {
                this.$command('SET_USER_MOBILE', e);
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
            async uploadFormId (e) {
                let formId = e.mp.detail.formId;
                if (formId !== "the formId is a mock one"){
                    await this.http.account.saveFormId(formId);
                } else {
                    console.log('form id 不合法')
                }
            },
        },
		created() {
			this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
			this.screenWitdh = wx.getSystemInfoSync().windowHeight;
			this.screenHeight = (this.rpxRate * this.screenWitdh);

        },
		mounted() {
            let pages =  getCurrentPages();
            let options = pages[pages.length - 1]['options'];
            this.actId = parseInt(options.id);
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
            this.$command('LOAD_ACT_BANNER_COMMAND', this.actId);
            this.$command('LOAD_ACT_PRODUCTS_COMMAND', this.actId);
            if (this.isMember)  this.$command('LOAD_ACTIVITY_CART_COMMAND','', this.actId);
            this.initAccount();
        }
	}
</script>

<style>
	page {
		height: 100%;
		background: #f7f7f7;
        overflow: hidden;
	}

    .scroll_wrapper{
        box-sizing: border-box;
    }


    #shopping_cart{
        position: fixed;
        width: 100%;
        transition: 1s;
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

    @import "index.css";



</style>
