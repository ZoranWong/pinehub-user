<template>
    <div class="body">
        <mp-title :title="title"></mp-title>
        <div class="trade-list">
            <div v-if="empty"  class = "empty-background">
                <div class="background-box">
                    <img class="empty-trade" src="../../../../static/images/empty_order.png" />
                </div>
                <div class="desc">亲，您还没有记录哦～</div>
            </div>
        </div>
    </div>
</template>
<script>
    import MpTitle from '@/components/MpTitle';
    export default {
        name: 'TradeDetail',
        data: function () {
          return {
              title: '交易明细',
              empty: true
          };
        },
        components: {
            'mp-title': MpTitle
        }
    }
</script>
<style>
    .body{
        background-color: #f2f2f2;
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
</style>
