<!--suppress ALL -->
<template>
    <div class="body">
        <CustomHeader :title="title" :needReturn="false" :backColor="'#049473'"/>
        <Auth v-if="getAuth" @close="closeAuth" />
<!--        <div id="index_header">-->
<!--            <div id="index_logo" @click="redirectTo('special.virusTopic')"></div>-->
<!--            <div id="bear" :style="{'top': (statusBarHeight + navHeight + 61) + 'px'}">-->
<!--                <img :src="headerAnimate"/>-->
<!--            </div>-->
<!--        </div>-->
        <div class="mainContainer" :style="{'height' : (screenHeight - statusBarHeight - navHeight - 54) + 'px'}">
            <div id="index_header">
                <div id="products_search" >
<!--                    <input id="product_search_input" v-model.trim="name" placeholder="搜主食/烘焙"/>-->
<!--                    <i class="iconfont search">&#xe65c;</i>-->
                    <div class="welcome">欢迎,{{userNickname}}!</div>
                </div>
                <div class="banners">
                    <swiper
                        class="index-swiper"
                        circular="true"
                        :indicator-dots="false"
                        autoplay="true"
                        interval="2000"
                        duration="1000"
                        beforeColor="red"
                        indicator-color="#fff"
                        @animationfinish="bannerChange"
                        indicator-active-color="#ffcc00"
                        afterColor="coral">
                        <block v-for="(item, index) in indexBanners" :index="index" :key="key" >
                            <swiper-item >
                                <image :src="item.image" class="index-slide-image" mode="aspectFill" @click="bannerJump(item)"/>
                            </swiper-item>
                        </block>
                    </swiper>
                    <div class="customDots">
                        <span v-for="(item,index) in indexBanners" :class="index === currentIndex ? 'dots activeDots':'dots'" ></span>
                    </div>
                </div>
            </div>
            <ul class="classifications">
                <li v-for="(item,index) in categories" :key="index" class="cates" @click="goStoreCates(item.id)">
                    <img :src="item.icon" v-if="item.icon" alt="">
                    <img :src="'./img/'+index+'.png'" v-else alt="">
                    <span>{{item.name}}</span>
                </li>
                <li class="cates">
                    <img src="./img/More.png" alt="" @click="goStoreCates('more')">
                    <span>查看更多</span>
                </li>
            </ul>

            <img src="./img/Activity-01.png" alt="" class="activities" @click="redirectTo('user.store')">

            <img
                src="./img/Activity-02.png"
                alt=""
                class="activities"
                v-for="item in activities"
                @click="redirectTo('user.QingSongKungfu', {query: {id:item.id}})"
            >
        </div>


        <div v-if="!registered" class="bgff user-mobile-box">
            <form report-submit="true" @submit="uploadFormId">
                <button form-type="submit" class="user-mobile-get-btn" @click="this.getUserAuth">
                    授权登录
                </button>
            </form>
        </div>
        <div v-if="!isMember && registered" class="bgff user-mobile-box">
            <form report-submit="true" @submit="uploadFormId">
                <button form-type="submit" class="user-mobile-get-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
                    手机号授权
                </button>
            </form>

            <em class="tips">
                我们需要您的手机号来创建账号，累计积分
            </em>
        </div>
<!--        <div v-if="registered && isMember" class="bgff user-score-box">-->
<!--            <div class="score">{{availableScore || 0 }}<i>积分</i></div>-->
<!--            <em class="tips">-->
<!--                商城购买即可获得积分哦~-->
<!--            </em>-->
<!--        </div>-->
<!--        <div id="index_menu">-->
<!--            <dl @click="redirectTo('newEvents')" class="booking">-->
<!--                <dd>-->
<!--                    <img src="./img/car.jpg" />-->
<!--                </dd>-->
<!--                <dt>新品预定</dt>-->
<!--            </dl>-->
<!--            <dl  @click="redirectTo('user.integral')" class="booking">-->
<!--                <dd>-->
<!--                    <img src="./img/mall.jpg" />-->
<!--                </dd>-->
<!--                <dt>积分商城</dt>-->
<!--            </dl>-->
<!--        </div>-->
<!--        <div class="newActivity" v-for="item in activities" @click="redirectTo('user.QingSongKungfu', {query: {id:item.id}})">-->
<!--            <div class="left">-->
<!--                <h4>{{item.name}}</h4>-->
<!--                <h5>进入专场 <span>></span></h5>-->
<!--            </div>-->
<!--            <div>-->
<!--                <img :src="item.image" alt="">-->
<!--            </div>-->
<!--        </div>-->




        <footer-nav :navName="navName" @getUserAuth="getUserAuth"></footer-nav>
        <official-account @bindload="follow" style ="bottom: 120rpx;width: 100%;position: absolute;left: 0"></official-account>
    </div>
