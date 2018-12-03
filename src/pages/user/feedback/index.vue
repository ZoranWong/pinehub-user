<template>
	<div id="myfeedback">
		<mp-title :title="title"></mp-title>
		<div id="myfeedback_content">
			<textarea placeholder-class="placeholder-class" v-model="feedbackContent" placeholder="输入您宝贵的意见（500字以内）" :maxlength="totalFont" />
			<em>{{nowFontNum}}/{{totalFont}}</em>
		</div>
		<input v-model="contact" placeholder-class="placeholder-class" id="myfeedback_mobile" placeholder="输入您的联系方式（选填）" />
		<div id="btn" @click="submit">立即提交</div>
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
				navName: "feedback",
				feedbackContent: null,
				totalFont: 500,
				contact: null
			};
		},
		computed: {
			nowFontNum() {
				return this.feedbackContent ? this.feedbackContent.length : 0;
			}
		},
		methods: {
			submit() {
				this.$command('MYFEEDBACK', this.contact, this.feedbackContent)
			}
		},
		mounted() {
			this.contact = null;
			this.feedbackContent = null;
		},
		created() {

		}
	}
</script>

<style scoped>
	#myfeedback {
		position: absolute;
		height: 100%;
		width: 100%;
		background: #fafafa;
	}
	
	#myfeedback_content {
		background: #fff;
		border-radius: 15rpx;
		margin: 15rpx;
		width: 720rpx;
		font-size: 32rpx;
		font-weight: 300;
		padding: 15rpx;
		box-sizing: border-box;
		color: #111111;
		line-height: 46rpx;
		position: relative;
	}
	
	#myfeedback_content em {
		position: absolute;
		right: 15rpx;
		bottom: 15rpx;
		background: #f5f5f5;
		padding: 3rpx 8rpx;
		border-radius: 20rpx;
		font-size: 28rpx;
	}
	
	#myfeedback_mobile {
		background: #fff;
		border-radius: 15rpx;
		margin: 15rpx;
		width: 690rpx;
		font-size: 32rpx;
		font-weight: 300;
		padding: 15rpx;
		color: #111111;
		line-height: 78rpx;
	}
	
	.placeholder-class {
		font-size: 32rpx;
		font-weight: 300;
		color: #828282;
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