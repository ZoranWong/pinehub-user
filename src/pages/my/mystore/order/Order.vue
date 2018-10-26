<template>
	<scroll-view  class="foods-wrapper" style="height:500px;" :scroll-y="true" @scrolltolower="scrolltolower" >
		<div id="tab_content_main">
			<div class="order_info" v-for="(gathitem,index) in gathOrders" :key="index">
				<div class="order_info_header">
					<ul>
						<li>状态</li>
						<li>销售指数</li>
						<li>订单编号</li>
						<li>订单金额</li>
						<li>实付金额</li>
					</ul>
				</div>
				<div class="order_info_nowstatus">
					<ul>
						<li>配送中</li>
						<li>{{gathitem.sellPoint}}</li>
						<li>{{gathitem.code}}</li>
						<li>{{gathitem.totalAmount}}</li>
						<li>{{gathitem.paymentAmount}}</li>
					</ul>
				</div>
				<div class="order_info_glist">
					<dl>
						<dd><img src="/static/images/ewm.png" /></dd>
						<dt>
							<div class="order_info_glist_title">
								<ul>
									<li>产品名称</li>
									<li>数量</li>
									<li>单价</li>
								</ul>
							</div>
							<div class="order_info_glist_list">
								<ul>
									<li v-for="(item,idx) in gathitem.orderItems" :key="idx"><em>{{item.name}}</em><em>{{item.quality}}</em><em>￥{{item.sellPrice}}</em></li>
								</ul>
							</div>
						</dt>
					</dl>
				</div>
				<div class="order_info_ads">
					<em>{{gathitem.receiverAddress}}</em>
				</div>
				<div class="order_info_glist_total">
					<div class="order_info_glist_date">
						{{datetime}}
					</div>
					总计<i>￥{{gathitem.totalAmount}}</i>
				</div>
				<div class="order_info_footer">
					<div class="order_info_footer_left">
						<ul>
							<li>卡券使用:无</li>
							<li>优惠活动:{{gathitem.reduceCost}}</li>
						</ul>
					</div>
					<div class="order_info_footer_right">
						实付:<em>￥{{gathitem.paymentAmount}}</em>
					</div>
				</div>
				<i class="order_info_circle"></i>
				<i class="order_info_circle right_circle"></i>
			</div>
		</div>
	</scroll-view>
</template>

<script>
	export default {
		name: 'MyOrder',
		data() {
			return {

			};
		},
		props:{
			loadOrders: {
				default:"",
				type: Function
			},
			List:{
				default:"",
				type:Function 
			},
			gathOrders:{
				default:"",
				type:Function
			},
			next:{
				default: null,
				type: Function
			},
			datetime:"",
			startTime:"",
			endTime:"",
			status:"",
			types:""
		},
		methods: {
            scrolltolower(){
		         console.log('next page',"11111111111111122222222222222222");
		        this.next();
		    }
		},
		watch:{
			startTime(v){
				this.statTime=v
			},
			endTime(n){
				this.endTime=n
			},
			status(x){
				this.status=x
			},
			types(t){
				this.types=t
				console.log(t,"ffffff")
			}
		},
		created() {
			console.log(this.startTime,this.endTime,this.status)
//        this.loadOrders(this.startTime,this.endTime,this.types,this.status)
		},
		updated(){
//			console.log(this.gathOrders[0])
//          console.log(this.startTime,this.endTime,this.status)
//          this.loadOrders(this.startTime,this.endTime,this.types,this.status)
//          console.log(this.startTime,this.endTime,this.status,this.types) 
		}
	}
</script>

