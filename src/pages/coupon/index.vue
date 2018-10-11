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
			    	<div class="coupon-left fl ">
			    		<div class="voucher-part1">
			    			<span class="voucher-logon-name">
			    				LASCON
			    			</span>
			    			<span class="voucher-value">¥30</span>
			    		</div>
			    		<div class="voucher-part2">
			    			<div class="voucher-name">优惠券</div>
							
			    		</div>
			    	</div>
			    	<div class="coupon-right fr">
			    		<p class="voucher-title">满899减30元</p>
			    		<p class="time-limit">
			    			<span>有效期：</span>
			    			2018.10.01-2018.10.10
			    		</p>
						<div class="btn-big fr">立即使用</div>
			    	</div>
			    </div>		     
			</div>
			<div class="tab_content_item" v-else-if="cur === 1">
				<div class="coupon-wrapper clearfix">
			    	<div class="coupon-left fl">
			    		<div class="voucher-part1">
			    			<span class="voucher-logon-name">
			    				LASCON
			    			</span>
			    			<span class="voucher-value">¥30</span>
			    		</div>
			    		<div class="voucher-part2">
			    			<div class="voucher-name">优惠券</div>
							
			    		</div>
			    	</div>
			    	<div class="coupon-right fr">
			    		<p class="voucher-title">满899减30元</p>
			    		<p class="time-limit">
			    			<span>有效期：</span>
			    			2018.10.01-2018.10.10
			    		</p>
						<div class="overdue fr"></div>
			    	</div>
			    </div>		     
			</div>
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
		background: #f2f2f2;
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
		background:#ffffff;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		box-shadow:  0rpx 6rpx 20rpx rgba(204,202,202,0.6);
		box-sizing: border-box;
	}

	.coupon-left{
		
		width:260rpx;
		box-sizing: border-box;
		margin-left:50rpx;
		position: relative;
		z-index: 2;
	}
	.coupon-left:before{
		content: '';
	    position: absolute;
	    top: 0;
	    left: 0;
	    z-index: -1;
	    width:180rpx;
	    height: 95%;
	    background-color:#f2f2f2;
	    border-radius: 10rpx;
	    transform: rotate(-15deg) translate(-20rpx,15rpx);
	   
	}
	.coupon-left:after{
		content: '';
	    position: absolute;
	    top: 0;
	    right: 0;
	    z-index: -1;
	    width:180rpx;
	    height: 95%;
	    background-color:#f2f2f2;
	    border-radius: 10rpx;
	    transform: rotate(15deg) translate(20rpx,15rpx);
	   
	}
	.voucher-part1{
		width:260rpx;
		height:188rpx;
		background-color:#ffffff;
		border-radius:10rpx 10rpx 0rpx 0prx;
		box-shadow:  0rpx 8rpx 28rpx rgba(204,202,202,0.6);
		border-bottom:2rpx dashed #e0e0e0;
		box-sizing: border-box;
		text-align:center;
	}
    .voucher-part1 span{
    	display:block;	
    }
    .voucher-part1  .voucher-logon-name{
    	font-size:22rpx;
    	font-weight:700;
    	padding-top:30rpx;	
    }
     .voucher-part1 .voucher-value{
        font-size:68rpx;
        font-weight:700;
        color:#fece00;
        font-style:italic;
        margin-top:48rpx;
        line-height: 53rpx;
        box-sizing: content-box;
    }
    .voucher-part2{
       	width:260rpx;
		height:90rpx;
		position: relative;
    }
  	.voucher-part2:before{
        content: '';
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 20%;
	    height: 100%;
	    background: radial-gradient(circle at 0 50% ,transparent 0%, transparent 20rpx, white
	    20rpx,  white 100%); 
	    border-bottom-left-radius: 10rpx;	
	}
	 
	.voucher-part2:after{
        content: '';
	    position: absolute;
	    top: 0;
	    right: 0;
	    width: 20%;
	    height: 100%;
	    background-image: radial-gradient(circle at 100% 50%  ,transparent 0%, transparent 10px, white
	     10px, white 100%); 

	    border-bottom-right-radius: 10rpx;
	}
	.voucher-name{
		width:60%;
		position: absolute;
		top:0;
		left:20%;
		line-height: 90rpx;
		text-align: center;
		background-color: #ffffff;
		box-shadow: 0rpx 1rpx 0rpx 0rpx rgba(204,202,202,0.6);
	}

	.coupon-right{
		box-sizing: border-box;
	}
	.coupon-right .voucher-title{
		margin:30rpx 0;
	}
	.coupon-right .time-limit{
		font-size:28rpx;
		margin-bottom: 24rpx;
		color: #757575;
	}
	.coupon-right .time-limit span{
		display: block;	
	}
	.coupon-right .btn-big{
		width:250rpx;
		height:60rpx;
		line-height:60rpx;
		border-radius:30rpx;
		background-color:#fece00;
		text-align:center;
		font-size:32rpx;
		margin-right:50rpx;
		margin-bottom:30rpx;
	}
	.overdue{
		width:80rpx;
		height: 80rpx;
		line-height: 80rpx;
		background:url(../../../static/images/overdue.png) no-repeat;
		background-size: contain;
		margin-right:50rpx;
		margin-top:-10rpx;
		margin-bottom:20rpx;
	}
</style>