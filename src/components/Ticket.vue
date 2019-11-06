<!--suppress ALL -->
<template>
    <div v-if="ticket" class="coupon-wrapper clearfix bgff">
        <div class="coupons_item" >
            <div class="left">
                <img :src="ticket['coupon_image']" alt="">
            </div>
            <div class="right">
                <div class="name">
                    <h4>【{{ticket.typeDesc}}】</h4>
                    <span>{{ticket.title}}</span>
                </div>
                <div class="price">
                    <h4>￥{{ticket.benefit}}</h4>
                    <span @click="ticketDetail(ticket.id)">卡券详情</span>
                </div>
                <div class="coupon_info">使用门槛：{{ticket.floor}}</div>
                <div class="coupon_info">{{ticket['useCondition']}}</div>
                <div class="coupon_info">有效期：{{ticket.validTime}}</div>
                <div class="coupon_info">{{ticket['is_sharing']}}</div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		data () {
			return {}
		},
		props: {
			ticket: {
				default: null,
				type: Object
			}
		},
		computed: {

		},
		methods: {
			async ticketDetail (id) {
                await this.$command('LOAD_TICKET_DETAIL',id);
				this.$command('REDIRECT_TO', 'user.ticket.detail', 'push', {
					query: {detail: this.ticket}
                });
            }
		},
		mounted () {
		}
	}
</script>

<style>

    .coupon-wrapper{
        box-sizing: border-box;
        background: #f2f2f2;

    }

    .coupon-wrapper .coupons_item{
        width: 100%;
        border-radius: 10rpx;
        box-sizing: border-box;
    }

    .coupon-wrapper .coupons_item{
        width: 100%;
        background: #fff;
        margin-bottom: 20rpx;
        box-sizing: border-box;
        padding: 30rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .coupon-wrapper .coupons_item .left{
        width: 266rpx;
        height: 180rpx;
        margin-right: 35rpx;
    }

    .coupon-wrapper .coupons_item .left img{
        width: 100%;
        height: 100%;
    }

    .coupon-wrapper .coupons_item .right{
        flex: 1;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .coupon-wrapper .coupons_item .right .name {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .coupon-wrapper .coupons_item .right .name h4{
        font-size: 32rpx;
        font-weight: bold;
        color: #111111;
    }

    .coupon-wrapper .coupons_item .right .name span{
        font-size: 32rpx;
        color: #111111;
    }

    .coupon-wrapper .coupons_item .right .price {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .coupon-wrapper .coupons_item .right .price h4{
        font-weight: bold;
        font-size: 36rpx;
        color: #ffcc00;
    }

    .coupon-wrapper .coupons_item .right .price span {
        font-size: 28rpx;
        color: #ffcc00;
        text-decoration: underline;
    }

    .coupon-wrapper .coupons_item .coupon_info{
        font-size: 24rpx;
        color: #757575;
        margin-top: 20rpx;
        width: 350rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

</style>
