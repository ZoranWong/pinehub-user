<template>
    <div id="orderpay">
        <mp-title :title="title"></mp-title>
        <div class="order-success">
            <div id="orderpay_success">
                <div class = "shop-name">{{order ? order['shop']['name'] : '快乐松'}}</div>
                <div id="success_ico"></div>
                <em>支付成功</em>
                <i>¥ {{order ? order['payment_amount']: ""}}</i>
            </div>
        </div>
        <div class="order-detail">
            <div class="payment-amount item">
                <div class="title">合计金额</div>
                <div class="content">¥ {{order ? order['payment_amount'] : "0.00"}}</div>
            </div>
            <div class="line"></div>
            <div class="pay-type item">
                <div class="title">支付方式</div>
                <div class="content">{{payType}}</div>
            </div>
            <div class="line"></div>
            <div class="pay-time item">
                <div class="title">支付时间</div>
                <div class="content">{{paidAt}}</div>
            </div>
            <div class="line"></div>
            <div class="opt-btn item">
                <button class="btn buy-btn" size="large" @click="index">返回首页</button>
            </div>
        </div>
        <div class="notice" v-if="siteUserOrder">
            <em>请您于:</em>
            <span>明天7:00-9:00前往指定取货点，凭订单号后四位取货</span>
        </div>
        <div class="tips" v-if="siteUserOrder">
            <em><i>温馨提示</i></em>
            <ul>
                <li>1.自提时如超时未取，则视为自动放弃！</li>
                <li>2.食品现制现售，暂不支持自主退货服务哦！</li>
            </ul>
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
                showToast: false
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
        font-size: 32rpx;
        font-weight: 400;
        margin-top: 20rpx;
        color: #757575;
    }

    #orderpay_success i {
        font-size: 50rpx;
        margin: 30rpx auto 20rpx;
        text-align: center;
        line-height: 50rpx;
        color: #111111;
        font-weight: bold;
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
        line-height: 80rpx;
        font-weight: 200;
        text-align: center;
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
