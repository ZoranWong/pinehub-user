<!--suppress ALL -->
<template>
    <div class="body">
        <mp-title :title="title"></mp-title>
        <div class="charge-cards">
            <div class="title">
                选择充值金额
            </div>
            <ul class="cards">
                <li v-for="item in cards" @click="selectedCard(item.id)" :key ="item.id" :class="item.id === checked ? 'active-card' : ''">
                    <h3>{{item.price}}元</h3>
                    <span>送{{item['gift_amount']}}元</span>
                    <img src="./img/payIcon.jpg" alt="" v-if="item.id === checked">
                </li>
            </ul>
        </div>
        <div class="pay_type">
            <div class="header">请选择支付方式</div>
            <div class="type" @click="selectType('wx')">
                <div class="left">
                    <i class="iconfont wx">&#xe883;</i>
                    <span>微信支付</span>
                </div>
                <i class="iconfont right">&#xe656;</i>
            </div>
        </div>
        <form report-submit="true" @submit="uploadFormId">
            <button form-type="submit" class="pay-btn" @click="createRechargeOrder" :style="{bottom: checked?'0':'-100rpx',zIndex:'99999'}" >充值</button>
        </form>
    </div>
</template>
<script>
	import MpTitle from '@/components/MpTitle';

	export default {
		name: 'Balance',
		data: function () {
			return {
				title: '余额充值',
				selectedIndex: null,
				checked: ''
			};
		},
		components: {
			'mp-title': MpTitle
		},
		computed: {
			cards () {
				return this.model.user.recharge.cards
            }
		},
		methods: {
			selectedCard (id) {
				this.checked = id
			},
			selectType (type) {
				this.type = type
            },
			createRechargeOrder () {
				console.log(this.checked, '====');
				if(!this.checked) return;
                this.$command('CREATE_RECHARGE_ORDER', this.checked)
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
			this.$command('RECHARGE_CARDS')
		}
	}
</script>
<style>
    .body {
        background-color: #f2f2f2;
    }

    .charge-cards{
        width: 100%;
        background: #fff;
        margin-top: 20rpx;
        margin-bottom: 10rpx;
        padding: 0 20rpx;
        box-sizing: border-box;
    }

    .charge-cards .title{
        width: 100%;
        height: 80rpx;
        box-sizing: border-box;
        padding: 0 20rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 28rpx;
        color: #111111;
        border-bottom: 2rpx solid #f2f2f2;
    }

    .charge-cards .cards{
        width: 100%;
        box-sizing: border-box;
        padding: 30rpx 20rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }

    .charge-cards .cards li{
        width: 212rpx;
        height: 128rpx;
        border-radius: 10rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 11rpx;
        border: 2rpx solid #ccc;
        margin-bottom: 10rpx;
        position: relative
    }

    .charge-cards .cards li:nth-child(3n){
        margin-right: 0;
    }

    .charge-cards .cards li h3{
        font-size: 32rpx;
        color: #111111;
    }

    .charge-cards .cards li span{
        font-size: 24rpx;
        color: #757575;
    }

    .charge-cards .cards li img{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 38rpx;
        height: 38rpx;
    }

    .pay_type{
        width: 100%;
        box-sizing: border-box;
        padding: 0 20rpx;
        background: #fff;
    }

    .pay_type .header {
        width: 100%;
        height: 80rpx;
        box-sizing: border-box;
        padding:  0 20rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 28rpx;
        color: #111111;
    }

    .pay_type .type{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 80rpx;
        padding: 0 20rpx;
        box-sizing: border-box;
        border-top: 2rpx solid #f2f2f2;
    }

    .pay_type .type .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .pay_type .type .left i{
        font-size: 48rpx;
        margin-right: 20rpx;
    }

    .pay_type .type .left .wx{
        color: #60B130;
    }

    .pay_type .type .left span{
        font-size: 28rpx;
        color: #111111;
    }

    .pay_type .type .right {
        font-size: 48rpx;
        color: #ffcc00;
    }

    .active-card{
        border-color: #ffcc00;
    }

    .active-card h3 {
        color: #ffcc00;
    }

    .pay-btn{
        width: 100%;
        height: 98rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        color: #111111;
        background: #ffcc00;
        position: fixed;
        border-radius: 0;
        transition: all 1s;
    }

    .pay-btn:after{
        border: none;
    }
</style>
