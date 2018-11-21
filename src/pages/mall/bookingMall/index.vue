<template>
  <div class="body">
    <mp-title :title="title"></mp-title>
    <mp-swiper></mp-swiper>
    <div class = "merchandises">
      <menus @menusChange="menusChange"></menus>
      <m-list :model="model" :width="listwidth" :next="next" :list="merchandises" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :categoryId="'store_merchandises_' + categoryId">
      </m-list>
    </div>
    <cart :model="model" v-if="isShowCart" @hdlShowPopup="hdlShowPopup" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :clearShoppingCart="clearShoppingCart"></cart>
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
  export default {
    data () {
      return {
        title: '预定商城',
        isShow: false,
        isShowCart: true,
        model: 'model.bookingMall.shoppingCarts'
      }
    },
    components: {
      'pop-delivery': PopupDelivery,
      'mp-swiper': Swiper,
      'menus': Menus,
      'm-list': MerchandiseList,
      'cart': Cart,
      'mp-title': MpTitle

    },
    computed: {
      merchandises () {
        return this.$store.getters['model.bookingMall.merchandises/list'];
      },
      currentPage () {
        let page = this.$store.getters['model.bookingMall.merchandises/currentPage'];
        return page;
      },
      categoryId () {
        console.log('~~~~~~~~~~~~~~~~~~~~ category index ~~~~~~~~~~~~~', this.categoryIndex);
        return this.$store.getters['model.categories/categoryId'](this.categoryIndex)
      },
      categoryIndex () {
        return this.$store.getters['model.bookingMall.merchandises/currentCategoryIndex'];
      },
      isLoadedAll () {
        return this.$store.getters['model.bookingMall.merchandises/isLoadedAll'];
      }
    },
    watch: {
      categoryId (n, o) {
        console.log('---------------------- change category id----------------------', n, o);
        if (n && n !== o) {
          this.loadMerchandises();
        }
      }
    },
    methods: {
      hdlShowCart: function () {
        this.isShowCart = false;
      },
      hdlShowPopup: function () {
        this.isShow = true;
      },
      hdlHidePopup: function () {
        this.isShow = false;
      },
      async loadMerchandises (page = 1) {
        try {
          console.log('---------------------- load merchandise ----------------------', this.categoryIndex, this.categoryId);
          await this.$command('LOAD_BOOKING_MALL_MERCHANDISES',
            'model.bookingMall.merchandises/setList',
            'bookingMerchandises',
            this.categoryId,
            page);
        } catch (e) {
          console.log(e);
        }
      },
      menusChange: function (index) {
        try {
          this.$command('CLEAR_MERCHANDISE', 'model.bookingMall.merchandises');
          this.$store.dispatch('model.bookingMall.merchandises/setCurrentCategory', {
            categoryIndex: index
          });
        } catch (e) {
          console.log(e);
          return false;
        }
      },
      async loadCartMerchandises (page = 1) {
        try {
          await this.$command('BOOKING_MALL_SHOPPINGCART_LOAD_MERCHANDISES', page)
        } catch (e) {
          console.log('抛出异常', e);
          return false;
        }
      },
      next () {
        if (!this.isLoadedAll) {
          this.loadMerchandises(this.currentPage + 1);
        }
      },
      addCart (merchandiseId, id = null) {
        let count = this.$store.getters['model.bookingMall.shoppingCarts/quality'](merchandiseId) + 1;
        this.$command('BOOKING_MALL_SHOPPINGCART_CHANGE_MERCHANDISE', merchandiseId, id, count);
      },
      reduceCart (merchandiseId, id = null) {
        let count = this.$store.getters['model.bookingMall.shoppingCarts/quality'](merchandiseId) - 1;
        this.$command('BOOKING_MALL_SHOPPINGCART_CHANGE_MERCHANDISE', merchandiseId, id, count);
      },
      clearShoppingCart () {
        console.log('清空购物车')
        try {
          this.$command('BOOKING_MALL_SHOPPINGCART_CLEAR_MERCHANDISES');
        } catch (e) {
          console.log(e);
        }
      },
      async initData () {
        await this.$command('GET_BOOKING_MALL_CATEGORIES');
        this.menusChange(0);
      }
    },
    mounted () {
      console.log('mounted booking mall ###################');
      this.$store.dispatch('model.bookingMall.merchandises/setCurrentCategory', {
        categoryIndex: -1
      });
      this.initData();
      this.loadCartMerchandises();
    }
  }
</script>

<style scoped>
  .merchandises {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    height: 100%;
    background: #f2f2f2;
  }
</style>
