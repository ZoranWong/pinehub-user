<!--suppress ALL -->
<template>
	<div id="groupon_list">
        <div class="tranHeader" @click="back" :style="{'top': (statusBarHeight ) + 'px'}">
            <span  class="circle" ><i class="iconfont">&#xe679;</i></span>
        </div>
        <div class="groupon_header">
            <img class="groupon_header_image" src="../images/Spell_group_banner.png" alt="">
            <SwiperNotice />
        </div>
        <div class="groupon_banner">
            <img src="../images/function.png" class="function" alt="">
            <div class="left" @click="redirectTo('user.groupon.pickup')"></div>
            <div class="right" @click="redirectTo('user.myGroupon',{
                query: {
                    route: 'user.groupon.list',
                }
            })"></div>
        </div>
        <ul class="groupon_list">
            <li class="groupon_list_item" v-for="(item,itemIndex) in grouponList" :key="itemIndex" >
                <div class="groupon_shop_info" @click="goShopDetails(item)">
                    <div class="left">
                        <img class="shop_image" src="../grouponDetails/img/back.jpeg" alt="">
                        <div class="top">
                            <h3 class="shop_name">{{item['pick_shop_name']}}</h3>
                            <span class="shop_address">{{item['pick_shop_address']}}</span>
                        </div>
                    </div>
                    <div class="right">
                        <h4 class="groupon_amount">据您{{item['formatDistance']}}</h4>
                        <h4 class="groupon_amount">{{item['order_placed_users_count']}}人已参团</h4>
                    </div>
                </div>
                <div class="groupon_info" @click="goGrouponDetails(item)">
                    <img src="../images/arrow.png" class="arrow" alt="">
                    <div class="groupon_info_title">
                        <h3 class="groupon_name">{{item['display_name']}}</h3>
                        <h4 class="groupon_status">
                            <span class="groupon_status_text">{{item['state_desc']}}</span>
                            <img class="groupon_status_arrow" src="../../../../../static/icons/rightArrow.png" alt="">
                        </h4>
                    </div>
                    <div class="groupon_products" >
                        <img v-for="(product,pIndex) in item['display_products']" :key="pIndex" class="groupon_product_image" :src="product.image" alt="">
                    </div>
                    <ul class="groupon_purchased_info">
                        <li class="groupon_purchased_info_item" v-for="(user, uIndex) in item['latest_orders']" :key="uIndex">
                            <div class="left">
<!--                                {{item['latest_orders'].length - uIndex}}.-->
                                <img class="user_ava" :src="user['user_avatar']" alt="">
                                {{user['user_nickname']}}
                                <span class="groupon_purchased_time">{{user['paid_time']}}</span>
                            </div>
                            <h4 class="user_purchased_products" v-if="user['items'].length">
                                {{user['items'][0].name}}...
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
    import SwiperNotice from '../components/SwiperNotice';


	export default {
		components: {
            SwiperNotice
		},
		data () {
			return {

			};
		},
		watch: {

		},
		computed: {
            grouponList () {
                return this.model.groupon.grouponList
            }

		},
		methods: {
            back () {
                this.$command('REDIRECT_TO', '', 'back')
            },
            async init () {
                let result = await this.map.getLocation();
                this.$command('LOAD_GROUPON_LIST', result[0], result[1], 1)
            },
            redirectTo (router, options = {}) {
                this.$command('REDIRECT_TO', router, 'push', options);
            },
            handleMock () {
                // 模拟滚动条
            },
            goShopDetails (item) {
                this.$command('REDIRECT_TO', 'user.groupon.shopDetails', 'push', {
                    query: {
                        id: item['shop_id']
                    }
                })
            },
            goGrouponDetails (item) {
                this.$command('CLICK_GROUPON', item.id)
                this.redirectTo('user.groupon.details', {
                    query: {
                        id: item.id
                    }
                })
            }
		},
		created () {

		},
		mounted () {
		    this.init()
        }
	}
</script>

<style>
	page {
		height: 100%;
        height: 100%;
        overflow: auto;
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
