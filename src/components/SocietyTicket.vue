<!--suppress ALL -->
<template>
    <div class="coupon-wrapper clearfix bgff">
        <div class="new_coupons_item" @click="selectTicket(ticket)">
            <div :class="isInvalid ? 'main_coupon_item disabledText' : 'main_coupon_item'">
                <div class="left">
                    <h4 v-if="ticket.coupon_type == 'CASH'">￥{{ticket.benefit}}</h4>
                    <h4 v-else>{{ticket.benefit}}折</h4>
                    <div class="coupon_info">{{ticket.floor}}</div>
                </div>
                <div class="right">
                    <div class="title">
                        <img src="../../static/images/tickets/Cash_coupon.png" alt="" v-if="ticket.coupon_type == 'CASH' && !isInvalid">
                        <img src="../../static/images/tickets/Cash_coupon-02.png" alt="" v-if="ticket.coupon_type == 'CASH' && isInvalid">
                        <img src="../../static/images/tickets/Discount_coupon.png" alt="" v-if="ticket.coupon_type != 'CASH' && !isInvalid">
                        <img src="../../static/images/tickets/Discount_coupon-02.png" alt="" v-if="ticket.coupon_type != 'CASH' && isInvalid">
                        <h3>{{ticket.coupon_name}}</h3>
                    </div>
                    <div class="valid">{{ticket.received_at+"-"+ticket.invalid_at}}</div>
                    <div class="bottom">
                        <div class="bottomLeft" @click="showMoreDesc">
                            使用说明
                            <img src="../../static/images/tickets/bottom.jpg" alt="" v-if="!showMore">
                            <img src="../../static/images/tickets/top.jpg" alt="" v-else>
                        </div>
                        <div class="diabled" v-if="isInvalid">
                            <img src="../../static/images/empty/disabled.jpg" alt="" class="disabled" >
                        </div>
                        <div class="bottomRight" v-if="!isInvalid">
                            <button @click="ticketDetail">查看详情</button>
                        </div>
                    </div>
                </div>
                <img src="../../static/icons/jiaobiao.jpg" v-if="isSelected" class="jiaobiao" alt="">
            </div>
            <div class="extra_coupon_item" v-if="showMore">
                <div class="coupon_info">· 适用范围: {{isShare}}</div>
                <div class="coupon_info">· {{ticket.valid_term_desc}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'underscore'
    export default {
        name:"SocietyTicket",
        data () {
            return {
                showMore: false,
                isSelected:false
            }
        },
        props: {
            ticket:Object,
            couponIdList:Array
        },
        computed: {
            isShare:function(){
                if(!this.ticket.is_sharing_preferential){
                    return "不可与其他优惠券共享"
                }else {
                    return this.ticket.deliverable_desc[0].value_display;
                }
            },
            availableCoupons () {
                if (this.$route.query.type === 'activity') {
                    return this.model.activity.availableCoupons
                } else if (this.$route.query.type === 'groupon') {
                    return this.model.groupon.availableCoupons
                } else {
                    return this.model.user.tickets.availableCoupons
                }
            },
            isInvalid () {
                return this.ticket.state_desc === '已使用' || this.ticket.state_desc === '已过期' || this.ticket.state_desc === '不可用'
            }
        },
        methods: {
            showMoreDesc:function(){
                this.showMore=!this.showMore
            },
            nothing () {
                wx.showToast({
                    title: '这张优惠券已经抢完啦',
                    icon: 'none',
                    duration: 2000
                })
            },
            receiveIt (id) {
                this.$command('RECEIVE_COUPON', id, 'list')
            },
            useIt () {
                this.$command('REDIRECT_TO', 'user.store', 'push');
            },
            ticketDetail () {
                this.$command('REDIRECT_TO', 'societyFood.societyCouponDetail', 'push', {
                    query: {coupon: this.ticket}
                });
            },
            selectTicket (coupon) {
                if(this.couponIdList.length>0 && !coupon.is_sharing_preferential){
                    if(this.couponIdList.toString().indexOf(coupon.record_id)<0){
                        wx.showToast({
                            title: '该不可与其他优惠券共享',
                            icon: 'none'
                        });
                        return false;
                    }
                }
                this.isSelected=!this.isSelected;
                this.$emit("useCoupon",this.isSelected,coupon)
            }
        },
        mounted () {
        }

    }
</script>

<style>
    .selledout{
        position: absolute;
        width: 266rpx;
        height: 266rpx;
        top: 20rpx;
        left: 20rpx;
        background: rgba(255,255,255,0.6);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .selloutConent{
        width: 50%;
        height: 40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        background: rgba(0,0,0,0.4);
        color: #fff;
        font-size: 24rpx;
        margin-top: 70rpx;
    }

    .new_coupons_item{
        height: 100%;
        margin-bottom: 20rpx;
    }

    .coupon-wrapper{
        box-sizing: border-box;
        background: #f2f2f2;
        width: 100%;
    }

    .main_coupon_item{
        width: 100%;
        height: 220rpx;
        background-image: url("../../static/images/tickets/normalTickets.jpg");
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }

    .jiaobiao{
        position: absolute;
        right: 0;
        top: 0;
        width: 71rpx;
        height: 71rpx;
    }

    .main_coupon_item .left{
        width: 210rpx;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .main_coupon_item .left h4{
        font-size: 60rpx;
        color: #fb5642;
        margin-bottom: 9rpx;
        font-weight: bold;
    }

    .main_coupon_item .left .coupon_info{
        font-size: 24rpx;
        color: #fb5642;
        margin-top: 9rpx;
    }

    .main_coupon_item .right{
        padding: 26rpx 20rpx 26rpx 30rpx;
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }

    .main_coupon_item .right .title{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .main_coupon_item .right .title h3{
        font-size: 26rpx;
        color: #111;
        margin-left: 20rpx;
    }

    .main_coupon_item .right .title img{
        width: 101rpx;
        height: 25rpx;
    }

    .main_coupon_item .right .valid{
        font-size: 22rpx;
        color: #999;
    }

    .main_coupon_item .right .bottom{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }

    .main_coupon_item .right .bottom .bottomLeft{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 22rpx;
        color: #999;
    }

    .main_coupon_item .right .bottom .bottomLeft img{
        width: 15rpx;
        height: 10rpx;
        margin-left: 15rpx;
    }

    .main_coupon_item .right .bottom .bottomRight{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .main_coupon_item .right .bottom .bottomRight button:last-child{
        margin-left: 10rpx;
    }

    .main_coupon_item .right .bottom .diabled img{
        width: 108rpx;
        height: 108rpx;
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .main_coupon_item .right .bottom .bottomRight button{
        width: 130rpx;
        height: 50rpx;
        border: 2rpx solid #111;
        border-radius: 25rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22rpx;
        color: #111;
        padding: 0;
        background: #fff;
    }

    .extra_coupon_item{
        width: 100%;
        height: 132rpx;
        box-sizing: border-box;
        padding: 30rpx 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        background: #FDFAFE;
        transform: translateY(-10rpx);
    }

    .extra_coupon_item .coupon_info{
        font-size: 22rpx;
        color: #757575;
        width: 670rpx;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .disabledText{
        background-image: url("../../static/images/tickets/disabledTickets.jpg");
        background-size: 100% 100%;
    }

    .disabledText  h4{
        color: #999!important;
    }
    .disabledText  span {
        color: #999!important;
    }

    .disabledText h3{
        color: #999!important;
    }

    .disabledText div{
        color: #999!important;
    }

</style>
