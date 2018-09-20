<template>
  <div class="body">
    <m-list></m-list>
    <cart></cart>  
    <m-card></m-card>
  </div>
</template>

<script>
  import FoodsList from '@/components/FoodsList';
  import cart from '@/components/Cart'
  import MerchandiseCard from '@/components/MerchandiseCard'
  export default{
    data(){
      return{
      }
    }, 
    components: {
      'm-list':FoodsList,
      cart:cart,
      'm-card':MerchandiseCard,
   },
   onLoad:function(options){
    wx.setNavigationBarTitle({
      title: '新品预定',
      success: function(res) {
        // success
      }
    })
  },
}

</script>

<style scoped>
/*.foods-wrapper{
 width:100%;
 height: 100%;
}
.foods-item{
   width:700rpx;
   height:326rpx;
   border-radius: 20rpx;
   box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
   margin-bottom: 20rpx;
   padding: 38rpx 40rpx;
   box-sizing: border-box;
   position: relative;
}
*/
</style>