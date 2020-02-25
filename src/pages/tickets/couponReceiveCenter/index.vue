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
                <div class="coupons_item" >
                    <div class="left">
                        <img :src="codeTicket['coupon_image']" alt="">
                    </div>
                    <div class="right">
                        <div class="name">
                            <h4>【{{codeTicket.typeDesc}}】</h4>
                            <span>{{codeTicket.title}}</span>
                        </div>
                        <div class="price">
                            <h4>￥{{codeTicket.benefit}}</h4>
                        </div>
                        <div class="coupon_info">使用门槛：{{codeTicket.floor}}</div>
                        <div class="coupon_info">{{codeTicket.useCondition}}</div>
                        <div class="coupon_info">有效期：{{codeTicket.validTime}}</div>
                        <div class="coupon_info">{{codeTicket['is_sharing']}}</div>
                    </div>
                </div>
                <div class="integral_item_info">
                    <h4>优惠说明</h4>
                    <span>{{codeTicket.remark}}</span>
                </div>
                <div class="integral_item_info">
                    <h4>使用说明</h4>
                    <span>{{codeTicket.description}}</span>
                </div>
                <div class="integral_item_info">
                    <h4>适用商品</h4>
                    <span>{{codeTicket.useCondition}}</span>
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
                showAuth: false
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
