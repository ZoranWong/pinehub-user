<template>
	<div class="Coupon body">
		<mp-title :title="title"></mp-title>
		<div id="tab_select">
			<ul>
				<li v-for="(tab , index) in tabs " :key="index" :class="{tab_select_now:cur == index }" :style="{ width:tabNumWidth }" @click="tabSelect(index)">
					<span class="span-inline">{{ tab.name }}</span>
				</li>
			</ul>
		</div>
		<div id="tab_content">
			<ul class="tab_content_item" v-if="cur === 0">
				<li v-for="(ticket, ticketIndex) in ticketsList" :key="ticketIndex" :loadTickets="loadTickets" :status="statusType" class="coupon-wrapper clearfix bgff">
					<div class="coupon-left fl ">
						<div class="voucher-part1 bgff ">
							<span class="voucher-logon-name">
			    				LASCON
			    			</span>
							<span class="voucher-value">¥{{ticket.leastCost}}</span>
						</div>
						<div class="voucher-part2">
							<div class="voucher-name bgff">{{ticket.type}}</div>
						</div>
					</div>
					<div class="coupon-right fr">
						<p class="voucher-title">{{ticket.title}}</p>
						<p class="time-limit">
							<span>有效期：</span>
							<span>{{ticket.beginTimestamp}}</span>
							<span>-{{ticket.endTimestamp}}</span>
						</p>
						<div class="btn-big fr theme-color">立即使用</div>
					</div>
				</li>
			</ul>
			<ul class="tab_content_item" v-else-if="cur === 1">
				<li v-for="(ticket, ticketIndex) in ticketsList" :key="ticketIndex" :loadTickets="loadTickets" :status="statusType" class="coupon-wrapper clearfix bgff">
					<div class="coupon-left fl">
						<div class="voucher-part1 bgff">
							<span class="voucher-logon-name">
			    				LASCON
			    			</span>
							<span class="voucher-value">¥{{ticket.leastCost}}</span>
						</div>
						<div class="voucher-part2">
							<div class="voucher-name bgff">{{ticket.type}}</div>

						</div>
					</div>
					<div class="coupon-right fr">
						<p class="voucher-title">{{ticket.title}}</p>
						<p class="time-limit">
							<span>有效期：</span>
							<span>{{ticket.beginTimestamp}}</span>
							<span>-{{ticket.endTimestamp}}</span>
						</p>
						<div class="overdue fr"></div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import MpTitle from "@/components/MpTitle"
	export default {
		data() {
			return {
				title: "我的卡券",
				name: "Coupon",
				tabs: [{
						name: '可使用'
					},
					{
						name: '已过期'
					}
				],
				cur: 0,
				statusType: "available"
			}
		},
		components: {
			"mp-title": MpTitle,

		},
		computed: {
			tabNumWidth() {
				let num = this.tabs.length
				num = (num == 'undefined') ? 1 : num;
				return Math.floor((100 / num) * 100) / 100 + '%';
			},
			ticketsList() {
				return this.$store.getters['model.tickets/list'];
			}

		},
		methods: {
			loadTickets(status) {
				this.$command('GET_TICKETS', 'activity', status);
			},
			tabSelect(num) {
				this.cur = num;
				switch(num) {
					case 0:
						this.statusType = "available";
						break;
					case 1:
						this.statusType = "overdue";
						break;
					default:
						this.statusType = "available";
						break;
				}
				console.log(num);
			}
		},
		mounted() {
			this.$command('GET_TICKETS', 'activity', 1);
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
	
	#tab_content {
		padding-top: 20rpx;
	}
	
	.tab_content_item {
		padding: 0 20rpx;
	}
	
	.coupon-wrapper {
		width: 710rpx;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx 6rpx 20rpx rgba(204, 202, 202, 0.6);
		box-sizing: border-box;
	}
	
	.coupon-left {
		width: 260rpx;
		box-sizing: border-box;
		margin-left: 50rpx;
		position: relative;
		z-index: 2;
	}
	
	.coupon-left:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 180rpx;
		height: 95%;
		background-color: #f2f2f2;
		border-radius: 10rpx;
		transform: rotate(-15deg) translate(-20rpx, 15rpx);
	}
	
	.coupon-left:after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		z-index: -1;
		width: 180rpx;
		height: 95%;
		background-color: #f2f2f2;
		border-radius: 10rpx;
		transform: rotate(15deg) translate(20rpx, 15rpx);
	}
	
	.voucher-part1 {
		width: 260rpx;
		height: 188rpx;
		border-radius: 10rpx 10rpx 0rpx 0prx;
		box-shadow: 0rpx 8rpx 28rpx rgba(204, 202, 202, 0.6);
		border-bottom: 2rpx dashed #e0e0e0;
		box-sizing: border-box;
		text-align: center;
	}
	
	.voucher-part1 span {
		display: block;
	}
	
	.voucher-part1 .voucher-logon-name {
		font-size: 22rpx;
		font-weight: 700;
		padding-top: 30rpx;
	}
	
	.voucher-part1 .voucher-value {
		font-size: 68rpx;
		font-weight: 700;
		color: #fece00;
		font-style: italic;
		margin-top: 48rpx;
		line-height: 53rpx;
		box-sizing: content-box;
	}
	
	.voucher-part2 {
		width: 260rpx;
		height: 90rpx;
		position: relative;
	}
	
	.voucher-part2:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 20%;
		height: 100%;
		background: radial-gradient(circle at 0 50%, transparent 0%, transparent 20rpx, white 20rpx, white 100%);
		border-bottom-left-radius: 10rpx;
	}
	
	.voucher-part2:after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		width: 20%;
		height: 100%;
		background-image: radial-gradient(circle at 100% 50%, transparent 0%, transparent 10px, white 10px, white 100%);
		border-bottom-right-radius: 10rpx;
	}
	
	.voucher-name {
		width: 60%;
		position: absolute;
		top: 0;
		left: 20%;
		line-height: 90rpx;
		text-align: center;
		box-shadow: 0rpx 1rpx 0rpx 0rpx rgba(204, 202, 202, 0.6);
	}
	
	.coupon-right {
		width: 330rpx;
		box-sizing: border-box;
	}
	
	.coupon-right .voucher-title {
		margin: 30rpx 0;
	}
	
	.coupon-right .time-limit {
		font-size: 28rpx;
		margin-bottom: 24rpx;
		color: #757575;
	}
	
	.coupon-right .time-limit span {
		display: block;
	}
	
	.coupon-right .btn-big {
		width: 250rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx;
		text-align: center;
		font-size: 32rpx;
		margin-right: 50rpx;
		margin-bottom: 30rpx;
	}
	
	.overdue {
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: url(../../../static/images/icon/overdue.png) no-repeat;
		background-size: contain;
		margin-right: 50rpx;
		margin-top: -10rpx;
		margin-bottom: 20rpx;
	}
</style>