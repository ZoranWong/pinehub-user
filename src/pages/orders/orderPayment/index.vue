<!--suppress ALL -->
<template>
    <div id="order_payment">
        <CustomHeader :title="title" :needReturn="true" :backColor="'#ffcc00'" :needClear="true"/>
        <div class="background">
            <div class="top"></div>
            <div class="bottom"></div>
        </div>

        <div class="totalContainer" :style="{height: mainHeight + 'px', overflow: 'auto'}">
            <div id="tabs" :style="{'backgroundImage':'url(' + background + ')', backgroundPosition: backgroundPosition}">
                <div :class="activeTab === 'pick'? 'tabItem active': 'tabItem'" @click="changeTab('pick')">预定自提</div>
                <div :class="activeTab === 'send'? 'tabItem active':'tabItem'" @click="changeTab('send')">同城配送</div>
            </div>
            <div class="sendContainer" v-if="activeTab === 'send'">
                <div class="top">
                    <div class="topLeft " @click="selectAddressPoint" v-if="!addresses.id">
                        <img src="../../../../static/icons/location.png" alt="">
                        请选择收货地址
                    </div>
                    <div class="topLeft1" @click="selectAddressPoint" v-else>
                        <div class="pay_shop_info_address">
                            <span class="tag" v-if="addresses.isDefaultTag">{{addresses['tagFormat']}}</span>
                            <span class="tag" v-else>{{addresses['consignee_name'][0]}}</span>
                            {{addresses.rangeAddress}}{{addresses['detail_address']}}
                        </div>
                        <div class="pay_shop_info_name">
                            <h4>
                                {{addresses['consignee_name']}}
                                <span>{{addresses['consignee_mobile_phone']}}</span>
                            </h4>
                        </div>
                    </div>
                    <img src="./imgs/right-arrow.png" alt="">
                </div>
                <div class="middle"></div>
                <div class="bottom">
                    <h4>次日送达</h4>
                    <span>晚上9点前下单，次日即可送达，仅限合肥地区。疫情期间请戴好口罩哦！</span>
                </div>
            </div>
            <div class="pickContainer" v-if="activeTab === 'pick'">
                <img src="./imgs/map.png" alt="" class="hideImg">
                <div class="top">
                    <div class="topLeft">
                        <div class="topLeftTop" v-if="!selectedPoint.name" @click="selectPoint">
                            请选择自提店铺
                        </div>
                        <div class="topLeftTop" v-else @click="selectPoint">
                            {{selectedPoint.name}}
                        </div>
                        <div class="topLeftBottom">
                            <div class="left">
                                <div class="leftTop">自提时间</div>
                                <div class="leftBottom" v-if="!selectedPoint.name">请选择自提店铺</div>
                                <div class="leftBottom" v-else>{{selectedPoint['start_at']}} -
                                    {{selectedPoint['end_at']}}
                                </div>
                            </div>
                            <div class="middle"></div>
                            <div class="right">
                                <div class="rightTop" @click="focusStatus = !focusStatus">联系电话</div>
                                <div class="inputs">
                                    <input class="rightBottom" type="number" :focus="focusStatus" v-model="mobile"/>
                                    <img src="./imgs/editor.png" alt="" @click=" focusStatus = !focusStatus">
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="topRight" @click="selectPoint" v-if="selectedPoint.name">
                        <span>距您{{selectedPoint['formatDistance']}}</span>
                    </div>
                    <div class="topRight" @click="selectPoint" v-else>
                        <span>点击选择店铺</span>
                    </div>
                </div>
                <div class="bottom">
                    <img @click="agreement = false" src="./imgs/selected.png" alt="" v-if="agreement">
                    <img @click="agreement = true" src="./imgs/uncheck.png" alt="" v-else>
                    <h4>
                        同意并接受
                        <span @click="go('user.pickup.protocol')">
                            《预定自提服务协议》
                        </span>
                    </h4>
                </div>
            </div>

            <div class="productsContainer">
                <div class="productHeader">
                    <h4 v-if="activeTab === 'send'">青松食品（宁西路28号青松集团）</h4>
                    <h4 v-if="activeTab === 'pick' && !selectedPoint.name">青松食品（宁西路28号青松集团）</h4>
                    <h4 v-if="activeTab === 'pick' && selectedPoint.name">{{selectedPoint['address']}}</h4>
                    <img src="./imgs/tag.png" alt="">
                </div>
                <ul id="good_list">
                    <li v-for="(good,index) in products" :key="index">
                        <div class="left">
                            <img :src="good.image" alt="">
                            <div id="good_info">
                                <h3>{{good['name']}}</h3>
                                <h4>{{good['intro']}}</h4>
                                <em>X {{good['buy_num']}}</em>
                            </div>
                        </div>
                        <div id="good_info_price">
                            <i>￥</i>
                            <h3>{{good['price']}}</h3>
                        </div>
                    </li>
                    <div class="extra" v-if="goodInShoppingCart && goodInShoppingCart.length > 3"
                         @click="extraProducts">
                        <span v-if="!isLoadAll">展开更多</span>
                        <span v-else>点击收起</span>
                        <img v-if="isLoadAll" src="./imgs/top-arrow.png" alt="">
                        <img v-else src="../../../../static/images/bottom-arrow.png" alt="">
                    </div>
                </ul>

                <ul id="total">
                    <li>
                        <h3>商品总价</h3>
                        <span class="small"><i>￥</i>{{orderInfo['total_fee'] || 0}}</span>
                    </li>
                    <li>
                        <h3>
                            <img src="./imgs/minus.png" alt="">
                            优惠金额
                        </h3>
                        <span class="red"> <i :style="{color: '#FC3C2F'}">￥</i>{{orderInfo['total_preferential_fee'] || 0}}</span>
                    </li>
                    <li @click="jump('couponCenter')">
                        <h3>
                            <img src="./imgs/coupon.png" alt="">
                            优惠券
                        </h3>
                        <div class="couponUse">
                            <em class="red2" v-if="availableCoupons.length">{{availableCoupons.length -
                                couponIds.length}}张可用</em>
                            <em class="gray" v-else>暂无可用</em>
                            <span class="use_coupon">
                                <img src="./imgs/right-arrow.png" alt="">
                            </span>
                        </div>
                    </li>
                    <li>
                        <h4 class="bigH4">实付款</h4>
                        <h5 class="big">
                            <span class="big2">小计</span>
                            <i>￥</i>
                            {{orderInfo['settlement_total_fee'] || 0}}
                        </h5>
                    </li>
                </ul>
            </div>


            <ul id="remarkBox">
                <li>
                    <h3>备注 <span class="xuantian">(选填)</span></h3>
                    <input type="text" v-model="remark">
                    <em v-if="!remark">请输入备注</em>
                </li>
                <li>
                    <h3>支付方式</h3>
                    <span>在线支付</span>
                </li>
            </ul>
        </div>

        <div id="do_payment">
            <div class="do_payment_contain">
                <span class="price">
                     <i>￥</i>
                     {{orderInfo['settlement_total_fee'] || 0}}
                    <span v-if="activeTab === 'send'">（满{{deliveryPrice}}元可免费配送）</span>
                    <span v-else-if="orderAmountLimit > 0">（起订金额{{orderAmountLimit}}元）</span>
                </span>
                <h4 @click="check" :class="!isEnough  ? 'disabledButton': ''">提交订单</h4>
            </div>

        </div>

        <div class="pickupTips" v-if="showTips">
            <div class="pickupTipsContainer">
                <div class="header">提示</div>
                <div class="tip2s">
                    支付时间在21:00后的订单
                </div>
                <div class="tip1s">
                    您的宝贝将在
                    <span class="pickupTipsImportant">后天</span>
                    送达到您的手上！
                </div>
                <div class="operation">
                    <button @click="showTips = false">取消</button>
                    <button @click="createOrder">我知道了</button>
                </div>
            </div>
        </div>
        <ChooseSelfRaisingPoint v-if="showPoints" @close="closePoints"/>
    </div>
