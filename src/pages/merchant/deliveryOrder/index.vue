<!--suppress ALL -->
<template>
    <div id="orders">
        <mp-title :title="title"></mp-title>
        <div id="window_fixed">
            <div id="orders_select">
                <div class="orders_select_info">
                    <em>日期</em>
                    <picker mode="date" class="input" @change="getSelectDate">{{selectDate}}</picker>
                </div>
                <div class="orders_select_info">
                    <em>配送批次</em>
                    <picker @change="bindPickerChange" v-model="batch" :range="arr" :key="batch" class="input">
                        {{ arr[batch] }}
                    </picker>
                </div>

            </div>
        </div>
        <div id="tab_content">
            <div class="tab_content_item">
                <order :next="next"  :screenHeight = "screenHeight - 140" :loadOrders="loadOrders" :datetime="selectDate"></order>
            </div>
        </div>
        <div id="controlbar" v-show="false">
            <em v-if="!selectOrderToPrint" id="controlbar_select" @click="openPrintOrders">选择</em>
            <em v-if="selectOrderToPrint" id="controlbar_cancel" @click="closePrintOrders">取消</em>
            <div v-if="selectOrderToPrint" id="select_all_order" @click="printOrders">全选</div>
            <i id="print_order" @click="printOrders"></i>
        </div>
    </div>
</template>

<script>
    import Order from './Order';
    import MpTitle from '@/components/MpTitle';
    export default {
        components: {
            'mp-title': MpTitle,
            'order': Order
        },
        data () {
            return {
                title: '配送订单',
                navName: 'my',
                selectDate: (new Date()).format('yyyy-MM-dd'),
                selectOrderToPrint: false,
                arr: ['07:00-09:00', '14:00-16:00', '19:00-21:00'],
                batch: 0,
                screenHeight: 0
            };
        },
        computed: {

            currentPage () {
                let page = this.$store.getters['model.delivery.orders/currentPage'];
                return page;
            }
        },
        methods: {
            loadOrders (date, batch, page = 1, limit = 15) {
                this.$command('LOAD_DELIVERY_ORDERS', date, batch, page, limit);
            },
            getSelectDate (e) {
                this.selectDate = (new Date(e.target.value)).format('yyyy-MM-dd');
                this.loadOrders(this.selectDate, this.batch);
            },
            printOrders () {
                wx.showToast({
                    title: '目前订单不可打印',
                    icon: 'none',
                    duration: 4000
                })
            },
            openPrintOrders () {
                wx.showToast({
                    title: '目前打印不可选择',
                    icon: 'none',
                    duration: 4000
                })
                this.selectOrderToPrint = true;
            },
            closePrintOrders () {
                wx.showToast({
                    title: '打印选择正在关闭',
                    icon: 'none',
                    duration: 4000
                })
                this.selectOrderToPrint = false;
            },
            bindPickerChange (e) {
                this.batch = e.mp.detail.value;
                this.loadOrders(this.selectDate, this.batch);
            },
            next () {
                this.loadOrders(this.selectDate, this.batch, this.currentPage + 1, this.pageCount);
            }
        },
        mounted () {
            this.loadOrders(this.selectDate, this.batch);
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
        height: 140rpx;
        background: #FFFFFF;
    }

    #orders_select {
        margin: 20rpx 20rpx 0;
    }

    .orders_select_info {
        overflow: hidden;
        margin-bottom: 10rpx;
    }

    .orders_select_info em {
        display: inline-block;
        float: left;
        font-size: 32rpx;
        font-weight: normal;
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
        padding-top: 140rpx;
    }

    .tab_content_item {}

    .tab_content_now {
        display: block;
    }

    #controlbar {
        /* background: #000000; */
        background: url(../../../../static/images/icon/my_control_bar.png) no-repeat bottom center;
        background-size: 750rpx;
        height: 120rpx;
        width: 750rpx;
        position: fixed;
        bottom: 0;
        left: 0;
    }

    #controlbar_select {
        width: 150rpx;
        float: left;
        line-height: 100rpx;
        color: #FFFFFF;
        text-align: center;
        margin-top: 20rpx;
    }

    #controlbar_cancel {
        width: 150rpx;
        float: left;
        line-height: 100rpx;
        color: #FFFFFF;
        text-align: center;
        margin-top: 20rpx;
        /* display: none; */
    }

    #select_all_order {
        width: 150rpx;
        float: left;
        line-height: 100rpx;
        color: #FFFFFF;
        text-align: center;
        margin-top: 20rpx;
        /* display: none; */
    }

    #print_order {
        background: url(../../../../static/images/icon/my_print.png) no-repeat center center;
        background-size: 100%;
        width: 70rpx;
        height: 70rpx;
        position: absolute;
        top: 12rpx;
        right: 31rpx;
    }

    .goodstype {
        font-size: 32rpx;
        padding-left: 112rpx;
        border: 1rpx solid #f0f0f0;
        display: inline-block;
    }
</style>
