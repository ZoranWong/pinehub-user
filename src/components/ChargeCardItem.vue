<template>
    <li :class="cardClass" @click="selectedCard">
        <div class="hot-tag"><img src="../../static/images/icon/hot-tag.png"></div>
        <div class="card-detail">
            <div class="price">
                <div class="price-number">{{!card.on_sale ? card.price : card.preferential_price}}</div>
                <div class="money-unit"><img src="../../static/images/icon/rnb-icon.png"></div>
            </div>
            <div class="send-content">送{{card.gift_amount}}元</div>
        </div>
        <div v-if="selected" class="selected-icon">
            <img src="../../static/images/icon/selected-02.png">
        </div>
    </li>
</template>
<script>
    export default {
        name: 'ChargeCardItem',
        props: {
            'index': {
                type: Number,
                default: 0
            },
            'selectedIndex': {
                type: Number,
                default: 0
            },
            'card': {
                type: Object,
                default: function () {
                    return null;
                }
            }
        },
        data () {
            return {
            };
        },
        computed: {
            selected () {
                return parseInt(this.selectedIndex) === parseInt(this.index);
            },
            cardClass () {
                return parseInt(this.selectedIndex) === parseInt(this.index) ? 'charge-card-item selected' : 'charge-card-item';
            }
        },
        methods: {
            selectedCard () {
                if (this.selectedIndex === this.index) {
                    console.log(this.selectedIndex, this.index);
                    this.$emit('selectCard', null, null);
                } else {
                    this.$emit('selectCard', this.index, this.card);
                }
            }
        }
    }
</script>
<style>
    .hot-tag{

    }
    .hot-tag img{
        position: absolute;
        top: -5rpx;
        height: 28rpx;
        width: 58rpx;
        left: 20rpx;
    }

    .selected-icon{
        position: absolute;
        bottom: 0rpx;
        height: 38rpx;
        width: 38rpx;
        right: 0rpx;
    }
    .selected-icon img{
        width: 100%;
        height: 100%;
    }
    .charge-card-item {
        width: 216rpx;
        height: 128rpx;
        margin-top: 30rpx;
        margin-left: 5rpx;
        margin-right: 5rpx;
        border-radius: 12rpx;
        border: 2rpx solid #cccccc;
        display: inline-flex;
        position: relative;
    }

    .charge-card-item.selected {
        border: 2rpx solid #FFD000;
    }
    .charge-card-item .price{
        display: flex;
        margin: auto;
    }
    .price-number{
        margin-top: 34rpx;
        font-size: 32rpx;
        color: #111;
        margin-right: 10rpx;
    }
    .money-unit{

    }
    .money-unit img{
        height: 32rpx;
        width: 32rpx;
        margin-top: 40rpx;
    }
    .card-detail{
        display: inline-block;
        margin: -10rpx auto  0 auto;
    }
    .send-content{
        font-size: 28rpx;
        color: #757575;
        margin: auto;
    }
</style>
