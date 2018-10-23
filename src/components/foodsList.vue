<template>
  <scroll-view  class="foods-wrapper" :style="{ width: width, height: height }" :scroll-y="true" @scrolltolower="scrolltolower" >
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
            <cart-control @addCart = "addCart"  @reduceCart= "reduceCart " :merchandise = "item"></cart-control>
          </div>
        </div>
      </div>
  </scroll-view>
</template>

<script>
  import CartControl  from '@/components/CartControl'
  import Cart from '@/components/Cart'
	export default{
    props: {
      addMerchandiseToCart:{
        default: null,
        type: Function
      },
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
    },
		data(){
			return {
         pageCount: 15
      };
		},
    components:{
      'cart-control':CartControl,
      'cart':Cart,
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
      addCart(event) {
  
          this.$emit('addCart',  this.merchandise.id, this.count + 1, 
            this.merchandise.shopId );
          //console.log( this.count, "cartcontrol", this.merchandiseId)
        },
      scroll(e) {
        console.log(e)
      },

      addCart( id, count, shopId) {
        this.addMerchandiseToCart( shopId, count, id);
      },
      reduceCart(id, count, shopId){
        console.log("111kkkjjjhhhh")
        this.addMerchandiseToCart( shopId, count, id);
      }
    },
    watch:{
      width:function(val) {
       // console.log(val)

      }
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
  height: 100%;
}
.foods-wrapper::-webkit-scrollbar {
  width: 1px; 
  background-color: rgba(217,217,217,0.3); 
}
.foods-wrapper{
  padding:20rpx;
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