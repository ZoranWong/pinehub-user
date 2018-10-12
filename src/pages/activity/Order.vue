<template>	
	<div class="confirmation-order body">
		<mp-title :title="title"></mp-title>
		<!-- 收货人组件 -->
		<consignee></consignee>
		<ul class="Distribution-details" >
			<li class="li-item bgff">
				自提地址 
				<p class="details-item">
				 	<input type="text" placeholder="默认地址" readonly="readonly" disabled="">
				</p>
			</li>
			<li class="li-item bgff">
				自提时间
				<p class="details-item">
			 		<input type="text" placeholder="次日上午9:00前" readonly="readonly" disabled="" >
				</p>
			</li>
			<li class="li-item bgff">
				站点联系电话 
				<p class="details-item tel-num">
				16868686868	
				</p>
			</li>
		</ul>
		
	    <!-- 支付内容的显示组件 -->
		<payment></payment>
        
	
	</div>
</template>
<script>
	import MpTitle from '@/components/MpTitle'
	import Consignee from '@/components/Consignee'
	import TabDelivery from '@/components/TabDelivery'
	import Payment from '@/components/Payment'
	export default{
		name:"confirmationOrderThree",
		data(){
			return{
				title:'新品预定-确认订单',
			}
		},
		components:{
			'mp-title':MpTitle,
			'consignee':Consignee,
			'tab-delivery':TabDelivery,
			'payment':Payment,
		},
		methods:{
			radioChange (e) {
      			console.log('radio发生change事件，携带value值为：', e.target.value)
    		},
    		bindPickerChange (e) {
    			 // console.log(e)
    			 this.index =  e.target.value

    		}	
		}
	}
</script>
<style scoped>
.confirmation-order{
	font-size:28rpx; 
	padding:20rpx 0rpx 20rpx 20rpx;
}

.Distribution-details{
	margin-bottom: 20rpx;
	border-radius: 10rpx;
	box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
	box-sizing: border-box;
}
.li-item{
	width:98%;
	border-radius: 10rpx;
	margin-bottom:4rpx ;
	padding-left: 20rpx;
	box-sizing: border-box;
	/*border:1rpx solid red*/
}
.li-item .details-item{
	display: inline-block;
	height: 80rpx;
	margin-left: 100rpx;
	vertical-align: middle;
	/*border:1rpx solid red*/
    
}
.li-item p input{
	width:460rpx;
	height: 40rpx;
  	display: inline-block;
  	width:360rpx;
  	line-height: 80rpx;
    vertical-align:middle;
    /*border:1rpx solid red*/
}
.li-item .tel-num{
	margin-left: 44rpx;
}

</style>