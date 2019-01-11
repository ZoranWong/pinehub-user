<template>
    <div class="body">
        <title :title="title"></title>
        <banner></banner>
        <div class = "merchandises">
            <categories @categoryChange="categoryChange"></categories>
            <merchandises :model="model" :width="listwidth" :next="next" :list="merchandises" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :categoryId="'store_merchandises_' + categoryId">
            </merchandises>
        </div>
        <cart :model="model" v-if="isShowCart" @hdlShowPopup="hdlShowPopup" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :clearShoppingCarts="clearShoppingCart"></cart>
        <pop-delivery v-if="isShow" @hdlHidePopup="hdlHidePopup"></pop-delivery>
    </div>
</template>

<script>
import MpTitle from '@/components/MpTitle';
import PopupDelivery from './PopupDelivery';
import Banner from '@/components/Banner';
import MerchandiseList from '@/components/MerchandiseList';
import Categories from './Categories';
import Cart from '@/components/ShoppingCarts'
export default {
    data () {
        return {
            title: '预定商城',
            isShow: false,
            isShowCart: true,
            model: 'model.bookingMall.shoppingCarts',
        }
    },
    components: {
        'pop-delivery': PopupDelivery,
        'banner': Banner,
        'categories': Categories,
        'merchandises': MerchandiseList,
        'cart': Cart,
        'title': MpTitle

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
            return this.$store.getters['model.bookingMall.categories/categoryId'](this.categoryIndex)
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
                await this.$command(
                    'LOAD_BOOKING_MALL_MERCHANDISES',
                    'model.bookingMall.merchandises/setList',
                    'bookingMerchandises',
                    this.categoryId,
                    page
                );
            } catch (e) {
                console.log(e);
            }
        },
        categoryChange: function (index) {
            try {
                this.$command('CLEAR_MODEL', 'model.bookingMall.merchandises');
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
            try {
            	console.log('可以了----------------------')
                this.$command('BOOKING_MALL_SHOPPINGCART_CLEAR_MERCHANDISES');
            } catch (e) {
                console.log(e);
            }
        },
        async initData () {
            this.$store.dispatch('model.bookingMall.merchandises/setCurrentCategory', {categoryIndex: -1});
            await this.$command('LOAD_BOOKING_MALL_CATEGORIES');
            this.categoryChange(0);
            await this.loadCartMerchandises();
        }
    },
    onShow () {
        this.isShow = false;
        this.initData();
    },
    destroyed () {
        this.$command('CLEAR_MODEL', 'model.bookingMall.merchandises');
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
