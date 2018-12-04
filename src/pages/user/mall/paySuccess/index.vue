<template>
	<div id="orderpay">
		<mp-title :title="title"></mp-title>
		<div id="orderpay_success">
			<div id="success_ico"></div>
			<em>支付成功</em>
			<i>感谢您对快乐松的关注与支持。</i>
		</div>
		<div id="btn" @click="submit">完成</div>
	</div>
</template>

<script>
import MpTitle from '@/components/MpTitle';
export default {
	components: {
		"mp-title": MpTitle
	},
	data() {
		return {
			title: "支付成功"
		};
	},
	computed: {

	},
	methods: {
		submit() {
			this.$command('REDIRECT_TO', 'user.orders', 'replace');
		}
	},
	created() {

	}
}
</script>

<style scoped>
#orderpay {
	background: #f1f2f3;
	position: absolute;
	height: 100%;
	width: 100%;
}

#orderpay_success {
	font-size: 32rpx;
	font-weight: 300;
	color: #111111;
	margin-top: 130rpx;
}
#success_ico {
	display: block;
	width: 148rpx;
	height: 148rpx;
	margin: 0 auto;
	padding: 5rpx;
	background: url(../../../../../static/images/icon/my_feedback_success.png) no-repeat center center;
	background-size: 100%;
}

#orderpay_success em {
	text-align: center;
	font-size: 30rpx;
	font-weight: 400;
	margin-top: 30rpx;
}

#orderpay_success i {
	font-size: 24rpx;
	margin: 20rpx 130rpx 140rpx;
	text-align: center;
	line-height: 36rpx;
}

#btn {
	background: #FECE00;
	font-size: 34rpx;
	font-weight: 300;
	text-align: center;
	color: #111111;
	line-height: 78rpx;
	margin: 15rpx;
	border-radius: 15rpx;
}
</style>
