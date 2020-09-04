<!--suppress ALL -->
<template>
    <div>
        <div class="ticket-page body">
            <CustomHeader :title="title" :needReturn="true" :backUrl="true" @back="backPage" />
            <div class="empty_img" v-if="couponTatal==0">
                <img  src="../../../../static/images/empty/empty_coupon.jpg" alt="" id="empty">
                <span>暂无优惠券哦～</span>
            </div>
            <div class="ticket-list" v-else :style="{height: (screenHeight  - (statusBarHeight + navHeight) - 130) + 'rpx'}">
                <scroll-view class="ticket_wrapper" :scroll-y="1" @scroll="scroll" @scrolltolower="scrolltolower">
                    <societyTicket v-for="(ticket, index) in loadTickets" :key="index" :ticket="ticket" @useCoupon="useCoupon" :couponIdList="couponIdList"></societyTicket>
                </scroll-view>
                <button class="onOk" v-if="couponIdList.length>0" @click="onOk">选好了</button>
            </div>
        </div>
    </div>
</template>
<script>
    import CustomHeader from '@/components/CustomHeader';
    import societyTicket from '@/components/SocietyTicket';
    import _ from 'underscore';
    export default {
        data () {
            return {
                title: '我的卡券',
                name: 'Tickets',
                cur: 0,
                screenHeight: 0,
                statusType: 'available',
                model: 'model.user.tickets',
                command: 'LOAD_USER_TICKETS',
                couponTatal:0,
                loadTickets:[],
                couponIdList:[]
            };
        },
        components: {
            CustomHeader,
            societyTicket
        },
        computed:{
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            }
        },
        methods:{
            backPage:function () {
                let pages =  getCurrentPages();
                let options = pages[pages.length - 2].data.$root[0];
                let deliveryType=options.activeTab=="send"?"1":"2";
                let shopDetail=options.shopDetail;
                let orderType=options.orderType;
                this.$command('REDIRECT_TO', 'societyFood.societyOrderSubmit', 'push', {
                    query: {"deliveryType":deliveryType,"shopDetail":shopDetail,"orderType":orderType,"coupon":this.couponIdList}
                });
            },
            useCoupon:function(flag,item){
                if(flag){
                    this.couponIdList.push(item.record_id);
                    return false;
                }
                for (let i = 0; i <this.couponIdList.length ; i++) {
                    if(item.record_id==this.couponIdList[i]){
                        this.couponIdList.splice(i,1);
                    }
                }
            },
            onOk:function(id){
                let pages =  getCurrentPages();
                let options = pages[pages.length - 2].data.$root[0];
                let deliveryType=options.activeTab=="send"?"1":"2";
                let shopDetail=options.shopDetail;
                let orderType=options.orderType;
                this.$command('REDIRECT_TO', 'societyFood.societyOrderSubmit', 'push', {
                    query: {"deliveryType":deliveryType,"shopDetail":shopDetail,"orderType":orderType,"coupon":this.couponIdList}
                });
            },
            scrolltolower:function () {
                let cart_type = this.$route.query.cartType;
                let shop_id = this.$route.query.shopId;
                let param={
                    shop_id:shop_id,
                    cart_type:cart_type
                }
                this.$command('SF_CAN_USE_COUPONS',param,this);
            }
        },
        mounted () {
            this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
            this.screenWitdh = wx.getSystemInfoSync().windowHeight;
            this.screenHeight = (this.rpxRate * this.screenWitdh);
            this.scrolltolower();

        }
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
