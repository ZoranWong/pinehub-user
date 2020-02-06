<!--suppress ALL -->
<template>
    <div>
        <CustomHeader :title="title" :needReturn="true" />
        <div class="cakes" :style="{'height': height}">
            <div class="header">
                <img class="images" src="./img/22305823.jpg" alt="">
            </div>
            <div class="banners">
                <swiper
                    class="swiper"
                    circular="true"
                    indicator-dots="true"
                    autoplay="true"
                    interval="5000"
                    duration="1000"
                    beforeColor="red"
                    indicator-color="#fff"
                    indicator-active-color="#ffcc00"
                    afterColor="coral">
                    <block v-for="(item, index) in activityBanners" :index="index" :key="key" >
                        <swiper-item >
                            <image :src="item.image" class="slide-image" mode="aspectFill" @click="bannerJump(item)"/>
                        </swiper-item>
                    </block>
                </swiper>
            </div>

            <div class="middle">
                <img class="middleImage" src="./img/964024279.jpg" alt="">
            </div>

            <ul class="products" :style="{marginBottom: goodInShoppingCart.length ? '150rpx': '30rpx'}">
                <li v-for="item in activityProducts" :key="item.id" class="product" @click="redirectTo('user.goodDetail', {query: {type:'activity', good_id: item.id, actId: actId}})">
                    <img :src="item['main_image']" alt="" class="productImg">
                    <h3 class="name">{{item.name}}</h3>
                    <div class="statictics">
                        <span class="data">销量  {{item['sell_num']}}</span>
                        <span class="data">库存  {{item.stock}}</span>
                        <span class="data origin" v-if="!item['specifications'] || !item['specifications'].length">{{item['origin_price_format']}}</span>
                    </div>
                    <div class="bottom">
                        <h4 class="price">{{item['sell_price_format']}}</h4>
                        <img class="add" src="../../../../static/icons/add.png" alt="" @click.stop="addToShoppingCart(item)">
                    </div>
                </li>
            </ul>



            <div class="cakeService" @touchstart="start" @touchmove="move" @touchend="end" :style="{'right': right +'px', 'top': top+'px'}">
                <img class="service"  src="../../../../static/icons/cakeService.png" alt="" @click="connectKf">
            </div>


            <Specification
                :selectSpec="selectSpec"
                :item="selectItem"
                :type="'activity'"
                :actId="actId"
                @close="closeSelectSpec" />
            <ShoppingCart
                :type="'activity'"
                :actId="actId"
            />
        </div>

    </div>

</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';
	import Specification from './components/Specification';
	import ShoppingCart from '../../../components/ShoppingCart';
    import _ from 'underscore';
	export default {
		components: {
			CustomHeader,
            Specification,
            ShoppingCart
		},
		data() {
			return {
				title: '生日蛋糕预定',
				screenHeight: 0,
                height: 0,
				rpxRate: 1,
                actId: '',
                banners: [],
                phone: '15357903187',
				screenWitdh: 0,
                startPoint: {},
                right: 0,
                top: 450,
                selectItem:{},
                selectSpec: false,
			};
		},
		watch: {

		},
		computed: {
			statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
			navHeight () {
                return this.model.global.barHeight.navHeight
			},
            activityBanners () {
                return this.model.activity.banners
            },
            activityProducts () {
			    return this.model.activity.products
            },
            goodInShoppingCart () {
			    return this.model.activity.goodInShoppingCart
            }
		},
		methods: {
            start(e){
                this.startPoint = e.touches[0];
            },
            bannerJump (banner) {
                console.log(banner);
                if (!banner['can_jump']) return;
                if (banner['action_type'] === 'PRODUCT_DETAIL') {
                    this.redirectTo('user.goodDetail', {query: {type:'activity', good_id: banner.link, actId: this.actId}})
                }
            },
            connectKf () {
                wx.makePhoneCall({
                    phoneNumber: this.phone,
                    success: function () {
                        wx.showToast({
                            title: '拨打成功',
                            icon: 'none'
                        })
                    }
                })
            },
            move (e) {
                let endPoint = e.touches[e.touches.length - 1];
                let translateX = endPoint.clientX - this.startPoint.clientX
                let translateY = endPoint.clientY - this.startPoint.clientY
                this.startPoint = endPoint
                let top = this.top + translateY
                let right = this.right - translateX
                //判断是移动否超出屏幕
                if (right + 90 >= this.screenWitdh/ 2) {
                    right = this.screenWitdh/2 - 90;
                }
                if (right <= 0) {
                    right = 0;
                }
                if (top <= 85) {
                    top = 85
                }
                if (top + 60 >= this.screenHeight /2) {
                    top = this.screenHeight/2 - 60;
                }
                this.top = top;
                this.right = right;
            },
            end () {
                console.log('11111111111111111');
            },
            closeSelectSpec(){
                this.selectSpec = false
            },
            addToShoppingCart(item){
                if (item.specifications && item.specifications.length) {
                    this.selectItem = item;
                    this.selectSpec = true
                } else {
                    let goods = this.model.activity.goodInShoppingCart;
                    if (goods.length) {
                        _.map(goods, (product) => {
                            product['product_stock_id'] === item['product_entities'][0]['product_stock_id']?
                                this.$command('CHANGE_ACTIVITY_BUY_NUM_COMMAND',product,product['buy_num'] + 1,'activity')
                                :
                                this.$command('ADD_GOODS_TO_ACTIVITY_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1,'activity',this.actId)
                        })
                    } else {
                        this.$command('ADD_GOODS_TO_ACTIVITY_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1,'activity',this.actId)
                    }

                }
            },
            redirectTo (router, options = {}) {
                this.$command('REDIRECT_TO', router, 'push', options);
            }
        },
		created() {
			this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
			this.screenWitdh = wx.getSystemInfoSync().windowHeight;
			this.screenHeight = (this.rpxRate * this.screenWitdh);

        },
		mounted() {
            let pages =  getCurrentPages();
            let options = pages[pages.length - 1]['options'];
            this.actId = parseInt(options.id);
            this.$command('LOAD_ACT_BANNER_COMMAND', this.actId);
            this.$command('LOAD_ACT_PRODUCTS_COMMAND', this.actId);
            this.$command('LOAD_ACTIVITY_CART_COMMAND','', this.actId);
            this.height = this.screenHeight - this.navHeight - this.statusBarHeight - 40 + 'rpx';
        }
	}
</script>

<style>
	page {
		height: 100%;
		background: #f2f2f2;
        overflow: hidden;
	}

    #shopping_cart{
        position: fixed;
        width: 100%;
        transition: 1s;
    }

    #select_spec_act{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

    }

    @import "index.css";



</style>
