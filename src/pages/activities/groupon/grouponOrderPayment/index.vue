<!--suppress ALL -->
<template>
    <div id="groupon_order_payment" >
        <CustomHeader :title="title" :needReturn="true" :backColor="'#ffcc00'"  />
        <div :style="{height: mainHeight + 'px', overflow: 'auto'}">

            <div class="background">
                <div class="top"></div>
                <div class="bottom"></div>
            </div>

            <ul class="user_info">
                <li>
                    <div class="left">
                        <img src="./imgs/contact.png" alt="">
                        <h3>联系人名：</h3>
                    </div>
                    <input type="text" v-model="name" placeholder="请填写姓名或昵称">
                </li>
                <li>
                    <div class="left">
                        <img src="./imgs/contact_number.png" alt="">
                        <h3>联系电话：</h3>
                    </div>
                    <input type="number" v-model="mobile" placeholder="以便商家与您及时沟通">
                </li>
            </ul>

            <div class="totalContainer" >
                <div class="productsContainer">
                    <div class="productHeader">
                        <h4 >青松食品（宁西路28号青松集团）</h4>
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
                        <div class="extra" v-if="goodInShoppingCart && goodInShoppingCart.length > 3" @click="extraProducts">
                            <span v-if="!isLoadAll">展开更多</span>
                            <span v-else>点击收起</span>
                            <img v-if="isLoadAll" src="./imgs/top-arrow.png" alt="">
                            <img  v-else src="./imgs/bottom-arrow.png" alt="">

                        </div>
                    </ul>

                    <ul id="total">
                        <li>
                            <h3>商品总价</h3>
                            <span class="small"><i>￥</i> {{orderInfo['total_fee'] || 0}}</span>
                        </li>
                        <li>
                            <h3>
                                <img src="./imgs/minus.png" alt="">
                                优惠金额
                            </h3>
                            <span class="red"> <i :style="{color: '#FC3C2F'}">￥</i>{{orderInfo['total_preferential_fee'] || 0}}</span>
                        </li>
                        <li>
                            <h3>
                                <img src="./imgs/send.png" alt="">
                                赠品
                                <span class="gift">({{giftProducts}})</span>
                            </h3>
                            <span class="red"> <i :style="{color: '#FC3C2F'}">￥</i>0</span>
                        </li>
                        <li @click="jump('couponCenter')">
                            <h3>
                                <img src="./imgs/coupon.png" alt="">
                                优惠券
                            </h3>
                            <div class="couponUse">
                                <em class="red2" v-if="availableCoupons.length">{{availableCoupons.length - grouponCouponIds.length}}张可用</em>
                                <em class="gray" v-else>暂无可用</em>
                                <span class="use_coupon" >
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
                        <h3>备注</h3>
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
                    <!--                    <span>（起订金额10元）</span>-->
                    <!--                    <span v-if="activeTab === 'pick' && orderInfo['total_preferential_fee']">（已优惠{{orderInfo['total_preferential_fee']}}元）</span>-->
                </span>
                    <h4 @click="check" >提交订单</h4>
                </div>

            </div>
        </div>


    </div>
