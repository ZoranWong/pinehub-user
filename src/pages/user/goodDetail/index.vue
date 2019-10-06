<!--suppress ALL -->
<template>
    <div id="good_detail" v-if="goodDetail">
        <mp-title :title="title"></mp-title>
        <img :src="goodDetail.main_image" alt="">
        <div id="good_detail_info">
            <div class="intro">
                <div class="name">{{goodDetail.name}}</div>
                <div class="desp">{{goodDetail.detail || '暂无描述'}}</div>
            </div>
            <i class="iconfont" @click="addToShoppingCart(goodDetail)">&#xe6d8;</i>
        </div>
        <h4 class="good_detail_price"  v-if="goodDetail.range">{{goodDetail.range}}</h4>
        <h4 class="good_detail_price"  v-else>{{goodDetail['sell_price']}}</h4>
        <div id="good_detail_statictics">
            <span class="is-underline">￥{{goodDetail['origin_price']}}</span>
            <span>销量{{goodDetail['sell_num']}}</span>
            <span>库存{{goodDetail.stockNum || 0}}</span>
        </div>

        <ShoppingCart />
        <SelectSpecification
            :selectSpec="selectSpec"
            :item="selectItem"
            @close="closeSelectSpec" />
    </div>
</template>

<script>
	import MpTitle from '@/components/MpTitle';
	import ShoppingCart from '@/components/ShoppingCart';
	import SelectSpecification from '@/components/SelectSpecification';
	export default {
        name: 'goodDetail',
		components: {
			'mp-title': MpTitle,
			ShoppingCart,
			SelectSpecification
		},
        data() {
        	return {
				title: '商品详情',
				selectSpec:false,
				selectItem:{}
            }
        },
        methods:{
			addToShoppingCart (item) {
				this.selectItem = item;
				this.showShoppingCart = !this.showShoppingCart;
				this.selectSpec = true
			},
			closeSelectSpec(){
				this.selectSpec = false
			},
        },
        created () {

		},
        computed : {
            goodDetail () {
				return this.model.user.goodDetail.goodDetail
            }
        },
        mounted () {
            this.$command('GOOD_DETAIL_COMMAND', this.$route.query['type'], this.$route.query['good_id'])
		}
	}
</script>

<style>
    #good_detail{
        width: 750rpx;
        box-sizing: border-box;
    }

    #select_spec{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

    }

    #shopping_cart{
        position: fixed;
        width: 100%;
        transition: 1s;
    }


    #good_detail img{
        width: 100%;
        height: 400rpx;
    }

    #good_detail #good_detail_info{
        display: flex;
        padding: 10rpx 40rpx;
        width: 670rpx;
        justify-content: space-between;
        align-items: center;
    }

    #good_detail #good_detail_info .intro{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    #good_detail #good_detail_info .intro .name{
        font-size: 32rpx;
        color: #111111;
        margin: 19rpx 0;
    }

    #good_detail #good_detail_info .intro .desp{
        font-size: 28rpx;
        color: #757575;
    }

    #good_detail #good_detail_info i{
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 48rpx;
    }

    #good_detail .good_detail_price{
        font-size: 36rpx;
        width: 670rpx;
        color: #ffcc00;
        padding: 0 40rpx;
        margin-top: 40rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #good_detail #good_detail_statictics{
        padding: 0 40rpx;
        width: 670;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 22rpx;
        padding-bottom: 30rpx;
        border-bottom: 6rpx solid #f2f2f2;
    }

    #good_detail #good_detail_statictics .is-underline{
        text-decoration: line-through;
    }


    #good_detail #good_detail_statictics span {
        font-size: 28rpx;
        color: #757575;
    }

</style>
