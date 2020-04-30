<!--suppress ALL -->
<template>
    <div id="groupon_order_details">
        <CustomHeader :title="title" :needReturn="true" :back-color="'#f2f2f2'"> </CustomHeader>
        <div class="content" :style="{height: mainHeight + 'px'}">
            <h2 class="title">订单待发货</h2>

            <div class="productsContainer">
                <div class="productHeader">
                    订单号:1366879566
                </div>
                <ul id="good_list">
                    <li v-for="(good,index) in products" :key="index">
                        <div class="left">
                            <img src="../grouponOrderPayment/imgs/contact_number.png" alt="">
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
                        <img v-if="isLoadAll" src="../../../orders/orderPayment/imgs/top-arrow.png" alt="">
                        <img  v-else src="../../../orders/orderPayment/imgs/bottom-arrow.png" alt="">

                    </div>
                </ul>

                <ul id="total">
                    <li>
                        <h3>商品总价</h3>
                        <span class="small"> <i>￥</i>120</span>
                    </li>
                    <li>
                        <h3>
                            <img src="../grouponOrderPayment/imgs/minus.png" alt="">
                            优惠金额
                        </h3>
                        <span class="red"> <i :style="{color: '#FC3C2F'}">￥</i>5</span>
                    </li>
                    <li>
                        <h4 class="bigH4">实付款</h4>
                        <h5 class="big">
                            <span class="big2">小计</span>
                            <i>￥</i>
                            6
                        </h5>
                    </li>
                </ul>



            </div>

            <ul class="info">
                <h2>自提信息</h2>
                <li>
                    <span>自提人</span>
                    <h4>一切都会好的</h4>
                </li>
                <li>
                    <span>预留电话</span>
                    <h4>18696332921</h4>
                </li>
                <li>
                    <span>自提地址</span>
                    <h4>
                        安徽省 合肥市 蜀山区
                        琥珀五环城
                    </h4>
                </li>
            </ul>

            <ul class="info">
                <h2>订单信息</h2>
                <li>
                    <span>订单编号</span>
                    <div class="copy">
                        <h4>202003311808</h4>
                        <button @click="cpoy('1111111')">复制</button>
                    </div>
                </li>
                <li>
                    <span>下单时间</span>
                    <h4>2020-03-01 23:16:08</h4>
                </li>
                <li>
                    <span>备注</span>
                    <h4>
                        放在小区门卫那
                    </h4>
                </li>
                <li>
                    <span>支付方式</span>
                    <h4>
                        微信支付
                    </h4>
                </li>
            </ul>

            <div class="bottom">- 我是有底线的 -</div>
        </div>

    </div>
</template>
<script>
    import CustomHeader from "../../../../components/CustomHeader";


    export default {
        components: {
            CustomHeader
        },
        data() {
            return {
                title: '',
                isLoadAll: false,
                products: [
                    {
                        name: 'minabao',
                        intro: 'xxasjiasdiasy',
                        buy_num: '2',
                        price: 34,

                    }
                ],
                orderInfo: {
                    total_fee: 34,
                    total_preferential_fee: 0,
                    settlement_total_fee: 34
                }
            };
        },
        watch: {

        },
        computed: {
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            },
            mainHeight() {
                let systemInfo = wx.getSystemInfoSync();
                return systemInfo.windowHeight - this.headerHeight;
            },
            headerHeight () {
                return this.statusBarHeight + this.navHeight;
            },
        },
        methods: {
            extraProducts () {
                this.isLoadAll = !this.isLoadAll;
            },
            cpoy (text) {
                wx.setClipboardData({
                    data: text,
                    success: function (res) {
                        wx.getClipboardData({
                            success: function (res) {
                                wx.showToast({
                                    title: '复制成功'
                                })
                            }
                        })
                    }
                })
            },
        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style>
    page {
        height: 100%;
        background: #f2f2f2;
    }

    .productsContainer{
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


    #groupon_order_details .content{
        width: 100%;
        box-sizing: border-box;
        padding: 0 20rpx;
        overflow: auto;
    }

    .content h2{
        margin: 35rpx 0;
        font-size: 50rpx;
        color: #111;
        font-weight: bold;
    }

    .content .info{
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        padding: 0 20rpx;
        margin-top: 20rpx;
        border-radius: 25rpx;
        padding-bottom: 1rpx;
    }

    .content .info h2{
        width: 100%;
        height: 98rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 2rpx solid #f2f2f2;
        font-size: 32rpx;
        color: #111;
    }

    .content .info li{
        margin-bottom: 40rpx;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .content .info li:first-child{
        margin-top: 40rpx;
    }

    .content .info li span{
        font-size: 30rpx;
        color: #757575;
    }

    .content .info li h4{
        width: 288rpx;
        font-weight: normal;
        color: #333;
        font-size: 30rpx;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-wrap: wrap;
    }

    .content .info li .copy{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .content .info li .copy button{
        width: 80rpx;
        height: 50rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border:2rpx solid rgba(204,204,204,1);
        border-radius:10rpx;
        font-size: 24rpx;
        color: #111;
        margin-left: 20rpx;
        padding: 0;
        background: #fff;
    }


    .content .bottom {
        width: 100%;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22rpx;
        color: #b3b3b3;
    }
</style>
