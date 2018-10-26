<template>
	<scroll-view  class="foods-wrapper" style="height:700px;" :scroll-y="true" @scrolltolower="scrolltolower" >
		<div id="tab_content_main">
			<div class="order_info" v-for="(distributeitem,index) in disOrder" :key="index">
				<div class="order_info_select">
					<i class="selected_order"></i>
				</div>
				<div class="order_info_header">
					<ul>
						<li>状态</li>
						<li>楼号</li>
						<li>房号</li>
						<li>订单编号</li>
						<li>联系电话</li>
					</ul>
				</div>
				<div class="order_info_nowstatus">
					<ul>
						<li>{{distributeitem.status}}</li>
						<li>{{distributeitem.buildNum}}</li>
						<li>{{distributeitem.roomNum}}</li>
						<li>{{distributeitem.code}}</li>
						<li>{{distributeitem.reveiverMobile}}</li>
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
									<li v-for="(item,idx) in distributeitem.orderItems" :key="idx"><em>{{item.name}}</em><em>{{item.quality}}</em><em>￥{{item.sellPrice}}</em></li>
								</ul>
							</div>
						</dt>
					</dl>
				</div>
				<div class="order_info_ads">
					<em>地点:{{distributeitem.receiverAddress}}</em>
				</div>
				<div class="order_info_footer">
					<div class="order_info_footer_left">
						{{datetime}}
					</div>
					<div class="order_info_footer_right">
						实付:<em>￥{{distributeitem.totalAmount}}</em>
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
			next:{
				default: null,
				type: Function
			},
			disOrder:{
				default:"",
				type:Function
			},
			datetime:"",
			startTime:"",
			endTime:""
		},
		methods: {
            scrolltolower(){
		         console.log('next page',"111111111111111111111111111111111");
		        this.next();
		    }
		},
		watch:{
			startTime(v){
//				console.log(v,"aaaaaaaaaa")
				this.startTime=v
			},
			endTime(n){
				this.endTime=n
//				console.log(n,"aaaaaaaaaa")
			}
		},
		created() {
         console.log(this.startTime,this.endTime,"wwwwwwwwwwwwwwwwwwwwww")
           this.loadOrders(this.startTime,this.endTime)
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

	.order_info_select {
		position: absolute;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.4);
		z-index: 999;
		display: none;
	}

	.order_info_select i {
		width: 58rpx;
		height: 58rpx;
		background: url(../../../../../static/images/my_select_none.png) no-repeat center center;
		background-size: 100%;
		position: absolute;
		bottom: 20rpx;
		left: 20rpx;
	}

	.order_info_select i.selected_order {
		background: url(../../../../../static/images/my_select_ok.png) no-repeat center center;
		background-size: 100%;
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

	.order_info_header ul li:nth-child(2) {
		width: 20%;
	}

	.order_info_header ul li:nth-child(3) {
		width: 14%;
	}

	.order_info_header ul li:nth-child(4) {
		width: 25%;
	}

	.order_info_header ul li:nth-child(5) {
		width: 25%;
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
		width: 16%;
		text-indent: 6rpx;
	}

	.order_info_nowstatus ul li:nth-child(2) {
		/* background: #005252; */
		width: 20%;
	}

	.order_info_nowstatus ul li:nth-child(3) {
		/* background: #520052; */
		width: 14%;
	}

	.order_info_nowstatus ul li:nth-child(4) {
		/* background: #005252; */
		width: 25%;
	}

	.order_info_nowstatus ul li:nth-child(5) {
		/* background: #520052; */
		width: 25%;
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


	.order_info_footer {
		margin: 20rpx 20rpx 10rpx;
		padding-top: 20rpx;
		border-top: 1rpx dashed #f3f3f3;
		height: 88rpx;
		line-height: 88rpx;
	}

	.order_info_footer_left {
		float: left;
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