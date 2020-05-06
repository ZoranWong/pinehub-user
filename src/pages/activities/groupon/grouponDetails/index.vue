<!--suppress ALL -->
<template>
	<div id="groupon_details" :style="{'overflow': shareBoxVisible ? 'hidden' : 'scroll'}">
        <div :style="{'height': mainHeight - cartHeight + 'px', 'overflow': 'auto'}">
            <div class="tranHeader" @click="back" :style="{'top': (statusBarHeight ) + 'px'}">
                <span  class="circle"  v-if="needBackHome"><i class="iconfont"  >&#xe664;</i></span>
                <span class="circle"  v-else><i class="iconfont">&#xe679;</i></span>
            </div>
            <div class="backImg" :style="{'height': mainHeight * 0.223 + 'px'}">
                <img src="./img/background.jpeg" mode="widthFix" alt="">
            </div>

            <!--        <SwiperNotice />-->

            <div class="detail_header" v-if="grouponDetails['pick_shop_info']" @click="goShopDetails">
                <img src="./img/background.jpeg" alt="" class="image">

                <h3>{{grouponDetails['pick_shop_info']['name']}}</h3>
                <div class="shop_info">
                    <img src="../images/name.png" alt="">
                    <span>{{grouponDetails['pick_shop_info']['keeper_name']}}</span>
                    <i></i>
                    <img src="../images/place.png" alt="">
                    <span>{{grouponDetails['pick_shop_info']['complete_address']}}</span>
                </div>

                <div class="price_info">
                    <span class="discount" v-if="grouponDetails['discount']">{{grouponDetails.discount}}</span>
                    <span class="gift" v-if="grouponDetails['has_gift']">{{grouponDetails['giftProducts']}}</span>
                </div>

                <div class="contact">
                    <img @click.stop="contact" src="../images/Contact_head.png" alt="">
                    <img @click.stop="showShareBox" src="../images/Share_spell_group.png" alt="">
                </div>

                <div class="notice">
                    公告：青松主食超值团购，参团即可享受优惠
                </div>

            </div>

            <div class="details">
                <div class="top">
                    <h3>{{grouponDetails['group_display_name']}}</h3>
                    <img src="../images/more_shoppinggroup.png" alt="" @click="goGrouponList">
                </div>

                <div class="bottom">
                    <div class="left">
                        <span>{{grouponDetails['created_at']}}发布</span>
                        <i></i>
                        <div v-if="deadlineTime > 0" class="timerContainer">
                            <span>距结束</span>
                            <div class="time">
                                <em>{{hour}}</em> :
                                <em>{{minute}}</em> :
                                <em class="red">{{second}}</em>
                            </div>
                        </div>
                        <span v-else>已结束</span>
                    </div>
                    <h4>
                        <span>{{grouponDetails['order_placed_users_count']}}人</span>已参团
                    </h4>
                </div>
            </div>

            <div class="rich">
                <wxParse no-data="" :content="grouponDetails.detailInfo"  />
            </div>

            <div class="middle" v-if="grouponDetails['categories'] && grouponDetails['categories'].length">
                <GrouponClassification
                    :top="toTop"
                    @forbidScroll="forbidScroll"
                    :headerHeight="headerHeight"
                    :categories="grouponDetails['categories']"
                    :grouponId="grouponDetails['shopping_group_id']"
                />
                <ul class="products">
                    <li v-for="(product,index) in cateProducts" :key="index">
                        <Product :product="product" @addToCart="addToCart" :deadlineTime="deadlineTime" />
                    </li>
                </ul>

            </div>

            <div class="groupon_participants">
                <h3 class="header">
                    参团情况
                    <span>({{grouponDetails['order_placed_users_count']}}人已参团)</span>
                </h3>
                <ul class="groupon_participants_list">
                    <li class="groupon_participants_item" v-for="(user,index) in grouponDetails['regiments']" :key="index">
                        <span class="number">{{index}}.</span>
                        <div class="right">
                            <div class="top">
                                <div class="left">
                                    <img :src="user.avatar" alt="">
                                    <div class="names">
                                        <h4>{{user.nickname}}</h4>
                                        <span>2分钟前</span>
                                    </div>
                                </div>
                                <div class="price">
                                    <i>¥</i>
                                    <h4>19</h4>
                                </div>
                            </div>
                            <div class="bottom">
                                <span>{{user['purchased_products']}}</span>
                                <img src="../../../../../static/icons/newArrow.jpg" alt="">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

