<!--suppress ALL -->
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
                    <coupon-ticket v-for="(ticket, ticketIndex) in coupons" :key="ticketIndex"  :ticket="ticket" @useTicket="useTicket" type="list"/>
                </scroll-view>
                <button class="onOk" v-if="okShow" @click="onOk">选好了</button>
            </div>
        </div>
    </div>

</template>

<script>
	import CustomHeader from '@/components/CustomHeader';
	import Ticket from '@/components/Ticket';
	import _ from 'underscore';
	export default {
		data() {
			return {
				title: '我的卡券',
				name: 'Coupon',
				cur: 0,
				coupons: [],
				screenHeight: 0,
				screenWidth: 0,
                okShow: false
			}
		},
		props: {
			loadTickets: {
				default: null,
				type: Function
			},
			model: {
				default: null,
				type: String
			}
		},
		components: {
			CustomHeader,
			'coupon-ticket': Ticket
		},
		computed: {
			tickets() {
				this.coupons = this.model.user.tickets.ticketsList;
                return this.model.user.tickets.ticketsList;
			},
			availableCoupons () {
			    if (this.$route.query.type === 'activity') {
                    this.coupons = this.model.activity.availableCoupons
                    return this.model.activity.availableCoupons
                } else if (this.$route.query.type === 'groupon') {
                    this.coupons = this.model.groupon.availableCoupons
                    return this.model.groupon.availableCoupons
                } else {
                    this.coupons = this.model.user.tickets.availableCoupons
                    return this.model.user.tickets.availableCoupons
                }
			},
            couponIds () {
                if (this.$route.query.type === 'activity') {
                    return this.model.activity.couponIds
                } else if (this.$route.query.type === 'groupon') {
                    return this.model.groupon.grouponCouponIds
                } else {
                    return this.model.user.order.payment.couponIds
                }
            },
			totalNum() {
				return this.model.user.tickets.totalNum
			},
			nextPage() {
				return this.model.user.tickets.currentPage + 1;
			},
			isLoadedAll() {
				return this.model.user.tickets.isLoadedAll
			},
            statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
			},
			navHeight () {
				return this.model.global.barHeight.navHeight
			}
		},
		methods: {
            onOk () {
                let type = this.$route.query.type;
                if (this.$route.query.needReturn) {
                    if (type === 'activity') {
                        this.$command('REDIRECT_TO', '', 'back',{
                            query: {
                                type: type,
                                actId: this.$route.query.actId
                            }
                        });
                    } else if (type === 'groupon') {
                        this.$command('REDIRECT_TO', '','back',{
                            query: {
                                type: type,
                                shoppingGroupId: this.$route.query.shoppingGroupId
                            }
                        });
                    } else {
                        this.$command('REDIRECT_TO', '','back',{
                            query: {
                                type: type,
                            }
                        });
                    }
                } else {
                    this.$command('REDIRECT_TO', 'userCenter', 'replace');
                }
            },
			useTicket(ticket) {
				this.$emit('useTicket', ticket);
			},
			scrolltolower() {
				if (this.$route.query.needReturn) {

                } else {
                    if(!this.isLoadedAll) {
                        this.loadTickets(this.nextPage, this.statusType);
                    }
                }
			},
		},
        onLoad () {
            if (this.$route.query.needReturn) {
                this.okShow = true
            } else {
                this.okShow = false
            }
        },
        onShow () {
            if (this.$route.query.needReturn) {
                this.okShow = true
            } else {
                this.okShow = false
            }
        },
		mounted() {
			this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
			this.screenWitdh = wx.getSystemInfoSync().windowHeight;
			this.screenHeight = (this.rpxRate * this.screenWitdh);

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
