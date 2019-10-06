<template>
    <div class="body">
        <mp-title :title="title"></mp-title>
        <div>1111111111111111111111111111111111111111111111</div>
        <div class="charge-cards" v-if="cards.length > 0">
            <div class="title">
                选择充值金额
            </div>
            <div class="line"></div>
            <div class="cards">
                <scroll-view scroll-x="true"  class="card-list">
                    <ul>

                    </ul>
                </scroll-view>
            </div>
        </div>
        <button type="primary"  v-if="selectedIndex !== null" class="pay-btn" @click="charge">立即支付</button>
    </div>
</template>
<script>
    import MpTitle from '@/components/MpTitle';
    export default {
        name: 'Balance',
        data: function () {
          return {
              title: '余额充值',
              selectedIndex: null
          };
        },
        components: {
            'mp-title': MpTitle
        },
        computed: {
            cards () {
                return this.$store.getters['model.chargeCards/list'];
            }
        },
        methods: {
            selectedCard (index, chargeCard) {
                this.selectedIndex = index;
                this.chargeCard = chargeCard;
            },
            async charge () {
                await this.$command('CREATE_ORDER_BY_MERCHANDISE_ID', '', '', '', '', this.chargeCard.price, this.chargeCard['merchandise_id']);
                this.$command('LOAD_ACCOUNT');
            },
            tradeOrders () {
                this.$command('REDIRECT_TO', 'user.tradeOrders', 'push');
            }
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
        height: 330rpx;
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
        height: 80rpx;
        background:rgba(253,224,104,1);
        box-shadow:0 5rpx 10rpx 0 rgba(255,204,0,0.6);
        border-radius:40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: normal;
    }
    .charge-cards{
        margin-top: 10rpx;
        width: 710rpx;
        margin-left: 20rpx;
        height: 270rpx;
        background-color: #ffffff;
        border-radius: 12rpx;
    }
    .charge-cards .title{
        line-height: 80rpx;
        font-size: 28rpx;
        color: #757575;
        margin-left: 20rpx;
    }
    .charge-cards .line {
        height: 2rpx;
        background-color: #f2f2f2;
    }
    .charge-cards .cards{
        height: 188rpx;
        width: 100%;
    }
    .charge-cards .cards .card-list{
        margin-left: 19rpx;
        margin-right: 19rpx;
        width: 680rpx;
        /*height: 100%;*/
        position: absolute;
        display: flex;
        white-space: nowrap;
    }
    .pay-btn{
        background-color: #FFD000 !important;
        width: 710rpx;
        height: 80rpx;
        margin-left: 20rpx;
        margin-top: 20rpx;
        color: #111 !important;
        font-size: 32rpx;
    }
</style>