<!--        弹窗组件-->
        <ShareBox
            :show="shareBoxVisible"
            @onClose="closeShareBox"
            :shareText="grouponDetails['share_text']"
            @showSharePic="showSharePic"
        />
        <SharePic
            :show="sharePicVisible"
            @onClose="closeSharePic"
            :text="grouponDetails['share_text']"
            :name="grouponDetails['group_display_name']"
            :id="grouponDetails['id']"
            :pic="grouponDetails['fixed_shared_picture']"
        />

<!--        授权-->
        <Auth v-if="getAuth" @close="closeAuth" />
        <GetUserMobile v-if="showBindMobile" @close="closeGetUserMobile" />

        <ShoppingCart
            :shoppingGroupId="grouponDetails['id']"
            v-if="goodInShoppingCart && deadlineTime > 0"
        />

	</div>
</template>
<script>
    import _ from 'underscore';
    import SwiperNotice from "../components/SwiperNotice";
    import GrouponClassification from "./components/GrouponClassification";
    import Product from "./components/Product";
    import ShareBox from "./components/ShareBox";
    import SharePic from "./components/SharePic";
    import Auth from "../../../../components/Auth";
    import GetUserMobile from "../../../../components/GetUserMobile";
    import ShoppingCart from "../components/ShoppingCart";
    import wxParse from 'mpvue-wxparse'
	export default {
		components: {
            SwiperNotice,GrouponClassification,Product,ShareBox,SharePic,Auth,GetUserMobile,ShoppingCart,wxParse
		},
		data() {
			return {
                hour: '00',
                minute: '00',
                second: '00',
                timer: null,
                deadlineTime: 0,
                toTop: 0,
                isForbid: false,
                shareBoxVisible: false,
                sharePicVisible: false,
                getAuth: false,
                showBindMobile: false,
                buttons: [
                    {
                        type: 'default',
                        className: '',
                        text: '发送给朋友',
                        value: 0
                    },
                    {
                        type: 'primary',
                        className: '',
                        text: '生成海报',
                        value: 1
                    }
                ],
                options: {},
                id: ''
			};
		},
		watch: {
            deadlineTime(val) {
                clearInterval(this.timer)
                if (val > 0) {
                    let t = val;
                    this.timer = setInterval(() => {
                        t = t - 1;
                        this.hour = Math.floor(t / 3600) < 10 ? '0' + Math.floor(t / 3600) : Math.floor(t / 3600);
                        this.minute = Math.floor((t - this.hour * 3600) / 60) < 10 ? '0' + Math.floor((t - this.hour * 3600) / 60) : Math.floor((t - this.hour * 3600) / 60);
                        this.second = Math.floor((t - this.hour * 3600 - this.minute * 60)) < 10 ? '0' + Math.floor((t - this.hour * 3600 - this.minute * 60)) : Math.floor((t - this.hour * 3600 - this.minute * 60));
                    }, 1000)
                }
            },
            registered(value) {
                if (value) {
                    this.getAuth = false;
                }
                if (value && !this.isMember) {
                    this.showBindMobile = true
                }
            },
            isMember() {
                if (this.registered && this.isMember) {
                    this.showBindMobile = false;
                    this.id && this.$command('LOAD_GROUPON_CART_COMMAND', this.grouponDetails['id'])
                }
            },
            accessToken(value) {
                if (value) {
                    this.$command('SIGN_IN', this.accessToken);
                }
            },
            id(val) {
                if (val && this.registered && this.isMember) {
                    this.$command('LOAD_GROUPON_CART_COMMAND', val)
                }
            },
            userId(val) {
                if (val) {
                    this.$socket.userId = val;
                    this.$socket.notification((data)=>{
                        console.log(data, '-------- APP User notification --------');
                    });
                    this.$socket.eventListener(`groupShopping.${this.id}.orders`, 'TestEvent', (data) => {
                        console.log(data, '--------------- APP SOCKET TEST EVENT ------------');
                    });
                }
            },
            grouponDetails (val) {
                if (val && val.categories) {
                    this.$command('LOAD_GROUPON_CATE_PRODUCTS',val['shopping_group_id'], val.categories[0].id)
                }
            }
        },
		computed: {
            needBackHome () {
                let pages =  getCurrentPages();
                let options = pages[pages.length - 1]['options'];
                return options.backHome ? true : false;
            },
            userId () {
                return this.model.account.userId;
            },
            isMember () {
                return this.model.account.isMember;
            },
            registered () {
                return this.model.account.registered;
            },
            accessToken () {
                return this.$store.getters['model.app/accessToken'];
            },
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            },
            buttonPosition () {
                return this.statusBarHeight + (this.navHeight / 2) + 'px'
            },
            mainHeight() {
                let systemInfo = wx.getSystemInfoSync();
                return systemInfo.windowHeight;
            },
            cartHeight() {
                let systemInfo = wx.getSystemInfoSync();
                return 98 * systemInfo.windowWidth / 750;
            },
            headerHeight () {
                return this.statusBarHeight + this.navHeight;
            },
            grouponDetails () {
                this.deadlineTime = this.model.groupon.grouponDetails.deadlineTime;
                this.id = this.model.groupon.grouponDetails['id']
                return this.model.groupon.grouponDetails
            },
            cateProducts () {
                return this.model.groupon.cateProducts
            },
            goodInShoppingCart() {
                return this.model.groupon.goodInShoppingCart
            }
		},
		methods: {
            contact () {
                if (!this.registered) {
                    this.getUserAuth();
                } else if (!this.isMember){
                    this.showBindMobile = true
                } else {
                    wx.makePhoneCall({
                        phoneNumber: this.grouponDetails['pick_shop_info']['keeper_mobile'],
                        success: function () {
                            // wx.showToast({
                            //     title: '拨打成功',
                            //     icon: 'none'
                            // })
                        }
                    })
                }

            },
            back() {
                if (this.needBackHome) {
                    this.$command('REDIRECT_TO','index','replace')
                } else {
                    this.$command('REDIRECT_TO','','back')
                }
            },
            goShopDetails () {
                this.$command('REDIRECT_TO','user.groupon.shopDetails','push')
            },
            forbidScroll (isForbid) {
                this.isForbid = isForbid
            },
            showShareBox () {
                if (!this.registered) {
                    this.getUserAuth();
                } else if (!this.isMember){
                    this.showBindMobile = true
                } else {
                    this.shareBoxVisible = true
                }
            },
            closeShareBox () {
                this.shareBoxVisible = false
            },
            showSharePic () {
                this.shareBoxVisible = false;
                this.sharePicVisible = true;
            },
            closeSharePic () {
                this.sharePicVisible = false
            },
            goGrouponList () {
                if (!this.registered) {
                    this.getUserAuth();
                } else if (!this.isMember){
                    this.showBindMobile = true
                } else {
                    this.$command('REDIRECT_TO', 'user.groupon.list', 'push')
                }

            },
            getUserAuth () {
                this.getAuth = true
            },
            closeAuth () {
                this.getAuth = false
            },
            closeGetUserMobile () {
                this.showBindMobile = false
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
            addToCart(item) {
                if (!this.registered) {
                    this.getUserAuth();
                } else {
                    if (!this.isMember) {
                        this.showBindMobile = true;
                    } else {
                        let goods = this.model.groupon.goodInShoppingCart;
                        console.log(goods, '????????????????????????????????');
                        let cartIndex = _.findIndex(goods, {product_stock_id: item['product_stock_id']});
                        if (cartIndex < 0) {
                            this.$command('ADD_GROUPON_GOODS_TO_CART_COMMAND',item['product_stock_id'],this.grouponDetails['id'])
                        } else {
                            this.$command('CHANGE_GROUPON_BUY_NUM_COMMAND',item,this.grouponDetails['id'],goods[cartIndex]['buy_num'] + 1)
                        }
                    }
                }
            },
		},
		created() {

		},
		mounted() {
            this.$command('GET_BAR_HEIGHT');
            let pages =  getCurrentPages();
            let options = pages[pages.length - 1]['options'];
            this.options = options;
            this.$command('LOAD_GROUPON_DETAILS', options.id);
            if (!this.registered) {
                this.initAccount();
            }
		},
        onShareAppMessage (res) {
            //可以先看看页面数据都有什么，得到你想要的数据
            return {
                title: this.grouponDetails['group_display_name'],
                desc: this.grouponDetails['share_text'],
                imageUrl: "",
                path: `/pages/activities/groupon/grouponDetails/main?id=${this.grouponDetails['id']}`,
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
	}
</script>

<style>
    @import url("~mpvue-wxparse/src/wxParse.css");
	page {
		height: 100%;
        overflow: hidden;
	}

    .swiperNotices{
        width: 410rpx;
        height: 100rpx;
    }

    #shopping_groupon_cart{
        position: fixed;
        width: 100%;
        transition: 1s;
    }

    .backImg{
        width: 100%;
        height: 22.3%;
        overflow: hidden;
    }

    .backImg img{
        width: 100%;
        height: 298rpx;
        -webkit-filter: blur(20px);
        -moz-filter: blur(20px);
        -ms-filter: blur(20px);
        filter: blur(20px);
        transform: translateY(-226rpx);
    }

    #groupon_details{
        height: 100%;
        overflow: auto;
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

    .tranHeader .circle .iconfont{
        color: #fff;
    }

    .detail_header{
        width: 710rpx;
        box-shadow:0px 0px 20rpx 0px rgba(204,204,204,0.6);
        border-radius:25rpx;
        box-sizing: border-box;
        padding: 30rpx;
        margin-left: 20rpx;
        position: relative;
        transform: translateY(-90rpx);
        background: #fff;
        margin-bottom: -70rpx;
    }

    .detail_header .image{
        width: 108rpx;
        height: 108rpx;
        position: absolute;
        top: -50rpx;
        right: 30rpx;
        border-radius: 10rpx;
    }

    .detail_header h3{
        font-size: 40rpx;
        color: #111;
        font-weight: bold;
        margin-bottom: 16rpx;
    }

    .detail_header .shop_info{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 16rpx;
    }
    .detail_header .shop_info img{
        width: 22rpx;
        height: 22rpx;
        margin-right: 10rpx;
    }

    .detail_header .shop_info span{
        color: #111;
        font-size: 22rpx;
    }
    .detail_header .shop_info i{
        width: 2rpx;
        height: 14rpx;
        background: #e6e6e6;
        margin: 0 10rpx;
    }

    .detail_header .price_info{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 30rpx;
    }
    .detail_header .price_info span{
        font-size: 20rpx;
        padding: 4rpx 8rpx;
        border: 2rpx solid rgba(255,70,60,1);
        border-radius: 5rpx;
    }
    .detail_header .price_info .discount{
        color: #FF463C;
        border-color: #FF463C;
        margin-right: 10rpx;
    }
    .detail_header .price_info .gift{
        color: #CA9938;
        border-color: rgba(202,153,56,1);
    }

    .detail_header .contact{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 16rpx;
    }

    .detail_header .contact img{
        width: 168rpx;
        height: 50rpx;
        margin-right: 20rpx;
    }

    .detail_header .notice{
        font-size: 22rpx;
        color: #757575;
    }

    .details{
        width: 100%;
        height: 150rpx;
        box-sizing: border-box;
        padding: 24rpx 50rpx;
        border-bottom: 2rpx solid #F2F2F2;
    }

    .details .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15rpx;
    }
    .details .top h3{
        font-size: 32rpx;
        color: #111;
        font-weight: bold;
    }
    .details .top img{
        width: 150rpx;
        height: 50rpx;
    }

    .details .bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .details .bottom .left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .timerContainer{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .details .bottom .left span{
        font-size: 28rpx;
        color: #4C4C4C;
    }
    .details .bottom .left i{
        width: 3rpx;
        height: 28rpx;
        background: #E6E6E6;
        margin: 0 10rpx;
    }
    .details .bottom .left .time{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 20rpx;
        font-size: 20rpx;
        color: #333;
    }
    .details .bottom .left .time em{
        width: 32rpx;
        height: 32rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background: #333;
        font-style: normal;
        border-radius: 3rpx;
        margin: 0 2rpx;
    }
    .details .bottom .left .time .red{
        background: #FF442E;
    }
    .details .bottom h4{
        font-weight: normal;
        font-size: 24rpx;
        color: #4C4C4C;
    }

    .details .bottom h4 span{
        color: #FF442E;
    }

    .rich{
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx;
    }

    rich_text{
        width: 100%;
    }

    .middle{
        width: 100%;
        background: red;
        background: #fff;
        box-sizing: border-box;
        position: relative;
        border-bottom: 2rpx solid #F2F2F2;
        border-top: 2rpx solid #F2F2F2;
    }

    .middle .allCates{
        position: absolute;
        top: 0;
        z-index: 9998;
        background: rgba(17,17,17,0.5);
        height: 100vh;
    }

    .middle .allCates .cates{

    }

    .middle .middleImage{
        width: 132px;
        height: 30px;
    }

    .products{
        padding: 0 20rpx;
    }

    .groupon_participants{
        margin-top: 10rpx;
        width: 100%;
        box-sizing: border-box;
        padding: 30rpx 40rpx;
    }

    .groupon_participants .header{
        font-size: 30rpx;
        color: #111;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        margin-bottom: 20rpx;
    }

    .groupon_participants .header span{
        font-size: 24rpx;
        color: #999;
        font-weight: normal;
        margin-left: 10rpx;
    }

    .groupon_participants_item{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 30rpx;
    }

    .groupon_participants_item .number{
        font-size: 28rpx;
        color: #111;
        margin-top: 15rpx;
    }

    .groupon_participants_item .right{
        border-bottom: 2rpx solid #F2F2F2;
        margin-left: 15rpx;
        flex: 1;
    }

    .groupon_participants_item .right .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .groupon_participants_item .right .top .left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .groupon_participants_item .right .top .left img{
        width: 50rpx;
        height: 50rpx;
        border-radius: 50%;
        margin-right: 15rpx;
    }

    .groupon_participants_item .right .top .left .names{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
    }

    .groupon_participants_item .right .top .left .names h4{
        font-size: 28rpx;
        color: #111;
        font-weight: normal;
    }

    .groupon_participants_item .right .top .left .names span{
        font-size: 20rpx;
        color: #999;
    }

    .groupon_participants_item .right .top .price{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .groupon_participants_item .right .top .price i{
        font-size: 24rpx;
        font-weight: bold;
        color: #999;
        margin-right: 5rpx;
    }

    .groupon_participants_item .right .top .price h4{
        font-size: 32rpx;
        font-weight: bold;
        color: #999;
    }

    .groupon_participants_item .right .bottom{
        width: 100%;
        box-sizing: border-box;
        padding: 16rpx 30rpx;
        background:#F5F5F5;
        position: relative;
        margin-top: 30rpx;
    }

    .groupon_participants_item .right .bottom span{
        font-size: 22rpx;
        color: #111;
        line-height: 30rpx;
    }

    .groupon_participants_item .right .bottom img{
        position: absolute;
        top: -10rpx;
        left: 30rpx;
        width: 20rpx;
        height: 10rpx;
    }

</style>
