<template>
	<div class="shopcart">
    <div class="shoppingcart-bottom">
        <span class="black-circle"></span>
        <i class="i-icon cart" @click="cartListShow"></i>
        <i class="i-icon num-icon">{{count}}</i>
        <div class="clearfix">
          <span class="total-price">¥{{totalPrice}}</span>
          <label class="choose fr" @click="popShow">选好了
          <i class="i-icon next-icon"></i>
          </label>
        </div>
    </div>   
 <!--    <div class="selected-merchandises" v-if="isShowCartlist" @hdlShowCartList="hdlShowCartList" >
      <div class="selected-title clearfix">
        <div class="flag fl">
          已选产品
        </div>
        <label class="empty fr">清空</label>
      </div>
      <div class="add-merchandises text-color-11">
        <span class="merchandises-name">芝士蛋糕</span>
        <span class="sell-price">¥20.00{{sellPrice}}</span>
        <div class="cartcontrol-warpper">
            <cart-control :list="list" :border="isBorder" ></cart-control>
        </div>
      </div>
    </div> --> 
  </div>
</template>
<script>
  import CartControl  from '@/components/CartControl'
	export default{
    props:{
      selectFoods:{
        type:Array,
        default(){
          return[
            {
              price:10,
              count:1
            }
          ];
        }
      }
    },
		data(){
			return{
        isShowCartlist:true,
        // isBorder:'2rp solid  #fece00',     
      }
		},
    components:{
      'cart-control':CartControl,
    },
    methods:{
      popShow:function(){
        this.$emit('hdlShowPopup')
      },
      cartListShow:function(){
        this.$('hdlShowCartList');
        console.log(1)
      },
      hdlShowCartList:function(){
        this.isShowCartlist = true;
        console.log(2)
      }
    },
    computed:{
      // totalPrice(){
      //   let total = 0;
      //   this.foods.forEach( (food) => {
      //       total += food.price * food.count;
      //   });
      //   return total;
      // }
    }
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
  background-color:#fccd00;
  color:#111111;
  text-align: center;
  font-size:22rpx;
  font-weight: 400;
  position: absolute;
  top:-20rpx;
  left:78rpx;
}
.shoppingcart-bottom div{
  height: 98rpx;
  line-height: 98rpx;
  width:100%;
  font-size: 32rpx;
}
.total-price{
  margin-left: 110rpx;
  color: #ffffff;
}
.shoppingcart-bottom .choose{
  width:200rpx;
  color: #fece00; 
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
.selected-merchandises{
  width:100%;
  height: 400rpx;
  overflow: hidden;
  background-color: #ffffff;
  position: absolute;
  bottom:98rpx;
  z-index:20;
}
.selected-title{
  width:100%;
  height: 58rpx;
  line-height: 58rpx;
  font-size:24rpx;
  background-color: #f2f2f2;
  padding: 0rpx 40rpx;
  box-sizing: border-box;
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
  margin-left: 300rpx;
}
.cartcontrol-warpper{
  width:143rpx;
  height: 50rpx;
  position: absolute;
  bottom:0rpx;
  right:0rpx;
  border:1rpx solid red;
}
</style>