<!--suppress ALL -->
<template>
    <div id="sales">
        <div id="select_date">
            <picker :range="selectDate" :value="nowSelectDate" id="select_date_ranges" @change="selectDateNow">{{selectDate[nowSelectDate]}}</picker>
            <i id="select_date_arrow"></i>
        </div>
        <div id="sales_charts">
            <wx-charts :unit="unit" :options='wxOptions' :canvasId = "chart3"></wx-charts>
        </div>
        <div id="sales_total">
            <div class="sales_total_style sales_total_all">销售总额<em>{{salesInfo['total_order_amount']}}</em></div>
            <div class="sales_total_style sales_total_booking">预订产品<em>{{salesInfo['booking_order_total_payment_amount']}}</em></div>
            <div class="sales_total_style sales_total_site">站点产品<em>{{salesInfo['store_order_total_payment_amount']}}</em></div>
            <div class="sales_total_style sales_total_index">销售指数<em>{{salesInfo['sell_point']}}</em></div>
            <div class="sales_total_style sales_total_singlenum">销售单品数量<em>{{salesInfo['sell_merchandise_num']}}</em></div>
            <div class="sales_total_style sales_total_num">销售笔数<em>{{salesInfo['order_total_num']}}</em></div>
        </div>
        <div class="sales_rank">
            <div class="sales_rank_title">销售额排行/客户</div>
            <div class="sales_rank_ul">
                <ul>
                    <li v-for="item in salesInfo['consumption_ranking']" :key="index+1"><i>{{index+1}}.</i>{{item.customer_nickname}}<em>￥{{item.total_amount}}</em></li>
                </ul>
            </div>
        </div>
        <div class="sales_rank">
            <div class="sales_rank_title">销售额排行/商品</div>
            <div class="sales_rank_ul">
                <ul>
                    <li v-for="item in salesInfo['merchandise_sales_ranking']" :key="index+1"><i>{{index+1}}.</i>{{item.name}}<em>￥{{item.total_amount}}</em></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import WxCharts from '@/components/WxCharts';
    export default {
        components: {
            'wx-charts': WxCharts
        },
        name: 'Sales',
        props: {
            salesInfo: {
                default: '',
                type: Function
            },
            onLoadSales: {
                default: '',
                type: Function
            }
        },
        data () {
            return {
                nowSelectDate: 0,
                selectDate: ['今日', '本周', '本月'],
                unit: '数额'
            };
        },
        computed: {
            wxOptions () {
                return this.$store.getters['model.salesInfo/chartData'];
            }
        },
        mounted () {
            this.onLoadSales('day');
        },
        methods: {
            selectDateNow (e) {
                let num = e.target.value;
                this.nowSelectDate = num;
                if (num === 0) {
                    this.onLoadSales('day');
                } else if (num === 1) {
                    this.onLoadSales('week');
                } else {
                    this.onLoadSales('month');
                }
            }
        }
    }
</script>

<style scoped>
    #select_date {
        margin: 20rpx;
        padding: 6rpx 20rpx;
        line-height: 52rpx;
        background: #FFFFFF;
        border-radius: 10rpx;
        box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
        position: relative;
    }

    #select_date_ranges {
        font-size: 28rpx;
        font-weight: 300;
    }

    #select_date_arrow {
        position: absolute;
        right: 20rpx;
        top: 22rpx;
        height: 20rpx;
        width: 20rpx;
        background: url(../../../../static/images/icon/select_arrow.png) no-repeat center center;
        background-size: 90%;
    }

    #sales_charts {
        background: #FFFFFF;
        padding: 20rpx;
        margin: 20rpx;
        border-radius: 10rpx;
        box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
    }

    #sales_total {
        background: #FFFFFF;
        padding: 10rpx 20rpx 0;
        margin: 20rpx;
        border-radius: 10rpx;
        box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
    }

    .sales_total_style {
        color: #111111;
        font-weight: 300;
    }

    .sales_total_style em {
        display: inline-block;
        float: right;
        color: #828282;
    }

    .sales_total_all {
        font-size: 28rpx;
        margin-bottom: 20rpx;
    }

    .sales_total_booking {
        font-size: 22rpx;
        margin-bottom: 10rpx;
    }

    .sales_total_site {
        font-size: 22rpx;
        border-bottom: 1rpx solid #F0F0F0;
        padding-bottom: 10rpx;
    }

    .sales_total_index {
        font-size: 28rpx;
        border-bottom: 1rpx solid #F0F0F0;
        line-height: 66rpx;
    }

    .sales_total_singlenum {
        font-size: 28rpx;
        border-bottom: 1rpx solid #F0F0F0;
        line-height: 66rpx;
    }

    .sales_total_num {
        font-size: 28rpx;
        line-height: 66rpx;
    }

    .sales_rank {
        margin: 20rpx;
        border-radius: 10rpx;
        box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
    }

    .sales_rank_title {
        background: #FECE00;
        color: #111111;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 66rpx;
        text-indent: 20rpx;
        border-radius: 10rpx 10rpx 0 0;
    }

    .sales_rank_ul {
        background: #FFFFFF;
        padding: 10rpx 20rpx 10rpx 20rpx;
        font-size: 28rpx;
        font-weight: 300;
        border-radius: 0 0 10rpx 10rpx;
    }

    .sales_rank_ul ul li {
        line-height: 62rpx;
        border-bottom: 1rpx solid #F0F0F0;
    }

    .sales_rank_ul ul li:last-child {
        border-bottom: none;
    }

    .sales_rank_ul ul li i {
        display: inline-block;
        padding-right: 10rpx;
    }

    .sales_rank_ul ul li em {
        display: inline-block;
        float: right;
        color: #828282;
    }
</style>
