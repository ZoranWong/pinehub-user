<template>
    <div class="confirmation-order body">
        <mp-title :title="title"></mp-title>
        <!-- 收货人组件 -->
        <consignee ></consignee>
        <ul class="order-address" >
            <li class="li-item bgff">
                自提地址
                <p class="details-item">
                    <input type="text" placeholder="默认地址" readonly="readonly" disabled="" v-model="storeInfo.address">
                </p>
            </li>
            <li class="li-item bgff">
                自提时间
                <p class="details-item">
                    <input type="text" placeholder="默认站点营业时间" readonly="readonly" disabled="" v-model = "storeInfo.openingHours">
                </p>
            </li>
        </ul>
        <!-- 支付内容的显示组件 -->
        <payment :model = "model" :usedTicket = "usedTicket" :ticketNum = "ticketNum" :createOrder="createOrder" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :redirectToTicket = "redirectToTicket"></payment>
    </div>
</template>
<script>
import MpTitle from '@/components/MpTitle';
import Consignee from '@/components/Consignee';
import Payment from '@/components/Payment';
import { USER_SELF_PICK_UP } from '@/utils/OrderDict';
export default{
    name: 'confirmationOrderTwo',
    data () {
        return {
            title: '预定商城-确认订单',
            model: 'model.bookingMall.shoppingCarts',
            SELF_PICK_UP_ORDER: 1,
			orderId: null,
			paid: false
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
        },
        storeInfo () {
            return this.$store.getters['model.stores/store'](parseInt(this.$route.query['store_id']));
        }
    },
    methods: {
        createOrder () {
            this.$command('CREATE_BOOKING_MALL_ORDER',
            USER_SELF_PICK_UP,
            this.userInfo.nickname,
            this.userInfo.mobile,
            this.storeInfo.address,
            this.usedTicketCode,
            this.usedCardId,
            this.storeInfo.id);
        },
        redirectToTicket () {
            this.mp.router.push('bookingMall.coupons', {
                query: {
                    store_id: parseInt(this.$route.query['store_id']),
                    back_to: 'bookingMall.createPickOrder'
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
		this.orderId = null;
		this.paid = false;
        this.$command('LOAD_BOOKING_MALL_TICKETS');
    }
}
</script>
<style scoped>
.confirmation-order{
    font-size:28rpx;
    padding:20rpx 0rpx 20rpx 20rpx;
}
.li-item{
    width:97%;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 10rpx;
    margin-bottom:4rpx ;
    box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
    box-sizing: border-box;
}
.li-item .details-item{
    display: inline-block;
    height: 80rpx;
    margin-left: 100rpx;
    vertical-align: middle;

}
.order-address{
    margin-bottom: 20rpx;
    box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
    /*border:1rpx solid black;*/
}

.li-item p input{
    display: inline-block;
    vertical-align:middle;
}
.big-input{
    width: 460rpx;
    height: 40rpx;
    border-radius: 10rpx;
    border:2rpx solid #cccccc;
}
.li-item .tel-num{
    margin-left: 44rpx;
}
</style>
