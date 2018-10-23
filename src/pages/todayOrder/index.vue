<template>
  <div class="body">
    <mp-title :title="title"></mp-title>
     <mp-swiper></mp-swiper>
    <location ></location>
  <!--   <div style="" @click="location">哈哈哈</div> -->
    <div class="goods" >
      <menus @menusChange="menusChange"></menus>
      <m-list  :height="listHeight" :width="listwidth"  :next="next" :list="merchandises"
      :addMerchandiseToCart = "addCart"  ></m-list>
    </div>
    <popup v-if="isShow" @hdlHidePopup="hdlHidePopup"></popup>
    <cart  v-if="isShowCart"></cart>
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
        isShow:false,
        isShowCart:true,
        listHeight: '718rpx',
        listwidth:'530rpx',
        title:"当日下单",
        screenHeight: ''
      }
    },
    components: {
      'popup': Popup,
      'mp-swiper': Swiper,
      'location': Location,
      'menus': Menus,
      'm-list': FoodsList,
      'cart': Cart,
      'mp-title': MpTitle,
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
        this.isShowCart = true;
      },
      hdlShowPopup:function(){
        this.isShow = true;
      },
       hdlHidePopup:function(){
        this.isShow = false;
      },
      menusChange : function (index) {
        console.log(index);
      },
      next() {
        this.$command('GET_MERCHANDISE_LIST', 'model.activity.merchandises/setList', 'activity', this.activityId, this.currentPage + 1, this.pageCount);
      },
      addCart(shopId, count,  merchandiseId){
        this.$command('ADD_MERCHANDISE_TO_CART', merchandiseId, count, shopId);
        console.log( this.count, "987", this.merchandiseId)
      },
    
      // reduceCart(shopId, count, merchandisesId){
      //   this.$command('REDUCE_MERCHANDISE_TO_CART',merchandiseId,count, shopId);
      // }

  },
   created(){
      // this.$command('GET_MERCHANDISE_LIST','today', 1, 1);
      // console.log('created mm');
      console.log('store', this.$store);
    this.screenHeight = (750 / wx.getSystemInfoSync().windowWidth  * wx.getSystemInfoSync().windowHeight) + 'rpx';

   },
   mounted(){
    this.$command('GET_NEAREST_STORE');
    
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
