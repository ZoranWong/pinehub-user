<!--suppress ALL -->
<template>
    <div>
        <div class="ticket-page body">
            <CustomHeader :title="title" :needReturn="true" />
            <div class="empty_img" v-if="!coupons.length">
                <img  src="../../../../../static/images/empty/empty_coupon.jpg" alt="" id="empty">
                <span>暂无优惠券哦～</span>
            </div>
            <div class="ticket-list" v-else :style="{height: (screenHeight  - (statusBarHeight + navHeight) - 130) + 'rpx'}">
                <coupon-ticket v-for="(ticket, ticketIndex) in coupons" :key="ticketIndex"  :ticket="ticket" @useTicket="useTicket" type="receive" >
                </coupon-ticket>
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
				title: '领券中心',
				name: 'Coupon',
				cur: 0,
				coupons: [],
				screenHeight: 0,
				screenWidth: 0
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
				this.coupons = this.model.user.tickets.canReceiveTickets
                return this.model.user.tickets.canReceiveTickets
			},
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            }
		},
		methods: {
			useTicket(ticket) {

			},
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
		overflow: auto;
		box-sizing: border-box;
		background: #f2f2f2;
		position: relative;
        flex-direction: column;
        padding: 20rpx;
        z-index: 500;
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
