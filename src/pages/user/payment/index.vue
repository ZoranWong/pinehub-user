<!--suppress ALL -->
<template>
    <div class = "body">
        <div class = "payment-box">
            <div class = "header">
                <div class = "left">
                    <div class = "title">付款给商家</div>
                    <div class = "merchant-name">名称：{{ shopName }}</div>
                </div>
                <div class = "right">
                    <div class="logo">
                        <img :src = "logo"/>
                    </div>
                </div>
            </div>
            <div class = "content">
                <div class="title">金额</div>
                <div class = "payment-input-box">
                    <div class = "currency">¥</div>
                    <input type = "digit" class = "payment-amount" placeholder = "请输入支付金额" v-model = "paymentAmount" auto-focus/>
                </div>
            </div>
            <div class = "footer">
                <button type="primary" @click = "payment">立即支付</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data: {
            shopName: '福年来早餐车',
            storeId: null,
            ticketCode: null,
            mobile: null,
            paymentAmount: null,
            address: null
        },
        computed: {
            logo () {
                return this.$store.getters['model.app/logo']
            },
            isLogin () {
                let token = this.$store.getters['model.account/token'];
                let userInfo = this.$store.getters['model.account/userInfo'];
                return token !== null && (new Date(token['ttl'])).getTime() > Date.now();
            }
        },
        methods: {
            async init () {
                if (!this.isLogin) {
                    await this.$command('SIGN_IN');
                }

                let store = await this.http.store.store(this.storeId);
                this.shopName = store['name'];
                this.mobile = store['mobile'];
                this.address = store['address'];
            },
            payment () {
                this.$command('CREATE_OFF_LINE_ORDER', this.shopName, this.mobile, this.storeId, this.address, this.paymentAmount);
            }
        },
        mounted () {
            this.storeId = this.$route.query['store_id'] ? this.$route.query['store_id'] : this.storeId;
            this.init();
        },
        onLoad (options) {
            if (options.q){
                let scan_url = decodeURIComponent(options.q);
                this.storeId = scan_url.match(/\d+/)[0] //提取链接中的数字，也就是链接中的参数id，/\d+/ 为正则表达式
            }
        }
    }
</script>
<style scoped>
    .body {
        width: 750rpx;
        background-color: #F0F0F0;
    }
    .payment-box {
        margin: 20rpx auto;
        width: 706rpx;
        border: 1rpx solid #FBFBFB;
        height: 580rpx;
        background-color: white;
        border-radius: 2%;
    }

    .payment-box .header {
        width: 100%;
        height: 160rpx;
        background-color: #FBFBFB;
        display: flex;
        border-top-left-radius: 2%;
        border-top-right-radius: 2%;
    }
    .payment-box .header .left {
        width: 586rpx;
        height: 100%
    }

    .payment-box .header .right {
        width: 120rpx;
        height: 100%;
    }

    .payment-box .header .left .title {
        color: #111111;
        margin: 38rpx 0 20rpx 40rpx;
        font-size: 35rpx;
    }

    .payment-box .header .left .merchant-name {
        color: #757575;
        margin: 0 0 35rpx 40rpx;
        font-size: 32rpx;
    }

    .payment-box .header .right .logo {
        margin: 40rpx 40rpx 0 0;
        width: 80rpx;
        height: 80rpx;
        font-size: 32rpx;
    }

    .payment-box .header .right .logo image{
        width: 80rpx;
        height: 100%;
    }

    .payment-box .content .title {
        color: #757575;
        margin-top: 40rpx;
        margin-left: 40rpx;
        font-size: 36rpx;
    }

    .payment-box .content .payment-input-box {
        margin-top: 40rpx;
        margin-left: 40rpx;
        border-bottom-color: #F2F2F2;
        border-bottom-width: 2rpx;
        border-bottom-style: solid;
        height: 130rpx;
        display: flex;
    }

    .payment-box .content .payment-input-box .currency {
        font-size: 72rpx;
        font-weight: 400;
        margin-bottom: 58rpx
    }

    .payment-box .content .payment-input-box .payment-amount {
        font-size: 64rpx;
        font-weight: 200;
        height: 100rpx;
        margin-bottom: 30rpx;
        margin-left: 30rpx;
    }
    .payment-box .content .am-amount {
        height: 250rpx;
    }
    .payment-box .content .am-amount .am-amount-footer {
        padding: 0;
        height: 0;
    }
    .payment-box .footer button {
        margin: 38rpx 40rpx 50rpx 40rpx;
        color: #F2F2F2;
        border-radius: 10rpx;
        height: 90rpx;
        width: 626rpx;
    }
</style>
