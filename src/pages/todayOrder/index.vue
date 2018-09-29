<template>
  <div class="body">
    <!-- 轮播图 -->
    <mp-title :title="title"></mp-title>
    <mp-swiper></mp-swiper>
    <!-- 配送范围弹窗 -->
   <!--  <popup v-if="isShow" @hdlHidePopup="hdlHidePopup"></popup> -->
    <!-- 定位最近的店面 -->
    <location></location>
    <div class="goods" >
        <menus @menusChange="menusChange"></menus>
        <m-list  :height="listHeight" :width="listwidth" model=""></m-list>
       <!--  <m-list @show-cart ="hdlShowCart" :height="listHeight"></m-list> -->
    </div>
   <!--  <cart  v-if="isShowCart"></cart> -->
  
  </div>
</template>

<script>
  import MpTitle from '@/components/MpTitle';
  import Popup from '@/pages/todayOrder/Popup';
  import Swiper from '@/components/Swiper';
  import Location from '@/components/Location';
  import FoodsList from '@/components/FoodsList';
  import Menus from '@/components/Menus';
  import Cart from '@/components/Cart';
  
  export default{
    data(){
      return{
        isShow:true,
        // isShowCart:true,
        listHeight: '718rpx',
        listwidth:'530rpx',
        title:"当日下单"
      }
    },
    components: {
      'popup': Popup,
      'mp-swiper': Swiper,
      'location': Location,
      'menus': Menus,
      'm-list': FoodsList,
      'cart': Cart,
      "mp-title": MpTitle,
      
   },
    methods:{
      menusChange : function (index) {
        console.log(index);
      },
      
  },
   created(){
      // this.$command('GET_MERCHANDISE_LIST','today', 1, 1);
      console.log('created mm');
   },

}

</script>

<style scoped>

.goods{
  display: flex;
  width:100%;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 
}
</style>