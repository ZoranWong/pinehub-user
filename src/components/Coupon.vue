<template>
	<div class="Coupon">
		<mp-title :title="title"></mp-title>
		<div id="tab_select">
			<ul>
				<li v-for="(tab , index) in tabs " :key = "index" :class="{tab_select_now:cur == index }" :style="{ width:tabNumWidth }" @click="tabSelect(index)" >
					<span>{{ tab.name }}</span>
				</li>
			</ul>
		</div>
		<div id="tab_content">
			<div class="tab_content_item" v-if="cur === 0">
			    <div class="coupon-wrapper clearfix">
			    	<div class="coupon-left fl">
			    		<div class="voucher">
			    			<span class="voucher-logon-name">
			    				LASCON
			    			</span>
			    			<span class="voucher-value">¥30</span>
			    			<span class="voucher-name">优惠券</span>
			    		</div>
			    	</div>
			    	<div class="coupon-right fr">
			    		<p class="voucher-title">满899减30元</p>
			    		<p class="time-limit">
			    			<span>有效期：</span>
			    			2018.10.01-2018.10.10
			    		</p>
						<div class="btn-big">立即使用</div>
			    	</div>
			    </div>
			     <div class="coupon-wrapper clearfix ">
			    	<div class="coupon-left fl">
			    		<div class="voucher">
			    			<span class="voucher-logon-name">
			    				LASCON
			    			</span>
			    			<span class="voucher-value">¥30</span>
			    			<span class="voucher-name">优惠券</span>
			    		</div>
			    	</div>
			    	<div class="coupon-right fr">
			    		<p class="voucher-title">满899减30元</p>
			    		<p class="time-limit">
			    			<span>有效期:</span>
			    			2018.10.01-2018.10.10
			    		</p>
						<div class="btn-big">立即使用</div>
			    	</div>
			    </div>  
			</div>
			<div class="tab_content_item" v-else-if="cur === 1">
				2
				hhhhhkkkkkkkkkk
			</div>
			
		</div>
		
	</div>
</template>

<script>
	import MpTitle from "@/components/MpTitle"
	export default {
		data () {
   			return{
   				title:"我的卡券",
   				name:"Coupon",
   				tabs:[
   				{   
   					name:'可使用'
   				},
   				{
   					name:'已过期'
   				}],
   				cur: 0
   			}
		},
		components : {
			"mp-title":MpTitle,

		},
		computed: {
			tabNumWidth() {
				let num = this.tabs.length
				num = (num == 'undefined') ? 1 : num;
				return Math.floor((100 / num) * 100) / 100 + '%';
			}

		},
		methods: {
			tabSelect(num) {
				this.cur = num;
				console.log(num);
			}
		},
		created() {
		}
	}
</script>


<style scoped>
	page {
		height: 100%;
		background: #fafafa;
	}
	#myorder {
		position: relative;
	}
	
	#tab_select {
		overflow: hidden;
		width: 750rpx;
		height: 74rpx;
		
	}
	
	#tab_select ul li {
		height: 70rpx;
		line-height: 70rpx;
		float: left;
		background: #FFFFFF;
		text-align: center;
		font-size: 28rpx;
		font-weight: 400;
	}
	
	#tab_select ul li.tab_select_now {
		color: #FECE00;
	}
	
	#tab_select ul li.tab_select_now span {
		display: inline-block;
		width:150rpx;
		line-height: 70rpx;
		border-bottom: 4rpx solid #FECE00;
	}
	
	#tab_content {
		padding-top: 20rpx;
	}	
	.tab_content_item {
		padding: 0 20rpx;
	}
	
	.tab_content_now {
		display: block;
	}
	.coupon-wrapper{
		width:710rpx;
		height: 300rpx;
		background:#ffffff;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		box-shadow:  0rpx 8rpx 36rpx rgba(204,202,202,0.3);
		box-sizing: border-box;
	}

	.coupon-left{
		border:1rpx solid red;
		height: 100%;
		width:44%;
		box-sizing: border-box;
		margin-right: 44rpx;
	}
	.coupon-right{
		border:1rpx solid red;
       	height: 100%;
		width:44%;
		box-sizing: border-box;
	/*	padding:30rpx 0rpx 30rpx 0rpx;*/
	}
	.coupon-right .voucher-title{
		margin-bottom: 30rpx;
	}
	.coupon-right .time-limit{
		font-size:28rpx;
		margin-bottom: 30rpx;
		color: #757575;
		border:1rpx solid pink;

	}
	.coupon-right .time-limit span{
		display: block;
	}
</style>