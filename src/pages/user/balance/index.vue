<template>
    <div class="body">
        <CustomHeader :title="title" :needReturn="true" />
        <div class="container" :style="{height: mainHeight + 'px'}">
            <div class="balance-detail" >
                <div class="title">可用余额（元）</div>
                <div class="balance-number">
                    {{balance}}
                </div>
                <div class="buttons">
                    <button  class="recharge" @click="jump('user.recharge')">立即充值</button>
                    <button  class="recharge" @click="exchange">输入兑换码</button>
                </div>
            </div>
            <div class="recharge-details">
                <h3>余额明细</h3>
                <ul class="recharge-details-list" v-if="balanceRecord.length" :style="{height: mainHeight - 230 + 'px'}">
                    <li v-for="item in balanceRecord" :key="item.id">
                        <div class="left">
                            <h4>{{item['type_desc']}}</h4>
                            <span>{{item['change_at']}} </span>
                        </div>
                        <div class="right">{{item.amount}}</div>
                    </li>
                </ul>
                <div class="empty_list" v-else>
                    <img src="../../../../static/images/empty/empty_order.jpg" alt="">
                    <span>暂无余额变动明细哦</span>
                </div>
            </div>
        </div>
        <Exchange
            v-if="exchangeVisible"
            @close="exchangeVisible = false"
            @submit="exchangeCode"
        />
    </div>
</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';
	import Exchange from "./components/Exchange";
    export default {
        name: 'Balance',
        data: function () {
          return {
              title: '我的余额',
              exchangeVisible: false
          };
        },
        components: {
			CustomHeader,Exchange
        },
        computed: {
            balance () {
                return this.$store.getters['model.account/balance'];
            },
			balanceRecord () {
				return this.model.account.balanceRecord
            },
			statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
			},
			navHeight () {
				return this.model.global.barHeight.navHeight
			},
            headerHeight () {
                return this.statusBarHeight + this.navHeight;
            },
            mainHeight () {
                let systemInfo = wx.getSystemInfoSync();
                let height = systemInfo.windowHeight;
                return height - this.headerHeight;
            }
        },
        methods: {
            exchange () {
                this.exchangeVisible = true
            },
            exchangeCode (code) {
                this.$command('EXCHANGE', code)
                setTimeout(()=>{
                    this.exchangeVisible = false
                },1500)
            },
            jump (router) {
            	this.$command('REDIRECT_TO', router, 'push');
            },
			async uploadFormId (e) {
				let formId = e.mp.detail.formId;
				if (formId !== "the formId is a mock one"){
					await this.http.account.saveFormId(formId);
				} else {
					console.log('form id 不合法')
				}
			}
        },
        mounted () {
        	this.$command('LOAD_BALANCE_RECORD')
		}
	}
</script>
<style>
    .body{
        background-color: #fff;
        overflow: hidden;
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
        background: #fff;
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
        height: 1000rpx;
        overflow: auto;
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

    .empty_list{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 300rpx;
    }

    .empty_list img{
        width: 374rpx;
        height: 300rpx;
    }
    .empty_list span{
        font-size: 28rpx;
        color: #999;
        margin-top: 20rpx;
    }

    .buttons{
        box-sizing: border-box;
        padding: 0 40rpx;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
