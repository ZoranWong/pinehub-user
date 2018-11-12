<template>
  <scroll-view  class="foods-wrapper"
    :style="{ width: width, height: height }"
    :scroll-y="true"
    @scrolltolower="scrolltolower"
    :scroll-into-view = "categoryId">
      <div class="foods-item clearfix bgff" v-for="(item, index) in list" :key="index">
        <div class="foods-item-left fl">
          <img class="merchandises-pic" :src="item.thumbImage">
        </div>
        <div class="foods-item-right fr">
          <h4 class="merchandises-name" >
              {{item.name}}
          </h4>
          <p class="sell-count">已售
            <span class="color00">{{item.sellCount}}</span>份
          </p>
          <p class="sell-price">{{item.sellPrice}}元/份</p>
          <p class="origin-price color75">{{item.originPrice}}元/份</p>
          <div class="cartcontrol-warpper">
            <cart-control
              @addCart = "addCart"
              @reduceCart= "reduceCart"
              :merchandiseId = "item.id"
              :shopId="item.shopId">
            </cart-control>
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
      reduceMerchandiseToCart:{
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
      categoryId: {
        default: null,
        type: String|Number
      }
    },
		data(){
			return {
         pageCount: 15,
         timeout: null
      };
		},
    components:{
      'cart-control':CartControl,
      'cart':Cart,
    },
    methods:{
      scrolltolower(e){
        console.log('scrolltolower');
        let $this = this;
        if(this.timeout) {
          clearTimeout(this.timeout);
        }
        ((e) => {
          $this.timeout = setTimeout(function () {
            $this.next();
          }, 250);
        })(e);
      },
      addCart( id, count, shopId) {
        this.addMerchandiseToCart( shopId, count, id);
      },
      reduceCart(id, count, shopId){
        this.reduceMerchandiseToCart( shopId, count, id);
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
  padding:20rpx 0;
  box-sizing: border-box;
  overflow-y: auto;
}
.foods-wrapper::-webkit-scrollbar {
  width: 1px;
  background-color: rgba(217,217,217,0.3);
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
  background:url(../../static/images/icon/plus-icon.png) no-repeat;
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
