<template>
	<div class="popup">
		<div class="popup-box">
			<div class="popup-title theme-color">
				请选择配送方式
			</div>
			<i class="cancel" @click="popHide"></i>
			<div class="popup-content">
				<div class="place-item" @click="jump('location')">
					<i class="i-icon free-icon" ></i>
					 自提免配送费
				</div>
				<div class="place-item" @click="jump('shopSubmitOrder')">
					<i class="i-icon charge-icon" ></i>
					满30元配送到家
				</div>
			    <div class="tips color75">
			    	注：请您务必在上午9:00前领取您的早餐
			    </div>
			</div>
		</div>
	</div>

</template>

<script>
export default {
	name:'PopupLocation',
	data() {
		return{
			
		}
	},
	methods:{
		popHide:function(){
			this.$emit('hdlHidePopup')
		},
		jump(router){
			this.$command('router',router,'push');
		}
	}

}
</script>

<style scoped>
.popup{
    position: fixed;
    top:0; 
    width: 100%;
    height: 100%;
  	z-index: 99;
    box-sizing: border-box;
    background-color:rgba(7,17,27,0.6);
}
.popup-box{
	width:630rpx;
	height:424rpx;
	background-color: #ffffff;
	font-size:36rpx;
	color: #111111;
	border-radius: 10rpx;
	box-sizing: border-box;
    position: absolute;
    top:50%;
    left:50%;
    margin-left: -315rpx;
    margin-top:-212rpx;

}
.cancel{
	width:78rpx;
	height:78rpx;
	background:url(../../../static/images/icon/white-cancel.png) no-repeat;
	background-size:contain;
	position: absolute;
	top:-16rpx;
	right:-16rpx;
}
.popup-content{
	margin:0rpx 50rpx 0rpx 50rpx;
  /*  border:1px solid red;*/
}
.popup-title{
	text-align: center;
	height: 96rpx;
	line-height: 96rpx;
}
.place-item{
	width:530rpx;
	height: 100rpx;
	line-height: 100rpx;
	border-radius: 10rpx;
	box-shadow:0rpx 2rpx 4rpx rgba(204,202,202,0.6); 
	box-sizing:border-box;
	font-size:28rpx;
/*	border:1px solid red;*/
	margin: 20rpx 0rpx;
	display: flex;
}
.free-icon{
	width:68rpx;
	height:48rpx;
	background:url(../../../static/images/icon/free-icon.png) no-repeat;
	background-size:contain;	
	margin:26rpx 40rpx 26rpx 80rpx;
	
	
}
.charge-icon{
	width:68rpx;
	height:48rpx;
	background:url(../../../static/images/icon/charge-icon.png) no-repeat;
	background-size:contain;	
	margin:26rpx 40rpx 26rpx 80rpx;
}
.tips{
	font-size:20rpx;
	/*color: #757575;*/
	text-align: center;
	margin-top: 20rpx;
}
</style>
