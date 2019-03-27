<!--suppress ALL -->
<template>
    <div id="store">
        <div id="store_total">
            <em>库存统计</em>
            <font>(每日14:00更新数据)</font>
        </div>
        <div id="store_product">
            <div id="store_product_left">
                <ul>
                    <li v-for="(category, index) in categories"
                        :class="{store_tab_select_now: currentCategoryIndex === index}"
                        @click="changeCategory(index, category['id'])" :key="index">{{category.name}}
                    </li>
                </ul>
            </div>
            {{nowBtnIndex}}
            <div id="store_product_right">
                <scroll-view class="store_product_list">
                    <div v-for="item in storeMerchandises" :key="item.id" class="store_product_list_li">
                        <em>{{item.name}}<i>￥{{item.sellPrice}}</i></em>
                        <em>{{item.code}}<i class="num_change"
                                            @click="showStockEditor(item)">{{item.stockNum}}个</i></em>
                    </div>
                </scroll-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Store',
        props: {
            onLoadCategory: {
                default: '',
                type: Function
            },
            changeCategory: {
                default: '',
                type: Function
            }
        },
        data() {
            return {
                selectDate: ['今日', '本周', '本月']
            }
        },
        computed: {
            categories() {
                console.log('A');
                return this.$store.getters['model.merchant.store.categories/list'];
            },
            currentCategoryIndex() {
                return this.$store.getters['model.merchant.store.merchandises/currentCategoryIndex'];
            },
            storeMerchandises() {
                return this.$store.getters['model.merchant.store.merchandises/list'];
            }
        },
        methods: {
            showStockEditor(merchandise) {
                this.$emit('showStockEditor', merchandise);
            }
        },
        mounted() {
            this.onLoadCategory();
        }
    }
</script>

<style scoped>
    #store {
        position: relative;
    }

    #select_date {
        margin: 20 rpx;
        padding: 6 rpx 20 rpx;
        line-height: 52 rpx;
        background: #FFFFFF;
        border-radius: 10 rpx;
        box-shadow: 0 rpx 9 rpx 20 rpx rgba(204, 202, 202, .6);
        position: relative;
        display: none;
    }

    #select_date_ranges {
        font-size: 28 rpx;
        font-weight: 300;
    }

    #select_date_arrow {
        position: absolute;
        right: 20 rpx;
        top: 22 rpx;
        height: 20 rpx;
        width: 20 rpx;
        background: url(../../../../static/images/icon/select_arrow.png) no-repeat center center;
        background-size: 90%;
    }

    #store_total {
        margin: 20 rpx;
        padding: 6 rpx 20 rpx;
        line-height: 52 rpx;
        background: #FFFFFF;
        border-radius: 10 rpx;
        box-shadow: 0 rpx 9 rpx 20 rpx rgba(204, 202, 202, .6);
        font-size: 28 rpx;
        font-weight: 300;
    }

    #store_total em {
        display: inline-block;
        font-weight: 400;
        padding-right: 10 rpx;
    }

    #store_total font {
        display: inline-block;
        color: #999999;
        font-size: 26 rpx;
    }

    #store_total i {
        /*display: inline-block;*/
        display: none;
        float: right;
        color: #828282;
    }

    #store_product {
        margin: 20 rpx;
        font-size: 28 rpx;
        font-weight: 300;
    }

    #store_product_left {
        width: 130 rpx;
        float: left;
        background: #FFFFFF;
        border-radius: 0 20 rpx 20 rpx 0;
        overflow: hidden;
        box-shadow: 0 rpx 9 rpx 20 rpx rgba(204, 202, 202, .6);
    }

    #store_product_left ul li {
        line-height: 118 rpx;
        text-align: center;
        border-bottom: 1 rpx solid #FCFCFC;
        font-weight: 400;
    }

    #store_product_right {
        float: right;
        width: 570 rpx;
    }

    .store_product_list_li {
        background: #FFFFFF;
        padding: 10 rpx 20 rpx;
        border-radius: 10 rpx;
        box-shadow: 0 rpx 4 rpx 10 rpx rgba(204, 202, 202, .3);
        margin-bottom: 10 rpx;
    }

    .store_product_list_li em {
        line-height: 54 rpx;
        font-weight: 400;
        color: #111111;
    }

    .store_product_list_li em i {
        float: right;
        padding-left: 50 rpx;
    }

    .store_product_list_li em i.num_change {
        background: url(../../../../static/images/icon/my_product_num_change.png) no-repeat 10 rpx center;
        background-size: 26 rpx;
    }

    .store_tab_select_now {
        color: #FECE00;
        border-left: 10 rpx solid #FECE00;
    }
</style>
