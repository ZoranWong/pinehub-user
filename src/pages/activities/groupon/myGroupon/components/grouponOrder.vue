<!--suppress ALL -->
<template>
    <div class="group_order">
        <div class="order_info_sn">
            <div class="left">
                <img src="../../../../../../static/icons/orderMenu.png" class="orderMenu" alt="">
                <em>订单号:1366879566</em>
                <img src="../../../../../../static/icons/rightArrow.png" class="arrow" alt="">
            </div>
            <span class="order_info_status" >已完成</span>
        </div>
        <ul class="order_info_glist" >
            <li v-for="(item, idx) in order.orderItems" :key="idx">
                <div class="left">
                    <img :src="item.mainImage" alt="">
                    <div id="good_info">
                        <h3>{{item.name}}</h3>
                        <em>{{item['intro']}}</em>
                        <div id="good_info_price">
                            <em>X {{item.quantity}}</em>
                        </div>
                    </div>
                </div>
                <div class="price">
                    <i>¥</i>
                    <h4>3.54</h4>
                </div>
            </li>
        </ul>
        <div id="total">
            <h4>实付</h4>
            <div class="amount">
                <span>共5件</span>
                <i>¥</i>
                <h5>13.5</h5>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "grouponOrder",
        data () {
            return {
                order: {
                    orderItems: [
                        {
                            name: 'minabao',
                            intro: 'xxasjiasdiasy',
                            buy_num: '2',
                            price: 34,
                            quantity: 2

                        },
                        {
                            name: 'minab1212ao',
                            intro: 'xxasjiasdiasy',
                            buy_num: '2',
                            price: 34,
                            quantity: 34
                        },
                        {
                            name: 'minab43443ao',
                            intro: 'xxasjiasdiasy',
                            buy_num: '2',
                            price: 34,
                            quantity: 6
                        }
                    ],
                },
            }
        }
    }
</script>

<style scoped>
    .group_order{
        width: 100%;
        background: #fff;
        border-radius: 25rpx;
        box-sizing: border-box;
        padding: 0 20rpx;
    }

    .order_info_sn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100% ;
        height: 108rpx;
        box-sizing: border-box;
    }

    .order_info_sn .left{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .order_info_sn .left .orderMenu{
        width: 30rpx;
        height: 36rpx;
        margin-right: 20rpx;
    }

    .order_info_sn .left em{
        font-size: 30rpx;
        color: #111;
        font-weight: bold;
    }

    .order_info_sn .left .arrow{
        width: 12rpx;
        height: 22rpx;
        margin-left: 30rpx;
    }

    .order_info_sn .order_info_status{
        font-size: 28rpx;
        color: #333;
    }

    .order_info_glist {
        padding: 30rpx 0;
        box-sizing: border-box;
        border-bottom: 1rpx solid #f2f2f2;
        border-top: 1rpx solid #f2f2f2;
        background: #fff;
    }

    .order_info_glist li {
        padding: 10rpx;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .order_info_glist li .left{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .order_info_glist li .price{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .order_info_glist li .price i{
        font-weight: bold;
        font-size: 28rpx;
        color: #111;
        margin-right: 10rpx;
        transform: translateY(5rpx);
    }

    .order_info_glist li .price h4{
        font-weight: bold;
        font-size: 32rpx;
        color: #111;
    }

    .order_info_glist li img {
        width: 180rpx;
        height: 180rpx;
    }

    .order_info_glist li #good_info {
        flex: 1;
        margin-left: 20rpx;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }

    .order_info_glist li #good_info h3{
        font-size: 28rpx;
        color: #111111;
        margin: 10rpx 0 20rpx 0;
    }

    .order_info_glist li #good_info em{
        font-size: 24rpx;
        color: #757575;
    }

    .order_info_glist li #good_info #good_info_price{
        width: 100%;
        margin-top: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .order_info_glist li #good_info #good_info_price h3{
        margin: 0;
    }

    .order_info_glist #total{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 24rpx;
        color: #111111;
        padding: 0 10rpx;
        box-sizing: border-box;
    }

    .order_info_glist #total span{
        font-size: 32rpx;
        color: #111111;
    }

    #total{
        width: 100%;
        height: 108rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #total h4{
        font-weight: normal;
        font-size: 32rpx;
        color: #111;
    }

    #total .amount{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    #total .amount span{
        font-size: 26rpx;
        color: #333;
        transform: translateY(5rpx);
    }

    #total .amount i{
        font-size: 24rpx;
        color: #111;
        font-weight: bold;
        margin-left: 15rpx;
        margin-right: 10rpx;
        transform: translateY(5rpx);
    }

    #total .amount h5{
        font-size: 32rpx;
        color: #111;
        font-weight: bold;
    }

</style>
