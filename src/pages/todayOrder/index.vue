<template>
  <div class="body">
    <!-- 轮播图 -->
    <mp-swiper></mp-swiper>
    <!-- 配送范围弹窗 -->
   <!--  <popup v-if="isShow" @hdlHidePopup="hdlHidePopup"></popup> -->
    <!-- 定位最近的店面 -->
    <location></location>
    <div class="goods" >
        <menus></menus>
        <m-list @show-cart ="hdlShowCart"></m-list>
    </div>
    <cart  v-if="isShowCart"></cart>
   
  </div>
</template>

<script>
  import popup from '@/components/popup'
  import swiper from '@/components/swiper'
  import location from '@/components/location'
  import foodsList from '@/components/foodsList'
  import menus from '@/components/menus'
  import cart from '@/components/cart'
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
      'm-list': foodsList,
      cart: cart,
      
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
       
      }
  }

}

</script>

<style scoped>
/*.pop-mask{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height: 100%;
  z-index: 40;
  background-filter:blur(10px);
  transition: all 0.5s
}
.pop-mask .fade-transtion{
  opacity: 1;
  background:rgba(7,17,27,0.6);
}
.pop-mask .fade-enter,.pop-mask .fade-leave{
  opacity: 0;
  background:rgba(7,17,27,0);
}*/
.goods{
  display: flex;
  width:100%;
  overflow: hidden;
  box-sizing: border-box;
 
 /* bottom:98rpx;*/
 /* border:1px solid blue;*/
}
</style>