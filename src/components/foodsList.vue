<template>
	<div class="foods-wrapper">
    <ul>
      <li class="foods-item clearfix bgff">
        <div class="foods-item-left fl">
          <img class="merchandises-pic" src="../../static/upload/cheese-cake.png">
        </div>
        <div class="foods-item-right fr">
          <h4 class="merchandises-name" >
                  芝士蛋糕
          </h4>
          <p class="sell-num">已售<span class="text-yellow-cc">1888</span>份</p>
          <p class="sell-price">20.00元/份</p>
          <p class="origin-price">36.00元/份</p>
          <i class="i-icon plus-icon" @click="cartShow"></i>
        </div>
      </li>
      <li class="foods-item clearfix bgff">
        <div class="foods-item-left fl">
          <img class="merchandises-pic" src="../../static/upload/cheese-cake.png">
          </div>
          <div class="foods-item-right fr">
          <h4 class="merchandises-name" >
                  芝士蛋糕
          </h4>
          <p class="sell-num">已售<span class="text-yellow-cc">1888</span>份</p>
          <p class="sell-price">20.00元/份</p>
          <p class="origin-price">36.00元/份</p>
          <i class="i-icon plus-icon"></i>
        </div>
      </li>
      <li class="foods-item clearfix bgff">
        <div class="foods-item-left fl">
          <img class="merchandises-pic" src="../../static/upload/cheese-cake.png">
          </div>
          <div class="foods-item-right fr">
          <h4 class="merchandises-name" >
                  芝士蛋糕
          </h4>
          <p class="sell-num">已售<span class="text-yellow-cc">1888</span>份</p>
          <p class="sell-price">20.00元/份</p>
          <p class="origin-price">36.00元/份</p>
          <i class="i-icon plus-icon"></i>
        </div>
      </li>
      <li class="foods-item clearfix bgff">
        <div class="foods-item-left fl">
          <img class="merchandises-pic" src="../../static/upload/cheese-cake.png">
          </div>
          <div class="foods-item-right fr">
          <h4 class="merchandises-name" >
                  芝士蛋糕
          </h4>
          <p class="sell-num">已售<span class="text-yellow-cc">1888</span>份</p>
          <p class="sell-price">20.00元/份</p>
          <p class="origin-price">36.00元/份</p>
          <i class="i-icon plus-icon"></i>
        </div>
      </li>      
    </ul>
  </div>
</template>

<script>
	export default{
		data(){
			return{

			}
		},
     methods:{
      cartShow:function(){
        this.$emit('show-cart')
      }
    }
	}
</script>

<style scoped>
.foods-wrapper{
  flex:1;
  overflow-y: auto;
  height: 718rpx;

}
.foods-wrapper::-webkit-scrollbar {
  width: 1px; 
  background-color: rgba(217,217,217,0.3); 
}
.foods-wrapper ul{
  width:100%;
  padding:20rpx 30rpx 20rpx 20rpx;
  box-sizing: border-box;
  overflow-y: auto;
}
.foods-item{
   width:580rpx;
   height:326rpx;
   border-radius: 20rpx;
   box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
   margin-bottom: 20rpx;
   padding: 38rpx 40rpx;
   box-sizing: border-box;
   position: relative;
}
.foods-item-left{
  width: 43%;
  height: 100%;
  /*box-sizing: border-box;
  border:2rpx solid red;*/
}
.merchandises-pic{
  width:250rpx;
  height:250rpx;

}
.merchandises-pic img{
  width:100%;
  height:100%;
}
.foods-item-right{
 width: 46%;
 height: 100%;
 line-height: 40rpx;
 
}
.foods-item-right h4{
  font-size:32rpx;
  font-weight: 400;
}
.sell-num{
  font-size:22rpx;
}
.sell-price{
  font-size: 28rpx;
  font-weight: 400;
  margin-top: 30rpx;
}
.origin-price{
  text-decoration: line-through;
  font-size:20rpx;
}
.plus-icon{
  width:48rpx;
  height: 48rpx;
  background:url(../../static/images/plus-icon.png) no-repeat;
  background-size: contain;
  position: absolute;
  bottom: 58rpx;
  right:40rpx;
}
</style>