</template>
<script>
    import CustomHeader from '../../../../components/CustomHeader';
    import {formatMoney} from '../../../../utils';
    import _ from 'underscore'

    export default {
        components: {
            CustomHeader
        },
        data() {
            return {
                title: '提交订单',
                remark: '',
                name: '',
                mobile: '',
                products: [],
                isLoadAll: false
            };
        },
        watch: {
            grouponCouponIds (newVal, oldVal) {
                if (typeof this.$route.query.shoppingGroupId !== 'undefined' && this.model.groupon.goodInShoppingCart && this.model.groupon.goodInShoppingCart.length > 0) {
                    this.$command('CALCULATE_GROUPON_PRICE_COMMAND',{
                        coupon_records: newVal,
                        shop_shopping_group_id: this.$route.query.shoppingGroupId
                    });
                }
            },
            isLoadAll (val) {
                if (val) {
                    this.products = this.goodInShoppingCart;
                } else {
                    this.products = this.products.slice(0, 3)
                }
            },
        },
        computed: {
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            goodInShoppingCart(){
                let products = this.model.groupon.goodInShoppingCart.filter(item => item.total_fee);
                this.products = products.length > 3 ? products.slice(0, 3) : products
                return products
            },
            giftProducts() {
                let products = this.model.groupon.goodInShoppingCart;
                let giftProducts = [];
                _.map(products, product => {
                    if (!product.total_fee) {
                        giftProducts.push(product)
                    }
                });
                if (giftProducts.length) {
                    let text = '';
                    _.map(giftProducts, product => {
                        text += `${product.name}、`
                    })
                    return text.substring(0, text.length - 1);
                } else {
                    return '无'
                }
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            },
            headerHeight() {
                return this.statusBarHeight + this.navHeight;
            },
            mainHeight() {
                let systemInfo = wx.getSystemInfoSync();
                let height = systemInfo.windowHeight;
                return height - this.headerHeight - this.btnHeight;
            },
            btnHeight() {
                let systemInfo = wx.getSystemInfoSync();
                return 0 * systemInfo.windowWidth / 750;
            },
            totalPrice () {
                return this.model.groupon.totalPrice;
            },
            availableCoupons () {
                return this.model.groupon.availableCoupons
            },
            grouponCouponIds () {
                return this.model.groupon.grouponCouponIds
            },
            orderInfo () {
                return this.model.groupon.orderInfo
            },
            userMobile () {
                return this.model.account.mobile
            },
        },
        methods: {

            check () {
                console.log('name');
                let reg = /^1(3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{8}$/;
                if (!this.name) {
                    wx.showToast({
                        title: '请填写姓名或昵称',
                        icon: 'none'
                    });
                    return
                }
                if (!reg.test(this.mobile)) {
                    wx.showToast({
                        title: '请填写正确格式的手机号',
                        icon: 'none'
                    });
                    return
                }
                if (!this.totalPrice) {
                    wx.showToast({
                        title: '订单信息有误，请稍后再提交',
                        icon: 'none'
                    });
                    return
                }
                let now = new Date();
                this.createOrder()
            },
            createOrder(){
                this.$command('CREATE_GROUPON_ORDER', {
                    consignee_name: this.name,
                    consignee_mobile_phone: this.mobile,
                    remark: this.remark,
                    shop_shopping_group_id: this.$route.query.shoppingGroupId,
                    coupon_records: this.grouponCouponIds
                })
            },
            extraProducts () {
                this.isLoadAll = !this.isLoadAll;
            },
            go (router) {
                this.$command('REDIRECT_TO', router, 'push');
            },
            jump (router) {
                if (this.availableCoupons.length === 0) return;
                this.$command('REDIRECT_TO', router, 'push',{
                    query: {needReturn: true, type: 'groupon',shoppingGroupId: this.$route.query.shoppingGroupId}
                });
            }
        },
        created() {

        },
        onShow () {
            let products = this.model.groupon.goodInShoppingCart;
            if (!products.length) {
                this.$command('REDIRECT_TO', 'user.myGroupon', 'reLaunch', {
                    query: {
                        status: 5,
                        backCenter: true
                    }
                });
            }
        },
        mounted() {
            let id = this.$route.query.shoppingGroupId;
            this.$command('LOAD_GROUPON_CART_COMMAND', id)
            this.$command('CALCULATE_GROUPON_PRICE_COMMAND',{
                coupon_records: this.grouponCouponIds,
                shop_shopping_group_id: id
            });
            this.mobile = this.userMobile
            this.$command('GROUPON_AVAILABLE_COUPONS',this.$route.query.shoppingGroupId)
        }
    }
</script>

<style>
    page {
        height: 100%;
        background: #f2f2f2;
    }

    #groupon_order_payment{
    }

    .background{
        width: 100%;
        height: 320rpx;
        position: fixed;
        top: 0;
        z-index: -10;
    }

    .background .top{
        width: 100%;
        height: 230rpx;
        background: #FFCC00;
    }

    .background .bottom{
        width: 100%;
        height: 90rpx;
        background:linear-gradient(180deg,rgba(255,204,0,1),rgba(242,242,242,1));
    }

    .totalContainer{
        width: 710rpx;
        margin-left: 20rpx;
        box-sizing: border-box;
        z-index: 10000;
        margin-top: 12rpx;
    }
    .productsContainer{
        width: 100%;
    }

    .user_info{
        width: 710rpx;
        margin-left: 20rpx;
        box-sizing: border-box;
        background: #fff;
        padding: 0 30rpx;
        border-radius: 25rpx;
    }

    .user_info li{
        width: 100% ;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 110rpx;
    }

    .user_info li:first-child{
        border-bottom: 2rpx solid #f2f2f2;
    }

    .user_info li .left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .user_info li .left img{
        width: 48rpx;
        height: 48rpx;
        margin-right: 20rpx;
    }

    .user_info li .left h3{
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
    }

    .user_info li input {
        width: 300 rpx;
        font-size: 28rpx;
        color: #757575;
        text-align: right;
    }







    .totalContainer #tabs{
        width: 100%;
        height: 80rpx;
        background-size: 690rpx 100%;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .totalContainer #tabs .tabItem{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28rpx;
        color: #111;
    }

    .totalContainer #tabs .active{
        font-weight: bold;
    }

    .sendContainer{
        width: 100%;
        background: #fff;
        border-radius: 25rpx;
        border-top-right-radius: 0;
        box-sizing: border-box;
        padding: 40rpx 0;
    }

    .sendContainer .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 30rpx;
    }

    .sendContainer .top .topLeft{
        flex: 1;
        font-size: 40rpx;
        color: #111;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .topLeft1{
        flex: 1;
        font-size: 40rpx;
        color: #111;
        font-weight: bold;
        display: flex;
        justify-content: center!important;
        align-items: flex-start;
        flex-direction: column;
    }

    .sendContainer .top .topLeft1 .pay_shop_info_address{
        font-size: 40rpx;
        color: #111;
        width: 604rpx;
        word-break: break-all;
    }

    .topLeft1 .tag{
        padding: 4rpx 19rpx;
        background:#FFF6CC;
        border-radius:3rpx;
        color: #ffcc00;
        font-size: 22rpx;
    }

    .sendContainer .top .topLeft1 .pay_shop_info_name{
        margin-top: 20rpx;
    }

    .sendContainer .top .topLeft1 .pay_shop_info_name h4{
        font-size: 28rpx;
        color: #111;
        font-weight: normal;
    }

    .sendContainer .top .topLeft1 .pay_shop_info_name h4 span{
        margin-left: 20rpx;
    }

    .sendContainer .top .topLeft img{
        width: 52rpx;
        height: 52rpx;
        margin-right: 12rpx;
    }

    .sendContainer .top img{
        width: 12rpx;
        height: 22rpx;
    }

    .sendContainer .middle{
        width: 630rpx;
        height: 2rpx;
        background: #f2f2f2;
        margin: 40rpx;
    }

    .sendContainer .bottom{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        box-sizing: border-box;
        padding: 0 30rpx;
    }

    .sendContainer .bottom h4{
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
    }

    .sendContainer .bottom span{
        font-size: 24rpx;
        color: #ef9e21;
    }

    .pickContainer{
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

    .hideImg{
        width: 335rpx;
        height: 270rpx;
        position: absolute;
        right: 0;
        top: 0;
    }

    .pickContainer .top{

        box-sizing: border-box;
        padding: 0 30rpx;
        position: relative;
    }

    .pickContainer .top .topLeft{

    }

    .pickContainer .top .topLeft .topLeftTop{
        font-size: 40rpx;
        font-weight: bold;
        color: #111;
        width: 434rpx;
        word-break: break-all;
        margin-top: 10rpx;
        margin-bottom: 50rpx;
    }

    .pickContainer .top .topLeft .topLeftBottom{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .pickContainer .top .topLeft .topLeftBottom .left{

    }

    .pickContainer .top .topLeft .topLeftBottom .left .leftTop{
        font-size: 28rpx;
        color: #757575;
    }

    .pickContainer .top .topLeft .topLeftBottom .left .leftBottom{
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
        margin-top: 10rpx;
    }

    .pickContainer .top .topLeft .topLeftBottom .middle{
        width: 2rpx;
        height: 76rpx;
        background: #e6e6e6;
        margin: 0 27rpx;
    }

    .pickContainer .top .topLeft .topLeftBottom .right{

    }

    .pickContainer .top .topLeft .topLeftBottom .right .rightTop{
        font-size: 28rpx;
        color: #757575;
    }

    .pickContainer .top .topLeft .topLeftBottom .right .rightBottom{
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
        margin-top: 10rpx;
    }


    .pickContainer .top .topLeft .topLeftBottom .right .inputs{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pickContainer .top .topLeft .topLeftBottom .right .inputs input{
        width: 200rpx;
    }

    .pickContainer .top .topLeft .topLeftBottom .right .inputs img{
        width: 26rpx;
        height: 26rpx;
        margin-top: 3rpx;
    }


    .pickContainer .top .topRight{
        width: 250rpx;
        height: 220rpx;
        background: transparent;
        position: absolute;
        right: 0;
        top: -10rpx;
    }

    .pickContainer .top .topRight span{
        font-size: 24rpx;
        color: #111111;
        font-weight: bold;
        position: absolute;
        right: 45rpx;
        top: 6rpx;
    }

    .pickContainer .bottom{
        width: 100%;
        z-index: 99999;
        box-sizing: border-box;
        margin-top: 20rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 30rpx;
    }

    .pickContainer .bottom img{
        width: 32rpx;
        height: 32rpx;
    }

    .pickContainer .bottom h4{
        font-size: 28rpx;
        color: #4d4d4d;
        margin-left: 14rpx;
    }

    .pickContainer .bottom span{
        font-size: 28rpx;
        color: #3C517F;
        margin-left: 10rpx;
    }

    .productsContainer{
        width: 710rpx;
        margin-left: 20rpx;
        width: 100%;
        box-sizing: border-box;
        background: #fff;
        border-radius: 25rpx;
        margin: 20rpx 0;
        padding: 0 30rpx;
    }

    .productHeader{
        width: 100%;
        height: 118rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1rpx solid #f2f2f2;
    }

    .productHeader h4{
        font-size: 28rpx;
        color: #333;
    }

    .productHeader img{
        width: 100rpx;
        height: 30rpx;
    }

    .productsContainer #total{
        width: 100%;
        margin-top: 40rpx;
    }

    .productsContainer #total li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 82rpx;
    }

    .productsContainer #total li h3{
        font-size: 28rpx;
        color: #333;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .productsContainer #total li h3 img{
        width: 32rpx;
        height: 32rpx;
        margin-right: 10rpx;
    }

    .productsContainer #total li span{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .productsContainer #total i{
        font-size: 24rpx;
        color: #111;
        margin-right: 5rpx;
    }

    .small{
        font-size: 32rpx;
        color: #111;
        font-weight: bold;
    }

    .red{
        font-size: 32rpx;
        color: #FC3C2F;
        font-weight: bold;
    }

    .red2{
        font-size: 30rpx;
        color: #FC3C2F;
    }

    .gray{
        font-size: 30rpx;
        color: #999;
    }

    .couponUse{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bigH4{
        font-size: 30rpx;
        color: #111;
        font-weight: bold;
    }

    .use_coupon img {
        width: 12rpx;
        height: 22rpx;
        margin-left: 20rpx;
    }

    .big{
        font-size: 50rpx;
        color: #111;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .big2{
        font-size: 30rpx;
        color: #111111;
        margin-right: 15rpx;
        font-weight: normal;
    }

    .productsContainer #total li:first-child{
        height: 110rpx;
        border-bottom: 1rpx solid #f2f2f2;
        border-top: 1rpx solid #f2f2f2;
    }

    .productsContainer #total li:last-child{
        height: 120rpx;
        border-top: 1rpx solid #f2f2f2;
    }








    #pay_shop_info,#pay_pick_up_info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 0 40rpx;
        height: 180rpx;
    }

    .locationImg{
        width: 66rpx;
        height: 66rpx;
    }

    #pay_shop_info {
        margin-top: 20rpx;
    }

    #pay_shop_info .location{
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #pay_shop_info .pay_shop_info{
        width: 507rpx;
        font-size: 28rpx;
        color: #111111;
    }

    #pay_shop_info .pay_shop_info .pay_shop_info_name{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #pay_shop_info .pay_shop_info .pay_shop_info_name h4 {
        font-weight: normal;
        margin: 0;
    }

    #pay_shop_info .pay_shop_info .pay_shop_info_name span{
        color: #757575;
        margin-left: 23rpx;
    }

    #pay_shop_info .arrow{
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

    #pay_shop_info_act .locationImg{
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #pay_shop_info_act .pay_shop_info{
        width: 507rpx;
        font-size: 28rpx;
        color: #111111;
    }

    #pay_shop_info_act .pay_shop_info .pay_shop_info_name{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #pay_shop_info_act .pay_shop_info .pay_shop_info_name h4 {
        font-weight: normal;
        margin: 0;
    }

    #pay_shop_info_act .pay_shop_info .pay_shop_info_name span{
        color: #757575;
        margin-left: 23rpx;
    }

    #pay_shop_info_act .arrow{
        color: #757575;
        font-size: 22rpx;
    }

    #pay_pick_up_info{
        justify-content: flex-start;
        border-top: 2rpx solid #f2f2f2;
        margin-bottom: 20rpx;
    }

    #pay_pick_up_info .location{
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #pay_pick_up_info .order_info{
        font-size: 28rpx;
        color:#111;
        margin-left: 40rpx;
    }

    #pay_pick_up_info .order_info h4{
        margin: 0;
    }

    #pay_pick_up_info .order_info span{
        color: #757575;
    }

    .order_info_time{
        margin-left: 23rpx;
    }

    #good_list{
        background: #fff;
    }

    #good_list .extra{
        width: 100%;
        margin-top: 40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24rpx;
        color: #4d4d4d;
    }

    #good_list .extra img{
        width: 19rpx;
        height: 10rpx;
        margin-left: 11rpx;
    }



    #good_list li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 50rpx;
    }

    #good_list li img{
        width: 106rpx;
        height: 106rpx;
        margin-right: 20rpx;
        border: 1rpx solid #f2f2f2;
        border-radius: 10rpx;
    }

    #good_list li .left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #good_list li #good_info{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
    }

    #good_list li #good_info h3{
        font-size: 28rpx;
        color: #111111;
    }

    #good_list li #good_info h4{
        font-size: 24rpx;
        color: #757575;
    }

    #good_list li #good_info em{
        font-size: 24rpx;
        color: #757575;
    }

    #good_list li #good_info_price{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #good_list li #good_info_price i{
        font-size: 24rpx;
        color: #111;
        font-weight: bold;
    }

    #good_list li #good_info_price h3{
        font-size: 32rpx;
        color: #111;
        font-weight: bold;
    }

    #remarkBox{
        box-sizing: border-box;
        background: #fff;
        border-radius: 25rpx;
        display: flex;
        flex-direction: column;
        margin-bottom: 150rpx;
    }

    #remarkBox .xuantian{
        color: #999!important;
    }

    #remarkBox li{
        width: 100%;
        height: 106rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 30rpx;
        position: relative;
    }

    #remarkBox li h3{
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
    }

    #remarkBox li span{
        font-size: 28rpx;
        color: #111;
    }

    #remarkBox li input{
        font-size: 28rpx;
        color: #999;
        width: 500rpx;
        text-align: right;
    }

    #remarkBox li em{
        font-size: 28rpx;
        color: #757575;
        position: absolute;
        right: 30rpx;
    }


    #groupon_order_payment #do_payment{
        box-sizing: border-box;
        height: 98rpx;
        width: 100%;
        padding: 0 20rpx;
        position: fixed;
        bottom: 0;
        margin: 30rpx 0;
        opacity: 0.9;
        z-index: 9999;
    }

    #groupon_order_payment #do_payment .do_payment_contain{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 53rpx;
        overflow: hidden;
    }

    #groupon_order_payment #do_payment .price{
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

    #groupon_order_payment #do_payment .price i{
        font-size: 30rpx;
        font-weight: normal;
        margin-right: 5rpx;
    }

    #groupon_order_payment #do_payment .price span{
        font-size: 22rpx;
        color: #999;
        margin-left: 33rpx;
        font-weight: normal;
    }

    #groupon_order_payment #do_payment h4{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180rpx;
        height: 100%;
        font-size: 32rpx;
        color: #111111;
        font-weight: bold;
        background:linear-gradient(270deg,rgba(255,204,0,1),rgba(253,224,104,1));
    }

    .disabledButton{
        background: #999!important;
        color: #fff!important;
    }

    .pickupTips {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pickupTips .pickupTipsContainer{
        width: 630rpx;
        background: #fff;
        border-radius: 10rpx;
        padding: 0 50rpx;
        box-sizing: border-box;
    }

    .pickupTips .header{
        width: 100%;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        color: #111;
    }

    .pickupTips .tip1s{
        font-size: 28rpx;
        color: #111111;
        margin-top: 20rpx;
        text-align: center;
        height: 80rpx;
    }

    .tip2s{
        font-size: 28rpx;
        color: #111111;
        margin-top: 20rpx;
        text-align: center;
    }

    .pickupTips .tip1s span {
        color: red;
        font-weight: bold;
    }

    .pickupTips .operation{
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
        border:1px solid #ffcc00;
        font-size: 32rpx;
    }
    .pickupTips .operation button:last-child{
        margin-right: 0;
        background: #FFCC00;
        color: #fff;
    }

    .gift {
        font-size: 28rpx;
        color: #999;
    }


</style>
