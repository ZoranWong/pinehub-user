<template>
	<div class="consignee bgff width710">
		<div>
			<p class="consignee-name">收货人：张雷</p>
			<p class="telphone">联系电话：15888878788</p>
			<!-- 编辑信息 -->
			<!-- <i class="edit-icon"></i> -->
		</div>
		<div class="tips text-color-75" v-if="selectMethod" >请选择就餐方式</div>
	</div>
	
</template>
<script>
	export default{
		name:'Consignee',
		data(){
			return{
				
			}
		},
		props:["selectMethod"]
		
	}
</script> 
<style>
.consignee{
	line-height:46rpx;
	padding:10rpx;
	margin-bottom: 20rpx;
	border-radius: 10rpx;
	box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
	box-sizing: border-box;
}
.consignee div:first-child{
	margin:10rpx 0rpx;
}

.consignee .tips{
	font-size:22rpx;
	border-top:2rpx dashed #cccccc;
    box-sizing: border-box;
    margin-top: 28rpx;
	
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
.noVisible{
	visibility: hidden;
}
</style>