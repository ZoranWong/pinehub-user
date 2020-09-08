<!--suppress ALL -->
<template>
    <div class="body">
        <CustomHeader :title="title" :needReturn="true" />
        <Auth v-if="getAuth" @close="closeAuth" @pay="pay" :slug="slug" />
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
        <div class="payment-box">
            <div class="header">
                <div class="left">
                    <div class="title">付款给商家</div>
                    <div class="merchant-name">名称：{{ shopInfo.name }}</div>
                </div>
                <div class="right">
                    <div class="logo">
                        <img :src="logo"/>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="title">金额</div>
                <div class="payment-input-box">
                    <div class="currency">¥</div>
                    <input type="digit" class="payment-amount" placeholder="请输入支付金额" v-model="paymentAmount"
                           auto-focus/>
                </div>
            </div>
            <div class="footer">
                <button type="primary" @click="paymentPopup">立即支付</button>
            </div>
        </div>
        <payment-popup :amount = "paymentAmount" :show = "paymentPopupShow" @wxPay = "wxPay" @balancePay = "balancePay" @close = "closePopup" @charge = "charge"></payment-popup>
    </div>
</template>
<script>
    import PaymentPopup from './PaymentPopup';
	import CustomHeader from '../../../components/CustomHeader';
    import Auth from '../../../components/Auth';
	export default {
        data: {
            shopName: '福年来早餐车',
            storeId: null,
            ticketCode: null,
            mobile: null,
            paymentAmount: null,
            address: null,
            paymentPopupShow: false,
            title: '快乐松扫码付',
			getAuth: false,
			slug: 'payment'
        },
        components: {
            'payment-popup': PaymentPopup,
			CustomHeader,
			Auth
        },
        computed: {
            consumerCard () {
                return this.model.account.consumerCard;
            },
            logo () {
                return this.$store.getters['model.app/logo']
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
			shopInfo () {
				return this.model.user.order.payment.shopInfo
            },
			registered () {
				return this.model.account.registered;
			}

        },
        watch: {
            registered (value) {
                if (value) {
                    this.getAuth = false;
                }
            },
            accessToken (value) {
                if(value)
                    this.$command('SIGN_IN', this.accessToken);
            },
            async isMember(value) {
                if(value) {
                   await this.$command('ACQUISTION_NOT_ACTIVE')//是否有消费卡可领取
                   await this.$command('GET_ACTIVE_CARD',this);
                }
            },
            notActivecards (val) {
                // 有消费卡可以领取，处理相关业务
                if(val.length>0 ){
                    // 缓存未激活消费卡id 不在弹出
                    for (let index = 0; index < this.model.account.notActivecards.length; index++) {
                        const card = this.model.account.notActivecards[index];
                        if(this.model.account.consumerCardIds.indexOf(card['record_id']) === -1) {
                             this.model.account.dispatch("addConsumerCard", {card: card});
                            console.log("-------------=======++++++++=======-------------", this.consumerCardIds);
                            // this.model.account.dispatch('addConsumerCardId', {id: card['record_id']});
                            return;
                        }
                    }

                }
            }
        },
        methods: {
            // 获取优惠券
            closeCoupon(){
                this.model.account.dispatch("addConsumerCard", {card: null});
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
			getUserAuth () {
				this.getAuth = true
			},
			closeAuth () {
				this.getAuth = false
			},
            async init () {
                this.paymentAmount = null;
                this.paymentPopupShow = false;
                this.disPay = false;
                await this.$command('APP_ACCESS');
                await this.$command('SIGN_IN', this.accessToken);
                let store = await this.http.store.store(this.storeId);
                this.shopName = store['name'];
                this.mobile = store['mobile'];
                this.address = store['address'];
            },
            async paymentPopup () {
                if (!this.registered) {
                    this.getUserAuth()
                } else {
                    this.pay()
                }
            },
            async pay () {
                if (this.paymentAmount) {
                    this.paymentPopupShow = true;
					this.disPay = true;
					await this.$command('LOAD_CHARGE_CARDS', this.paymentAmount ? this.paymentAmount : 0);
				}
            },
            closePopup () {
                this.paymentPopupShow = false;
                this.disPay = false;
            },
            async charge(amount, merchandiseId) {
                await this.$command('CREATE_ORDER_BY_MERCHANDISE_ID', this.shopName, this.mobile, this.storeId, this.address, amount, merchandiseId);
                await this.balancePay(this.paymentAmount);
                this.$command('LOAD_ACCOUNT');
            },
            balancePay (amount) {
                this.$command('CREATE_OFF_LINE_ORDER', this.shopName, this.mobile, this.storeId, this.address, amount, true);
            },
            wxPay (amount) {
                this.$command('CREATE_OFF_LINE_ORDER', this.shopName, this.mobile, this.storeId, this.address, amount, false);
            }
        },
        mounted () {
			let pages =  getCurrentPages();
			let options = pages[pages.length - 1]['options']
			this.options = options;
			this.storeId = options['shop_code'] ? options['shop_code'] : this.storeId;
			this.$command('GET_SHOP_INFO', this.storeId)
			this.init();
        },
        onLoad (options) {
			if (options.q) {
                let scan_url = decodeURIComponent(options.q);
                //提取链接中的数字，也就是链接中的参数id，/\d+/ 为正则表达式
                this.storeId = scan_url.match(/\d+/)[0];
            }
        },
        onHide() {
            this.model.account.dispatch('addConsumerCard', {card: null});
        },
        created(){
            //  this.$command('GET_ACTIVE_CARD',this);//已激活消费卡
        }
    }
</script>
<style scoped>
    .body {
        width: 750rpx;
        background-color: #F0F0F0;
    }

    .payment-box {
        margin: 20rpx auto;
        width: 706rpx;
        border: 1rpx solid #FBFBFB;
        height: 580rpx;
        background-color: white;
        border-radius: 2%;
    }

    .payment-box .header {
        width: 100%;
        height: 160rpx;
        background-color: #FBFBFB;
        display: flex;
        border-top-left-radius: 2%;
        border-top-right-radius: 2%;
    }

    .payment-box .header .left {
        width: 586rpx;
        height: 100%
    }

    .payment-box .header .right {
        width: 120rpx;
        height: 100%;
    }

    .payment-box .header .left .title {
        color: #111111;
        margin: 38rpx 0 20rpx 40rpx;
        font-size: 35rpx;
    }

    .payment-box .header .left .merchant-name {
        color: #757575;
        margin: 0 0 35rpx 40rpx;
        font-size: 32rpx;
    }

    .payment-box .header .right .logo {
        margin: 40rpx 40rpx 0 0;
        width: 80rpx;
        height: 80rpx;
        font-size: 32rpx;
    }

    .payment-box .header .right .logo image {
        width: 80rpx;
        height: 100%;
    }

    .payment-box .content .title {
        color: #757575;
        margin-top: 40rpx;
        margin-left: 40rpx;
        font-size: 36rpx;
    }

    .payment-box .content .payment-input-box {
        margin-top: 40rpx;
        margin-left: 40rpx;
        border-bottom-color: #F2F2F2;
        border-bottom-width: 2rpx;
        border-bottom-style: solid;
        height: 130rpx;
        display: flex;
    }

    .payment-box .content .payment-input-box .currency {
        font-size: 72rpx;
        font-weight: 400;
        margin-bottom: 58rpx
    }

    .payment-box .content .payment-input-box .payment-amount {
        font-size: 64rpx;
        font-weight: 200;
        height: 100rpx;
        margin-bottom: 30rpx;
        margin-left: 30rpx;
    }

    .payment-box .content .am-amount {
        height: 250rpx;
    }

    .payment-box .content .am-amount .am-amount-footer {
        padding: 0;
        height: 0;
    }

    .payment-box .footer button {
        margin: 38rpx 40rpx 50rpx 40rpx;
        color: #111111;
        border-radius: 10rpx;
        height: 88rpx;
        width: 626rpx;
        line-height: 88rpx;
        background-color: #FFD000;
    }

    .user-mobile-box{
        position: fixed;
        height: 100%;
        width: 100%;
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
</style>
