<!--suppress ALL -->
<template>
    <div class="body home-page">
        <CustomHeader :title="title" :needReturn="false" />
        <Auth v-if="showAuth" @close="closeAuth" />
        <div class="mainContainer" :style="{'height' : mainHeight + 'px'}">
            <div id="index_header" >
                <div class="banners">
                    <swiper class="index-swiper" circular="true" :indicator-dots="false" autoplay="true" interval="3000" duration="500" @animationfinish="bannerChange" @transition="bannerTransition">
                        <block v-for="(item, index) in indexBanners" :index="index" :key="key" >
                            <swiper-item :key="key">
                                <image :src="item.image" class="index-slide-image" mode="aspectFill" @click="bannerJump(item)"/>
                            </swiper-item>
                        </block>
                    </swiper>
                    <div class="customDots">
                        <span v-for="(item,index) in indexBanners" :key="index" :class="index === currentIndex ? 'dots activeDots':'dots'" ></span>
                    </div>
                </div>
            </div>
            <div class="allCates">
                <div class="catesHeader">
                    <h3>预定商城</h3>
                    <span @click="goStoreCates('more')">更多<img src="../../../../static/icons/rightArrow.png" alt=""></span>
                </div>
                <ul class="classifications">
                    <li v-for="(item,index) in categories" :key="index" class="cates" @click="goStoreCates(item.id)">
                        <img :src="item.icon" v-if="item.icon" alt="">
                        <img :src="'./img/'+index+'.png'" v-else alt="">
                        <span>{{item.name}}</span>
                    </li>
                    <li class="cates">
                        <img src="./img/more.png" alt="" @click="goStoreCates('more')">
                        <span>更多商品</span>
                    </li>
                </ul>
            </div>

            <div class="extra">
                <img src="./img/shoppinggroup.png" alt="" @click="jumpShoppingGroup">
                <img src="../../../fast-food.png" @click="boxLunchOrder" alt="">
            </div>

            <div class="coupons" v-if="tickets.length">
                <swiper class="couponSwiper" circular="true" :indicator-dots="false" :autoplay="true" interval="3000" @animationfinish="couponChange" duration="1000">
                    <block v-for="(item, index) in tickets" :index="index" :key="item.id" >
                        <swiper-item :key="item.id" class="couponItem" @click="goCouponCenter">
                            <div class="couponLeft">
                                <h3 v-if="item.type === 'DISCOUNT' ">
                                    {{item.benefit}}
                                    <em>折</em>
                                </h3>
                                <h3 v-else>
                                    <em>￥</em>
                                    {{item.benefit}}
                                </h3>
                                <span>{{item.floor}}</span>
                            </div>
                            <div class="couponRight">
                                <h3>{{item.title}}</h3>
                                <span class="tag">{{item.type === 'DISCOUNT' ? '折扣券': '现金券'}}</span>
                                <div class="bottom">
                                    <span>{{item['valid_term_desc']}}</span>
                                    <button @click.stop="receiveIt(item.id)" v-if="item['can_receive']">立即领取</button>
                                    <button @click.stop="goStoreCates('more')" v-else>立即使用</button>
                                </div>
                            </div>
                        </swiper-item>
                    </block>
                </swiper>
                <div class="couponDots">
                    <span>{{currentCoupon}}</span> / {{tickets.length}}
                </div>
            </div>

            <div class="activityContainer" v-for="(act,index) in activities" :key="index" v-if="act['entry_template'] && act['entry_template'].length">
                <Module_1 v-if="act['entry_template'].length && act['entry_template'][0].name === 'module_1'" :image="act['entry_template'][0].image" :id="act.id" @do="goActDetails(act)" />
                <Module_2
                    v-if="act['entry_template'].length && act['entry_template'][0].name === 'module_2'"
                    :products="act['entry_template'][0].data" :id="act.id" :image="act['entry_template'][0].image"
                    @do="goActDetails(act)" @addToCart="addToCart"
                />
            </div>

            <div class="recommend">
                <div class="recommendHeader">
                    <div class="left">
                        <span></span>
                        <h3>推荐商品</h3>
                    </div>
                    <div class="right" @click="goStoreCates('more')">
                        <span>全部商品</span>
                        <img src="../../../../static/icons/rightArrow.png" alt="">
                    </div>
                </div>
                <RecommendProducts  @addToCart="addToCart" />
            </div>
        </div>
        <i-modal :title="modalTitle" class="home-modal" :okColor="color" :visible="visible" :cancel-text="cancelText" :ok-text="okText" @ok="handleSure" @cancel="handleMOre">
            <view>{{NearByshopName}}</view>
        </i-modal>
        <GetUserMobile v-if="showBindMobile" @close="closeGetUserMobile" />
        <ReceivedNewTickets v-if="newUserCoupon" @close="closePop" />
        <OldUserReceivedNewTickets v-if="newCoupons.length" :coupons="newCoupons" @close="closeNewPop" />
        <footer-nav :navName="navName" @getUserAuth="getUserAuth"></footer-nav>
    </div>
