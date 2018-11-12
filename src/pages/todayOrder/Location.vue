<template>
	<div>
		<div class="nearest-store bgff" >
        <div class="store-title text-color-11">{{position.name}}</div>
        <div class="store-address text-color-75" >
            {{position.address}}
        </div>
        <i class="i-icon arrow-right-icon"></i>
      </div>
	</div>
</template>
<script>
	export default{
    props:{
        position: {
          default: null,
          type: Object
      }
    },
    computed:{
       position(){
        return this.$store.getters['model.nearestStore/location'];
      }
    },
    mounted(){
    }
	}
	
</script>

<style>
.nearest-store{
  height:88rpx;
  position: relative;
  border-bottom:2rpx solid #e0e0e0;
  padding:6rpx 20rpx;
  box-sizing: border-box;
}
.nearest-store .store-title{
  font-size:28rpx;
  font-weight: 400;
}
.store-address{
  font-size:22rpx;
  margin-top:8rpx;
}
.arrow-right-icon{
  width:18rpx;
  height: 32rpx;
  background-image: url(../../../static/images/icon/arrow-right-icon.png);
  background-size: contain;
  position: absolute;
  top:28rpx;
  right:20rpx;
}
</style>