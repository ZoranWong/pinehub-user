<template>
    <div class="body">
        <mp-title :title="title"></mp-title>
        <div class="balance-detail">
            <div class="content">
                <div class="title">
                    <div class="icon inline">
                        <img src="../../../../static/images/icon/pack-02.png">
                    </div>
                    <div class="inline">余额账户（元）</div>
                </div>
                <div class="balance-number">
                    {{balance}}
                </div>
            </div>
            <div class="detail-btn" @click="tradeOrders">
                明细<img src="../../../../static/images/icon/help-tag.png">
            </div>
        </div>
        <div class="charge-cards" v-if="cards.length > 0">
            <div class="title">
                选择充值金额
            </div>
            <div class="line"></div>
            <div class="cards">
                <scroll-view scroll-x="true"  class="card-list">
                    <ul>
                        <card v-for="(card, index) in cards" :key = "index" :card = "card" :index="index" @selectCard = "selectedCard" :selectedIndex = "selectedIndex"></card>
                    </ul>
                </scroll-view>
            </div>
        </div>
        <button type="primary"  v-if="selectedIndex !== null" class="pay-btn" @click="charge">立即支付</button>
    </div>
</template>
<script>
    import MpTitle from '@/components/MpTitle';
    import ChargeCardItem from '@/components/ChargeCardItem';
    export default {
        name: 'Balance',
        data: function () {
          return {
              title: '我的余额',
              empty: true,
              selectedIndex: null,
              chargeCard: null
          };
        },
        components: {
            'mp-title': MpTitle,
            'card': ChargeCardItem
        },
        computed: {
            balance () {
                return this.$store.getters['model.account/balance'];
            },
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
    .empty-trade{
        width: 390rpx;
        height: 355rpx;
        margin-top: 246rpx;
        margin-left: 180rpx;
    }
    .empty-background .desc{
        text-align: center;
        margin-top: 60rpx;
        font-size: 32rpx;
        color: #757575;
    }
    .balance-detail{
        /*height: 250rpx;*/
        width: 710rpx;
        margin-top: 20rpx;
        margin-left: 20rpx;
        background-color: #ffffff;
        border-radius: 12rpx;
    }
    .balance-detail .content{
        position: relative;
    }
    .balance-detail .content .title{
        text-align: center;
        font-size: 28rpx;
        color: #111;
        line-height: 38rpx;
        vertical-align: top;
        position: relative;
        margin-left: 228rpx;
        top: 64rpx;
        display: flex;
    }
    .balance-detail .content .title .icon{
        height: 38rpx;
        width: 48rpx;
        margin-right: 20rpx;
    }
    .balance-detail .content .title .icon img{
        height: 100%;
        width: 100%;
    }
    .balance-detail .content .balance-number{
        text-align: center;
        margin-top: 106rpx;
        color: #111111;
        font-size: 70rpx;
        font-weight: bold;
        padding-bottom: 58rpx;
    }
    .inline{
        display: inline-flex;
    }
    .detail-btn{
        color: #757575;
        font-size: 28rpx;
        position: absolute;
        top: 82rpx;
        right: 64rpx;
    }
    .detail-btn img{
        height: 26rpx;
        width: 26rpx;
        /*margin-right: 82rpx;*/
        margin-top: 0rpx;
        margin-left: 10rpx;
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
