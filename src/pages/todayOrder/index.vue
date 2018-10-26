
<template>
  <div class="body">
    <mp-title :title="title"></mp-title>
     <mp-swiper></mp-swiper>
    <location :position="position" ></location>
    <div class="goods" >
        <menus @menusChange="menusChange"></menus>
        <m-list
         :height="listHeight"
         :width="listwidth"
         :next="next"
         :list="merchandises"
         :categoryId = "categoryId"
         :addMerchandiseToCart = "addCart"
         :reduceMerchandiseToCart = "reduceCart" >
       </m-list>
    </div>
    <cart  v-if="isShowCart" :emptyMerchandiseCart = "emptyCart" @hdlShowOrder="jump('todaySubmitOrder')"
        :addMerchandiseToCart = "addCart"   :reduceMerchandiseToCart = "reduceCart" ></cart>
    <popup v-if="isShow" @hdlHidePopup="hdlHidePopup" :position="position"></popup>

  </div>
</template>

<script>
  import MpTitle from '@/components/MpTitle';
  import Swiper from '@/components/Swiper';
  import MerchandiseList from '@/components/MerchandiseList';
  import Cart from '@/components/Cart';
  import Location from './Location';
  import Menus from './Menus';
  import Popup from './Popup';
  export default{
    data(){
      return{
        isShow: true,
        isShowCart: true,
        listwidth: '530rpx',
        title: "当日下单",
        screenHeight: ''
      };
    },
    components: {
      'popup': Popup,
      'mp-swiper': Swiper,
      'location': Location,
      'menus': Menus,
      'm-list': MerchandiseList,
      'cart': Cart,
      'mp-title': MpTitle,
   },
    computed: {
      merchandises(){
        return this.$store.getters['model.today.merchandises/list'];
      },
      currentPage () {
       let page = this.$store.state['model.today.merchandises'].currentPage;
       return page;
      },
      categoryId(){
        return this.$store.getters['model.storeCategories/storeCategoryId'](this.categoryIndex)
      },
      categoryIndex() {
        return this.$store.getters['model.reserveShop.merchandises/currentCategoryIndex'];
      }
    },
    watch:{
      categoryId(n, o) {
         if(n && !o ) {
           this.loadMerchandises(1);
         }
       },
    },
    methods:{
      jump(router){
        this.$command('router',router,'push');
      },
      hdlShowCart:function(){
        this.isShowCart = true;
      },
      hdlShowPopup:function(){
        this.isShow = true;
      },
       hdlHidePopup:function(){
        this.isShow = false;
      },
      loadMerchandises(page){
        this.$command('GET_MERCHANDISE_LIST',
          'model.today.merchandises/setList',
          'today',
          this.storeId,
          this.categoryId,
          page);
      },
      menusChange : function (index) {
        this.scrollTop = 0;
        this.$command('CLEAR_MERCHANDISE', 'model.today.merchandises');
        this.$store.dispatch('model.today.merchandises/setCurrentCategory', {categoryIndex: index});
        this.loadMerchandises(1);
      },
      next() {
        console.log('current page', this.currentPage);
        this.loadMerchandises(this.currentPage  + 1);
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
   created(){
      this.screenHeight = (750 / wx.getSystemInfoSync().windowWidth  * wx.getSystemInfoSync().windowHeight) + 'rpx';
      this.$command('GET_NEAREST_STORE');

   },
   mounted(){
      this.$command('GET_STORE_CATEGORIES_TO_MEUN');
   }
}
</script>

<style scoped>

.goods{
  display: flex;
  width:100%;
  overflow: hidden;
  box-sizing: border-box;
  height: 100%;
  background: #f2f2f2;
}
</style>
