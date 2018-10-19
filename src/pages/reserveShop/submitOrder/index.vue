<template>	
	<div class="confirmation-order body">
		<mp-title :title="title"></mp-title>
		<!-- 收货人组件 -->
		<consignee ></consignee>
		<ul class="Distribution-details" >
			<li class="li-item bgff">
				配送地址 
				<p class="details-item">
				 <input type="text" class="big-input">
				</p>
			</li>
			<li class="li-item bgff">
				配送联系电话 
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
	import Payment from '@/components/Payment'
	export default{
		name:"confirmationOrderTwo",
		data(){
			return{
				title:'预定商城-确认订单',
			}
		},

		components:{
			'mp-title':MpTitle,
			'consignee':Consignee,
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
.li-item{
	width:97%;
	height: 80rpx;
	line-height: 80rpx;
	border-radius: 10rpx;
	margin-bottom:4rpx ;
	box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
	box-sizing: border-box;
}
.li-item .details-item{
	display: inline-block;
	height: 80rpx;
	margin-left: 100rpx;
	vertical-align: middle;
	
}
.Distribution-details{
	margin-bottom: 20rpx;
	box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
	/*border:1rpx solid black;*/
}

.li-item p input{
  	display: inline-block;
  	vertical-align:middle;
}
.big-input{
	width: 460rpx;
	height: 40rpx; 
  	border-radius: 10rpx;
  	border:2rpx solid #cccccc;
}
.li-item .tel-num{
	margin-left: 44rpx;
}
</style>