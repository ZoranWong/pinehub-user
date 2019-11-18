<!--suppress ALL -->
<template>
    <div id="location">
        <CustomHeader :title="title" :needReturn="true" />

        <div class="checkout_header">
            <div class="left">
                <h4>订单金额：{{order['settlement_total_fee_format']}}</h4>
                <span>请您在{{minute}}:{{second}}内完成支付</span>
            </div>
            <img src="../../../../static/images/background/1.png" alt="">
        </div>
        <div class="checkout_body">
            <div class="select">请选择支付方式</div>
            <div class="balance" @click="payByBalance">
                <div class="left">
                    <i class="iconfont yue">&#xe6ec;</i>
                    <span>余额支付 (￥{{userInfo.balance}})</span>
                </div>
                <div class="right">
                    <span class="not_enough" v-if="order['settlement_total_fee'] > userInfo.balance">余额不足，点击充值</span>
                    <i class="iconfont">&#xe6a3;</i>
                </div>
            </div>
            <div class="balance" @click="payByWechat">
                <div class="left">
                    <i class="iconfont wx">&#xe883;</i>
                    <span>微信支付</span>
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
        components: {
			CustomHeader
        },
        // 数据
        data () {
            return {
                title: '收银台',
                order: {},
				second: 0,
                minute: 0,
                countDownBar : null, // 定时器句柄
                CURRENTTIME : new Date(), // 当前时间
                TIMEOUT_LIMIT : 1800000, // 30分钟 ms
                orderCreatedTime : 0, // 计算时间差
            }
        },
        // 算术方法
        computed: {
			createdOrderInfo () {
				console.log(this.order, '*********************');
				this.order = this.model.user.order.payment.createdOrderInfo;
				return this.model.user.order.payment.createdOrderInfo
            },
			userInfo () {
				return this.model.account.userInfo;
			}
        },
        // 普通方法
        methods: {
			countDownServer(time) {
				let leftTime = null;
				if (time) {
					let flag = this.CURRENTTIME - time >= this.TIMEOUT_LIMIT ? 0 : (this.TIMEOUT_LIMIT - (this.CURRENTTIME - time));
					leftTime = new Date((this.CURRENTTIME.getTime() + flag)) - (new Date());
				} else {
					leftTime = new Date((this.CURRENTTIME.getTime() + this.TIMEOUT_LIMIT)) - (new Date());
				}
				let minutes = parseInt(leftTime / 1000 / 60 % 60, 10),
					seconds = parseInt(leftTime / 1000 % 60, 10);
				if (seconds < 0) {
					// 执行具体逻辑
					clearTimeout(this.countDownBar);
					return false;
				}
				this.minute = _.isNaN(this.fix(minutes, 2)) ? '00' : this.fix(minutes, 2);
				this.second = _.isNaN(this.fix(seconds, 2)) ? '00' : this.fix(seconds, 2);
				this.countDownBar = setTimeout(function() {
					this.countDownServer(this.orderCreatedTime);
				}.bind(this), 1000);
			},
            fix(num, length) {
                return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
            },
			payByBalance () {
				let self = this;
				if (this.order['settlement_total_fee'] > this.userInfo.balance) {
					this.$command('REDIRECT_TO', 'user.recharge', 'push');
                } else {
					wx.showModal({
						title: '温馨提示',
						content: '确认使用余额支付吗？',
						async success (res) {
							if (res.confirm) {
								self.$command('PAYMENT_BY_BALANCE',self.order, self.type)
							}
						}
					})
                }
            },
            payByWechat () {
				this.$command('PAYMENT_BY_ID', this.order)
            }
        },
        mounted () {
			this.$command('LOAD_ACCOUNT')
			this.type = this.$route.query.type
			if (this.$route.query && this.$route.query.order) {
				this.order = JSON.parse(this.$route.query.order);
				console.log(this.order, '****^^^^****');
			}
			this.countDownServer(new Date(this.order.createdAt || this.order['created_at']))
		}
	}
</script>

<!--suppress CssInvalidPropertyValue -->
<style>
    page {
        height: 100%;
        background: #f2f2f2;
    }

    .checkout_header{
        width: 100%;
        height: 180rpx;
        padding: 0 90rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(to right,#FDE068,#FFCC00);
    }

    .checkout_header .left{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .checkout_header .left h4{
        font-size: 32rpx;
        color: #111111;
    }

    .checkout_header .left span{
        font-size: 28rpx;
        color: #111111;
    }

    .checkout_header img{
        width: 178rpx;
        height: 144rpx;
    }

    .checkout_body{
        margin-top: 20rpx;
        background: #fff;
        width: 100%;
        box-sizing: border-box;
        padding: 0 20rpx;
    }

    .checkout_body .select{
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

    .checkout_body .balance{
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

    .checkout_body .balance .yue{
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 48rpx;
        margin-right: 20rpx;
    }

    .checkout_body .balance .wx{
        font-size: 48rpx;
        color: #60B130;
        margin-right: 20rpx;
    }

    .checkout_body .balance .right{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .checkout_body .balance .not_enough{
        font-size: 28rpx;
        color: #ffcc00;
    }


    .checkout_body .balance .right i{
        font-size: 22rpx;
        color: #757575;
        margin-left: 20rpx;
    }




</style>
