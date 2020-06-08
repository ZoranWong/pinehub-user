<!--suppress ALL -->
<template>
    <div class="couponCenter">
        <CustomHeader :title="title" :needReturn="true" />
        <Auth v-if="showAuth" @close="closeAuth" />
        <div v-if="!isMember && registered" class="bgff user-mobile-box">
            <div class="user_mobile_box_container">
                <form report-submit="true" @submit="uploadFormId">
                    <button form-type="submit" class="user-mobile-get-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
                        手机号授权
                    </button>
                </form>

                <em class="mobile_box_tips">
                    我们需要您的手机号来创建账号，累计积分
                </em>
            </div>
        </div>

        <div class="coupon" v-if="codeTicket.id">
            <div class="coupon-wrapper">
                <div class="new_coupons_item" @click.stop="ticketDetail(codeTicket.id)">
                    <div class="main_coupon_item" >
                        <div class="left">
                            <h4 v-if="codeTicket['typeDesc'] === '现金券'">￥{{codeTicket.benefit}}</h4>
                            <h4 v-else>{{codeTicket.benefit}}折</h4>
                            <div class="coupon_info">{{codeTicket.floor}}</div>
                        </div>
                        <div class="right">
                            <div class="title">
                                <img src="../../../../static/images/tickets/Cash_coupon.png" alt="" v-if="codeTicket['typeDesc'] === '现金券'" >
                                <img src="../../../../static/images/tickets/Discount_coupon.png" alt="" v-else>
                                <h3>{{codeTicket.title}}</h3>
                            </div>
                            <div class="valid">
                                {{codeTicket.validTime}}
                            </div>
                            <div class="bottom">
                                <div class="bottomLeft" @click.stop="showMore = !showMore">
                                    使用说明
                                    <img src="../../../../static/images/tickets/bottom.jpg" alt="" v-if="!showMore">
                                    <img src="../../../../static/images/tickets/top.jpg" alt="" v-else>

                                </div>
                                <div class="bottomRight" >
                                    <button v-if="codeTicket['can_receive'] && codeTicket['owned_count'] === 0 && codeTicket['remain_count'] > 0 " >立即领取</button>
                                    <button @click.stop="receiveIt(codeTicket.id)"  v-if="codeTicket['can_receive'] && codeTicket['owned_count'] > 0  && codeTicket['remain_count'] > 0 " >继续领取</button>
                                    <button @click.stop="useIt(codeTicket.id)" v-if="!codeTicket['can_receive']" @click="goStore">立即使用</button>
                                    <button @click.stop="nothing" v-if="codeTicket['owned_count'] === 0 && codeTicket['remain_count'] === 0">已抢光</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="extra_coupon_item" v-if="showMore">
                        <div class="coupon_info">· 适用范围: {{codeTicket['useCondition']}}</div>
                        <div class="coupon_info">· {{codeTicket['is_sharing']}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty_img" v-else>
            <img  src="../../../../static/images/empty/empty_coupon.jpg" alt="" id="empty">
            <span>暂无可领取优惠券哦～</span>
        </div>

    </div>
</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';
	import Auth from '../../../components/Auth';

	export default {
		data () {
			return {
				title: '领取优惠券',
                showAuth: false,
                showMore: false
			};
		},
		components: {
            CustomHeader,Auth
		},
        watch: {
            registered (value) {
                if (value) {
                    this.closeAuth()
                }
            },
            isMember (value) {
                if (this.registered && value) {
                    this.loadTickets()
                }
            }
        },
        computed : {
            codeTicket () {
                return this.model.user.tickets.codeTicket
            },
            isLogin () {
                let overDate = this.$store.getters['model.account/overDate'];
                return overDate ? overDate > Date.now() : false;
            },
            accessToken () {
                return this.$store.getters['model.app/accessToken'];
            },
            isMember () {
                return this.model.account.isMember;
            },
            registered () {
                if (!this.model.account.registered) {
                    this.showAuth = true;
                }
                return this.model.account.registered;
            }
        },
		methods: {
            nothing () {
                wx.showToast({
                    title: '这张优惠券已经抢完啦',
                    icon: 'none',
                    duration: 2000
                })
            },
            receiveIt (id) {
                this.$command('RECEIVE_COUPON', id, 'receive')
            },
            useIt () {
                this.$command('REDIRECT_TO', 'user.store', 'push');
            },
            goStore () {
                this.$command('REDIRECT_TO', 'user.store', 'push');
            },
            async ticketDetail (id) {
                await this.$command('LOAD_TICKET_DETAIL',id);
                this.$command('REDIRECT_TO', 'user.ticket.detail', 'push', {
                    query: {detail: this.codeTicket}
                });
            },
            getPhoneNumber (e) {
                this.$command('SET_USER_MOBILE', e);
            },
            async uploadFormId (e) {
                let formId = e.mp.detail.formId;
                if (formId !== "the formId is a mock one"){
                    await this.http.account.saveFormId(formId);
                } else {
                    console.log('form id 不合法')
                }
            },
            async init () {
                await this.$command('APP_ACCESS');
                await this.$command('SIGN_IN', this.accessToken);
            },
            async loadTickets () {
                await this.$command('CODE_SCAN_RECEIVE_TICKETS', this.couponId);
            },
            closeAuth () {
                this.showAuth = false
            },
		},
        mounted () {
            let pages =  getCurrentPages();
            let options = pages[pages.length - 1]['options'];
            this.couponId = options['coupon_id'] || '';
            this.init();
            if (this.registered && this.isMember) {
                this.loadTickets()
            };
		}
	}
</script>

<style scoped>
    page{
        overflow-y: auto;
        height: 100%;
        background: #f2f2f2;
    }
    .user-mobile-box{
        height: 300rpx;
        width: 670rpx;
        margin: 0 auto;
        margin-top: -90rpx;
        border-radius: 16rpx;
        overflow: hidden;
        text-align: center;
        box-shadow: 0px 10px 10px 0px rgba(204,202,202,0.2);
        position: fixed;
        height: 120%;
        width: 100%;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .user-mobile-box .user_mobile_box_container{
        position: absolute;
        background: #FFFFFF;
        width: 620rpx;
        border-radius: 10rpx;
        top: 338rpx;
        left: 65rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .user-mobile-get-btn {
        height: 80rpx;
        width: 320rpx;
        text-align: center;
        line-height: 80rpx;
        background: #FECE00;
        margin-top: 80rpx;
        margin-bottom: 40rpx;
        display: block;
        font-size: 32rpx;
        font-weight: 200;
        border: 0;
        border-radius: 80rpx;
        box-shadow: 0 10rpx 10rpx #fff6bd;
    }

    .mobile_box_tips {
        text-align: center;
        line-height: 96rpx;
        border-radius: 10rpx 10rpx 0 0;
        font-size: 29rpx;
        font-weight: 400;
    }

    .couponCenter .empty_img{
        margin-top: 250px;
    }

    .coupon{
        height: 100vh;
        background: #f2f2f2;
    }

    .coupon-wrapper{
        box-sizing: border-box;
        background: #f2f2f2;
        padding: 20rpx;

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
        background-image: url("../../../../static/images/tickets/normalTickets.jpg");
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
        background-image: url("../../../../static/images/tickets/disabledTickets.jpg");
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

    .integral_item_info{
        width: 100%;
        box-sizing: border-box;
        text-align: left;
        margin:  50rpx 0;
        padding: 0 40rpx;
    }

    .integral_item_info h4{
        font-size: 28rpx;
        color: #111;
        font-weight: normal;
        margin-bottom: 15rpx;
    }

    .integral_item_info span {
        font-size: 26rpx;
        color: #757575;
    }


</style>
