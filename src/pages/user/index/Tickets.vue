<template>
	<div id="tickets_area" v-if="ticketShow">
		<div id="tickets">
			<div id="tickets_title">
				您的专属福利
			</div>
			<div id="tickets_list">
				<ul>
					<li v-for="(item, itemIndex) in cardsList" :key="itemIndex" v-if="!item.hadGet" v-show="itemIndex < 2">
						<i class="ticket_top_ico"></i>
						<i class="ticket_bottom_ico"></i>
						<div class="ticket_left">
							<em class="ticket_left_money">{{item.content}}</em>
							<em class="ticket_left_money_if" v-if="item.leastCost>0">满{{item.leastCost}}元可用</em>
						</div>
						<div class="ticket_right">
							<em class="ticket_right_title">{{item.title}}</em>
							<em class="ticket_right_time">{{item.dateInfo}}</em>
							<i class="ticket_right_btn" @click="receiveTicket(item)">立即领取</i>
						</div>
					</li>
				</ul>
			</div>
			<div id="tickets_tips">
				<em>对你的好</em>
				<em>不知不觉攒了这么多</em>
			</div>
			<i id="close_tickets" @click="closeTips"></i>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'tickets',
		props: ['show'],
		data() {
			return {
				ticketListShow: true
			}
		},
		methods: {
			async receiveTicket(item) {
				await this.$command('RECEIVE_TICKET', item);
			},
			closeTips() {
				this.$emit('close');
			}
		},
		computed: {
			cardsList() {
				return this.$store.getters['model.cards/list'];
			},
			ticketShow() {
				return this.$store.getters['model.account/isAuth']
					&& this.$store.getters['model.account/registered']
					&& this.show
					&& this.$store.getters['model.cards/ticketListShow'];
			}
		},
		mounted() {
		}
	}
</script>
<style scoped>
	#tickets_area {
		position: absolute;
		width: 750rpx;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		z-index: 999;
	}

	#tickets {
		width: 630rpx;
		min-height: 500rpx;
		background: #FFD000;
		position: absolute;
		top: 220rpx;
		left: 60rpx;
		border-radius: 10rpx;
	}

	#tickets_title {
		line-height: 120rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 36rpx;
		font-weight: 500;
	}

	#tickets_list {
		margin-top: 20rpx;
	}

	#tickets_list ul li {
		width: 520rpx;
		height: 180rpx;
		border-radius: 10rpx;
		background: #FFFFFF;
		margin: 0 auto;
		position: relative;
		margin-bottom: 20rpx;
	}

	.ticket_top_ico {
		width: 28rpx;
		height: 28rpx;
		background: #FFD000;
		border-radius: 50%;
		position: absolute;
		top: -14rpx;
		left: 167rpx;
	}

	.ticket_bottom_ico {
		width: 28rpx;
		height: 28rpx;
		background: #FFD000;
		border-radius: 50%;
		position: absolute;
		bottom: -14rpx;
		left: 167rpx;
	}

	.ticket_left {
		width: 180rpx;
		height: 180rpx;
		border-right: 1rpx dashed #CCCCCC;
		float: left;
	}

	.ticket_left_money {
		color: #FFD000;
	}

	.ticket_left_money {
		margin-top: 26rpx;
		text-align: center;
		font-size: 60rpx;
	}

	.ticket_left_money i {
		display: inline;
		font-size: 32rpx;
	}

	.ticket_left_money_if {
		color: #757575;
		font-size: 22rpx;
		text-align: center;
	}

	.ticket_right {
		float: right;
		width: 339rpx;
		height: 180rpx;
		position: relative;
	}

	.ticket_right_title {
		position: absolute;
		top: 20rpx;
		left: 50rpx;
		font-size: 28rpx;
		line-height: 28rpx;
		color: #111111;
	}

	.ticket_right_time {
		position: absolute;
		top: 68rpx;
		left: 50rpx;
		color: #757575;
		font-size: 22rpx;
		line-height: 22rpx;
	}

	.ticket_right_btn {
		position: absolute;
		width: 160rpx;
		height: 50rpx;
		bottom: 30rpx;
		right: 40rpx;
		background: #FFD000;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		border-radius: 25rpx;
		text-align: center;
		font-weight: 400;
	}

	#tickets_tips {
		font-size: 36rpx;
		line-height: 36rpx;
		width: 100%;
		text-align: center;
		color: #FFFFFF;
		margin-top: 50rpx;
		margin-bottom: 30rpx;
	}

	#tickets_tips em {
		margin-bottom: 10rpx;
	}

	#close_tickets {
		width: 64rpx;
		height: 64rpx;
		background: url(../../../../static/images/icon/index_close_tickets.png) no-repeat center center;
		background-size: 64rpx;
		position: absolute;
		bottom: -90rpx;
		left: 282rpx;
	}
</style>
