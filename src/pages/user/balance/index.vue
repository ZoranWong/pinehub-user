<template>
    <div class="body">
        <mp-title :title="title"></mp-title>
        <div class="balance-detail">
            <div class="title">可用余额（元）</div>
            <div class="balance-number">
                {{balance}}
            </div>
            <button class="recharge" @click="jump('user.recharge')">立即充值</button>
        </div>
        <div class="recharge-details">
            <h3>余额明细</h3>
            <ul class="recharge-details-list">
                <li v-for="item in balanceRecord" :key="item.id">
                    <div class="left">
                        <h4>{{item['type_desc']}}</h4>
                        <span>{{item['change_at']}} </span>
                    </div>
                    <div class="right">{{item.amount}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import MpTitle from '@/components/MpTitle';
    export default {
        name: 'Balance',
        data: function () {
          return {
              title: '我的余额'
          };
        },
        components: {
            'mp-title': MpTitle
        },
        computed: {
            balance () {
                return this.$store.getters['model.account/balance'];
            },
			balanceRecord () {
				return this.model.account.balanceRecord
            }
        },
        methods: {
            jump (router) {
            	this.$command('REDIRECT_TO', router, 'push');
            }
        },
        mounted () {
        	this.$command('LOAD_BALANCE_RECORD')
		}
	}
</script>
<style>
    .body{
        background-color: #f2f2f2;
    }

    button:after{
        border: 0;
    }

    .balance-detail{
        box-sizing: border-box;
        width: 100%;
        background:linear-gradient(270deg,rgba(255,204,0,1),rgba(253,224,104,1));
        padding: 50rpx 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: fixed;
        top: 0;
    }
    .balance-detail .title{
        font-size: 28rpx;
        color: #111;
    }
    .balance-detail .balance-number{
        text-align: center;
        margin-top: 15rpx;
        margin-bottom: 25rpx;
        color: #111111;
        font-size: 70rpx;
        font-weight: bold;
    }
    .recharge{
        color: #111111;
        font-size: 32rpx;
        width: 280rpx;
        box-sizing: border-box;
        height: 80rpx;
        background:rgba(253,224,104,1);
        box-shadow:0 5rpx 10rpx 0 rgba(255,204,0,0.6);
        border-radius:40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: normal;
    }

    .recharge-details{
        width: 100%;
        margin-top: 340rpx;
    }

    .recharge-details h3{
        width: 100%;
        height: 80rpx;
        box-sizing: border-box;
        padding: 0 40rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: #f2f2f2;
        font-size: 28rpx;
        color: #757575;
        font-weight: normal;
    }

    .recharge-details .recharge-details-list{

    }

    .recharge-details .recharge-details-list li{
        padding: 30rpx 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        border-bottom: 2rpx solid #f2f2f2;
    }

    .recharge-details .recharge-details-list li .left{

    }

    .recharge-details .recharge-details-list li .left h4{
        font-size: 28rpx;
        color: #111111;
        font-weight: normal;
    }

    .recharge-details .recharge-details-list li .left span{
        font-size: 28rpx;
        color: #757575;
    }

    .recharge-details .recharge-details-list li .right{
        font-size: 32rpx;
        color: #111;
    }

</style>
