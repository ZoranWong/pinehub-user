<template>
	<div id="myfeedback">
		<mp-title :title="title"></mp-title>
		<div id="myfeedback_success">
			<img src="/static/images/my_feedback_success.png" />
			<em>提交成功</em>
			<i>感谢您对快乐松的关注与支持，我们会认证处理您的反馈，尽快修复和完善相关功能。</i>
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
				title: "意见反馈",
				navName: "feedback"
			};
		},
		computed: {

		},
		methods: {
			jump(router) {
				this.$command('router', router, 'push');
			},

			submit() {
				this.jump('my');
			}
		},
		created() {

		}
	}
</script>

<style scoped>
	#myfeedback {
		background: #f1f2f3;
		position: absolute;
		height: 100%;
		width: 100%;
	}

	#myfeedback_success {
		font-size: 32rpx;
		font-weight: 300;
		color: #111111;
		margin-top: 130rpx;
	}

	#myfeedback_success img {
		display: block;
		width: 148rpx;
		height: 148rpx;
		margin: 0 auto;
		padding: 5rpx;
	}

	#myfeedback_success em {
		text-align: center;
		font-size: 30rpx;
		font-weight: 400;
		margin-top: 30rpx;
	}

	#myfeedback_success i {
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
