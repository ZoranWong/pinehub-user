<template>
	<div class="shopcart">
    <div class="shoppingcart-bottom clearfix">
      <div class="content" @click="toggleListShow">
        <span class="black-circle"></span>
        <i class="i-icon cart" ></i>
        <i class="i-icon num-icon  theme-color color11">{{totalCount}}</i>
        <span class="total-price">¥{{totalAmount}}</span>
      </div>
      <label class="choose fr" @click="popShow">
        选好了
        <i class="i-icon next-icon"></i>
      </label>
    </div>
    <div class="selected-merchandises  bgff"  v-if="toggleList" >
      <div class="selected-title clearfix">
        <div class="flag fl">
          已选产品
        </div>
        <label class="empty fr" @click="emptyCart"  >清空</label>
      </div>
      <div class="add-box">
        <div class="add-merchandises color11" v-for="(item, itemIndex) in cartList" :key="itemIndex">
          <span class="merchandises-name">{{item.name}}</span>
          <span class="sell-price">¥{{item.sellPrice}}</span>
          <div class="cartcontrol-warpper">
            <cart-control @reduceCart="reduceCart" @addCart = "addCart"  :merchandise = "item" >    
            </cart-control>
          </div>  
        </div>
      </div>    
    </div> 
    <div class="mask" v-if="maskBg"></div>  
  </div>
</template>
<script>
  import CartControl  from '@/components/CartControl'
	export default{
		data(){
			return{
        toggleList:false,
        maskBg:false,      
      }
		},
    props: {
      emptyMerchandiseCart:{
        default: null,
        type: Function
      },
      addMerchandiseToCart:{
        default: null,
        type: Function
      },
      reduceMerchandiseToCart:{
        default: null,
        type: Function
      }
    },
    components:{
      'cart-control':CartControl,
    },
    computed:{
      cartList(){
        return this.$store.getters['model.shoppingCarts/list'];
      },
      totalAmount(){
        return this.$store.getters['model.shoppingCarts/totalAmount'];
      },
      totalCount(){
        return this.$store.getters['model.shoppingCarts/totalCount'];
      }
    },
    methods:{
      popShow:function(){
        this.$emit('hdlShowPopup')
      },
      toggleListShow:function(){
        this.toggleList =! this.toggleList;
        this.maskBg = ! this.maskBg;
      },
      emptyCart(storeId) {
        this.emptyMerchandiseCart(storeId);
      },
      addCart( id, count, shopId) {
        this.addMerchandiseToCart( shopId, count, id);
      },
      reduceCart( id, count, shopId) {
        this.addMerchandiseToCart( shopId, count, id);
      }

    },
    
 
	}
</script>
<style scoped>
.shopcart{
  width:100%;
  height: auto;
  position: fixed; 
  bottom:0rpx;
  right: 0rpx;
}
/*底部的购物车*/
.shoppingcart-bottom{
  width:100%;
  height: 98rpx;
  background-color: #000000;
  background-size: contain;
  position: relative;
  z-index:99;
}
.black-circle{
  width: 90rpx;
  height: 90rpx;
  border-radius: 50%;
  background-color: #000000;
  position: absolute;
  top:-20rpx;
  left:20rpx;
}
.cart{
  width:70rpx;
  height: 70rpx;
  background:url(../../static/images/cart.png) no-repeat;
  background-size: contain;
  position: absolute;
  top:-10rpx;
  left:30rpx;
}
.num-icon{
  width:36rpx;
  height: 36rpx;
  line-height: 36rpx;
  border-radius: 50%;
  text-align: center;
  font-size:22rpx;
  font-weight: 400;
  position: absolute;
  top:-20rpx;
  left:78rpx;
}
.content{
  width:70%;
  font-size: 32rpx;
  margin-top: 20rpx;
}
.total-price{
  margin-left: 140rpx;
  color: #ffffff;
}
.choose{
  display:inline-block;
  width: 30%;
  color: #fece00;
  margin-top:-40rpx;
}
.next-icon{
  width:20rpx;
  height:35.6rpx;
  background: url(../../static/images/next-icon.png) no-repeat;
  background-size: contain;
  position: absolute;
  bottom:30rpx;
  right:23rpx;

}
/*商品数量*/
.mask{
    position: fixed;
    top:0; 
    width: 100%;
    height: 100%;
    z-index: 2;
    box-sizing: border-box;
    background-color:rgba(7,17,27,0.6);
}
.add-box{
  margin-top: 60rpx;
}
.selected-merchandises{
  width:100%;
  height: 400rpx;
  overflow: hidden;
  position: absolute;
  bottom:98rpx;
  z-index:20;
  box-sizing: border-box;
  overflow-y: auto;

}
.selected-title{
  width:100%;
  height: 58rpx;
  line-height: 58rpx;
  font-size:24rpx;
  background-color: #f2f2f2;
  padding: 0rpx 40rpx;
  box-sizing: border-box;
  position: fixed;
  z-index: 2;
}
.flag{
  background:url(../../static/images/flag.png) 0rpx 14rpx no-repeat;
  background-size: 26rpx 30rpx;
  text-indent: 36rpx;  
}
.empty{
  background:url(../../static/images/del-icon.png) 0rpx 14rpx no-repeat;
  background-size: 26rpx 30rpx; 
  text-indent: 36rpx;
}

.add-merchandises{
  height: 98rpx;
  line-height: 98rpx;
  position: relative;
}
.merchandises-name{
  font-size:28rpx;
  margin-left: 40rpx;  
}
.sell-price{
  font-size:32rpx;
  position:absolute;
  bottom:0rpx;
  right:300rpx;
}
.cartcontrol-warpper{
  width:143rpx;
  position: absolute;
  bottom:0rpx;
  right:20rpx;
}
</style>