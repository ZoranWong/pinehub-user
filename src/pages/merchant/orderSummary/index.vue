<!--suppress ALL -->
<template>
    <div id="orders">
        <mp-title :title="title"></mp-title>
        <div id="window_fixed">
            <div id="order_header">
                <div class="order_header_info">
                    <em>日期</em>
                    <picker mode="date" class="input" @change="changeOrderDate">{{orderDate}}</picker>
                </div>
                <div class="order_header_info">
                    <em>类型</em>
                    <picker @change="bindPickerChange" v-model="index" :range="orderTypeCollection" :key="index" class="order-type">
                        {{orderTypeCollection[index]}}
                    </picker>
                </div>
            </div>
            <div id="tab_select">
                <ul>
                    <li v-for="(tab,index) in tabs" :class="{tab_select_now:cur === index}" :style="{width:tabNumWidth}" :key="index" @click="tabSelect(index)"><span>{{tab.name}}</span></li>
                </ul>
            </div>
        </div>
        <div id="tab_content">
            <div class="tab_content_item">
                <order :screenHeight = "screenHeight - 140" :next="next" :types="types" :loadOrders="loadOrders" :datetime="orderDate" :status="status"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Order from './Order';
    import MpTitle from '@/components/MpTitle';
    import {SITE_USER_ORDER, SHOPPING_MALL_ORDER, NOT_NEED_PICK_UP_METHOD} from '@/utils/OrderDict';
    export default {
        components: {
            'mp-title': MpTitle,
            'order': Order
        },
        data () {
            return {
                title: '订单汇总',
                navName: 'my',
                tabs: [{
                    name: '全部',
                    status: 'all'
                }, {
                    name: '未完成',
                    status: 'undone'
                }, {
                    name: '已完成',
                    status: 'completed'
                }],
                cur: 0,
                orderDate: (new Date()).format('yyyy-MM-dd'),
                status: 'all',
                orderTypeCollection: ['全部', '预定商品', '自提商品'],
                index: 0,
                type: NOT_NEED_PICK_UP_METHOD,
                screenHeight: 0
            };
        },
        computed: {
            tabNumWidth () {
                let num = this.tabs.length;
                num = (typeof num === 'undefined') ? 1 : num;
                return Math.floor((100 / num) * 100) / 100 + '%';
            },
            currentPage () {
                return this.$store.getters['model.summary.orders/currentPage'];
            }

        },
        methods: {
            loadOrders (orderDate, type, status, page = 1, limit = 15) {
                this.$command('LOAD_SUMMARY_ORDERS', orderDate, type, status, page, limit);
            },
            tabSelect (num) {
                this.cur = num;
                this.status = this.tabs[num].status;
                this.loadOrders(this.orderDate, this.type, this.status);
            },
            changeOrderDate (e) {
                this.orderDate = (new Date(e.target.value)).format('yyyy-MM-dd');
                this.loadOrders(this.orderDate, this.type, this.status)
            },
            bindPickerChange (e) {
                this.index = e.mp.detail.value;
                if (this.index === 0) {
                    this.type = null;
                } else if (this.index === 1) {
                    this.type = SHOPPING_MALL_ORDER;
                } else {
                    this.type = SITE_USER_ORDER;
                }
                this.loadOrders(this.orderDate, this.type, this.status)
            },
            next () {
                this.loadOrders(this.orderDate, this.type, this.status, this.currentPage + 1, this.pageCount);
            }
        },
        mounted () {
            this.status = 'all';
            this.loadOrders(this.orderDate, this.type, this.status);
        },
        created () {
            this.screenHeight = (750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight);
        }
    }
</script>

<style scoped>
    #orders {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #fafafa;
    }

    #window_fixed {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        overflow: hidden;
        width: 750rpx;
        height: 216rpx;
        background: #FFFFFF;
    }

    #order_header {
        margin: 20rpx 20rpx 0;
        font-weight: 300;
    }

    .order_header_info {
        overflow: hidden;
        margin-bottom: 10rpx;
    }

    .order_header_info em {
        display: inline-block;
        float: left;
        font-size: 32rpx;
    }

    .input {
        float: left;
        padding: 0 15rpx;
        margin: 0 20rpx;
        border: 1rpx solid #f0f0f0;
        border-radius: 10rpx;
        font-size: 28rpx;
    }

    #tab_select {
        overflow: hidden;
        width: 750rpx;
        height: 74rpx;
    }

    #tab_select ul li {
        height: 74rpx;
        line-height: 74rpx;
        float: left;
        background: #FFFFFF;
        text-align: center;
        font-size: 32rpx;
        font-weight: 300;
    }

    #tab_select ul li.tab_select_now {
        color: #FECE00;
    }

    #tab_select ul li.tab_select_now span {
        display: inline-block;
        width: 68%;
        line-height: 64rpx;
        border-bottom: 5rpx solid #FECE00;
    }

    #tab_content {
        padding-top: 220rpx;
    }

    .tab_content_item {}

    .tab_content_now {
        display: block;
    }

    .order-type {
        font-size: 32rpx;
        padding-left: 102rpx
    }
</style>
