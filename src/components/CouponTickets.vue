<!--suppress ALL -->
<template>
	<div class="ticket-page body">
		<mp-title :title="title"></mp-title>
        <div class="empty_img" v-if="!tickets.length">
            <img  src="../../static/images/empty/empty_coupon.jpg" alt="" id="empty">
            <span>暂无优惠券哦～</span>
        </div>
		<div class="ticket-list" v-else>
			<img v-if="totalNum == 0" id="null_ico" src="../../static/images/empty_tickets.png" />
			<scroll-view class="ticket_wrapper" :scroll-y="1" @scroll="scroll" @scrolltolower="scrolltolower">
				<coupon-ticket v-for="(ticket, ticketIndex) in tickets" :key="ticketIndex"  :ticket="ticket" @useTicket="useTicket">
				</coupon-ticket>
			</scroll-view>
		</div>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle';
	import Ticket from '@/components/Ticket';
	import _ from 'underscore';
	export default {
		data() {
			return {
				title: '我的卡券',
				name: 'Coupon',
				cur: 0
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
			'mp-title': MpTitle,
			'coupon-ticket': Ticket
		},
		computed: {
			tickets() {
				return this.model.user.tickets.ticketsList;
			},
			totalNum() {
				return this.$store.getters[`${this.model}/totalNum`];
			},
			nextPage() {
				return this.$store.getters[`${this.model}/currentPage`] + 1;
			},
			isLoadedAll() {
				return this.$store.getters[`${this.model}/isLoadedAll`];
			}
		},
		methods: {
			useTicket(ticket) {
				this.$emit('useTicket', ticket);
			},
			scrolltolower() {
				if(!this.isLoadedAll) {
					this.loadTickets(this.nextPage, this.statusType);
				}
			},
		},
		mounted() {
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
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
		background: #f2f2f2;
		position: relative;
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
