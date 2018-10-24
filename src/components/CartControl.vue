-<template>
	<div class="cartcontrol" :style="{border: border}" >
		<div class="cart-decrease" v-show="count>0" @click="reduceCart" :reduce ="reduceMerchandises" > 
    </div>
		<div class="cart-count" v-show="count>0"> {{count}} </div>
		<div class="cart-add" @click="addCart" :add="addMerchandises"></div>
	</div>
</template>
<script>
	export default {
		props: {   
      		merchandiseId: {
        		default: null,
				type: Number
			},
			shopId: {
				default: null,
				type: Number
			}
		},
	    computed:{
	      border() {
	        return this.count > 0 ? '2rpx solid #ffcc00' : '0';
	      },
	      count() {
	        return this.$store.getters['model.shoppingCarts/quality'](this.merchandiseId);
	      }
	    },
		methods: {
	      	cartShow:function() {
	        	this.$emit('show-cart');
	      	},
		 	addCart(event) {
	        	this.$emit('addCart',  this.merchandiseId, this.count + 1, this.shopId );
	      	},
	      	reduceCart() {
	        	if(this.count > 0) {
	         	this.$emit('reduceCart', this.merchandiseId, this.count - 1, this.shopId ); 
	        	}	        
	      	}
		},
	    mounted: function (){
	      // console.log(this.pageCount)
	    }
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