<template>
  <div class="body">
    <!-- 轮播图 -->
    <mp-swiper></mp-swiper>
    <!-- 配送范围弹窗 -->
    <popup v-if="isShow" @hdlHidePopup="hdlHidePopup"></popup>
    <!-- 定位最近的店面 -->
    <location></location>
    <div class="goods" >
        <menus></menus>
        <m-list @show-cart ="hdlShowCart" ></m-list>
    </div>
    <cart  v-if="isShowCart"></cart>
   
  </div>
</template>

<script>
  import popup from '@/components/Popup'
  import swiper from '@/components/Swiper'
  import location from '@/components/Location'
  import FoodsList from '@/components/FoodsList'
  import menus from '@/components/Menus'
  import cart from '@/components/Cart'

  export default{
    data(){
      return{
        isShow:true,
        isShowCart:false,
      }
    },
    components: {
      popup:popup,
      'mp-swiper': swiper,
      location:location,
      menus: menus,
      'm-list': FoodsList,
      cart: cart
      
   },
   onLoad:function(options){
    wx.setNavigationBarTitle({
      title: '今日下单',
      success: function(res) {
        
      }
    })
  },
  methods:{
      hdlHidePopup:function(){
        this.isShow = false;
      },
      hdlShowCart:function(){
        this.isShowCart =  true;
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