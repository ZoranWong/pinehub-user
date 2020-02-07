<!--suppress ALL -->
<template>
    <div id="virusTopic">
        <CustomHeader :title="title" :needReturn="true" :backColor="'#F5F5F5'" />
        <div class="virusTopicContainer" :style="{'height': (screenHeight - statusBarHeight - navHeight - 84) + 'rpx'}">
            <img src="./img/Banner-02.png" alt="" class="vBanner">
            <div class="vContent">
                <div class="vGuide">
                    <h3 class="guideTitle">预定指南</h3>
                    <ul class="guideList">
                        <li class="guideListItem" @click="redirectTo('user.store')">
                            <div class="guideLeft">
                                <img src="./img/Circle.png" alt="" class="guideCircle">
                                <span class="guideListTitle titleHeavy">新冠肺炎流行期间，全员宅家采购不便?</span>
                                <img src="./img/Hot.png" class="hot" alt="">
                            </div>
                            <img src="./img/Right_arrow.png" alt="" class="guideArrow">
                        </li>
                        <li class="guideListItem" @click="redirectTo('user.store')">
                            <div class="guideLeft">
                                <img src="./img/Circle.png" alt="" class="guideCircle">
                                <span class="guideListTitle">小区或街道有确诊病例，整体隔离无法出门？</span>
                            </div>
                            <img src="./img/Right_arrow.png" alt="" class="guideArrow">
                        </li>
                        <li class="guideListItem" @click="redirectTo('user.store')">
                            <div class="guideLeft">
                                <img src="./img/Circle.png" alt="" class="guideCircle">
                                <span class="guideListTitle">每天方便面的日子实在受不了了！</span>
                            </div>
                            <img src="./img/Right_arrow.png" alt="" class="guideArrow">
                        </li>
                        <li class="guideListItem" @click="redirectTo('user.store')">
                            <div class="guideLeft">
                                <img src="./img/Circle.png" alt="" class="guideCircle">
                                <span class="guideListTitle">预防新型肺炎的全员自闭大法，主食进社区！</span>
                            </div>
                            <img src="./img/Right_arrow.png" alt="" class="guideArrow">
                        </li>
                    </ul>
                </div>
                <div class="sendHome">
                    <h3 class="sendHomeTitle">安全食品送到家</h3>
                </div>
                <div class="orderMainProduct">
                    <img src="./img/Banner-03.png" alt="" class="mainProductBanner">
                    <h3 class="mainProductTitle">青松主食敬请挑选次日送达：</h3>
                    <ul class="products">
                        <li class="product">
                            <img src="../../../../static/icons/school.png" alt="" class="productImg">
                            <span class="productName">小白面馒头</span>
                        </li>
                        <li class="product">
                            <img src="../../../../static/icons/school.png" alt="" class="productImg">
                            <span class="productName">北海道纯蛋糕</span>
                        </li>
                        <li class="product">
                            <img src="../../../../static/icons/school.png" alt="" class="productImg">
                            <span class="productName">奶棒</span>
                        </li>
                    </ul>
                </div>

                <div class="orderOtherProduct">
                    <div class="orderOtherProductTop">
                        <div class="left">
                            <h3 class="otherProductTitle">经典主食系列</h3>
                            <h3 class="otherProductDesc">不怕挨饿</h3>
                        </div>
                        <span class="more" @click="redirectTo('user.store')">
                            查看更多
                            <img class="whiteArrow" src="./img/White_right_arrow.png" alt="">
                        </span>
                    </div>
                    <ul class="products">
                        <li class="product">
                            <img src="../../../../static/icons/school.png" alt="" class="productImg">
                            <span class="productName">小白面馒头</span>
                        </li>
                        <li class="product">
                            <img src="../../../../static/icons/school.png" alt="" class="productImg">
                            <span class="productName">北海道纯蛋糕</span>
                        </li>
                        <li class="product">
                            <img src="../../../../static/icons/school.png" alt="" class="productImg">
                            <span class="productName">奶棒</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import CustomHeader from '../../../components/CustomHeader';

    export default {
        components: {
			CustomHeader,
        },
        data () {
            return {
                title: '抗击疫情预定主食',
                screenHeight: 0,
                rpxRate: 1,
                screenWitdh: 0,
            };
        },
        computed: {
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            }
        },
        watch: {

        },
        methods: {
            redirectTo (router, options) {
                this.$command('REDIRECT_TO', router, 'push', options);
            }
        },
        created () {
            this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
            this.screenWitdh = wx.getSystemInfoSync().windowHeight;
            this.screenHeight = (this.rpxRate * this.screenWitdh);
        },
        mounted () {

		}
    }
</script>

<!--suppress CssInvalidPropertyValue -->
<style>
    page {
        background: #C7EFE4;
    }
    @import "./index.css";
</style>