</template>

<script>
    import FooterNav from '@/components/FooterNav';
    import CustomHeader from '../../../components/CustomHeader';
    import Auth from '../../../components/Auth';
    import {getUpdateMange} from '../../../utils/getUpdateManage';
    import _ from 'underscore'

    export default {
        components: {
            'footer-nav': FooterNav,
			CustomHeader,
			Auth
        },
        data () {
            return {
                navName: 'index',
                inited: false,
                ticketShow: true,
                title: '首页',
				options: [],
				getAuth: false,
                name: '',
                screenHeight: 0,
                currentIndex: 0
            };
        },
        computed: {
            indexBanners () {
                return this.model.user.newIndex.indexBanners
            },
            categories(){
                let categories = this.model.user.store.categories;
                let cates = [];
                _.map(categories, (cate, index)=> {
                    if(index < 4) {
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
            activities () {
                return this.model.activity.activities
            }
        },
        watch: {
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
				if (this.storeId && this.registered ) {
					console.log('进来了吗');
					this.bindConsumer()
				}
			}
        },
        mounted () {
            getUpdateMange();
            this.$command('LOAD_INDEX_BANNER')
            this.$command('LOAD_STORE_CATEGORIES_COMMAND')
            let rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
            let screenWitdh = wx.getSystemInfoSync().windowHeight;
            this.screenHeight = (rpxRate * screenWitdh)/ 2;
		},
        onShareAppMessage: function (res) {
            console.log(res);
            //可以先看看页面数据都有什么，得到你想要的数据
            return {
                title: "青松易购首页",
                desc: "青松易购小程序",
                imageUrl: "分享要显示的图片，如果不设置就会默认截图当前页面的图片",
                path: '/pages/user/index/main',

                success: function (res) {
                    console.log(res);
                    // 转发成功
                    console.log("转发成功:" + JSON.stringify(res));
                },
                fail: function (res) {
                    // 转发失败
                    console.log(res);
                    console.log("转发失败:" + JSON.stringify(res));
                }
            }
        },
        onShow () {
			this.initAccount();
			this.$command('ACTIVITIES')
            if (this.$route.query['needRefresh']) {
                this.initAccount();
            }
            let pages =  getCurrentPages();
            let options = pages[pages.length - 1]['options']
            this.storeId = options['shop_code'] ? options['shop_code'] : this.storeId;
        },
        onLoad (options) {
			if (options.q) {
				let scan_url = decodeURIComponent(options.q);
				//提取链接中的数字，也就是链接中的参数id，/\d+/ 为正则表达式
				this.storeId = scan_url.match(/\d+/)[0];
			}
			wx.onAppShow(() => {
                this.ticketShow = true;
            });
        },
        methods: {
            bannerChange (e) {
                let event = e.mp.detail;
                this.currentIndex = event.current;
            },
            bannerJump (item) {
                if (item['can_jump']) {
                    this.redirectTo(item['action_link'])
                }
            },
            goStoreCates (arg) {
                if (arg === 'more') {
                    this.redirectTo('user.store')
                } else {
                    this.redirectTo('user.store', {query: {cateId: arg}})
                }
            },
			async uploadFormId (e) {
				let formId = e.mp.detail.formId;
				if (formId !== "the formId is a mock one"){
					await this.http.account.saveFormId(formId);
                } else {
					console.log('form id 不合法')
                }
			},
            follow () {

            },
			getUserAuth () {
			    this.getAuth = true
            },
			closeAuth () {
			    this.getAuth = false
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
            redirectTo (router, options = {}) {
				if (router === 'user.integral' && !this.registered) {
                    this.getUserAuth()
                } else if (router === 'user.integral' && !this.isMember){
					wx.showToast({
						title: '请先进行手机号授权',
						icon: 'none'
					})
				} else {
					this.$command('REDIRECT_TO', router, 'push', options);
                }
            },
            bookingMall () {
                wx.navigateToMiniProgram({
                    appId: 'wx2bee13173fa2ca54',
                    path: 'pages/index/index',
                    extraData: {
                        from: 'booking_mall'
                    },
                    envVersion: 'trial',
                    success (res) {
                        // 打开成功
                    },
                    fail (res) {
                        console.log(res);
                    },
                    complete (res) {
                        console.log(res);
                    }
                });
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
    /*#footNav_height {*/
    /*    height: 109rpx;*/
    /*}*/

    page{
        overflow-y: auto;
    }

    .body {
        width: 750rpx;
        background: #F6F5F8;
        box-sizing: border-box;
        overflow: hidden;
    }

    #index_header {
        background: #049473;
        height: 319rpx;
        width: 1228rpx;
        margin-left: -239rpx;
        border-radius: 0 0 100% 100%;

        /*新增代码*/
        display: flex;
        justify-content: center;
        align-items: flex-start;
        position: relative;
    }

    /*新增代码*/
    .mainContainer{
        overflow-y: auto;
        overflow-x: hidden;
    }

    #products_search{
        width: 710rpx;
        height: 60rpx;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        box-sizing: border-box;
        position: relative;
        border-radius: 30rpx;
        opacity: 0.8;
        overflow: hidden;
        margin-top: 43rpx;
    }
    .welcome{
        font-size: 28rpx;
        color: #fff;
    }
    /*#products_search .search{*/
    /*    position: absolute;*/
    /*    left: 30rpx;*/
    /*}*/

    /*#product_search_input{*/
    /*    width: 100%;*/
    /*    padding: 0 80rpx;*/
    /*    background:rgba(255,255,255,1);*/
    /*    font-size: 28rpx;*/
    /*    color: #999;*/
    /*}*/


    #index_header .banners{
        width: 710rpx;
        height: 330rpx;
        position: absolute;
        top: 120rpx;
        border-radius: 20rpx;
        overflow: hidden;
    }

    .customDots{
        position: absolute;
        left: 30rpx;
        bottom: 10rpx;
        width: 50px;
        height: 15px;
        z-index: 9999999;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dots{
        display: inline-block;
        width: 15rpx;
        height: 5rpx;
        background: rgba(255,255,255,0.5);
        border-radius: 3rpx;
        margin-right: 10rpx;
    }

    .activeDots{
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        background: #fff;
        position: relative;
    }
    .activeDots:after{
        content: "";
        width: 8rpx;
        height: 8rpx;
        background: #24C494;
        border-radius: 50%;
        position: absolute;
        left: calc(50% - 4rpx);
        top: calc(50% - 4rpx);
    }

    #index_header .banners .index-swiper{
        width: 100%;
        height: 100%;
    }

    #index_header .index-swiper .index-slide-image{
        width: 710rpx!important;
        height: 330rpx!important;
    }

    .classifications{
        width: 710rpx;
        height: 230rpx;
        background: #fff;
        box-sizing: border-box;
        border-radius: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 158rpx;
        margin-left: 20rpx;
    }

    .classifications .cates{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex: 1;
    }

    .classifications .cates img{
        width: 90rpx;
        height: 90rpx;
        margin-bottom: 20rpx;
    }
    .classifications .cates span{
        font-size: 24rpx;
        color: #111;
    }

    .activities{
        width: 710rpx;
        height: 180rpx;
        margin-left: 20rpx;
        border-radius: 20rpx;
        margin-top: 20rpx;
    }


    /*新增代码截止*/

    #index_logo {
        background: url(../../../../static/images/icon/logo.png) no-repeat top center;
        background-size: 100%;
        width: 218rpx;
        height: 92rpx;
        margin: 40rpx auto 0;
    }

    #bear {
        position: absolute;
        width: 429rpx;
        height: 280rpx;
        top: 122rpx;
        left: 168rpx;
    }

    #bear img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .user-info-box,
    .user-mobile-box,
    .user-score-box {
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

    .score {
        position: relative;
        display: inline-block;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        margin: 90rpx auto 0;
        font-size: 128rpx;
        font-weight: 500;
    }

    .user-score-box .score i {
        position: absolute;
        top: 0;
        right: -68rpx;
        font-size: 32rpx;
        font-weight: 200;
        line-height: 32rpx;
    }

    .tips {
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

    .newActivity{
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

    .newActivity .left{

    }
    .newActivity .left h4{
        color: #111;
        margin: 0;
        font-size: 36rpx;
        margin-bottom: 10rpx;
        font-weight: bold;
    }
    .newActivity .left h5{
        width: 160rpx;
        margin: 0;
        color: #fff;
        font-size: 28rpx;
        padding:  4rpx 30rpx;
        border-radius: 24rpx;
        margin-top: 10rpx;
        background: linear-gradient(to right, #FDE068, #FFCC00);
    }

    .newActivity .left h5 span{
        font-weight: 1000;
        margin-left: 20rpx;
    }


    .newActivity img {
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
</style>
