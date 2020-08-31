<!--suppress ALL -->
<template>
    <div id="location">
        <CustomHeader :title="title" :needReturn="true" :backUrl="true" @back="backStore"/>

        <div class="checkout_header">
            <div class="left">
                <h4>订单金额：{{settlementTotalFeeFormat}}</h4>
                <span>请您在{{minute}}:{{second}}内完成支付</span>
            </div>
            <img src="../../../../static/images/background/1.png" alt="">
        </div>
        <div class="checkout_body">
            <div class="select">请选择支付方式</div>
            <div class="balance" @click="payByBalance">
                <div class="left">
                    <img src="../../../../static/icons/money.png" alt="">
                    <span>余额支付 (￥{{userInfo.balance}})</span>
                </div>
                <div class="right">
                    <span class="not_enough"
                          v-if="order && order['settlement_total_fee'] > userInfo.balance">余额不足，点击充值</span>
                    <i class="iconfont">&#xe6a3;</i>
                </div>
            </div>
            <div class="balance" @click="payByWechat">
                <div class="left">
                    <img class="wechat" src="../../../../static/icons/wxchat.png" alt="">
                    <span>微信支付</span>
                </div>
                <div class="right">
                    <i class="iconfont">&#xe6a3;</i>
                </div>
            </div>
            <div class="balance" @click="payByCard" v-if="type !== 'groupon'">
                <div class="left">
                    <img src="../../../../static/icons/cardPay.png" alt="">
                    <span>消费卡支付</span>
                </div>
                <div class="right">
                    <i class="iconfont">&#xe6a3;</i>
                </div>
            </div>
        </div>

    </div>
</template>

<script>


    import CustomHeader from '../../../components/CustomHeader';

    import _ from 'underscore';

    export default {
        onUnload: function () {
            clearTimeout(this.countDownBar)
        },
        components: {
            CustomHeader
        },
        // 数据
        data() {
            return {
                title: '收银台',
                order: null,
                second: 0,
                minute: 0,
                settlementTotalFeeFormat: 0,
                orderNew: null,
                type: null,
                countDownBar: null // 定时器句柄
            }
        },
        onHide() {
            this.reset();
        },
        onShow() {
            this.reset();
            this.type = this.$route.query.type;
            if (this.$route.query && this.$route.query.order) {
                this.order = JSON.parse(this.$route.query.order);
                if (this.order['order_id']) {
                    this.order.id = this.order['order_id'];
                    this.order['settlement_total_fee_format'] = `¥${this.order['settlement_total_fee']}`
                }
                this.orderNew = this.order;
            }
        },
        watch: {
            createdOrderInfo(v) {
                if (this.order) {
                    this.settlementTotalFeeFormat = this.order['settlement_total_fee_format'];
                    if (this.order['auto_cancel_after_seconds'] > 0) {
                        this.countDownServer(this.order['auto_cancel_after_seconds'])
                    }
                }
            }
        },
        // 算术方法
        computed: {
            createdOrderInfo() {
                if (this.type) {
                    let order = this.type === 'groupon' ? this.model.groupon.createdOrderInfo : this.model.user.order.payment.createdOrderInfo;
                    this.order = order;
                }
                return this.order;
            },
            userInfo() {
                return this.model.account.userInfo;
            }
        },
        // 普通方法
        methods: {
            reset() {
                this.order = null;
                this.orderNew = null;
                this.type = null;
                if (this.countDownBar) {
                    clearTimeout(this.countDownBar);
                    this.countDownBar = null;
                }
                this.settlementTotalFeeFormat = 0;
            },
            backStore() {
                if (this.$route.query.type === 'groupon') {
                    this.$command('REDIRECT_TO', 'user.myGroupon', 'reLaunch', {
                        query: {
                            status: 5,
                            backCenter: true
                        }
                    });
                } else {
                    this.$command('REDIRECT_TO', 'index', 'reLaunch')
                }
            },
            countDownServer(time) {
                let minutes = Math.floor(time / 60),
                    seconds = Math.floor(time - minutes * 60);
                if (time < 0) {
                    // 执行具体逻辑
                    clearTimeout(this.countDownBar);
                    return false;
                }
                if (this.countDownBar) {
                    clearTimeout(this.countDownBar);
                }
                this.minute = _.isNaN(this.fix(minutes, 2)) ? '00' : this.fix(minutes, 2);
                this.second = _.isNaN(this.fix(seconds, 2)) ? '00' : this.fix(seconds, 2);
                this.countDownBar = setTimeout(() => {
                    time--
                    this.countDownServer(time);
                }, 1000);
            },
            fix(num, length) {
                return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
            },
            payByBalance() {
                let self = this;
                if (this.order && this.order['settlement_total_fee'] > this.userInfo.balance) {
                    this.$command('REDIRECT_TO', 'user.recharge', 'push');
                } else {
                    wx.showModal({
                        title: '温馨提示',
                        content: '确认使用余额支付吗？',
                        async success(res) {
                            if (res.confirm) {
                                if (self.$route.query && self.$route.query.order) {
                                    self.$command('PAYMENT_BY_BALANCE', self.orderNew, self.type)
                                } else {
                                    self.$command('PAYMENT_BY_BALANCE', self.order, self.type)
                                }
                            }
                        }
                    })
                }
            },
            payByWechat() {
                if (this.$route.query && this.$route.query.order) {
                    this.$command('PAYMENT_BY_ID', this.orderNew)
                } else {
                    this.$command('PAYMENT_BY_ID', this.order)
                }
            },
            payByCard() {
                if (this.$route.query && this.$route.query.order) {
                    this.$command('PAYMENT_BY_CARD', this.orderNew)
                } else {
                    this.$command('PAYMENT_BY_CARD', this.order)
                }
            }
        },
        mounted() {
            this.$command('LOAD_ACCOUNT')
        }
    }
