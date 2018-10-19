<template>
	<div class="popup">
		<div class="popup-box bgff color11">
			<i class="location-icon"></i> 
			<i class="cancel"  @click="popHide"></i>
			<div class="popup-content">
				<div class="popup-title">
				历史站点选择
			    </div>
				<div class="place-item"  v-for="(item,index ) in places" :key="index"  @click="jump('shopsubmitorder')">
					<i class="i-icon yellow-right-arrow" ></i>
					{{item.name}}
				</div>
				<div class="btn-big theme-color" @click="jump('location')">重新选择</div>
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
  			places:[
  			{
  				id:1,
  				name: '安徽省合肥市蜀山区丹霞路与翡翠路交叉口早餐车'
  			},
  			{
				id:2,
  				name: '安徽省合肥市瑶海区新蚌埠路交叉口早餐车'
  			}
  			]
  		}
  	},
  	methods:{
			popHide:function(){
				this.$emit('hdlHidePopup')
			},
			jump(router){
				this.$command('router',router,'jump');
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
	height: 610rpx;
	font-size:32rpx;
	border-radius: 10rpx;
	padding: 40rpx 0rpx; 
	box-sizing: border-box;
    position: absolute;
    top:50%;
    left:50%;
    margin-left: -315rpx;
    margin-top:-305rpx;

}
.location-icon{
	width:118rpx;
	height:180rpx;
	background:url(../../../static/images/location-icon.png) no-repeat;
	background-size:contain;
	position: absolute;
	top:-84rpx;
	left:256rpx;

}
.cancel{
	width:78rpx;
	height:78rpx;
	background:url(../../../static/images/yellow-cancel.png) no-repeat;
	background-size:contain;
	position: absolute;
	top:-16rpx;
	right:-16rpx;

}
.popup-content{
	margin:60rpx 50rpx 0rpx 50rpx;
}
.place-item{
	width:530rpx;
	height: 100rpx;
	border-radius: 10rpx;
	box-shadow:0rpx 2rpx 4rpx rgba(204,202,202,0.6); 
	padding: 10rpx 12rpx;
	box-sizing:border-box;
	font-size:28rpx;
	margin: 20rpx 0rpx;
	display: flex;
}
.yellow-right-arrow{
	width:40rpx;
	height:40rpx;
	background:url(../../../static/images/yellow-right-arrow.png) no-repeat;
	background-size:contain;	
	margin-top: 30rpx;
	margin-right:21rpx;
	
}
.btn-big{
   width:530rpx;
   height: 80rpx;
   line-height: 80rpx;
   text-align: center;
   border-radius: 10rpx;
   margin-top: 40rpx;
}
.tips{
	font-size:20rpx;
	text-align: center;
	margin-top: 20rpx;
}
</style>
