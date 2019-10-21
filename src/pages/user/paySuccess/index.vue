<template>
    <div id="orderpay">
        <mp-title :title="title"></mp-title>
        <div class="order-success">
            <div id="orderpay_success">
                <div id="success_ico">
                    <i class="iconfont">&#xe656;</i>
                </div>
                <em>支付成功</em>
                <i class="amount">¥ {{completedOrder['settlement_total_fee'] ? completedOrder['settlement_total_fee']: "0.00"}}</i>
            </div>
        </div>
        <div class="order-detail">
            <div class="payment-amount item">
                <div class="title">合计金额</div>
                <div class="content">¥ {{completedOrder ? completedOrder['settlement_total_fee'] : "0.00"}}</div>
            </div>
            <div class="line"></div>
            <div class="pay-type item">
                <div class="title">支付方式</div>
                <div class="content">{{paymentType}}</div>
            </div>
            <div class="line"></div>
            <div class="pay-time item">
                <div class="title">支付时间</div>
                <div class="content">{{paidAt}}</div>
            </div>
            <div class="line"></div>
            <div class="opt-btn item">
                <button class="btn buy-btn" size="large" @click="index">完成</button>
            </div>
        </div>
        <div id="active_banner" v-if="imgUrl">
            <img :src="imgUrl" @click="goUrl()"/>
        </div>
        <pay-toast v-if="cards.length > 0" :show = "showToast" @close = "close" :balance = "balance"></pay-toast>
        <official-account @bindload="follow" style="bottom: 16rpx;width: 100%;position: absolute;left: 0"></official-account>
    </div>
</template>

<script>
    import MpTitle from '@/components/MpTitle';
    import PayToast from './PayToast';
    export default {
        components: {
            'mp-title': MpTitle,
            'pay-toast': PayToast
        },
        data () {
            return {
                title: '支付成功',
                siteUserOrder: false,
                ticket: true,
                ticketInfo: null,
                imgUrl: null,
                getFoodsTime: null,
                order: null,
                payType: '余额支付',
                showToast: false,
				completedOrder: {},
				paymentType: ''
            };
        },
        computed: {
            balance () {
                if (this.order) {
                    return this.$store.getters['model.account/balance'] - this.order['payment_amount'];
                } else {
                    return this.$store.getters['model.account/balance'];
                }
            },
            cards () {
                return this.$store.getters['model.chargeCards/list'];
            },
            paidAt () {
                return (this.order && this.order['paid_at']) || ((new Date()).format('yyyy-MM-dd hh:mm:ss'));
            }
        },
        watch: {
            imgUrl: function (value) {
                console.log('adv image url', value);
            },
            popupTitle () {
            }
        },
        methods: {
            close () {
                this.showToast = false;
            },
            orders () {
                this.$command('REDIRECT_TO', 'user.orders', 'replace');
            },
            index () {
				this.model.user.store.dispatch('clearShoppingCart');
				this.model.user.store.dispatch('selectPoints',false, 'mall');
                this.$command('REDIRECT_TO', 'index', 'replace');
            },
            async getOrderInfo () {
                let id = this.$route.query['order_id'];
                let res = await this.http.orders.getOrder(id);
                console.log('B----', res);
                this.order = res.data;
                switch (parseInt(this.order['pay_type'])) {
                    case 1: {
                        this.payType = '支付宝支付';
                        break;
                    }
                    case 2: {
                        this.payType = '微信支付';
                        break;
                    }
                    case 3: {
                        this.payType = '余额支付';
                        break;
                    }
                    default: {
                        this.payType = '其他支付';
                        break;
                    }
                }
                if (res.data.type !== 0 && res.data.pick_up_method === 2) {
                    this.siteUserOrder = true;
                } else {
                    this.siteUserOrder = false;
                }
            },
            async getAdvertisement () {
                let id = this.$route.query['order_id'];
                let advertisement = await this.http.orders.showError(false).getAdvertisementByOrder(id);
                if (advertisement) {
                    this.ticketShow = true;
                    this.ticketInfo = advertisement.ticket.data;
                    this.imgUrl = advertisement.banner_url;
                }
            },
            async goUrl () {
                this.$command('REDIRECT_TO', 'user.ticket', 'push', {
                    query: {
                        ticketInfo: JSON.stringify(this.ticketInfo)
                    }
                });
            }
        },
        mounted () {
            this.getOrderInfo();
            this.getAdvertisement();
            setTimeout(() => {
                this.showToast = true;
            }, 1500);
			this.completedOrder = JSON.parse(this.$route.query.order);
			this.paymentType = this.$route.query.type || '微信支付'
		}
    }
