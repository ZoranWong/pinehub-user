<template>
    <div class="confirmation-order body">
        <mp-title :title="title"></mp-title>
        <!-- 收货人组件 -->
        <consignee></consignee>
        <ul class="Distribution-details">
            <li class="li-item bgff">
                配送地址
                <p class="details-item">
                    <input type="text" class="big-input" v-model="address">
                </p>
            </li>
        </ul>
        <!-- 支付内容的显示组件 -->
        <payment :model="model" :usedTicket="usedTicket" :ticketNum="ticketNum" :createOrder="createOrder" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :redirectToTicket="redirectToTicket"></payment>
    </div>
</template>
<script>
import MpTitle from '@/components/MpTitle';
import Consignee from '@/components/Consignee';
import Payment from '@/components/Payment';
import { SEND_ORDER_TO_USER } from '@/Utils/OrderDict';
export default {
    name: 'confirmationOrderTwo',
    data () {
        return {
            title: '预定商城-确认订单',
            model: 'model.bookingMall.shoppingCarts',
            address: null,
            SEND_ORDER: 2
        }
    },

    components: {
        'mp-title': MpTitle,
        'consignee': Consignee,
        'payment': Payment
    },
    computed: {
        userInfo () {
            return this.$store.getters['model.account/userInfo']
        },
        ticketNum () {
            return this.$store.getters['model.bookingMall.tickets/totalNum'];
        },
        totalAmount () {
            return this.model ? this.$store.getters[`model.bookingMall.shoppingCarts/totalAmount`] : 0;
        },
        usedTicket () {
            return this.$store.getters['model.bookingMall.shoppingCarts/usedTicketTitle'];
        },
        usedTicketCode () {
            return this.$store.getters['model.bookingMall.shoppingCarts/ticketCode'];
        },
        usedCardId () {
            return this.$store.getters['model.bookingMall.shoppingCarts/cardId'];
        }
    },
    methods: {
        createOrder () {
            this.$command('CREATE_BOOKING_MALL_ORDER',
            SEND_ORDER_TO_USER,
            this.userInfo.nickname,
            this.userInfo.mobile,
            this.address,
            this.usedTicketCode,
            this.usedCardId
        );
    },
    redirectToTicket () {
        console.log('activityCoupon');
        this.mp.router.push('bookingMallCoupon', {
            query: {
                back_to: 'shopSubmitOrder'
            }
        });
    },
    addCart (merchandiseId, id) {
        let count = this.$store.getters['model.bookingMall.shoppingCarts/quality'](merchandiseId) + 1;
        this.$command('BOOKING_MALL_SHOPPINGCART_CHANGE_MERCHANDISE', merchandiseId, id, count);
    },
    reduceCart (merchandiseId, id) {
        let count = this.$store.getters['model.bookingMall.shoppingCarts/quality'](merchandiseId) - 1;
        this.$command('BOOKING_MALL_SHOPPINGCART_CHANGE_MERCHANDISE', merchandiseId, id, count);
    }
},
mounted () {
    this.$command('LOAD_BOOKING_MALL_TICKETS');
}
}
</script>
<style scoped>
.confirmation-order {
    font-size: 28rpx;
    padding: 20rpx 0rpx 20rpx 20rpx;
}

.li-item {
    width: 706rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 10rpx;
    margin-bottom: 4rpx;
    box-shadow: 0rpx 8rpx 36rpx rgba(204, 202, 202, 0.3);
    box-sizing: border-box;
}

.li-item .details-item {
    display: inline-block;
    height: 80rpx;
    margin-left: 100rpx;
}

.Distribution-details {
    margin-bottom: 20rpx;
    box-shadow: 0rpx 8rpx 36rpx rgba(204, 202, 202, 0.3);
    /*border:1rpx solid black;*/
}

.li-item p input {
    display: inline-block;
    vertical-align: middle;
}

.li-item .tel-num {
    margin-left: 44rpx;
}
</style>
