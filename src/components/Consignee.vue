<template>
	<div class="consignee bgff width710">
		<div>
			<p class="consignee-name">收货人：张雷</p>
			<p class="telphone">联系电话：15888878788</p>
			<i class="edit-icon"></i>
		</div>
		<div class="tips text-color-75">请选择就餐方式</div>
	</div>
	
</template>
<script>
	export default{
		name:'Consignee',
		data(){
			return{

			}
		}

	}
</script>
<style>
.consignee{
	height: 188rpx;
	line-height: 40rpx;
	padding:20rpx;
	margin-bottom: 20rpx;
	border-radius: 10rpx;
	box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
	box-sizing: border-box;
	/*border:1rpx solid red;*/
}
.consignee div:first-child{
	margin:8rpx 0rpx 28rpx 0rpx ;
    position: relative;

}
.consignee .tips{
	font-size:22rpx;
	border-top:2rpx dashed #cccccc;
    box-sizing: border-box;
	
}
.edit-icon{
	width:23rpx;
	height:30rpx;
	background:url(../../static/images/edit-icon.png) no-repeat;
	background-size: contain;
	position: absolute;
	top:72rpx;
	right: 0rpx;
}	

</style>