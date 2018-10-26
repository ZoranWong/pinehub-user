<template>
  <div class="body">
    <mp-title :title="title"></mp-title>
    <mp-swiper></mp-swiper>
    <div class="goods" >
        <menus @menusChange="menusChange"></menus>
        <m-list
          :height="listHeight"
          :width="listwidth"
          model=""
          :next="next"
          :list="merchandises"
          :addMerchandiseToCart = "addCart"
          :reduceMerchandiseToCart = "reduceCart"
          :categoryId="categoryId">
        </m-list>
    </div>
    <cart  v-if="isShowCart" @hdlShowPopup="hdlShowPopup"   :emptyMerchandiseCart = "emptyCart"
    :addMerchandiseToCart = "addCart"   :reduceMerchandiseToCart = "reduceCart"></cart>
    <pop-delivery v-if="isShow" @hdlHidePopup="hdlHidePopup"></pop-delivery>
  </div>
</template>

<script>
  import MpTitle from '@/components/MpTitle';
  import PopupDelivery from './PopupDelivery';
  import Swiper from '@/components/Swiper';
  import MerchandiseList from '@/components/MerchandiseList';
  import Menus from './Menus';
  import Cart from '@/components/Cart'
  export default{
    data(){
      return{
        title:"预定商城",
        isShow:false,
        isShowCart:true,
        activityId: 0,
        screenHeight: ''
      }
    },
    components: {
      'pop-delivery': PopupDelivery,
      'mp-swiper': Swiper,
      'menus': Menus,
      'm-list': MerchandiseList,
      'cart': Cart,
      "mp-title": MpTitle,

   },
    computed: {
      merchandises(){
        return this.$store.getters['model.reserveShop.merchandises/list'];
      },
      currentPage () {
       let page = this.$store.state['model.reserveShop.merchandises'].currentPage;
       return page;
      },
      categoryId() {
        return this.$store.getters['model.categories/categoryId'](this.categoryIndex)
      },
      categoryIndex() {
        return this.$store.getters['model.reserveShop.merchandises/currentCategoryIndex'];
      }
   },
   watch: {
     categoryId(n, o) {
        if(n && !o ) {
          this.loadMerchandises(1);
        }
        console.log(this.categoryId,"mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
      }
   },
    methods:{
      hdlShowCart:function(){
        this.isShowCart =  false;
      },
      hdlShowPopup:function(){
        this.isShow = true;

      },
      hdlHidePopup:function(){
        this.isShow = false;
      },
      loadMerchandises(page) {
        console.log('scrollTop number', this.scrollTop);
        this.$command('GET_MERCHANDISE_LIST',
         'model.reserveShop.merchandises/setList',
         'bookingMerchandises',
          this.categoryId,
          page);
      },
       menusChange : function (index) {
        this.$command('CLEAR_MERCHANDISE', 'model.reserveShop.merchandises');
        this.$store.dispatch('model.reserveShop.merchandises/setCurrentCategory', {categoryIndex: index});
        this.loadMerchandises(1);
      },
      next() {
        this.loadMerchandises(this.currentPage + 1);
      },
      addCart(shopId, count,  merchandiseId){
        this.$command('ADD_MERCHANDISE_TO_CART', merchandiseId, count, shopId);

      },
      reduceCart(shopId, count, merchandiseId){
        this.$command('REDUCE_MERCHANDISE_TO_CART',merchandiseId,count, shopId);
      },
      emptyCart(storeId){
        this.$command('EMPTY_MERCHANDISES_TO_CART',storeId);
      }
    },
    created () {
      this.screenHeight = (750 / wx.getSystemInfoSync().windowWidth  * wx.getSystemInfoSync().windowHeight) + 'rpx';
   },
   mounted(){
      this.$command('GET_CATEGORIES_TO_MEUN');
   }
}
</script>

<style scoped>

.goods{
  display: flex;
  width:100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  height: 100%;
  background: #f2f2f2;
}
</style>
