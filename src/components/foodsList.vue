<template>
  <div class="cart-scroll">
    <scroll-view  class="foods-wrapper" :style="{ width: width, height: '100%' }" :scroll-y="true" @scrolltolower="scrolltolower" >
        <div class="foods-item clearfix bgff" v-for="(item, index) in list" :key="index">
          <div class="foods-item-left fl">
            <img class="merchandises-pic" :src="item.thumbImage">
          </div>
          <div class="foods-item-right fr">
            <h4 class="merchandises-name" >
                   {{item.name}}
            </h4>
            <p class="sell-count">已售
              <span class="text-yellow-cc">{{item.sellCount}}</span>份
            </p>
            <p class="sell-price">{{item.sellPrice}}元/份</p>
            <p class="origin-price">{{item.originPrice}}元/份</p>
            <div class="cartcontrol-warpper">
              <cart-control :list="list" ></cart-control>
            </div>
          </div>
        </div>
    </scroll-view>
    <cart></cart>
  </div>
</template>

<script>
  import CartControl  from '@/components/CartControl'
  import Cart from '@/components/Cart'
	export default{
    props: {
      width: {
        default: '100%',
        type: String
      },
      height: {
        default: '100%',
        type: String
      }
    },
		data(){
			return {};
		},
    components:{
      'cart-control':CartControl,
      'cart':Cart,
    },
    computed: {
      list(){
        console.log(this.$store.getters['model.merchandises/list'])
        return this.$store.getters['model.merchandises/list'];
     }
    },
    methods:{
      cartShow:function(){
        this.$emit('show-cart')
      },
      scrolltolower(){
        console.log("gjrtgh")
      },
      scroll(e) {
        console.log("hhhhh")
        console.log(e)
      },
    }
	}
</script>

<style scoped>
.cart-scroll{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: hidden;
}
.foods-wrapper{
  flex:1;
  overflow-y: auto;
}
.foods-wrapper::-webkit-scrollbar {
  width: 1px; 
  background-color: rgba(217,217,217,0.3); 
}
.foods-wrapper{
  padding:20rpx 30rpx 20rpx 20rpx;
  box-sizing: border-box;
  overflow-y: auto;
}
.foods-item{
   width:100%;
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
.sell-count{
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
.cartcontrol-warpper{
  position: absolute;
  bottom:58rpx;
  right:60rpx;
  /*border:1rpx solid red;*/
}
</style>