</template>

<script>
    import FooterNav from '@/components/FooterNav';
    import CustomHeader from './components/CustomHeader';
    import Auth from '../../../components/Auth';
    import ReceivedNewTickets from '../../../components/ReceivedNewTickets';
    import OldUserReceivedNewTickets from '../../../components/OldUserReceivedNewTickets';
    import {getUpdateMange} from '../../../utils/getUpdateManage';
    import GetUserMobile from '../../../components/GetUserMobile';
    import _ from 'underscore';
    import Module_1 from './components/Module_1';
    import Module_2 from './components/Module_2';
    import RecommendProducts from '../../../components/RecommendProducts';
    import {Base64} from '../../../utils/beSecret';
    export default {
        components: {
            'footer-nav': FooterNav,
            CustomHeader,
            Auth,
            ReceivedNewTickets,
            OldUserReceivedNewTickets,
            GetUserMobile,
            Module_1,
            Module_2,
            RecommendProducts
        },
        data () {
            return {
                latitude:"",
                longitude:"",
                color:"#FFCC00",
                navName: 'index',
                inited: false,
                ticketShow: true,
                title: '青松易购',
                options: [],
                getAuth: false,
                name: '',
                currentIndex: 0,
                currentCoupon: 1,
                alpha: 1,
                timer: null,
                showAuth: false,
                showBindMobile: false,
                visible:false,
                NearByshopName:'您附近没有门店哦～',
                okText:"查看更多",
                cancelText:"随便看看",
                modalTitle:"很遗憾！",
                shopObj:{},
                shopId:""
            };
        },
        computed: {
            shopCode () {
                return this.model.account.shopCode
            },
            tickets () {
                return this.model.user.tickets.canReceiveTickets
            },
            indexBanners () {
                return this.model.user.newIndex.indexBanners
            },
            categories () {
                let categories = this.model.user.store.categories;
                let cates = [];
                _.map(categories, (cate, index) => {
                    if (index < 4) {
                        cates.push(cate)
                    }
                })
                return cates;
            },
            headerAnimate () {
                return this.$imageUrl('bear01.gif');
            },
            hasToken () {
                let overDate = this.model.account.overDate;
                return overDate ? overDate > Date.now() : false;
            },
            registered () {
                return this.model.account.registered;
            },
            isAuth () {
                return this.model.account.isAuth;
            },
            isMember () {
                return this.model.account.isMember;
            },
            availableScore () {
                return this.model.account.availableScore;
            },
            userNickname () {
                return this.model.account.userInfo.nickname;
            },
            isLogin () {
                let overDate = this.model.account.overDate;
                return overDate ? overDate > Date.now() : false;
            },
            hasLoadedActivity () {
                return this.model.activity.id !== null;
            },
            activityId () {
                return this.model.activity.id;
            },
            accessToken () {
                return this.model.app.accessToken;
            },
            accessTokenTTL () {
                return this.model.app.overDate;
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
                return height - this.headerHeight - this.footerHeight;
            },
            footerHeight () {
                let systemInfo = wx.getSystemInfoSync();
                return 108 * systemInfo.windowWidth / 750;
            },
            activities () {
                return this.model.activity.activities
            },
            userId () {
                return this.model.account.userId;
            },
            newUserCoupon () {
                return this.model.account.newUserCoupon
            },
            newCoupons () {
                return this.model.account.newCoupons
            }
        },
        watch: {
            cates (val) {
                if (val.length) {
                    this.$command('LOAD_STORE_COMMAND', val[0].id, 1)
                }
            },
            accessToken (value) {
                if (value) {
                    this.$command('SIGN_IN', this.accessToken);
                }
            },
            hasToken (value) {
                if (this.hasToken) {
                    this.$command('LOAD_ACCOUNT', false);
                }
            },
            registered (value) {
                if (value) {
                    this.closeAuth()
                }
                if (value && !this.isMember) {
                    console.log('是否注册', value);
                    this.showBindMobile = true
                }
            },
            isMember (val) {
                if (val) {
                    this.showBindMobile = false;
                }
                if (this.storeId && this.registered && this.isMember) {
                    this.bindConsumer()
                }
                if (this.registered && this.isMember) {
                    this.$command('LOAD_POP', 'PLATFORM_SEND');
                    this.$command('LOAD_CAN_RECEIVE_TICKETS', 1);
                    this.$command('LOAD_CART_COMMAND', 'mall')
                }
            },
            userId (val) {
                if (val) {
                    this.$socket.userId = val;
                    this.$socket.notification((data) => {
                        console.log(data, '-------- APP User notification --------');
                    });
                    this.$socket.eventListener('groupShopping.shopShoppingGroup.1.orders', 'OrderPaid', (data) => {
                        console.log(data, '--------------- APP SOCKET TEST EVENT ------------');
                    });
                }
            }
        },
        mounted () {
            wx.getSetting({
                success (res) {
                    console.log(res, 'wx.getSetting');
                }
            })
            getUpdateMange();
            this.$command('LOAD_INDEX_BANNER')
            this.$command('LOAD_STORE_CATEGORIES_COMMAND');
            let pages = getCurrentPages();
            let options = pages[pages.length - 1]['options']
            this.storeId = options['shop_code'] ? options['shop_code'] : this.storeId;
            if (this.storeId) {
                this.model.account.dispatch('saveShopCode', {
                    code: this.storeId
                })
            }
            if (this.registered && this.isMember) {
                // this.$command('LOAD_CAN_RECEIVE_TICKETS', 1);
                // console.log('进来了吗');
                this.$command('LOAD_CART_COMMAND', 'mall')
                if (this.storeId) {
                    this.bindConsumer()
                }
            }
        },
        onShareAppMessage: function (res) {
            console.log(this.shopCode, '==========>');
            // 可以先看看页面数据都有什么，得到你想要的数据
            return {
                title: '青松易购首页',
                desc: '青松易购小程序',
                imageUrl: '',
                path: `/pages/user/index/main?shop_code=${this.storeId || this.shopCode}`,
                success: function (res) {
                    // 转发成功
                    console.log('转发成功:' + JSON.stringify(res));
                },
                fail: function (res) {
                    // 转发失败
                    console.log('转发失败:' + JSON.stringify(res));
                }
            }
        },
        onShow (option) {
            this.initAccount();
            this.$command('ACTIVITIES')
            if (this.$route.query['needRefresh']) {
                this.initAccount();
            }
            let pages = getCurrentPages();
            let options = pages[pages.length - 1]['options']
            this.storeId = options['shop_code'] ? options['shop_code'] : this.storeId;
            if (this.storeId) {
                this.model.account.dispatch('saveShopCode', {
                    code: this.storeId
                })
            }
            if (this.storeId && this.registered && this.isMember) {
                this.bindConsumer()
            }

            if (this.registered && this.isMember) {
                this.$command('LOAD_POP', 'PLATFORM_SEND');
            }
        },
        onLoad (options) {
            if (options.q) {
                let scan_url = decodeURIComponent(options.q);
                let query = this.uri.queryParse(scan_url);

                // 提取链接中的数字，也就是链接中的参数id，/\d+/ 为正则表达式
                this.storeId = query['store_id'];
                if (query['page']) {
                    this.$command('REDIRECT_TO', query['page'], 'push');
                }
            }
            if(options.shop_id){
                this.shopId=options.shop_id;
            }
            wx.onAppShow(() => {
                this.ticketShow = true;
            });
            wx.getLocation({
                type: 'wgs84',
                success: (res)=> {
                    let latitude = res.latitude
                    let longitude = res.longitude
                    this.latitude=latitude;
                    this.longitude=longitude;
                    let param={
                        lat:latitude,//当前位置的 纬度
                        lng:longitude//当前位置的 经度
                    }
                    this.$command('SF_LAST_ADDRESS',param,this);
                }
            })
        },
        methods: {
            boxLunchOrder:function(){
                if(!this.shopObj || !this.shopObj.shop_id){
                    wx.showToast({
                        title: '抱歉,您附近没有门店',
                        icon: 'none'
                    })
                    return false;
                }
                this.$command('REDIRECT_TO', 'societyFood.fastFoot', 'push',{
                    query: {
                        shopId:this.shopId,
                    }
                });
            },
            handleSure:function(){
                this.visible=false;
                this.shopId=this.shopObj.shop_id;
                if(this.okText!="确定"){
                    this.$command('REDIRECT_TO', 'societyFood.selectShopByMap', 'push',{
                        query: {
                            latitude: this.latitude,
                            longitude: this.longitude
                        }
                    });
                }
            },
            handleMOre:function(){
                this.visible=false;
                if(this.cancelText!="随便看看"){
                    this.$command('REDIRECT_TO', 'societyFood.selectShopByMap', 'push',{
                        query: {
                            latitude: this.latitude,
                            longitude: this.longitude
                        }
                    });
                }
            },
            goCouponCenter () {
                this.$command('REDIRECT_TO', 'ticketCenter', 'push')
            },
            jumpHomeMaking () {
                this.$command('REDIRECT_TO', 'index.homemaking', 'push')
            },
            jumpShoppingGroup () {
                this.$command('REDIRECT_TO', 'user.groupon.list', 'push')
            },
            couponChange (e) {
                let event = e.mp.detail;
                this.currentCoupon = event.current + 1;
            },
            receiveIt (id) {
                this.$command('RECEIVE_COUPON', id, 'list')
            },
            addToCart (id) {
                if (!this.registered) {
                    this.getUserAuth()
                } else {
                    if (!this.isMember) {
                        this.showBindMobile = true
                    } else {
                        let goods = this.model.user.store.goodInShoppingCart;
                        if (goods.length) {
                            let isInCart = false;
                            let inCartProduct = {}
                            for (let i = 0; i < goods.length; i++) {
                                let product = goods[i];
                                if (product['product_stock_id'] === id) {
                                    isInCart = true
                                    inCartProduct = product;
                                    break
                                } else {
                                    isInCart = false
                                }
                            }
                            if (isInCart) {
                                this.$command('CHANGE_BUY_NUM_COMMAND', inCartProduct, inCartProduct['buy_num'] + 1, 'mall');
                            } else {
                                this.$command('ADD_GOODS_TO_CART_COMMAND', id, 1, 'mall')
                            }
                        } else {
                            this.$command('ADD_GOODS_TO_CART_COMMAND', id, 1, 'mall')
                        }
                    }
                }
            },
            goActDetails (act) {
                if (this.registered) {
                    if (!this.isMember) {
                        this.showBindMobile = true
                    } else {
                        console.log(this, 'xxxxxxccassas');
                        this.$command('REDIRECT_TO', 'user.activity', 'push', {
                            query: {
                                id: act.id,
                                name: encodeURI(act.name)
                            }
                        });
                    }
                } else {
                    this.showAuth = true;
                }
            },
            closeGetUserMobile () {
                this.showBindMobile = false
            },
            closePop () {
                this.model.account.dispatch('hasNewUserCoupon', false);
            },
            closeNewPop () {
                this.model.account.dispatch('clearNewCoupons')
            },
            bannerTransition (e) {
                // let dx = e.mp.detail.dx;
                // if (dx > 250) {
                //     this.changeBgOpacity()
                //     console.log('=================>');
                // }
            },
            bannerChange (e) {
                let event = e.mp.detail;
                this.currentIndex = event.current;
                // if (event.current === 0) {
                //     this.backColor = '#a85231'
                // } else if(event.current === 1) {
                //     this.backColor = '#0368b6'
                // } else if (event.current === 2) {
                //     this.backColor = '#049473'
                // }
            },
            bannerJump (item) {
                if (!item['can_jump']) return;
                if (item['action_type'] === 'PRODUCT_DETAIL') {
                    this.redirectTo(item['action_link'], {query: {type: 'mall', good_id: item['action_args'].id}})
                } else {
                    let link = item['action_link'];
                    let splitLink = link.split('?');
                    if (splitLink.length > 1) {
                        let splitQuery = splitLink[1].split('=');
                        this.redirectTo(splitLink[0], {query: {[splitQuery[0]]: splitQuery[1]}})
                    } else {
                        this.redirectTo(item['action_link']);
                    }
                }
            },
            goStoreCates (arg) {
                if (this.registered) {
                    if (arg === 'more') {
                        this.redirectTo('user.store')
                    } else {
                        this.redirectTo('user.store', {query: {cateId: arg}})
                    }
                } else {
                    this.showAuth = true;
                }
            },
            async uploadFormId (e) {
                let formId = e.mp.detail.formId;
                if (formId !== 'the formId is a mock one') {
                    await this.http.account.saveFormId(formId);
                } else {
                    console.log('form id 不合法')
                }
            },
            getUserAuth () {
                this.showAuth = true
            },
            closeAuth () {
                this.showAuth = false
            },
            bindConsumer () {
                this.$command('BIND_CONSUMER', this.storeId);
            },
            neighborShop () {
                wx.showToast({
                    title: '敬请期待',
                    icon: 'none'
                });
            },
            AuthRouter (router) {
                if (!this.registered) {
                    this.getUserAuth()
                } else if (!this.isMember) {
                    this.showBindMobile = true
                } else {
                    this.$command('REDIRECT_TO', router, 'push');
                }
            },
            redirectTo (router, options = {}) {
                if (router === 'user.integral' && !this.registered) {
                    this.getUserAuth()
                } else if (router === 'user.integral' && !this.isMember) {
                    wx.showToast({
                        title: '请先进行手机号授权',
                        icon: 'none'
                    })
                } else {
                    if (this.registered) {
                        if ((router === 'user.QingSongKungfu' || router === 'societyFood.fastFoot') && !this.isMember) {
                            this.showBindMobile = true
                        } else {
                            this.$command('REDIRECT_TO', router, 'push', options);
                        }
                    } else {
                        this.showAuth = true;
                    }
                }
            },
            getPhoneNumber (e) {
                this.$command('SET_USER_MOBILE', e);
            },
            getUserInfo (e) {
                this.$command('USER_REGISTER', e)
            },
            async initAccount () {
                let result = await this.map.getLocation();
                await this.$store.dispatch('model.account/resetFromCache', {
                    initAccount: async () => {
                        if (((this.accessTokenTTL - Date.now()) <= 0) || !this.accessToken) {
                            await this.$command('APP_ACCESS');
                        } else {
                            this.$command('SIGN_IN', this.accessToken);
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .home-page #receivedNewTickets{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: rgba(17,17,17,0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    }
    page{
        overflow-y: auto;
    }
    .home-page  {
        width: 750rpx;
        background: #F6F5F8;
        box-sizing: border-box;
        overflow: hidden;
    }
    .home-page #index_header {
        background: #f6f6f6;

        /*新增代码*/
        display: flex;
        justify-content: center;
        align-items: flex-start;
        position: relative;
    }
    /*新增代码*/
    .home-page .mainContainer{
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
        padding:  0 20rpx;
    }
    .home-page #products_search{
        width: 710rpx;
        height: 60rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        position: relative;
        border-radius: 30rpx;
        opacity: 0.8;
        overflow: hidden;
        margin-top: 43rpx;
        background: rgba(255,255,255,0.8);
        padding: 0 30rpx;
    }
    .home-page .welcome{
        font-size: 28rpx;
        color: #999;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .home-page .welcome .iconfont{
        display: inline-block;
        margin-right: 20rpx;
        font-size: 32rpx;
        color: #999;
    }
    #index_header .banners{
        width: 710rpx;
        height: 330rpx;
        border-radius: 20rpx;
        overflow: hidden;
        margin: 20rpx 0;
    }
    .home-page .customDots{
        position: absolute;
        left: 10rpx;
        bottom: 22rpx;
        width: 50px;
        height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .home-page .dots{
        display: inline-block;
        width: 15rpx;
        height: 5rpx;
        background: rgba(255,255,255,0.5);
        border-radius: 3rpx;
        margin-right: 10rpx;
    }
    .home-page .activeDots{
        width: 10rpx;
        height: 10rpx;
        border-radius: 50%;
        background: transparent;
        position: relative;
        border: 5rpx solid #fff;
    }
    #index_header .banners .index-swiper{
        width: 100%;
        height: 100%;
        border-radius: 20rpx;
    }
    #index_header .index-swiper .index-slide-image{
        width: 710rpx!important;
        height: 330rpx!important;
        border-radius: 20rpx;
        overflow: hidden;
    }
    .home-page .allCates{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        box-sizing: border-box;
        padding: 0 20rpx;
        background: #fff;
        border-radius: 25rpx;
        padding-bottom: 50rpx;
    }

    .home-page .allCates .catesHeader{
        margin: 39rpx 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
    }

    .home-page .allCates .catesHeader h3{
        font-size: 32rpx;
        color: #111;
        margin: 0;
    }

    .home-page .allCates .catesHeader span{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 26rpx;
        color: #757575;
    }
    .home-page .allCates .catesHeader span img{
        width: 8rpx;
        height: 13rpx;
        margin-left: 12rpx;
    }
    .home-page .classifications{
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .home-page .classifications .cates{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex: 1;
    }
    .home-page .classifications .cates img{
        width: 108rpx;
        height: 108rpx;
        margin-bottom: 20rpx;
    }
    .home-page .classifications .cates span{
        font-size: 24rpx;
        color: #333;
    }
    .home-page .activities{
        width: 710rpx;
        height: 180rpx;
        border-radius: 20rpx;
        margin-top: 15rpx;
    }
    .home-page .extra{
        width: 100%;
        height: 200rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20rpx;
    }

    .home-page .extra img{
        width: 345rpx;
        height: 100%;
        border-radius: 25rpx;
    }
    .home-page .coupons{
        width: 100%;
        height: 180rpx;
        border-radius: 25rpx;
        background: #fff;
        margin-top: 20rpx;
        position: relative;
    }
    .home-page .couponSwiper{
        height: 180rpx;
    }
    .home-page .coupons .couponItem{
        width: 100%;
        box-sizing: border-box;
        padding: 25rpx 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .home-page .coupons .couponItem .couponLeft{
        width: 120rpx;
        height: 130rpx;
        background: url("./img/coupon.png") center center no-repeat;
        background-size: 126rpx 136rpx;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        border-radius: 10rpx;
        padding: 28rpx 0;
        box-sizing: border-box;
    }
    .home-page .coupons .couponItem .couponLeft h3{
        width: 100%;
        font-size: 50rpx;
        color: #fff;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    .home-page .coupons .couponItem .couponLeft h3 em{
        font-size: 22rpx;
        margin-bottom: 10rpx;
    }

    .home-page .coupons .couponItem .couponLeft span{
        font-size: 20rpx;
        color: #fff;
    }

    .home-page .coupons .couponItem .couponRight{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        flex: 1;
        margin-left: 20rpx;
    }

    .home-page .coupons .couponItem .couponRight h3{
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
    }

    .home-page .coupons .couponItem .couponRight .tag{
        padding: 0 9rpx;
        color: #fb5e69;
        font-size: 22rpx;
        border: 2rpx solid #fe9aa2;
        border-radius: 5rpx;
    }

    .home-page .coupons .couponItem .couponRight .bottom{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .home-page .coupons .couponItem .couponRight .bottom span{
        font-size: 22rpx;
        color: #999;
    }

    .home-page .coupons .couponItem .couponRight .bottom button{
        width: 130rpx;
        height: 50rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background: #fb5e69;
        border-radius: 25rpx;
        font-size: 22rpx;
        line-height: 50rpx;
        padding: 0;
        margin: 0;
    }

    .home-page .couponBanner{
        width: 710rpx;
        height: 150rpx;
        margin-left: 20rpx;
        border-radius: 20rpx;
        margin-top: 20rpx;
    }
    .home-page .recommend .recommendHeader{
        width: 100%;
        height: 100rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .home-page .recommend .recommendHeader .left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .home-page .recommend .recommendHeader .left span{
        width: 8rpx;
        height: 38rpx;
        background: #ffcc00;
        border-radius: 4rpx;
        margin-right: 21rpx;
        display: inline-block;
    }

    .home-page .recommend .recommendHeader .left h3{
        font-size: 36rpx;
        color: #111;
    }

    .home-page .recommend .recommendHeader .right span{
        font-size: 24rpx;
        color: #757575;
    }

    .home-page .recommend .recommendHeader .right img{
        width: 7rpx;
        height: 13rpx;
        margin-left: 10rpx;
    }
    .user-info-box, .user-mobile-box, .user-score-box {
        height: 300rpx;
        width: 670rpx;
        margin: 0 auto;
        margin-top: -90rpx;
        border-radius: 16rpx;
        overflow: hidden;
        text-align: center;
        box-shadow: 0px 10px 10px 0px rgba(204,202,202,0.2);
    }
    .user-info-get-btn,
    .user-mobile-get-btn {
        height: 80rpx;
        width: 320rpx;
        text-align: center;
        line-height: 80rpx;
        background: #FECE00;
        display: block;
        margin: 90rpx auto 0;
        font-size: 32rpx;
        font-weight: 200;
        border: 0;
        border-radius: 80rpx;
        box-shadow: 0 10rpx 10rpx #fff6bd;
    }
    .home-page .score {
        position: relative;
        display: inline-block;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        margin: 90rpx auto 0;
        font-size: 128rpx;
        font-weight: 500;
    }
    .home-page .user-score-box .score i {
        position: absolute;
        top: 0;
        right: -68rpx;
        font-size: 32rpx;
        font-weight: 200;
        line-height: 32rpx;
    }
    .home-page .tips {
        text-align: center;
        font-size: 26rpx;
        font-weight: 200;
        margin-top: 46rpx;
        color: #525252;
    }
    #index_menu {
        padding: 30rpx 40rpx 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .home-page .newActivity{
        margin-top: 40rpx;
        padding: 0 40rpx;
        width: calc(100% - 80rpx);
        height: 198rpx;
        background: #fff;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        margin: 0 40rpx;
        box-sizing: border-box;
        border-radius: 16rpx;
        margin-top: 15rpx;
        padding: 5rpx 80rpx;
    }
    .home-page .newActivity .left h4{
        color: #111;
        margin: 0;
        font-size: 36rpx;
        margin-bottom: 10rpx;
        font-weight: bold;
    }
    .home-page .newActivity .left h5{
        width: 160rpx;
        margin: 0;
        color: #fff;
        font-size: 28rpx;
        padding:  4rpx 30rpx;
        border-radius: 24rpx;
        margin-top: 10rpx;
        background: linear-gradient(to right, #FDE068, #FFCC00);
    }
    .home-page .newActivity .left h5 span{
        font-weight: 1000;
        margin-left: 20rpx;
    }
    .home-page .newActivity img {
        width: 66px;
        height: 66px;
    }
    #index_menu dl {
        width: 320rpx;
        height: 198rpx;
        background: #FFFFFF;
        border-radius: 10rpx;
        box-shadow: 0px 10px 10px 0px rgba(204,202,202,0.2);
    }
    #index_menu dl:nth-child(2) {
        margin-left: 30rpx;
    }
    #index_menu dl img{
        width: 80rpx;
        height: 80rpx;
    }
    #index_menu dl dt {
        font-size: 32rpx;
        color: #111111;
    }
    #index_menu .booking {
        width: 669rpx;
        height: 198rpx;
        border-radius: 16rpx;
        box-shadow: 0px 10px 10px 0px rgba(204,202,202,0.2);
        float: left;
        background: #FFFFFF;
    }
    #index_menu .booking img {
        width: 609rpx;
        height: 135rpx;
        margin: 31rpx auto;
        display: block;
    }
    #index_menu dl dd {
        padding-top: 40rpx;
    }
    #index_menu dl dd img {
        display: block;
        width: 76rpx;
        height: 76rpx;
        margin: 0 auto;
    }
    #index_menu dl dt {
        font-size: 30rpx;
        font-weight: 400;
        color: #111111;
        text-align: center;
        margin-top: 15rpx;
    }
    #toast_area {
        position: fixed;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, .3);
        z-index: 1000;
    }
    #toast {
        position: absolute;
        background: #FFFFFF;
        width: 620rpx;
        border-radius: 10rpx;
        top: 338rpx;
        left: 65rpx;
    }
    #toast_title {
        background: #FECE00;
        text-align: center;
        line-height: 96rpx;
        border-radius: 10rpx 10rpx 0 0;
        font-size: 34rpx;
        font-weight: 400;
    }
    #toast_content {
    }
    #toast_content_info {
        padding: 20rpx 40rpx;
    }
    #input_change_info {
        font-size: 32rpx;
        font-weight: 300;
        color: #111111;
        margin-bottom: 20rpx;
    }
    #input_change_btn {
        background: #FECE00;
        line-height: 78rpx;
        text-align: center;
        font-size: 34rpx;
        font-weight: 400;
        border-radius: 10rpx;
    }
    #input_change_tips {
        font-size: 22rpx;
        font-weight: 300;
        color: #828282;
        text-align: center;
        line-height: 68rpx;
    }
    .home-page .couponDots{
        width: 100rpx;
        height: 42rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 21rpx;
        position: absolute;
        right: 20rpx;
        top: 20rpx;
        z-index: 10000;
        background: rgba(17,17,17,0.1);
        font-size: 22rpx;
        color: #fff;
        font-weight: bold;
    }
    .home-page .couponDots span{
        font-size: 28rpx;
    }

</style>
