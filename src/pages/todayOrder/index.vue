<template>
  <div class="body">
    <!-- 轮播图 -->
    <MpSwiper></MpSwiper>
    <!-- 配送范围弹窗 -->
   <!--  <Popup v-if="isShow" @hdlHidePopup="hdlHidePopup"></Popup> -->
    <!-- 定位最近的店面 -->
    <Location></Location>
 <!--    <div class="goods" >
        <Menus ></Menus>
        <MList @show-cart ="hdlShowCart" ></MList>
    </div> -->
    <Cart  v-if="isShowCart"></Cart>
   
  </div>
</template>

<script>
  import Popup from '@/components/Popup'
  import MpSwiper from '@/components/Swiper'
  import Location from '@/components/Location'
  import MList from '@/components/FoodsList'
  import Menus from '@/components/Menus'
  import Cart from '@/components/Cart'

  import BScroll from 'better-scroll'
  export default{
    data(){
      return{
        isShow:true,
        isShowCart:false,
      }
    },
    components: {
      Popup:Popup,
      MpSwiper: MpSwiper,
      Location:Location,
      Menus: Menus,
      MList: MList,
      Cart: Cart,
      
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