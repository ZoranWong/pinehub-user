<template>
    <li class = "trade-item" @click="selectedCard" v-if="order">
        <div class="item-box">
            <div class="time">{{order['created_at']}}</div>
            <div class="desc">{{order['type_desc']}}</div>
            <div class="fee">{{order['consume']}}</div>
        </div>
    </li>
</template>
<script>
    export default {
        name: 'order-item',
        props: ['order']
    }
</script>
<style>
    .trade-item {
        width: 710rpx;
        height: 150rpx;
        margin-left: 20rpx;
        border-radius: 10rpx;
        background-color: #ffffff;
        margin-bottom: 2rpx;
        border: 1rpx solid #f0f0f0;
    }
    .trade-item .item-box {
        position: relative;
        overflow: hidden;
        padding-top: 41rpx;
        padding-bottom: 41rpx;
    }
    .trade-item .time{
        margin-left: 20rpx;
        color: #111111;
        font-size: 28rpx;
        /*padding-top: 41rpx;*/
    }
    .trade-item .desc {
        margin-top: 20rpx;
        margin-left: 20rpx;
        font-size: 28rpx;
        color: #757575;
        /*margin-bottom: 41rpx;*/
    }

    .trade-item .fee {
        position: absolute;
        right: 20rpx;
        font-size: 32rpx;
        top: 63rpx
    }
</style>
