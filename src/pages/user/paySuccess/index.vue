<!--suppress ALL -->
<template>
    <div id="orderpay">
        <mp-title :title="title"></mp-title>
        <div id="orderpay_success">
            <div id="success_ico"></div>
            <em>支付成功</em>
            <i>您可以在我的订单中随时查看订单情况</i>
        </div>
        <div class = "btns">
            <button class = "btn orders-btn" size  = "mini" @click="orders">查看订单</button>
            <button class = "btn buy-btn" size  = "mini" @click="index">返回首页</button>
        </div>
    </div>
</template>

<script>
    import MpTitle from '@/components/MpTitle';
    export default {
        components: {
            'mp-title': MpTitle
        },
        data () {
            return {
                title: '支付成功'
            };
        },
        computed: {

        },
        methods: {
            orders () {
                this.$command('REDIRECT_TO', 'user.orders', 'replace');
            },
            index () {
                this.$command('REDIRECT_TO', 'index', 'replace');
            }
        },
        created () {

        }
    }
</script>

<style scoped>
    #orderpay {
        background: #f1f2f3;
        position: absolute;
        height: 100%;
        width: 100%;
    }

    #orderpay_success {
        font-size: 32rpx;
        font-weight: 300;
        color: #111111;
        margin-top: 130rpx;
    }
    #success_ico {
        display: block;
        width: 148rpx;
        height: 148rpx;
        margin: 0 auto;
        padding: 5rpx;
        background: url(../../../../static/images/icon/feedBackSuccess.png) no-repeat center center;
        background-size: 100%;
    }

    #orderpay_success em {
        text-align: center;
        font-size: 30rpx;
        font-weight: 400;
        margin-top: 30rpx;
    }

    #orderpay_success i {
        font-size: 24rpx;
        margin: 20rpx 130rpx 140rpx;
        text-align: center;
        line-height: 36rpx;
    }
    .btns {
        width: 520rpx;
        margin: auto;
    }

    .btn {
        font-size: 32rpx;
        font-weight:200;
        text-align:center;
        color:#111111;
        line-height:56rpx;
        margin:15rpx;
        height:56rpx;
        width:230rpx;
    }
    .btn.orders-btn {
        background:#FFFFFF;
    }
    .btn.buy-btn {
        background:#FECE00;
    }
</style>
