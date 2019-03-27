<template>
    <div id="status">
        <store-editor :merchandise="merchandise" :display="display" @close="closeStockPanel"
                      @modifyStock="modifyStock"/>
        <mp-title :title="title"/>
        <div id="tab_select">
            <ul>
                <li v-for="(tab, index) in tabs" :class="{tab_select_now:currentTab === index}"
                    :style="{width:tabNumWidth}" :key="index" @click="tabSelect(index)">
                    <span>{{tab.name}}</span>
                </li>
            </ul>
        </div>
        <div id="tab_content">
            <div class="tab_content_item store-orders" v-if="currentTab === 0">
                <merchandises @showStockEditor="showStockEditor" :onLoadCategory="onLoadCategory"
                              :changeCategory="changeCategory"/>
            </div>
            <div class="tab_content_item purchase-orders" v-if="currentTab === 1">
                <sales :salesInfo="salesInfo" :onLoadSales="onLoadSales" :onLoadSalesEChart="onLoadSalesEChart"/>
            </div>
            <div class="tab_content_item sales-orders" v-if="currentTab === 2">
                <purchase-order :onLoadPurchase="onLoadPurchase"/>
            </div>
        </div>
        <div id="footNav_height"></div>
        <footer-nav :navName="navName"/>
    </div>
</template>

<script>
    import StockEditor from './StockEditor';
    import Sales from './Sales';
    import PurchaseOrders from './PurchaseOrders';
    import StoreMerchandises from './StoreMerchandises';
    import MpTitle from '@/components/MpTitle';
    import FooterNav from '@/components/FooterNav';

    export default {
        components: {
            'mp-title': MpTitle,
            'sales': Sales,
            'purchase-order': PurchaseOrders,
            'merchandises': StoreMerchandises,
            'store-editor': StockEditor,
            'footer-nav': FooterNav
        },
        data () {
            return {
                title: '店铺状态',
                navName: 'my',
                tabs: [{
                    name: '库存统计'
                }, {
                    name: '销售统计'
                }, {
                    name: '进货统计'
                }],
                currentTab: 0,
                merchandise: {},
                display: false
            };
        },
        computed: {
            tabNumWidth () {
                let num = this.tabs.length
                num = (typeof num === 'undefined') ? 1 : num;
                return Math.floor((100 / num) * 100) / 100 + '%';
            },
            categoryIndex () {
                return this.$store.getters['model.merchant.store.merchandises/currentCategoryIndex'];
            },

            salesInfo () {
                return this.$store.getters['model.salesInfo/sales'];
            },
            categoryId () {
                return this.$store.getters['model.merchant.store.categories/categoryId'](this.categoryIndex);
            },
            store () {
                return this.$store.getters['model.account/shopInfo'];
            }
        },
        methods: {
            tabSelect (num) {
                this.currentTab = num;
            },
            showStockEditor (merchandise) {
                this.display = true;
                this.merchandise = merchandise;
            },
            closeStockPanel () {
                this.display = false;
            },
            modifyStock (index, id, primaryStockNum, modifyStockNum, reason, comment) {
                this.$command('UPDATE_MERCHANDISE_STOCK', index, id, primaryStockNum, modifyStockNum, reason, comment);
            },
            onLoadPurchase (status) {
                // 库存统计
                this.$command('LOAD_STORE_PURCHASE_ORDER', status);
            },
            onLoadSales (status) {
                this.$command('SALES_CHARTS_UPDATE', status);
            },
            onLoadCategory (page = 1) {
                // 获取店铺产品分类
                this.$command('LOAD_MERCHANT_STORE_CATEGORIES', this.store.id, page);
            },
            onLoadSalesEChart (status) {
                this.$command('SALES_CHARTS_UPDATE', status);
            },
            changeCategory (index, categoryId) {
                this.$command('LOAD_MERCHANT_STORE_MERCHANDISES', index, categoryId);
            }
        },
        mounted () {
            this.currentTab = 0;
            this.onLoadCategory();
        }
    }
</script>

<!--suppress CssInvalidPropertyValue -->
<style>
    page {
        height: 100%;
        background: #fafafa;
    }

    #footNav_height {
        height: 109 rpx;
    }

    #status {
        position: relative;
        width: 100%;
        height: 100%;
    }

    /*noinspection ALL*/
    #tab_select {
        overflow: hidden;
        width: 750 rpx;
        height: 74 rpx;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
    }

    #tab_select ul li {
        height: 74 rpx;
        line-height: 74 rpx;
        float: left;
        background: #FFFFFF;
        text-align: center;
        font-size: 32 rpx;
        font-weight: 300;
    }

    #tab_select ul li.tab_select_now {
        color: #FECE00;
    }

    #tab_select ul li.tab_select_now span {
        display: inline-block;
        width: 68%;
        line-height: 64 rpx;
        border-bottom: 5 rpx solid #FECE00;
    }

    #tab_content {
        padding-top: 74 rpx;
    }

    .tab_content_item {
    }

    .tab_content_now {
        display: block;
    }
</style>
