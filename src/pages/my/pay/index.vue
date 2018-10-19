<template>
	<div id="myorder">
		<mp-title :title="title"></mp-title>
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
				title: "我的充值"
			};
		},
		computed: {},
		methods: {},
		created() {}
	}
</script>

<style>
	page {
		height: 100%;
	}
	
	#myorder {
		background: #fafafa;
		position: relative;
		height: 100%;
		width: 100%;
	}
	
	#tab_select {
		overflow: hidden;
		width: 750rpx;
		height: 68rpx;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
	}
	
	#tab_select ul li {
		height: 68rpx;
		line-height: 68rpx;
		float: left;
		background: #FFFFFF;
		text-align: center;
		font-size: 32rpx;
		font-weight: 300;
	}
	
	#tab_select ul li.tab_select_now {
		background: #FECE00;
		color: #FFFFFF;
	}
	
	#tab_content {
		padding-top: 68rpx;
	}
	
	.tab_content_item {
		display: none;
	}
	
	.tab_content_now {
		display: block;
	}
</style>