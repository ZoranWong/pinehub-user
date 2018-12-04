<template>
    <div id="userOrders" class = "body">
        <mp-title :title="title"></mp-title>
        <div id="tab_select">
            <ul>
                <li :test="test" v-for="(tab,index) in tabs" :class="{tab_select_now:cur === index}" :style="{width:tabNumWidth}" :key="index" @click="tabSelect(index)"><span>{{tab.name}}</span></li>
            </ul>
        </div>
        <div id="tab_content">
            <orders :screenHeight = "screenHeight" :load-orders="loadOrders" :status="statusType" :orders="orders" :next="next"></orders>
        </div>
        <div id="footNavHeight"></div>
        <footer-nav :navName="navName"></footer-nav>
    </div>
</template>

<script>
import UserOrders from './UserOrders';
import MpTitle from '@/components/MpTitle';
import FooterNav from '@/components/FooterNav';
export default {
    components: {
        'mp-title': MpTitle,
        'orders': UserOrders,
        'footer-nav': FooterNav
    },
    data () {
        return {
            title: '我的订单',
            navName: 'order',
            tabs: [{
                name: '全部'
            }, {
                name: '未完成'
            }, {
                name: '已完成'
            }],
            cur: 0,
            statusType: 'all',
            screenHeight: 0
        };
    },
    watch: {
        test (nv, ov) {
            if (nv && nv !== ov) {}
        }
    },
    computed: {
        tabNumWidth () {
            let num = this.tabs.length
            num = (typeof num === 'undefined') ? 1 : num;
            return Math.floor((100 / num) * 100) / 100 + '%';
        },
        orders () {
            return this.$store.getters['model.user.orders/list'];
        },
        totalNum () {
            return this.$store.getters['model.user.orders/totalNum'];
        },
        currentPage () {
            let page = this.$store.getters['model.user.orders/currentPage'];
            return page;
        }
    },
    methods: {
        loadOrders (status) {
            this.$store.dispatch('model.user.orders/reset');
            this.$command('LOAD_USER_ORDERS', status);
        },
        tabSelect (num) {
            this.cur = num;
            switch (num) {
                case 0:
                this.statusType = 'all';
                break;
                case 1:
                this.statusType = 'success';
                break;
                case 2:
                this.statusType = 'completed';
                break;
                default:
                this.statusType = 'all';
                break;
            }
            this.loadOrders(this.statusType);
        },
        async next () {
            console.log('__________ next page  ________');
            await this.$command('LOAD_USER_ORDERS', this.statusType, this.currentPage + 1, this.pageCount);
        }
    },
    created () {
        this.screenHeight = (750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight);
    }
}
</script>

<style>
page {
    height: 100%;
    background: #fafafa;
}

#footNavHeight {
    height: 109rpx;
}

#userOrders {
    position: relative;
}

#tab_select {
    overflow: hidden;
    width: 750rpx;
    height: 74rpx;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
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
    padding-top: 74rpx;
}

.tab_content_item {
    display: none;
}

.tab_content_now {
    display: block;
}
</style>
