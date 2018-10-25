
<template>
  <div class="body">
    <mp-title :title="title"></mp-title>
     <mp-swiper></mp-swiper>
    <location :position="position" ></location>
    <div class="goods" >
        <menus @menusChange="menusChange"></menus>
        <m-list  :height="listHeight" :width="listwidth"  :next="next" :list="merchandises"
        :addMerchandiseToCart = "addCart"  ></m-list>
    </div>
    <cart  v-if="isShowCart" :emptyMerchandiseCart = "emptyCart"  @hdlShowOrder="jump('todaySubmitOrder')"
    :addMerchandiseToCart = "addCart"  :reduceMerchandiseToCart = "reduceCart"></cart>
    <popup v-if="isShow" @hdlHidePopup="hdlHidePopup" :position="position"></popup>
    
  </div>
</template>

<script>
  import MpTitle from '@/components/MpTitle';
  import Swiper from '@/components/Swiper';
  import FoodsList from '@/components/FoodsList';
  import Cart from '@/components/Cart';
  import Location from './Location';
  import Menus from './Menus';
  import Popup from './Popup';


  export default{
    data(){
      return{
        isShow:true,
        isShowCart:true,
        listwidth:'530rpx',
        title:"当日下单",
        screenHeight: '',
        categoryIndex:null,
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
        return this.$store.getters['model.today.merchandises/list'];
      },
      currentPage () {
       let page = this.$store.state['model.today.merchandises'].currentPage;
       return page;
      },
      storeCategoryId(){
        // console.log(this.$store.getters['model.storeCategories/storeCategoryId'](this.categoryIndex),"分类index更丰富呢")
        return this.$store.getters['model.storeCategories/storeCategoryId'](this.categoryIndex)
      }
     
    },
    watch:{
     storeCategoryId(){
      this.loadMerchandises(1);
      console.log(this.loadMerchandises(1),"loadMerchandises")
     }
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
        // console.log('加载',  this.categoryId)  
      },
      menusChange : function (index) {
        this.index = index;
        this.loadMerchandises(this.currentPage  + 1);
      },
      next() {
        this.loadMerchandises(this.currentPage  + 1);   
      },
      addCart(shopId, count,  merchandiseId){
        this.$command('ADD_MERCHANDISE_TO_CART', merchandiseId, count, shopId);
      }, 
      reduceCart(shopId, count, merchandisesId){
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
