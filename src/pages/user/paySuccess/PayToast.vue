<template>
    <div class="pay-toast" v-if = "show">
        <div class="mask"></div>
        <div class="toast-layout">
            <div class="close" @click="close">
                <img src="../../../../static/images/icon/close-icon-01.png">
            </div>
            <div class="toast-body">
                <div class="toast-background">
                    <img src="../../../../static/images/icon/menoy-pack-01.png">
                </div>
                <div class="content">
                    <div class="title">{{balance ? "余额：" + balance + "元" : "你好像错过了一个亿哦"}}</div>
                    <div class="desc">{{balance ? "在小程序里您可以订早餐、享受品质中晚餐" : "你敢充值我敢赠送花更少的钱，吃更好的餐"}}</div>
                </div>
                <div class="opt-btn">
                    <button type="primary" @click="visit">去看看</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'PayToast',
        props: ['show', 'balance'],
        methods: {
            close () {
                this.$emit('close');
            },
            visit () {
                this.$command('REDIRECT_TO', 'index', 'replace');
            }
        }
    }
</script>
<style>
    .pay-toast{
        top: 320rpx;
        margin-left: 60rpx;
        position: absolute;
    }
    .pay-toast .mask{
        width:100%;
        height:100%;
        position: fixed;
        background-color: #111;
        z-index:9999;
        top:0;
        left:0;
        opacity:0.5;
    }
    .pay-toast .toast-layout{
        position: absolute;
        width: 630rpx;
        height: 610rpx;
        margin: auto;
        border-radius: 12rpx;
        z-index: 100000;
        background-color: #ffffff;
        position: relative;
    }
    .pay-toast .toast-layout .close{
        height: 78rpx;
        width: 77rpx;
        position: absolute;
        top: -16rpx;
        right: -16rpx;
    }

    .pay-toast .toast-layout .close img{
        height: 100%;
        width: 100%;
    }
    .pay-toast .toast-layout .toast-background{
        width: 391rpx;
        height: 247rpx;
        padding-top: 40rpx;
        margin-left: 120rpx;
    }
    .pay-toast .toast-layout .toast-background img{
        height: 100%;
        width: 100%;
    }
    .pay-toast .toast-layout .toast-body .content{
        margin-top: 40rpx;
        width: 100%;
        text-align: center;
        margin-bottom: 20rpx;
    }
    .pay-toast .toast-layout .toast-body .content .title{
        font-size: 36rpx;
        color: #111111;
    }
    .pay-toast .toast-layout .toast-body .content .desc{
        color: #757575;
        font-size: 28rpx;
        width: 320rpx;
        text-align: center;
        margin: auto;
    }
    .pay-toast .toast-layout .toast-body .opt-btn{
        margin-top: 50rpx;
    }
    .pay-toast .toast-layout .toast-body .opt-btn button {
        margin-left: 165rpx;
        width: 300rpx;
        height: 80rpx;
        background-color: #FFD000;
        border-radius: 40rpx;
        color: #111111;
        font-size: 36rpx;
        line-height: 80rpx;
    }
</style>