</template>
<script>
    import CustomHeader from '../../../components/CustomHeader';
    import ChooseSelfRaisingPoint from '../../../components/ChooseSelfRaisingPoint';
    import {formatMoney} from '../../../utils';
    import _ from 'underscore'

    let left = require('./imgs/left.png')
    let right = require('./imgs/right.png')
    let mapBack = require('./imgs/map.png')

    export default {
        components: {
            CustomHeader,
            ChooseSelfRaisingPoint
        },
        data () {
            return {
                title: '提交订单',
                pointInfo: {},
                tomorrowStr: '',
                type: '',
                showTips: false,
                activeTab: 'pick',
                background:require('./imgs/left.png'),
                backgroundPosition: 'left center',
                products: [],
                allProducts: [],
                isLoadAll: false,
                remark: '',
                deliveryPrice: 0,
                mapBackground:require('./imgs/map.png'),
                agreement: true,
                mobile: '',
                focusStatus: false,
                selectedProduct: []
            };
        },
        watch: {
            allProducts (val) {
                if (!this.isLoadAll) {
                    if (val.length > 3) {
                        this.products = val.slice(0, 3)
                    } else {
                        this.products = val
                    }
                }
            },
            isLoadAll (val) {
                if (val) {
                    this.products = this.goodInShoppingCart;
                } else {
                    this.products = this.products.slice(0, 3)
                }
            },
            couponIds (val) {
                if (this.model.user.store.goodInShoppingCart && this.model.user.store.goodInShoppingCart.length > 0) {
                    this.$command('CALCULATE_PRICE_COMMAND', 'mall', {
                        coupon_records: val,
                        carts: this.selectedProduct
                    });
                }
            },
            selectedProduct (val) {
                if (val.length) {
                    let delivery_type = this.activeTab === 'send' ? 'HOME_DELIVERY' : 'SELF_PICK';
                    this.$command('CALCULATE_PRICE_COMMAND', this.$route.query.type, {
                        coupon_records: this.couponIds,
                        carts: val,
                        delivery_type: delivery_type,
                        order_type: 'SELF_PICK'
                    });
                }
            }
        },
        computed: {
            showPoints () {
                return this.model.user.store.showPoints
            },
            isEnough () {
                console.log(this.deliveryPrice)
                return (this.orderInfo['settlement_total_fee'] >= this.deliveryPrice && this.activeTab === 'send') || (this.orderInfo['settlement_total_fee'] >= this.config.app.order.payAmount && this.activeTab === 'pick')
            },
            orderAmountLimit () {
                return this.activeTab === 'send' ? this.deliveryPrice : this.config.app.order.payAmount;
            },
            selectedPoint () {
                console.log(this.model.user.map.selectedMapPoint, '=======================');
                return this.model.user.map.selectedMapPoint
            },
            goodInShoppingCart () {
                if (this.type === 'mall') {
                    let products = this.model.user.store.goodInShoppingCart;
                    let ary = [];
                    _.map(products, (product) => {
                        if (product.selected > 0) {
                            ary.push(product);
                        }
                    })
                    this.allProducts = ary;
                    return this.allProducts
                } else if (this.type === 'breakfast') {
                    this.products = this.model.newEvents.shoppingCarts.goodInShoppingCart
                    return this.model.newEvents.shoppingCarts.goodInShoppingCart
                }
            },
            userMobile () {
                return this.model.account.mobile
            },
            orderInfo () {
                return this.model.user.order.payment.orderInfo
            },
            availableCoupons () {
                return this.model.user.tickets.availableCoupons
            },
            couponIds () {
                return this.model.user.order.payment.couponIds
            },
            addresses () {
                return this.model.user.order.payment.addresses
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
            btnHeight () {
                let systemInfo = wx.getSystemInfoSync();
                return 0 * systemInfo.windowWidth / 750;
            }
        },
        methods: {
            closePoints () {
                this.showPoints = false
            },
            async getDeliveryPrice () {
                console.log(`------------ delivery price load ----------`);
                let result = await this.http.store.getDeliveryPrice();
                console.log(`------------ delivery price load ----------`, result);
                this.deliveryPrice = result['delivery_threshold']
            },
            extraProducts () {
                this.isLoadAll = !this.isLoadAll;
            },
            changeTab (tab) {
                this.activeTab = tab;
                if (tab === 'send') {
                    this.background = right;
                    this.backgroundPosition = 'right center';
                } else {
                    this.background = left;
                    this.backgroundPosition = 'left center';
                }
            },
            selectAddressPoint () {
                this.$command('REDIRECT_TO', 'user.address', 'push', {
                    query: {
                        needReturn: true,
                        type: 'mall'
                    }
                });
            },
            selectPoint () {
                if (this.type === 'mall') {
                    this.model.user.store.dispatch('selectPoints', {
                        boolean: true,
                        type: this.type
                    })
                } else if (this.type === 'breakfast') {
                    this.model.newEvents.shoppingCarts.dispatch('selectPoints', {
                        boolean: true,
                        type: this.type
                    })
                } else if (this.type === 'activity') {
                    this.$command('REDIRECT_TO', 'user.activity.payment', 'push', {
                        query: {type: this.type, actId: this.actId}
                    });
                }
            },
            check () {

                if (!this.isEnough) {
                    return
                }

                if (this.type === 'mall' && !this.addresses.id && this.activeTab === 'send') {
                    wx.showToast({
                        title: '请选择收货地址',
                        icon: 'none'
                    });
                    return
                };

                if (!this.agreement) {
                    wx.showToast({
                        title: '请先同意预定自提服务协议',
                        icon: 'none'
                    });
                    return
                };

                let reg = /^1(3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{8}$/;
                if (this.activeTab === 'pick') {
                    if (!reg.test(this.mobile)) {
                        wx.showToast({
                            title: '请填写正确格式的收货人手机号',
                            icon: 'none'
                        });
                        return
                    }
                }
                if (this.type === 'mall' && !this.selectedPoint.name && this.activeTab === 'pick') {
                    wx.showToast({
                        title: '请选择自提店铺地址',
                        icon: 'none'
                    });
                    return
                };
                if (!this.orderInfo['settlement_total_fee']) {
                    wx.showToast({
                        title: '订单信息有误，请稍后再提交',
                        icon: 'none'
                    });
                    return
                }
                let now = new Date();
                let hour = now.getHours();
                let type = this.activeTab === 'send' ? 'HOME_DELIVERY' : 'SELF_PICK';
                if (hour > 20) {
                    this.showTips = true;
                } else {
                    this.createOrder(type)
                }
            },
            createOrder () {
                this.showTips = false;
                let type = this.activeTab === 'send' ? 'HOME_DELIVERY' : 'SELF_PICK';
                if (type === 'HOME_DELIVERY') {
                    this.$command('CREATE_PAY_ORDER', {
                        remark: this.remark,
                        delivery_type: type,
                        order_type: 'SELF_PICK',
                        coupon_records: this.couponIds,
                        address_id: this.addresses.id,
                        carts: this.selectedProduct
                    }, this.type);
                } else if (type === 'SELF_PICK') {
                    this.$command('CREATE_PAY_ORDER', {
                        remark: this.remark,
                        delivery_type: type,
                        order_type: 'SELF_PICK',
                        shop_id: this.selectedPoint.id,
                        coupon_records: this.couponIds,
                        consignee_mobile_phone: this.mobile,
                        carts: this.selectedProduct
                    }, this.type);
                }
            },
            getDate () {
                var tomorrow = new Date();
                tomorrow.setTime(tomorrow.getTime() + 24 * 60 * 60 * 1000);
                var tomorrowStr = tomorrow.getFullYear() + '-' + (tomorrow.getMonth() + 1) + '-' + tomorrow.getDate();
                this.tomorrowStr = tomorrowStr
            },
            jump (router) {
                if (this.availableCoupons.length === 0) return;
                this.$command('REDIRECT_TO', router, 'push', {
                    query: {needReturn: true, type: this.type}
                });
            },
            go (router) {
                this.$command('REDIRECT_TO', router, 'push');
            }
        },
        created () {
            this.getDeliveryPrice();
        },
        onShow () {
            this.allProducts = []
            let selectedProduct = [];
            let products = this.model.user.store.goodInShoppingCart;
            if (!products.length) {
                this.$command('REDIRECT_TO', 'user.orders', 'reLaunch', {
                    query: {
                        status: 'WAIT_TO_PAY'
                    }
                });
                return
            }
            _.map(products, (product) => {
                if (product.selected > 0) {
                    selectedProduct.push({
                        cart_id: product.id,
                        remark: '123'
                    })
                }
            })
            this.selectedProduct = selectedProduct;
        },
        mounted () {
            this.getDate();
            let type = this.$route.query.type;
            let id = this.$route.query.id;
            this.type = type;
            this.mobile = this.userMobile
            if (id) {
                this.$command('ORDER_COUPON_IDS', id)
            }
            this.$command('AVAILABLE_COUPONS', type);
            this.$command('LOAD_DEFAULT_USER_ADDRESS', 'mall')
        }
    }
</script>

<style>
    page {
        height: 100%;
        background: #f2f2f2;
    }

    .background {
        width: 100%;
        height: 400rpx;
        position: fixed;
        top: 0;
        z-index: -10;
    }

    .background .top {
        width: 100%;
        height: 234rpx;
        background: #FFCC00;
    }

    .background .bottom {
        width: 100%;
        height: 163rpx;
        background: linear-gradient(180deg, rgba(255, 204, 0, 1), rgba(242, 242, 242, 1));
    }

    .totalContainer {
        padding: 20rpx;
        box-sizing: border-box;
        z-index: 10000;
    }


    .totalContainer #tabs {
        width: 100%;
        height: 80rpx;
        background-size: 690rpx 100%;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .totalContainer #tabs .tabItem {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28rpx;
        color: #111;
    }

    .totalContainer #tabs .active {
        font-weight: bold;
    }

    .sendContainer {
        width: 100%;
        background: #fff;
        border-radius: 25rpx;
        border-top-right-radius: 0;
        box-sizing: border-box;
        padding: 40rpx 0;
    }

    .sendContainer .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 30rpx;
    }

    .sendContainer .top .topLeft {
        flex: 1;
        font-size: 40rpx;
        color: #111;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .topLeft1 {
        flex: 1;
        font-size: 40rpx;
        color: #111;
        font-weight: bold;
        display: flex;
        justify-content: center !important;
        align-items: flex-start;
        flex-direction: column;
    }

    .sendContainer .top .topLeft1 .pay_shop_info_address {
        font-size: 40rpx;
        color: #111;
        width: 604rpx;
        word-break: break-all;
    }

    .topLeft1 .tag {
        padding: 4rpx 19rpx;
        background: #FFF6CC;
        border-radius: 3rpx;
        color: #ffcc00;
        font-size: 22rpx;
    }

    .sendContainer .top .topLeft1 .pay_shop_info_name {
        margin-top: 20rpx;
    }

    .sendContainer .top .topLeft1 .pay_shop_info_name h4 {
        font-size: 28rpx;
        color: #111;
        font-weight: normal;
    }

    .sendContainer .top .topLeft1 .pay_shop_info_name h4 span {
        margin-left: 20rpx;
    }

    .sendContainer .top .topLeft img {
        width: 52rpx;
        height: 52rpx;
        margin-right: 12rpx;
    }

    .sendContainer .top img {
        width: 12rpx;
        height: 22rpx;
    }

    .sendContainer .middle {
        width: 630rpx;
        height: 2rpx;
        background: #f2f2f2;
        margin: 40rpx;
    }

    .sendContainer .bottom {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        box-sizing: border-box;
        padding: 0 30rpx;
    }

    .sendContainer .bottom h4 {
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
    }

    .sendContainer .bottom span {
        font-size: 24rpx;
        color: #ef9e21;
    }

    .pickContainer {
        width: 100%;
        background: #fff;
        border-radius: 25rpx;
        border-top-left-radius: 0;
        box-sizing: border-box;
        padding: 40rpx 0;
        background-size: 350rpx 280rpx;
        background-repeat: no-repeat;
        background-position: right top;
        position: relative;
        overflow: hidden;
    }

    .hideImg {
        width: 335rpx;
        height: 270rpx;
        position: absolute;
        right: 0;
        top: 0;
    }

    .pickContainer .top {

        box-sizing: border-box;
        padding: 0 30rpx;
        position: relative;
    }

    .pickContainer .top .topLeft {

    }

    .pickContainer .top .topLeft .topLeftTop {
        font-size: 40rpx;
        font-weight: bold;
        color: #111;
        width: 434rpx;
        word-break: break-all;
        margin-top: 10rpx;
        margin-bottom: 50rpx;
    }

    .pickContainer .top .topLeft .topLeftBottom {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .pickContainer .top .topLeft .topLeftBottom .left {

    }

    .pickContainer .top .topLeft .topLeftBottom .left .leftTop {
        font-size: 28rpx;
        color: #757575;
    }

    .pickContainer .top .topLeft .topLeftBottom .left .leftBottom {
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
        margin-top: 10rpx;
    }

    .pickContainer .top .topLeft .topLeftBottom .middle {
        width: 2rpx;
        height: 76rpx;
        background: #e6e6e6;
        margin: 0 27rpx;
    }

    .pickContainer .top .topLeft .topLeftBottom .right {

    }

    .pickContainer .top .topLeft .topLeftBottom .right .rightTop {
        font-size: 28rpx;
        color: #757575;
    }

    .pickContainer .top .topLeft .topLeftBottom .right .rightBottom {
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
        margin-top: 10rpx;
    }


    .pickContainer .top .topLeft .topLeftBottom .right .inputs {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pickContainer .top .topLeft .topLeftBottom .right .inputs input {
        width: 200rpx;
    }

    .pickContainer .top .topLeft .topLeftBottom .right .inputs img {
        width: 26rpx;
        height: 26rpx;
        margin-top: 3rpx;
    }


    .pickContainer .top .topRight {
        width: 250rpx;
        height: 220rpx;
        background: transparent;
        position: absolute;
        right: 0;
        top: -10rpx;
    }

    .pickContainer .top .topRight span {
        font-size: 24rpx;
        color: #111111;
        font-weight: bold;
        position: absolute;
        right: 45rpx;
        top: 6rpx;
    }

    .pickContainer .bottom {
        width: 100%;
        z-index: 99999;
        box-sizing: border-box;
        margin-top: 20rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 30rpx;
    }

    .pickContainer .bottom img {
        width: 32rpx;
        height: 32rpx;
    }

    .pickContainer .bottom h4 {
        font-size: 28rpx;
        color: #4d4d4d;
        margin-left: 14rpx;
    }

    .pickContainer .bottom span {
        font-size: 28rpx;
        color: #3C517F;
        margin-left: 10rpx;
    }

    .productsContainer {
        width: 100%;
        box-sizing: border-box;
        background: #fff;
        border-radius: 25rpx;
        margin: 20rpx 0;
        padding: 0 30rpx;
    }

    .productHeader {
        width: 100%;
        height: 118rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1rpx solid #f2f2f2;
    }

    .productHeader h4 {
        font-size: 28rpx;
        color: #333;
    }

    .productHeader img {
        width: 100rpx;
        height: 30rpx;
    }

    .productsContainer #total {
        width: 100%;
        margin-top: 40rpx;
    }

    .productsContainer #total li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 82rpx;
    }

    .productsContainer #total li h3 {
        font-size: 28rpx;
        color: #333;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .productsContainer #total li h3 img {
        width: 32rpx;
        height: 32rpx;
        margin-right: 10rpx;
    }

    .productsContainer #total li span {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .productsContainer #total i {
        font-size: 24rpx;
        color: #111;
        margin-right: 5rpx;
    }

    .small {
        font-size: 32rpx;
        color: #111;
        font-weight: bold;
    }

    .red {
        font-size: 32rpx;
        color: #FC3C2F;
        font-weight: bold;
    }

    .red2 {
        font-size: 30rpx;
        color: #FC3C2F;
    }

    .gray {
        font-size: 30rpx;
        color: #999;
    }

    .couponUse {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bigH4 {
        font-size: 30rpx;
        color: #111;
        font-weight: bold;
    }

    .use_coupon img {
        width: 12rpx;
        height: 22rpx;
        margin-left: 20rpx;
    }

    .big {
        font-size: 50rpx;
        color: #111;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .big2 {
        font-size: 30rpx;
        color: #111111;
        margin-right: 15rpx;
    }

    .productsContainer #total li:first-child {
        height: 110rpx;
        border-bottom: 1rpx solid #f2f2f2;
        border-top: 1rpx solid #f2f2f2;
    }

    .productsContainer #total li:last-child {
        height: 120rpx;
        border-top: 1rpx solid #f2f2f2;
    }


    #pay_shop_info, #pay_pick_up_info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 0 40rpx;
        height: 180rpx;
    }

    .locationImg {
        width: 66rpx;
        height: 66rpx;
    }

    #pay_shop_info {
        margin-top: 20rpx;
    }

    #pay_shop_info .location {
        background: linear-gradient(to right, #FDE068, #FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #pay_shop_info .pay_shop_info {
        width: 507rpx;
        font-size: 28rpx;
        color: #111111;
    }

    #pay_shop_info .pay_shop_info .pay_shop_info_name {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #pay_shop_info .pay_shop_info .pay_shop_info_name h4 {
        font-weight: normal;
        margin: 0;
    }

    #pay_shop_info .pay_shop_info .pay_shop_info_name span {
        color: #757575;
        margin-left: 23rpx;
    }

    #pay_shop_info .arrow {
        color: #757575;
        font-size: 22rpx;
    }

    #pay_shop_info_act {
        margin-top: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 0 40rpx;
        height: 180rpx;
        margin-bottom: 20rpx;
    }

    #pay_shop_info_act .locationImg {
        background: linear-gradient(to right, #FDE068, #FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #pay_shop_info_act .pay_shop_info {
        width: 507rpx;
        font-size: 28rpx;
        color: #111111;
    }

    #pay_shop_info_act .pay_shop_info .pay_shop_info_name {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #pay_shop_info_act .pay_shop_info .pay_shop_info_name h4 {
        font-weight: normal;
        margin: 0;
    }

    #pay_shop_info_act .pay_shop_info .pay_shop_info_name span {
        color: #757575;
        margin-left: 23rpx;
    }

    #pay_shop_info_act .arrow {
        color: #757575;
        font-size: 22rpx;
    }

    #pay_pick_up_info {
        justify-content: flex-start;
        border-top: 2rpx solid #f2f2f2;
        margin-bottom: 20rpx;
    }

    #pay_pick_up_info .location {
        background: linear-gradient(to right, #FDE068, #FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #pay_pick_up_info .order_info {
        font-size: 28rpx;
        color: #111;
        margin-left: 40rpx;
    }

    #pay_pick_up_info .order_info h4 {
        margin: 0;
    }

    #pay_pick_up_info .order_info span {
        color: #757575;
    }

    .order_info_time {
        margin-left: 23rpx;
    }

    #good_list {
        background: #fff;
    }

    #good_list .extra {
        width: 100%;
        margin-top: 40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24rpx;
        color: #4d4d4d;
    }

    #good_list .extra img {
        width: 19rpx;
        height: 10rpx;
        margin-left: 11rpx;
    }


    #good_list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 50rpx;
    }

    #good_list li img {
        width: 106rpx;
        height: 106rpx;
        margin-right: 20rpx;
        border: 1rpx solid #f2f2f2;
        border-radius: 10rpx;
    }

    #good_list li .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #good_list li #good_info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
    }

    #good_list li #good_info h3 {
        font-size: 28rpx;
        color: #111111;
    }

    #good_list li #good_info h4 {
        font-size: 24rpx;
        color: #757575;
    }

    #good_list li #good_info em {
        font-size: 24rpx;
        color: #757575;
    }

    #good_list li #good_info_price {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #good_list li #good_info_price i {
        font-size: 24rpx;
        color: #111;
        font-weight: bold;
    }

    #good_list li #good_info_price h3 {
        font-size: 32rpx;
        color: #111;
        font-weight: bold;
    }

    #remarkBox {
        box-sizing: border-box;
        background: #fff;
        border-radius: 25rpx;
        display: flex;
        flex-direction: column;
        margin-bottom: 150rpx;
    }

    #remarkBox .xuantian {
        color: #999 !important;
    }

    #remarkBox li {
        width: 100%;
        height: 106rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 30rpx;
        position: relative;
    }

    #remarkBox li h3 {
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
    }

    #remarkBox li span {
        font-size: 28rpx;
        color: #111;
    }

    #remarkBox li input {
        font-size: 28rpx;
        color: #999;
        width: 500rpx;
    }

    #remarkBox li em {
        font-size: 28rpx;
        color: #757575;
        position: absolute;
        right: 30rpx;
    }


    #order_payment #do_payment {
        box-sizing: border-box;
        height: 98rpx;
        width: 100%;
        padding: 0 20rpx;
        position: fixed;
        bottom: 0;
        margin: 30rpx 0;
        opacity: 0.9;
    }

    #order_payment #do_payment .do_payment_contain {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 53rpx;
        overflow: hidden;
    }

    #order_payment #do_payment .price {
        font-size: 32rpx;
        padding-left: 30rpx;
        box-sizing: border-box;
        background: #111;
        color: #fff;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 50rpx;
        font-weight: bold;
        flex: 1;
        height: 100%;

    }

    #order_payment #do_payment .price i {
        font-size: 30rpx;
        font-weight: normal;
        margin-right: 5rpx;
    }

    #order_payment #do_payment .price span {
        font-size: 22rpx;
        color: #999;
        margin-left: 33rpx;
        font-weight: normal;
    }

    #order_payment #do_payment h4 {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180rpx;
        height: 100%;
        font-size: 32rpx;
        color: #111111;
        font-weight: bold;
        background: linear-gradient(270deg, rgba(255, 204, 0, 1), rgba(253, 224, 104, 1));
    }

    .disabledButton {
        background: #999 !important;
        color: #fff !important;
    }

    .pickupTips {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pickupTips .pickupTipsContainer {
        width: 630rpx;
        background: #fff;
        border-radius: 10rpx;
        padding: 0 50rpx;
        box-sizing: border-box;
    }

    .pickupTips .header {
        width: 100%;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        color: #111;
    }

    .pickupTips .tip1s {
        font-size: 28rpx;
        color: #111111;
        margin-top: 20rpx;
        text-align: center;
        height: 80rpx;
    }

    .tip2s {
        font-size: 28rpx;
        color: #111111;
        margin-top: 20rpx;
        text-align: center;
    }

    .pickupTips .tip1s span {
        color: red;
        font-weight: bold;
    }

    .pickupTips .operation {
        width: 100%;
        margin-bottom: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pickupTips .operation button {
        flex: 1;
        margin-right: 10rpx;
        color: #FFCC00;
        border-radius: 10rpx;
        background: #fff;
        border: 1px solid #ffcc00;
        font-size: 32rpx;
    }

    .pickupTips .operation button:last-child {
        margin-right: 0;
        background: #FFCC00;
        color: #fff;
    }


</style>