<style scoped>
	#tab_content_main {}

	.order_info {
		background: #FFFFFF;
		border-radius: 10rpx;
		font-size: 34rpx;
		font-weight: 300;
		margin: 20rpx;
		overflow: hidden;
		position: relative;
		box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
	}

	.order_info_header {
		font-size: 32rpx;
		line-height: 68rpx;
		border-bottom: 1rpx solid #f3f3f3;
		overflow: hidden;
		font-weight: 400;
		margin-bottom: 20rpx;
		background: #FECE00;
	}

	.order_info_header ul li {
		display: inline-block;
		color: #111111;
		text-align: center;
		float: left;
		width: 21%;
	}

	.order_info_header ul li:nth-child(1) {
		width: 16%;
	}

	.order_info_nowstatus {
		font-size: 28rpx;
		font-weight: normal;
		overflow: hidden;
	}

	.order_info_nowstatus ul li {
		float: left;
		width: 20%;
		text-align: center;
	}

	.order_info_nowstatus ul li:nth-child(1) {
		/* background: #525252; */
		width: 18%;
		text-indent: 10rpx;
	}

	.order_info_nowstatus ul li:nth-child(2) {
		/* background: #005252; */
		width: 16%;
	}

	.order_info_nowstatus ul li:nth-child(3) {
		/* background: #520052; */
		width: 28%;
	}

	.order_info_nowstatus ul li:nth-child(4) {
		/* background: #005252; */
		width: 16%;
		margin-right: 15rpx;
	}

	.order_info_nowstatus ul li:nth-child(5) {
		/* background: #520052; */
		width: 18%;
	}

	.order_info_status {
		font-weight: 300;
		color: #FECE00;
		float: right;
	}

	.order_info_ads {
		font-size: 28rpx;
		line-height: normal;
		font-weight: normal;
	}

	.order_info_ads em {
		display: inline-block;
		margin: 0 20rpx 10rpx;
	}

	.order_info_glist {
		overflow: hidden;
		clear: both;
		margin: 20rpx;
	}

	.order_info_glist dl {}

	.order_info_glist dl dd {
		display: inline-block;
		width: 160rpx;
		height: 160rpx;
		float: left;
	}

	.order_info_glist dl dd img {
		display: block;
		width: 160rpx;
		height: 160rpx;
		background: #FAFAFA;
	}

	.order_info_glist dl dt {
		display: inline-block;
		width: 490rpx;
		float: right;
		font-size: 30rpx;
	}

	.order_info_glist_title {
		line-height: normal;
		overflow: hidden;
	}

	.order_info_glist_title ul li {
		width: 33.33%;
		float: left;
		text-align: center;
	}

	.order_info_glist_title ul li:nth-child(1) {
		text-align: left;
	}

	.order_info_glist_list {
		overflow: hidden;
		font-size: 28rpx;
	}

	.order_info_glist_list ul li {
		line-height: normal;
	}

	.order_info_glist_list ul li em {
		width: 33.33%;
		float: left;
		text-align: center;
	}

	.order_info_glist_list ul li em:nth-child(1) {
		text-align: left;
	}

	.order_info_glist_total {
		text-align: right;
		font-size: 32rpx;
		line-height: 46rpx;
		margin: 0 20rpx;

	}

	.order_info_glist_total i {
		display: inline-block;
		color: #FECE00;
		padding-right: 10rpx;
	}

	.order_info_glist_date {
		display: inline-block;
		float: left;
	}

	.order_info_footer {
		margin: 20rpx 20rpx 10rpx;
		padding-top: 20rpx;
		border-top: 1rpx dashed #f3f3f3;
		height: 88rpx;
		line-height: 88rpx;
	}

	.order_info_footer_left {
		float: left;
	}

	.order_info_footer_left ul li {
		line-height: 44rpx;
		font-size: 30rpx;
	}

	.order_info_footer_right {
		float: right;
	}

	.order_info_footer_right em {
		display: inline-block;
		color: #FECE00;
	}


	.order_info_circle {
		position: absolute;
		background: #FAFAFA;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		bottom: 94rpx;
		right: -25rpx;
		z-index: 1;
	}

	.order_info_circle.right_circle {
		left: -25rpx;
	}
</style>
