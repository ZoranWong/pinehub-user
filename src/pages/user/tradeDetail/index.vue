<template>
    <div class="body">
        <CustomHeader :title="title" :needReturn="true" />

        <div class="trade-list">
            <div v-if="empty"  class = "empty-background">
                <div class="background-box">
                    <img class="empty-trade" src="../../../../static/images/empty_order.png" />
                </div>
                <div class="desc">亲，您还没有记录哦～</div>
            </div>
            <ul v-else class="trade-orders">
                <item v-for="(order, k) in orders" :key ="k" :order = "order"></item>
            </ul>
        </div>
    </div>
</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';

	import OrderItem from './OrderItem';
    export default {
        name: 'TradeDetail',
        data: function () {
          return {
              title: '交易明细'
          };
        },
        components: {
			CustomHeader,
            item: OrderItem
        },
        computed: {
            orders () {
                return this.$store.getters['model.tradeOrderItems/list'];
            },
            empty () {
                return this.$store.getters['model.tradeOrderItems/list'].length === 0;
            }
        },
        mounted () {
            console.log('======================');
            this.$command('LOAD_TRADE_ORDER_ITEMS');
        }
    }
</script>
<style>
    .body{
        background-color: #f2f2f2;
        height: 100%;
        width: 100%;
        overflow: auto;
    }
    .empty-trade{
        width: 390rpx;
        height: 355rpx;
        margin-top: 246rpx;
        margin-left: 180rpx;
    }
    .empty-background .desc{
        text-align: center;
        margin-top: 60rpx;
        font-size: 32rpx;
        color: #757575;
    }
    .trade-orders {
        margin-top: 20rpx;
    }
</style>
