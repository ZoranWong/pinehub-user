<!--suppress ALL -->
<template>
	<div class="ticket-page body">
		<mp-title :title="title"></mp-title>
		<div id="tab_select" v-if="tabs.length > 0">
			<ul class="tabs">
				<li v-for="(tab , index) in tabs " :key="index" :class="{tab_select_now:cur == index }" :style="{ width:tabNumWidth }" @click="tabSelect(index)">
					<span class="span-inline">{{ tab.name }}</span>
				</li>
			</ul>
		</div>
		<div class="ticket-list">
			<img v-if="totalNum == 0" id="null_ico" src="../../static/images/empty_tickets.png" />
			<scroll-view class="ticket_wrapper" :scroll-y="1" @scroll="scroll" @scrolltolower="scrolltolower" :scroll-into-view="statusType">
				<coupon-ticket :status="statusType" v-for="(ticket, ticketIndex) in tickets" :key="ticketIndex" :usedCardCode="usedCardCode" :ticket="ticket" @useTicket="useTicket">
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
				cur: 0,
				statusType: 'available'
			}
		},
		props: {
			tabs: {
				default: function() {
					return [];
				},
				type: Array
			},
			loadTickets: {
				default: null,
				type: Function
			},
			model: {
				default: null,
				type: String
			},
			usedCardCode: {
				default: null,
				type: String
			}
		},
		components: {
			'mp-title': MpTitle,
			'coupon-ticket': Ticket
		},
		computed: {
			tabNumWidth() {
				let num = this.tabs.length
				num = (num === 'undefined') ? 1 : num;
				return Math.floor((100 / num) * 100) / 100 + '%';
			},
			tickets() {
				return this.$store.getters[`${this.model}/list`];
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
			scroll() {
			},
			useTicket(ticket) {
				this.$emit('useTicket', ticket);
			},
			scrolltolower() {
				if(!this.isLoadedAll) {
					this.loadTickets(this.nextPage, this.statusType);
				}
			},
			tabSelect(num) {
				this.cur = num;
				switch(num) {
					case 0:
						this.statusType = 'available';
						break;
					case 1:
						this.statusType = 'used';
						break;
					default:
						this.statusType = 'all';
						break;
				}
				this.$command('CLEAR_MODEL', this.model);
				this.loadTickets(num, this.statusType);
			}
		},
		mounted() {
			this.tabSelect(0);
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
	}
</style>
