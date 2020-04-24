<!--suppress ALL -->
<template>
	<div id="groupon_list">
        <div class="tranHeader" @click="back">
            <span  class="circle" ><i class="iconfont">&#xe679;</i></span>
        </div>
        <div class="groupon_header">
            <img class="groupon_header_image" src="../images/Spell_group_banner.png" alt="">
            <SwiperNotice />
        </div>
        <div class="groupon_banner">
            <img src="../images/function.png" class="function" alt="">
        </div>
        <ul class="groupon_list">
            <li class="groupon_list_item">
                <div class="groupon_shop_info">
                    <div class="left">
                        <img class="shop_image" src="../grouponDetails/img/background.jpeg" alt="">
                        <div class="top">
                            <h3 class="shop_name">青松合伙人禹洲天玺店</h3>
                            <span class="shop_address">合肥市高新区禹洲天玺2期北门华联超市</span>
                        </div>
                    </div>
                    <div class="right">
                        <h4 class="groupon_amount">据您12.3km</h4>
                        <h4 class="groupon_amount">112人已参团</h4>
                    </div>
                </div>
                <div class="groupon_info">
                    <img src="../images/arrow.png" class="arrow" alt="">
                    <div class="groupon_info_title">
                        <h3 class="groupon_name">青松食品主食团购</h3>
                        <h4 class="groupon_status">
                            <span class="groupon_status_text">进行中</span>
                            <img class="groupon_status_arrow" src="../../../../../static/icons/rightArrow.png" alt="">
                        </h4>
                    </div>
                    <div class="groupon_products">
                        <img class="groupon_product_image" src="https://kingdomcloud.oss-cn-hangzhou.aliyuncs.com/2020/02/22/1582376604" alt="">
                        <img class="groupon_product_image" src="https://kingdomcloud.oss-cn-hangzhou.aliyuncs.com/2020/02/22/1582376604" alt="">
                        <img class="groupon_product_image" src="https://kingdomcloud.oss-cn-hangzhou.aliyuncs.com/2020/02/22/1582376604" alt="">
                    </div>
                    <ul class="groupon_purchased_info">
                        <li class="groupon_purchased_info_item">
                            <div class="left">
                                112.
                                <img class="user_ava" src="../grouponDetails/img/background.jpeg" alt="">
                                豆豆掉了
                                <span class="groupon_purchased_time">3分钟前</span>
                            </div>
                            <h4 class="user_purchased_products">
                                博士馒头（荞麦味）x1…
                            </h4>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
	</div>
</template>
<script>
    import _ from 'underscore';
    import './css/index.css'
    import SwiperNotice from "../components/SwiperNotice";

	export default {
		components: {
            SwiperNotice
		},
		data() {
			return {

			};
		},
		watch: {

		},
		computed: {

		},
		methods: {
            back(){
                this.$command('REDIRECT_TO','','back')
            },
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style>
	page {
		height: 100%;
        overflow: hidden;
        background: #F2F2F2;
	}

    .tranHeader{
        position: fixed;
        left: 20rpx;
        top: 100rpx;
        z-index: 10000;
    }

    .tranHeader .circle{
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        background: rgba(17,17,17,0.2);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tranHeader .circle .iconfont{
        color: #fff;
    }


</style>
