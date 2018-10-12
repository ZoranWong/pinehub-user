<template>
  <div class="body">
    <mp-title :title="title"></mp-title>
    <mp-swiper></mp-swiper>
    <location></location>
    <div class="goods" >
        <menus></menus>
         <m-list  :height="listHeight" :width="listwidth" model="" :next="next" :list="merchandises" ></m-list>
    </div>
    <cart  v-if="isShowCart" @hdlShowPopup="hdlShowPopup"></cart>
    <pop-delivery v-if="isShow" @hdlHidePopup="hdlHidePopup"></pop-delivery>
  <!--   <order></order> -->
  </div>
</template>

<script>
  import MpTitle from '@/components/MpTitle';
  import PopupDelivery from './PopupDelivery';
  import Swiper from '@/components/Swiper';
  import Location from '@/components/Location';
  import FoodsList from '@/components/FoodsList';
  import Menus from '@/components/Menus';
  import Cart from '@/components/Cart'
  import Order from './Order';
  export default{
    data(){
      return{
        title:"预定商城",
        listHeight: '758rpx',
        isShow:false,
        isShowCart:true,
        activityId: 0, 
        screenHeight: ''
       
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
      'order' : Order
   },
   computed: {
      merchandises(){
        return this.$store.getters['model.activity.merchandises/list'];
      },
      currentPage () {
       let page = this.$store.state['model.activity.merchandises'].currentPage;
       return page;
      },
   },
    methods:{
      hdlShowCart:function(){
        this.isShowCart =  true;
      },
      hdlShowPopup:function(){
        this.isShow = true;
          console.log(1)
      },
      hdlHidePopup:function(){
          console.log(2)
        this.isShow = false;
      },
      next() {
        this.$command('GET_MERCHANDISE_LIST', 'model.activity.merchandises/setList', 'activity', this.activityId, this.currentPage + 1, this.pageCount);
      }
  },
  created () {
    
    this.screenHeight = (750 / wx.getSystemInfoSync().windowWidth  * wx.getSystemInfoSync().windowHeight) + 'rpx';
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