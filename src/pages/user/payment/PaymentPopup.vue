<template>
    <div v-if="show" class="payment-popup">
        <div class="mask"></div>
        <div class="popup-layout">
            <div class="header">
                <div class="title">
                    确认支付
                </div>
                <div class="close" @click="close">
                    <img src="../../../../static/images/icon/back-close.png">
                </div>
            </div>
            <div class="popup-body">
                <div class="header pay-type" @click="chargePayType('balance')">
                    <div class="icon">
                        <img src="../../../../static/images/icon/tag-01.png">
                    </div>
                    <div class="content">
                        <div>{{ balance ? ("储值（余额" + balance + "元)"): "推荐储值并支付，立享更多优惠"}}</div>
                        <div class="pay-amount" v-if="isBalancePay"> - ¥ {{amount ? amount : "0.00"}}</div>
                    </div>
                    <div v-if="isBalancePay" class="select-icon">
                        <img src="../../../../static/images/icon/selected-01.png">
                    </div>
                    <div v-else-if="selectedPayType === 'wx' && enough" class="select-icon">
                        <img src="../../../../static/images/icon/un-selected.png">
                    </div>
                </div>
                <div class="line"></div>
                <div class="charge-cards" v-if="cards.length > 0">
                    <scroll-view scroll-x="true" class="card-list">
                        <ul>
                            <card v-for="(card, index) in cards" :key="index" :card="card" :index="index"
                                  @selectCard="selectedCard" :selectedIndex="selectedIndex"></card>
                        </ul>
                    </scroll-view>
                </div>
                <div class="line line-11"></div>
                <div class="wx-pay pay-type" @click="chargePayType('wx')">
                    <div class="pay-type-desc">微信支付</div>
                    <div class="payment-amount" v-if="selectedPayType === 'wx'"> {{isCharge ? "充值" : "" }} ¥
                        {{payAmount}}
                    </div>
                    <div v-if="selectedPayType === 'wx' && !isBalancePay" class="select-icon">
                        <img src="../../../../static/images/icon/selected-01.png">
                    </div>
                    <div v-else-if="selectedPayType === 'balance'" class="select-icon">
                        <img src="../../../../static/images/icon/un-selected.png">
                    </div>
                </div>
                <div class="line line-10"></div>
                <div class="pay-btn">
                    <button v-if="disabled" disabled="disabled" type="primary" class="payment-btn">{{btnText}}</button>
                    <button v-else type="primary" class="payment-btn" @click="pay">{{btnText}}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ChargeCardItem from '@/components/ChargeCardItem';

    export default {
        name: 'PaymentPopup',
        props: ['show', 'amount'],
        components: {
            card: ChargeCardItem
        },
        data: function () {
            return {
                selectedIndex: null,
                selectedPayType: 'balance',
                isCharge: false,
                chargeCard: null,
                disabled: false
            };
        },
        watch: {
            show () {
                if (this.show === false) {
                    this.selectedIndex = null;
                    this.selectedPayType = 'balance';
                    this.isCharge = false;
                    this.chargeCard = null;
                } else {
                  if (this.enough) {
                      this.selectedPayType = 'balance';
                  } else {
                      this.selectedPayType = 'wx';
                  }
                }
            },
            amount () {
                if (this.enough) {
                    this.selectedPayType = 'balance';
                } else {
                    this.selectedPayType = 'wx';
                }
            },
            balance () {
                if (this.enough) {
                    this.selectedPayType = 'balance';
                } else {
                    this.selectedPayType = 'wx';
                }
            },
            selectedIndex () {
                this.isCharge = this.selectedIndex !== null;
            }
        },
        computed: {
            balance () {
                return this.$store.getters['model.account/balance'];
            },
            enough () {
                return parseFloat(this.balance) >= parseFloat(this.amount)
            },
            isBalancePay () {
                if (this.selectedPayType === 'balance') {
                    return this.enough;
                }
                return false;
            },
            cards () {
                return this.$store.getters['model.chargeCards/list'];
            },
            payAmount () {
                return this.isCharge ? (this.chargeCard ? this.chargeCard.price : '0.00') : (this.amount ? this.amount : '0.00');
            },
            btnText () {
                return this.isCharge ? `立即充值${this.payAmount}元，并余额支付` : `立即支付${this.payAmount}元`;
            }
        },
        methods: {
            selectedCard (index, card) {
                this.selectedIndex = index;
                this.chargeCard = card;
                this.selectedPayType = 'wx';
            },
            chargePayType (type) {
                if (this.enough) {
                    this.selectedPayType = type;
                }
                if (type === 'balance') {
                    this.selectedIndex = null;
                    this.chargeCard = null;
                }
            },
            close () {
                this.disabled = false;
                this.$emit('close');
            },
            pay () {
                this.disabled = true;
                if (this.chargeCard) {
                    this.$emit('charge', this.payAmount, this.chargeCard['merchandise_id']);
                } else {
                    if (this.isBalancePay) {
                        this.$emit('balancePay', this.payAmount);
                    } else {
                        this.$emit('wxPay', this.payAmount);
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .payment-popup .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #111;
        z-index: 9999;
        top: 0;
        left: 0;
        opacity: 0.5;
    }

    .payment-popup {
        width: 100%;
        bottom: 0rpx;
    }

    .payment-popup .popup-layout {
        position: absolute;
        bottom: 0;
        width: 100%;
        z-index: 100000;
    }

    .popup-layout > .header {
        background-color: #fafafa;
        position: relative;
        height: 88rpx;
    }

    .popup-layout .header .title {
        width: 100%;
        text-align: center;
        height: 100%;
        line-height: 88rpx;
        font-size: 36rpx;
        color: #111111;
    }

    .popup-layout .header .close {
        position: absolute;
        font-weight: 500;
        height: 100%;
        width: 70rpx;
        top: 0;
        right: 0
    }

    .popup-layout .header .close img {
        width: 29rpx;
        height: 29rpx;
        top: 28rpx;
        right: 40rpx;
        position: absolute;
    }

    .popup-layout .popup-body {
        background-color: #ffffff;
    }

    .popup-layout .popup-body .header {
        height: 80rpx;
        position: relative;
    }

    .popup-layout .popup-body .header .icon {
        height: 36rpx;
        width: 31rpx;
        left: 40rpx;
        top: 8rpx;
        position: absolute;
    }

    .popup-layout .popup-body .header .icon img {
        height: 100%;
        width: 100%;
    }

    .popup-layout .popup-body .header .content {
        margin-left: 82rpx;
        color: #111111;
        font-size: 28rpx;
        height: 100%;
        line-height: 80rpx;
        display: flex;
    }

    .popup-layout .popup-body .line {
        height: 4rpx;
        background-color: #f2f2f2;
    }

    .popup-layout .popup-body .line-11 {
        height: 11rpx;
    }

    .popup-layout .popup-body .line-10 {
        height: 10rpx;
    }

    .popup-layout .popup-body .charge-cards {
        height: 188rpx;
        width: 100%;
    }

    .popup-layout .popup-body .charge-cards .card-list {
        margin-left: 36rpx;
        margin-right: 36rpx;
        width: 683rpx;
        /*height: 100%;*/
        position: absolute;
        display: flex;
        white-space: nowrap;
    }

    .popup-layout .popup-body .pay-type {
        height: 80rpx;
        position: relative;
        display: flex;
        color: #111111;
        font-size: 28rpx;
        line-height: 80rpx;
    }

    .popup-layout .popup-body .pay-type .payment-amount {
        position: absolute;
        right: 120rpx;
    }

    .popup-layout .popup-body .pay-type .pay-type-desc {
        margin-left: 40rpx;
    }

    .popup-layout .popup-body .pay-type .select-icon {
        height: 48rpx;
        width: 48rpx;
        right: 40rpx;
        top: 16rpx;
        position: absolute;
    }

    .popup-layout .popup-body .pay-type .select-icon img {
        height: 100%;
        width: 100%;
    }

    .popup-layout .popup-body .pay-btn {
        height: 120rpx;
        width: 100%;
        margin-top: 20rpx;
    }

    .popup-layout .popup-body .pay-btn .payment-btn {
        background-color: #FFD000;
        width: 710rpx;
        margin-left: 20rpx;
        color: #111111;
        font-size: 32rpx;
    }

    .pay-amount {
        position: absolute;
        right: 118rpx;
    }
</style>
