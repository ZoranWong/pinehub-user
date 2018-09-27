<template>
  <div class="body">
    <mp-title :title="title"></mp-title>
    <mp-swiper></mp-swiper>
    <!-- 定位最近的店面 -->
    <location></location>
    <div class="goods" >
        <menus></menus>
        <m-list @show-cart ="hdlShowCart" :height="listHeight"></m-list>
    </div>
    <cart  v-if="isShowCart" @hdlShowPopup="hdlShowPopup"></cart>
       <!-- 配送范围弹窗 -->
    <pop-delivery v-if="isShow" @hdlHidePopup="hdlHidePopup"></pop-delivery>
    
  </div>
</template>

<script>
  import MpTitle from '@/components/MpTitle';
  import PopupDelivery from './PopupDelivery';
  import Swiper from '@/components/Swiper'
  import Location from '@/components/Location'
  import FoodsList from '@/components/FoodsList'
  import Menus from '@/components/Menus'
  import Cart from '@/components/Cart'

  export default{
    data(){
      return{
        title:"预定商城",
        listHeight: '718rpx',
        isShow:true,
        isShowCart:false,
        
       
      }
    },
    components: {
      'pop-delivery': PopupDelivery,
      'mp-swiper': Swiper,
      'location': Location,
      'menus': Menus,
      'm-list': FoodsList,
      'cart': Cart,
      "mp-title": MpTitle,
      
   },
    methods:{
      hdlShowCart:function(){
        this.isShowCart = true;
      },
      hdlShowPopup:function(){
        this.isShow = true;
          console.log(1)
      },
       hdlHidePopup:function(){
        this.isShow = false;
      },
  }

}

</script>

<style scoped>

.goods{
  display: flex;
  width:100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>