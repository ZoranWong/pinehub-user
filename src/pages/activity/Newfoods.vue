<template>
  <scroll-view  class="foods-wrapper" :style="{ width: width, height: height }" :scroll-y="true" @scrolltolower="scrolltolower" >
      <div class="foods-item clearfix bgff" v-for="(item, index) in list" :key="index">
        <div class="foods-item-top ">
          <img class="merchandises-pic" :src="item.thumbImage" :style="{ width: widthPic, height: heightPic }">
        </div>
        <div class="foods-item-bottom">
          <h4 class="merchandises-name" >
                 {{item.name}}
          </h4>
          <span class="tag color00"  v-for="(tag, index2) in item.tags" :key="index2">
            {{tag}}  
          </span>
          <p class="describe color75">{{item.describe}}</p>
          <div class="content ">
            <div class="sell-price color00">{{item.sellPrice}}
              <span>RMB</span>
            </div>
            <div class="cartcontrol-warpper ">
              <cart-control :list="list" ></cart-control>
            </div>
          </div> 
        </div>
      </div>
  </scroll-view>
</template>

<script>
  import CartControl  from '@/components/CartControl'
	export default{
    props: {
      width: {
        default: '100%',
        type: String
      },
      height: {
        default: '100%',
        type: String
      },
      next: {
        default: null,
        type: Function
      },
      list: {
        default: function() {return []},
        type: Array
      },
      widthPic:{
        default:'100%',
        type: String
      },
      heightPic:{
        default:'100%',
        type: String
      },
    },
		data(){
			return {
         pageCount: 15,
         
      };
		},
    components:{
      'cart-control':CartControl,
     
    },
  
   created(){
      this.next();
   },
    methods:{
      cartShow:function(){
        this.$emit('show-cart')
      },
      scrolltolower(){
        // console.log('next page');
        this.next();
      },
      scroll(e) {
        console.log(e)
      },
    },
    watch:{
      width:function(val) {
       // console.log(val)
      }
    }
	}
</script>

<style scoped>
.foods-wrapper{
  padding:20rpx;
  box-sizing: border-box;
  overflow-y: auto;
}
.foods-item{
  width:100%;
  border-radius: 10rpx;
  box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.6);
  margin-bottom: 40rpx;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
.foods-item-top{
  width:100%;
  height: 330rpx;
}
.foods-item-bottom{
  width:100%;
  padding:20rpx  20rpx 0rpx;
  box-sizing: border-box;
}
.foods-item-bottom h4{
  font-size:32rpx;
  font-weight: 400;
  margin-bottom: 20rpx;
}
.tag{
  padding:8rpx 15rpx;
  line-height: 36rpx;
  letter-spacing: 4rpx;
  min-width: 84rpx;
  font-size: 28rpx;
  border:2rpx solid #ffcc00;
  border-radius: 36rpx;
  text-align: center;
  display: inline-block;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
}
.describe{
  font-size:22rpx;
}
.content{
  width:100%;
  margin-top:20rpx;
  height: 100rpx;
  position: relative;
}
.sell-price{
  font-size: 36rpx;
  font-weight: 400;
  position: absolute;
  bottom:40rpx;
  left:0rpx;
}
.sell-price span{
  font-size: 28rpx;
  font-weight: 400;
}
.cartcontrol-warpper{
  margin-top:30rpx;
  position: absolute;
  bottom:40rpx;
  right:0rpx;
}
</style>