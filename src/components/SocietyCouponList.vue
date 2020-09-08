<!--suppress CssInvalidPropertyValue -->
<template>
    <div>
        <div class="ticket-page body">
            <CustomHeader :title="title" :needReturn="true" :backUrl="true" @back="onOk" />
            <div class="empty_img" v-if="!coupons.length">
                <img  src="../../static/images/empty/empty_coupon.jpg" alt="" id="empty">
                <span>暂无优惠券哦～</span>
            </div>
            <div class="ticket-list" v-else :style="{height: (screenHeight  - (statusBarHeight + navHeight) - 130) + 'rpx'}">
                <scroll-view class="ticket_wrapper" :scroll-y="1" @scroll="scroll" @scrolltolower="scrolltolower">
                    <coupon-ticket v-for="(ticket, index) in coupons" :key="index"  :ticket="ticket" @useTicket="useTicket" type="list">
                    </coupon-ticket>
                </scroll-view>
                <button class="onOk" v-if="okShow" @click="onOk">选好了</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SocietyCouponList",
        data(){
          return{
              coupons:[]
          }
        },
        computed: {
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            }
        },
    }
</script>

<style scoped>
    #tab_select {
        overflow: hidden;
        width: 750rpx;
        height: 74rpx;
    }


    #tab_select ul li {
        font-size: 28rpx;
        font-weight: 400;
    }

    #tab_select ul li.tab_select_now span {
        width: 150rpx;
        line-height: 70rpx;
        border-bottom: 4rpx solid #FECE00;
    }

    .ticket-list {
        padding-top: 20rpx;
        display: flex;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        background: #f2f2f2;
        position: relative;
    }

    .onOk{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 98rpx;
        background: #ffcc00;
    }

    #null_ico {
        width: 390rpx;
        height: 355rpx;
        position: absolute;
        top: 50%;
        margin-top: -178rpx;
        left: 50%;
        margin-left: -185rpx;
    }

    .ticket-list .ticket_wrapper {
        overflow-y: auto;
        box-sizing: border-box;
        padding: 20rpx;
    }

    .empty_img{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .empty_img img{
        width: 350rpx;
        height: 240rpx;
    }

    .empty_img span{
        color: #999;
        font-size: 32rpx;
        margin-bottom: 300rpx;
    }

</style>
