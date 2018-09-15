<template>
  <div>
    <ul class="menu-wrapper">
      <li class="menu-item search">
        <i class="i-icon search-icon"></i>
        <span class="search-txt">搜索</span>
      </li>
      <li class="menu-item new-product ">
        <i class="i-icon new-product-icon"></i>
        <span class="new-txt text-yellow-cf">新品套餐</span>
      </li>
      <li class="menu-item classic-set-meal">
        <span class="categories">经典套餐</span>
      </li>
      <li class="menu-item utrition-collocation">
        <span class="categories">营养搭配</span>
      </li>
      <li class="menu-item snack-dessert">
        <span class="categories">小食甜品</span>
      </li>
      <li class="menu-item drink">
        <span class="categories">饮品</span>
      </li>
    </ul>
  </div>
</template>


<script>
  export default{
    data(){
      return{
        
      }
    }
  }
</script>

<style scoped>
.menu-wrapper{
  flex:0 0 120rpx;
  width:120rpx;
  box-sizing: border-box;
  height: 100%;
}
.menu-item{
  display: table;
  width:120rpx;
  text-align: center;
  font-size: 28rpx;
  font-weight:400;
  box-sizing: border-box;
  background-color: #ffffff;
 /* border-bottom: 1px solid red;*/
 box-shadow: 4rpx 0rpx 10rpx rgba(205,205,205,0.3);

}
/*.menu-item span{
  display: table-cell;
  width:66rpx;
}*/
.search{
  height:130rpx;
  box-sizing: border-box;
  text-align: center;
  border-bottom-right-radius:10rpx;
  padding:28rpx 0rpx;
}
.search-icon{
  display: inline-block;
  width:40rpx;
  height: 40rpx;
  background: url("../../static/images/search-icon.png") no-repeat;
  background-size: contain;
  margin:0rpx 40rpx 10rpx;
}
.new-product{
  height: 216rpx;
  width: 120rpx;
  border-left:6rpx solid #fece00;
  text-indent: 40rpx;
  padding:28rpx 0rpx;

}
.new-product-icon
{
  width:58rpx;
  height: 66rpx;
  background:url("../../static/images/new-product-icon.png") no-repeat;
  background-size: contain;
  margin:0rpx 28rpx 20rpx;
}
.classic-set-meal,.utrition-collocation,.snack-dessert{
  height:108rpx;
  padding:12rpx 20rpx;
  border-bottom:2rpx solid #e0e0e0;
  box-sizing: border-box;
  text-indent: 2rpx;
}
.classic-set-meal{
   border-top-right-radius:10rpx;
}
.drink {
   height:108rpx;
   padding-top: 38rpx;
}

</style>