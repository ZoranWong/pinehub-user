<!--suppress ALL -->
<template>
	<div class="body" v-if="ticketInfo">
		<mp-title :title="title"></mp-title>
		<div id="ticket_body">
			<span v-if="ticketInfo.type == 'cash'"><em>{{ticketInfo.info.reduce_cost}}</em><i>元</i></span>
			<span v-else><em>{{ticketInfo.info.discount}}</em><i>折</i></span>
			<span>{{ticketInfo.info.base_info.title}}</span>
			<i id="ticket_body_icon"></i>
		</div>
		<button id="ticket_btn" open-type="getUserInfo" @getuserinfo="getUserInfo">
			立即领取
		</button>
		<div id="ticket_info">
			<ul>
				<li>
					<em>使用门槛</em>
					<i v-if="ticketInfo.info.least_cost>0">满{{ticketInfo.info.least_cost}}元可用</i>
					<i v-else>无门槛券</i>
				</li>
				<li>
					<em>有效期</em>
					<i v-if="ticketInfo.info.base_info.date_info.type == 'DATE_TYPE_FIX_TIME_RANGE'">{{timeType}}</i>
					<i v-if="ticketInfo.info.base_info.date_info.type == 'DATE_TYPE_FIX_TERM'">{{timeType2}}</i>
					<i v-if="ticketInfo.info.base_info.date_info.type == 'DATE_TYPE_PERMANENT'">{{timeType3}}</i>
				</li>
				<li>
					<em>使用说明</em>
					<i>本券的有效期见券面所示</i>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle';
	export default {
		components: {
			'mp-title': MpTitle
		},
		data() {
			return {
				title: '领取优惠券',
				ticketInfo: null
			};
		},
		watch: {},
		computed: {
			timeType() {
				return `从${this.beginTime()}到${this.endTime()}止`;
			},
			timeType2() {
				if (this.ticketInfo) {
					if (this.ticketInfo.info.base_info.date_info.fixed_begin_term > 0) {
						return `领券${this.ticketInfo.info.base_info.date_info.fixed_begin_term}天后开始生效 ${this.ticketInfo.info.base_info.date_info.fixed_term}天内有效`;
					} else {
						return `领券后${this.ticketInfo.info.base_info.date_info.fixed_term}天内有效`;
					}
				}
			},
			timeType3() {
				return `永久有效`;
			}
		},
		methods: {
			beginTime() {
				if (this.ticketInfo) {
					let timestamp = this.ticketInfo.info.base_info.date_info.begin_timestamp;
					return (new Date(timestamp * 1000)).format('yyyy-MM-dd');
				}
			},
			endTime() {
				if (this.ticketInfo) {
					let timestamp = this.ticketInfo.info.base_info.date_info.end_timestamp;
					return (new Date(timestamp * 1000)).format('yyyy-MM-dd');
				}
			},
			getUserInfo(e) {
				console.log('e', e);
				this.$command('USER_REGISTER', e);
			}
		},
		mounted() {
			this.ticketInfo = JSON.parse(this.$route.query['ticketInfo']);
			console.log(this.ticketInfo);
		}
	}
</script>

<style scoped>
	.body {
		overflow: hidden;
		width: 750rpx;
		background-color: #FAFAFA;
		font-weight: normal;
	}

	#ticket_body {
		position: relative;
		margin: 20rpx;
		padding: 60rpx 40rpx;
		border-radius: 10rpx;
		background: url(../../../../static/images/icon/ticket-left-icon.png) no-repeat left center;
		background-size: auto 100%;
		background-color: #FFFFFF;
	}

	#ticket_body_icon {
		position: absolute;
		right: 0;
		top: 0;
		height: 88rpx;
		width: 88rpx;
		background: url(../../../../static/images/icon/ticket-right-icon.png) no-repeat center center;
		background-size: 100%;
	}

	#ticket_body span {
		display: block;
	}

	#ticket_body span em {
		display: inline-block;
		font-size: 68rpx;
		font-weight: bolder;
	}

	#ticket_body span i {
		display: inline-block;
		font-size: 34rpx;
	}

	#ticket_btn {
		background: #FFCC00;
		color: #333333;
		text-align: center;
		line-height: 80rpx;
		font-size: 34rpx;
		margin: 20rpx;
		border-radius: 10rpx;
	}

	#ticket_info {
		background: #F2F2F2;
		border-radius: 5rpx;
		margin: 20rpx;
		padding: 30rpx;
		border-radius: 10rpx;
	}

	#ticket_info ul li {
		margin-bottom: 40rpx;
	}

	#ticket_info ul li:last-child {
		margin-bottom: 0;
	}

	#ticket_info ul li em {
		font-size: 38rpx;
		margin-bottom: 10rpx;
	}

	#ticket_info ul li i {
		font-size: 28rpx;
		color: #828282;
	}
</style>
