<template>	
	<div class="confirmation-order body">
		<mp-title :title="title"></mp-title>
		<!-- 收货人组件 -->
		<consignee select-method="true"></consignee>
		<!-- 配送和自提的tab切换组件-->
	    <tab-delivery></tab-delivery>
	    <!-- 支付内容的显示组件 -->
		<payment></payment>
        
	
	</div>
</template>
<script>
	import MpTitle from '@/components/MpTitle';
	import Consignee from '@/components/Consignee';
	import TabDelivery from '@/components/TabDelivery';
	import Payment from '@/components/Payment';
	export default{
		name:"confirmationOrder",
		data(){
			return{
				title:'当日下单-确认订单',
				
			}
		},
		components:{
			'mp-title':MpTitle,
			'consignee':Consignee,
			'tab-delivery':TabDelivery,
			'payment':Payment
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
</style>