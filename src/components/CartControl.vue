<template>
	<div class="cartcontrol" :style="{border: border}" >
		<div class="cart-decrease" v-show="count>0"
        @click="decreaseCart" > 
    </div>
		<div class="cart-count" v-show="count>0"> {{count}} </div>
		<div class="cart-add" @click="addCart" ></div>
	</div>
</template>
<script>
	export default {
		props: {   
			merchandise: {
        default:function() {
          return {};
        },
				type:Object
			}
		},
		methods: {
      cartShow:function() {
      this.$emit('show-cart');
    },
			addCart(event) {
			  this.count++;
           this.$command('ADD_MERCHANDISE_TO_CART', {
              count: this.count,
              merchandise: this.merchandise
           }); 
			},
      decreaseCart() {
        this.count--;
      }
		},
    computed:{
      border() {
        return this.count > 0 ? '2rpx solid #fece00' : '0';
      }
    },
		data() {
			return {
        count:0,

      };
		},
	}
</script>
<style>
.cartcontrol {
  width:143rpx;
  height:49rpx; 
  border-radius: 24rpx;
  box-sizing: border-box;
  display: inline-block;
  position: relative;
}
.cart-decrease{
  width:48rpx;
  height:48rpx;
  background:url(../../static/images/reduce-icon.png) no-repeat center;
  background-size: contain;
  position: absolute;
  top: 0rpx;
  left:0rpx;
  transition: all 0.4s linear;  
}
.cart-count{
  font-size:28rpx;
  line-height: 48rpx;
  text-align: center;
}
.cart-add{
  width:48rpx;
  height:48rpx;
  background:url(../../static/images/plus-icon.png) no-repeat;
  background-size: contain;
  position: absolute;
  bottom: -1rpx;
  right:-3rpx;
}

</style>