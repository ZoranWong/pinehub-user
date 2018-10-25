<template>
  <div class="body">
    <mp-title :title="title"></mp-title>
    <new-list @show-cart ="hdlShowCart" :next="next" :list="merchandises" :height="screenHeight"
     :addMerchandiseToCart = "addCart" :reduceMerchandiseToCart = "reduceCart"></new-list>
   <!--  <cart  v-if="isShowCart" @hdlShowPopup="hdlShowPopup" :change="change" ></cart> -->
    <cart  v-if="isShowCart" @hdlShowPopup="hdlShowPopup"  :addMerchandiseToCart = "addCart"   :reduceMerchandiseToCart = "reduceCart"  :emptyMerchandiseCart = "emptyCart"></cart>
    <pop-location v-if="isShow" @hdlHidePopup="hdlHidePopup"></pop-location>
  </div>
</template>

<script>
    import MpTitle from '@/components/MpTitle';
    import NewFoods from './NewFoods';
    import Cart from '@/components/Cart'
    import PopupLocation from'./PopupLocation';
    export default{
      data(){
        return{
          title:'新品预定',
          isShow:false,
          isShowCart:true,
          activityId: 0,
          screenHeight: ''
      }
    },
    components: {
      'mp-title':MpTitle,
      'new-list':NewFoods,
      'cart': Cart,
      'pop-location':PopupLocation

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
      },
       hdlHidePopup:function(){
        this.isShow = false;
      },
      next() {
        this.$command('GET_MERCHANDISE_LIST', 'model.activity.merchandises/setList', 'activity', this.activityId, this.currentPage + 1, this.pageCount);
      },
      addCart(shopId, count,  merchandiseId){
        this.$command('ADD_MERCHANDISE_TO_CART', merchandiseId, count, shopId);
      },
      reduceCart(shopId, count,  merchandiseId){
        this.$command('REDUCE_MERCHANDISE_TO_CART', merchandiseId, count, shopId);
      },
      emptyCart(storeId){
        this.$command('EMPTY_MERCHANDISES_TO_CART',storeId);
      }
   },
   created () {

    this.screenHeight = (750 / wx.getSystemInfoSync().windowWidth  * wx.getSystemInfoSync().windowHeight) + 'rpx';
   }
}

</script>

<style scoped>

</style>
