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
                <div id="labour" v-if="selectedCusumerCard">
                    <div  @click="changePayType('consumer_card')" style="margin-bottom: 5px;">
                        <div id="pay-type-desc" >
                            消费卡支付<span style="color:red;margin-left:5px" v-if="selectedPayType === 'consumer_card' ">
                                <!-- {{selectedCusumerCard['card_name']}} -->
                                余额：{{selectedCusumerCard['card_remain_amount']}}
                                </span>
                        </div>
                        <div id="pay-amount" v-if="getActivationCards.length > 0">  -¥ {{amount}}</div>

                        <div v-if="selectedPayType === 'consumer_card'" id="select-icon">
                            <img src="../../../../static/images/icon/selected-01.png">
                        </div>
                        <div v-else-if="selectedPayType !== 'consumer_card'" id="select-icon">
                            <img src="../../../../static/images/icon/un-selected.png">
                        </div>
                    </div>
                    <div class="line line-11"></div>
                    <div id="cusumer_card_list" v-if="getActivationCards.length > 0">
                        <scroll-view scroll-x="true" class="card-list">
                            <ul>
                                <li v-for="(item, index) in getActivationCards" :key="index"  :index="index" 
                                :class="selectedPayType === 'consumer_card' && selectedCusumerCardIndex === index ? 'select-card' : 'unselect-card'"
                                 @click="selectCusumerCard(item, index)">
                                       <p style="font-size:15px;font-weight:700">{{item.card_name}}</p>
                                       <p style="font-size:16px;color:#AAAAAA">余额:{{item.card_remain_amount}}</p>
                                       <!-- <div v-if="selectedCusumerCardIndex"><img style="width:20px;height:20px;position: absolute;bottom: 20px;left: 91px;" src="../../../../static/images/icon/selected-02.png" alt=""></div> -->
                                </li>
                            </ul>
                        </scroll-view>
                    </div>
                   

                </div>
                <div class="line line-11"></div>


                <!-- <div class="header pay-type" @click="changePayType('balance')">
                    <div class="icon">
                        <img src="../../../../static/images/icon/tag-01.png">
                    </div>
                    <div class="content">
                        <div>{{ balance ? ("储值（余额" + balance + "元)"): "推荐储值并支付，立享更多优惠"}}</div>
                        <div class="pay-amount" v-if="isBalancePay">  ¥ {{amount ? amount : "0.00"}}</div>
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
                                  @selectCard="selectedChargeCard" :selectedIndex="selectedIndex"></card>
                        </ul>
                    </scroll-view>
                </div>
                <div class="line line-11"></div> -->
                
                <div class="wx-pay pay-type" @click="changePayType('wx')">
                    <div class="pay-type-desc">微信支付</div>
                    <div class="payment-amount" v-if="selectedPayType === 'wx'"> {{isCharge ? "充值" : "" }} ¥
                        {{payAmount}}
                    </div>
                    <!-- && !isBalancePay -->
                    <div v-if="selectedPayType === 'wx' " class="select-icon">
                        <img src="../../../../static/images/icon/selected-01.png">
                    </div>
                    <div v-else-if="selectedPayType !== 'wx'" class="select-icon">
                        <img src="../../../../static/images/icon/un-selected.png">
                    </div>
                </div>
                <div class="line line-10"></div>
                <div class="pay-btn">
                    <button  type="primary" class="payment-btn" @click="pay">{{btnText}}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ChargeCardItem from '@/components/ChargeCardItem';
    import _ from 'underscore';

    export default {
        name: 'PaymentPopup',
        // props: {
        //     show:String,
        //     amount:String,
        //     activationCards:Array
        // },
        props:['show','amount'],
        components: {
            card: ChargeCardItem
        },
        data: function () {
            return {
                cusumerCardsNmae:'',
                selectedChargeCardIndex: null,
                // selectedPayType: 'balance',
                selectedPayType:'consumer_card',
                isCharge: false,
                chargeCard: null,
                disabled: false,
                selectedCusumerCardIndex: 0,
                selectedCusumerCard: null,
            };
        },
        watch: {
            show () {
                if (this.show === false) {
                    this.selectedChargeCardIndex = null;
                    this.selectedPayType = 'consumer_card';
                    this.isCharge = false;
                    this.chargeCard = null;
                } 
                else {
                  if (this.getActivationCards.length>0 ) {
                        //   this.selectedPayType = 'balance';
                        let index = _.findIndex(this.getActivationCards, (card) => {
                            return card.card_remain_amount >= this.amount;
                        });
                        if(index > -1) {
                            this.selectedCusumerCardIndex = index;
                            this.selectedCusumerCard = this.getActivationCards[index];
                            
                        }else{
                            wx.showToast({
                                icon: 'none',
                                title: '消费卡余额不足!请用微信支付',
                                duration: 2000
                                })
                            this.selectedPayType='wx'
                            // 弹框提示不可以选择消费卡支付，因为没有符合支付金额的卡
                            return;
                        }
                        this.selectedPayType = 'consumer_card';
                        // this.selectedCusumerCard = card;
                        // this.selectedCusumerCardIndex = index;
                   } 
                }
            },
            amount () {
                if (this.enough) {
                    // this.selectedPayType = 'balance';
                    this.selectedPayType = 'consumer_card';
                } else {
                    this.selectedPayType = 'wx';
                }
            },
            balance () {
                if (this.enough) {
                    // this.selectedPayType = 'balance';
                    this.selectedPayType = 'consumer_card';
                } else {
                    this.selectedPayType = 'wx';
                }
            },
            selectedChargeCardIndex () {
                this.isCharge = this.selectedChargeCardIndex !== null;
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
           isCusomerCardPay  () {
                if (this.selectedPayType === 'consumer_card' && this.getActivationCards) {
                   if(this.getActivationCards.length<=0){
                       this.selectedPayType === 'wx'
                    //    wx.showToast({
                    //     icon: 'none',
                    //     title: '您还没有消费卡哦!请用微信支付',
                    //     duration: 5000
                    //     })                  
                   }else{
                    if(this.getActivationCards.every(item => parseFloat(item.card_remain_amount) <parseFloat(this.amount))){
                            wx.showToast({
                            icon: 'none',
                            title: '消费卡余额不足!请用微信支付',
                            duration: 1000
                            })
                            this.selectedPayType === 'wx'
                    }else{
                       this.selectedPayType==='consumer_card';
                       return true;
                    }
                   }
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
                // ${this.payAmount}元
            },
            getActivationCards () {
                return this.model.account.getActivationCards
            },
        },
        methods: {
            // 选择工会卡券
            selectCusumerCard(card, index){
                if(card.card_remain_amount  >= this.amount) {
                    this.selectedCusumerCardIndex = index;
                    this.selectedCusumerCard = card;
                }
            },
            selectedChargeCard (index, card) {
                this.selectedChargeCardIndex = index;
                this.chargeCard = card;
                this.selectedPayType = 'wx';
            },
            changePayType (type) {
                if (type === 'consumer_card') {
                    if(this.getActivationCards.length <=0){
                        // wx.showToast({
                        // icon: 'none',
                        // title: '您还没有消费卡哦!请用微信支付',
                        // duration: 2000
                        // })
                        this.selectedPayType = 'wx';
                        return;   
                    }else{
                        let index = _.findIndex(this.getActivationCards, (card) => {
                            return card.card_remain_amount >= this.amount;
                        });
                        if(index > -1) {
                            this.selectedCusumerCardIndex = index;
                            this.selectedCusumerCard = this.getActivationCards[index];

                        }else{
                            wx.showToast({
                                icon: 'none',
                                title: '消费卡余额不足!请用微信支付',
                                duration: 2000
                                })
                            // 弹框提示不可以选择消费卡支付，因为没有符合支付金额的卡
                            return;
                        }
                    }
                }
                this.selectedPayType = type;
            },
            close () {
                this.disabled = false;
                this.$emit('close');
            },
            pay () {

                this.disabled = true;
                if (this.chargeCard) {
                    // 购买充值卡并通过余额支付
                    this.$emit('charge', this.payAmount, this.chargeCard['merchandise_id']);
                } else {
                    if (this.isBalancePay) {
                        // 触发余额支付
                        this.$emit('balancePay', this.payAmount);
                    } else if(this.isCusomerCardPay) {
                        // 触发消费卡支付
                         console.log('----- +++++++++++ cusomer card pay +++++++++---');
                        this.$emit('consumeCardsPay', this.payAmount,this.selectedCusumerCard['record_id']);

                    }else{
                        // 触发微信支付
                        console.log("==================触发微信支付")
                        this.$emit('wxPay', this.payAmount);
                    }
                }
            }
        }
    }
</script>
<style scoped>
    #labour{
     position: relative;
     padding: 20rpx 0;
     
     
    }
    #select-icon{
        height: 48rpx;
        width: 48rpx;
        top: 20rpx;
        right: 40rpx;
        position: absolute;
    }
    #select-icon img{
        height: 100%;
        width: 100%;
    }
    #pay-type-desc{
        margin-left: 40rpx;
        font-size: 14px;
    }
    #cusumer_card_list {
        height: 188rpx;
        width: 100%;
    }
     #cusumer_card_list .card-list {
        margin-left: 36rpx;
        margin-right: 36rpx;
        width: 683rpx;
        padding-top: 10rpx;
        /*height: 100%;*/
        position: absolute;
        display: flex;
        white-space: nowrap;
    }

     #cusumer_card_list .card-list .unselect-card{
        display: inline-block;
        width: 250rpx;
        height: 150rpx;
        line-height: 75rpx;
        margin-left: 10rpx;
        /* padding: 0 20rpx; */
        text-align: center;
        white-space:normal;
        word-break : break-all;
        word-wrap: break-word;
        border-radius: 5px;
        border: 1px solid #cccccc;
    }
     #cusumer_card_list .card-list .select-card{
         display: inline-block;
        width: 285rpx;
        height: 150rpx;
        line-height: 75rpx;
        margin-left: 10rpx;
        /* padding: 0 20rpx; */
        text-align: center;
        white-space:normal;
        word-break : break-all;
        word-wrap: break-word;
        border-radius: 5px;
        border: 2px solid #FFCC00;
        background: url(../../../../static/images/icon/selected-02.png) no-repeat 245rpx 110rpx;
        /*   */
        background-size: 20px 20px;
    }
    #pay-amount {
        position: absolute;
        right: 118rpx;
        top: 20rpx;
    }








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
        background-color: #f2f2f2;
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