</script>

<!--suppress CssInvalidPropertyValue -->
<style>
    page {
        height: 100%;
        background: #f2f2f2;
    }

    .checkout_header {
        width: 100%;
        height: 180rpx;
        padding: 0 90rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(to right, #FDE068, #FFCC00);
    }

    .checkout_header .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .checkout_header .left h4 {
        font-size: 32rpx;
        color: #111111;
    }

    .checkout_header .left span {
        font-size: 28rpx;
        color: #111111;
    }

    .checkout_header img {
        width: 178rpx;
        height: 144rpx;
    }

    .checkout_body {
        margin-top: 20rpx;
        background: #fff;
        width: 100%;
        box-sizing: border-box;
        padding: 0 20rpx;
    }

    .checkout_body .select {
        width: 100%;
        height: 80rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 28rpx;
        color: #111111;
        padding: 0 20rpx;
        box-sizing: border-box;
    }

    .checkout_body .balance {
        width: 100%;
        box-sizing: border-box;
        padding: 0 20rpx;
        height: 118rpx;
        border-top: 2rpx solid #f2f2f2;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .checkout_body .balance .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 28rpx;
        color: #111111;
    }

    .checkout_body .balance .left img {
        width: 48rpx;
        height: 48rpx;
        margin-right: 20rpx;
    }

    .wechat {
        width: 48rpx !important;
        height: 39rpx !important;
    }

    .checkout_body .balance .yue {
        background: linear-gradient(to right, #FDE068, #FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 48rpx;
        margin-right: 20rpx;
    }

    .checkout_body .balance .wx {
        font-size: 48rpx;
        color: #60B130;
        margin-right: 20rpx;
    }

    .checkout_body .balance .right {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .checkout_body .balance .not_enough {
        font-size: 28rpx;
        color: #ffcc00;
    }


    .checkout_body .balance .right i {
        font-size: 22rpx;
        color: #757575;
        margin-left: 20rpx;
    }


</style>
