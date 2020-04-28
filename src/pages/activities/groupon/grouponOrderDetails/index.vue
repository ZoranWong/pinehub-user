<!--suppress ALL -->
<template>
    <div id="groupon_order_details">
        <CustomHeader :title="title" :needReturn="true"> </CustomHeader>
        <h2>订单待发货</h2>

        <div class="productsContainer">
            <div class="productHeader">
                订单号:1366879566
            </div>
            <ul id="good_list">
<!--                <li v-for="(good,index) in products" :key="index">-->
<!--                    <div class="left">-->
<!--                        <img :src="good.image" alt="">-->
<!--                        <div id="good_info">-->
<!--                            <h3>{{good['name']}}</h3>-->
<!--                            <h4>{{good['intro']}}</h4>-->
<!--                            <em>X {{good['buy_num']}}</em>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div id="good_info_price">-->
<!--                        <i>￥</i>-->
<!--                        <h3>{{good['price']}}</h3>-->
<!--                    </div>-->
<!--                </li>-->
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
                    <span class="small"> <i>￥</i>{{orderInfo['total_fee'] || 0}}</span>
                </li>
                <li>
                    <h3>
                        <img src="../../../orders/orderPayment/imgs/minus.png" alt="">
                        优惠金额
                    </h3>
                    <span class="red"> <i :style="{color: '#FC3C2F'}">￥</i>{{orderInfo['total_preferential_fee'] || 0}}</span>
                </li>
                <li>
                    <h3>
                        <img src="../../../orders/orderPayment/imgs/coupon.png" alt="">
                        优惠券
                    </h3>
                    <div class="couponUse">
                        <em class="gray">暂无可用</em>
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
                isLoadAll: false
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
            }
        },
        methods: {
            extraProducts () {
                this.isLoadAll = !this.isLoadAll;
            }
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
        overflow: hidden;
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
</style>