</script>

<!--suppress CssInvalidPropertyValue -->
<style scoped>
    #orderpay {
        background: #f1f2f3;
        position: absolute;
        height: 100%;
        width: 100%;
    }

    .order-success {
        background-color: #fff;
    }

    #orderpay_success {
        font-size: 32rpx;
        font-weight: 300;
        color: #111111;
        padding-top: 87rpx;
        padding-bottom: 88rpx;
    }

    #success_ico {
        width: 100%;
        height: 158rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }


    #orderpay_success em {
        text-align: center;
        font-size: 32rpx;
        font-weight: 400;
        margin-top: 20rpx;
        color: #757575;
    }

    #orderpay_success .amount {
        font-size: 50rpx;
        margin: 30rpx auto 20rpx;
        text-align: center;
        line-height: 50rpx;
        color: #111111;
        font-weight: bold;
    }

    #success_ico i {
        font-size: 158rpx;
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
    }

    .notice {
        margin: 0 140rpx;
        line-height: 34rpx;
        color: #333;
    }

    .notice em {
        font-size: 24rpx;
    }

    .notice span {
        font-size: 22rpx;
    }

    .btns {
        width: 520rpx;
        margin: 120rpx auto 0;
    }

    .btn {
        font-size: 32rpx;
        font-weight: 200;
       display: flex;
        justify-content: center;
        align-items: center;
        color: #111111;
        margin: 20rpx;
        height: 80rpx;
        width: 710rpx;
    }

    /*.btn.orders-btn {*/
    /*background: #FFFFFF;*/
    /*}*/

    .btn.buy-btn {
        background: #FECE00;
    }

    .tips {
        margin: 0 60rpx;
        font-weight: normal;
        color: #686868;
    }

    .tips em {
        border-bottom: 2rpx solid #ddd;
        text-align: center;
        line-height: 60rpx;
        margin-bottom: 30rpx;
    }

    .tips em i {
        background: #F1F2F3;
        margin: 0 auto -30rpx;
        display: block;
        width: 36%;
        font-size: 28rpx;
    }

    .tips ul {
        display: block;
        font-size: 20rpx;
        line-height: 32rpx;
        margin: 10rpx 80rpx 0;
    }

    #active_banner {
        margin-top: 40rpx;
    }

    #active_banner img {
        width: 670rpx;
        height: 198rpx;
        margin: 0 auto;
        display: block;
        border-radius: 10rpx;
    }

    .order-detail {
        margin-top: 10rpx;
    }

    .order-detail .item {
        width: 100%;
        height: 80rpx;
        background-color: #ffffff;
    }

    .order-detail .line {
        height: 2rpx;
        background-color: #f2f2f2;
    }

    .order-detail .item {
        display: flex;
    }

    .order-detail .item .title, .order-detail .item .content {
        margin-left: 40rpx;
        line-height: 80rpx;
        color: #111111;
        font-size: 28rpx;
    }

    .order-detail .item .content {
        right: 40rpx;
        float: right;
        position: absolute;
    }

    .order-detail .item.opt-btn {
        height: 120rpx;
    }
    .shop-name{
        text-align:center;
        font-size:46rpx;
        font-weight:360;
        margin-top:-46rpx;
        margin-bottom:38rpx;
    }
</style>
