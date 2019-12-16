<!--suppress ALL -->
<template>
    <div id="select_spec" v-if="selectSpec">
        <div id="select_spec_container" >
            <div id="closeIcon">
                <i class="iconfont closeIcon"  @click="close">&#xe658;</i>
            </div>
            <h3 id="select_spec_header">选择规格</h3>
            <div id="select_spec_banner">
                <img :src="item.main_image" alt="">
            </div>
            <div id="select_spec_info">
                <h4>{{item.name}}</h4>
                <div class="select_spec_info">
                    <span>{{item['sell_price_format']}}</span>
                    <span>销量:{{item.sell_num}}</span>
                    <span>库存:{{item.product_entities[0].stock}}</span>
                </div>
            </div>
            <div id="select_spec_choose">
                <div id="choose_items" v-for="(i,index) in item.specifications" :key="i.id">
                    <div class="left">{{i.name}}:</div>
                    <div class="right">
                        <button
                            :class="k.class"
                            @click="selectSpecItems(i,k)"
                            v-for="(k,kIndex) in i.values"
                            :key=" k.id">
                            {{k.value}}
                        </button>
                    </div>
                </div>
            </div>
            <div id="select_spec_confirm">
                <div id="select_spec_amount" v-if="item.specifications.length">
                    <h4>{{totalPrice}}</h4>
                    <span>{{selectedDesp}}</span>
                </div>
                <div id="select_spec_amount" v-else>
                    <h4>￥{{item.sell_price}}</h4>
                    <span>{{item.name}}</span>
                </div>
                <button @click="addToShoppingCart">
                    <i class="iconfont">&#xe6af;</i>
                    加入购物车
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'underscore';
    import {formatMoney} from '../utils';

	export default {
        name: 'SelectSpecification',
        props: ['selectSpec', 'item','type'],
        data () {
            return {
                selectedSpec: {},
                totalPrice: 0,
				selectedDesp:'',
                confirmSelected:{}
            }
        },
        computed () {

        },
        watch: {
        },
        methods: {
            close () {
                this.$emit('close')
            },
            selectSpecItems (parent, item) {
				this.selectedSpec[parent.id] = item.value;
				this.handleClass(parent, item);
				this.isEqual()
			},
			isEqual(){
                console.log(this._props.item, '====');
                let selectedSpec = {};
				let selectedDesp = [];
				for (let key in this.selectedSpec){
					if (!_.isNaN(parseInt(key))) {
						selectedSpec[key] = this.selectedSpec[key]
                    }
                }
				for ( let key in selectedSpec){
					selectedDesp.push(selectedSpec[key])
                }
				this.selectedDesp = selectedDesp.join(',')
				let isEqual = false
				return _.map(this._props.item['product_entities'], (item) => {
					if(isEqual) return;
					isEqual = _.isEqual(selectedSpec,item.specs);
					this.confirmSelected = isEqual ? item : {}
					this.totalPrice =  formatMoney(isEqual ? item['retail_price'] : 0);
				})
			},
            handleClass (i, k) {
				_.map(i.values, (value) => {
                    value.class = '';
                    if (this.selectedSpec[i.id] === value.value) {
                    	value.class = 'active'
                    }
				})
			},
			addToShoppingCart(){
				let selectedSpec = {};
				for (let key in this.selectedSpec){
					if (!_.isNaN(parseInt(key))) {
						selectedSpec[key] = this.selectedSpec[key]
					}
				};

				let keys = _.keys(selectedSpec);
				if (keys.length < this.item.specifications.length) {
					return;
                }
                if (this.type == 'mall') {
                    let goods = this.model.user.store.goodInShoppingCart;
                    if (goods.length) {
                        _.map(goods, (product) => {
                            product['product_stock_id'] === this.confirmSelected['product_stock_id']?
                                this.$command('CHANGE_BUY_NUM_COMMAND',product,product['buy_num'] + 1,'mall')
                                :
                                this.$command('ADD_GOODS_TO_CART_COMMAND',this.confirmSelected['product_stock_id'],1)
                        })
                    } else {
                        this.$command('ADD_GOODS_TO_CART_COMMAND',this.confirmSelected['product_stock_id'],1)
                    }
                } else {
                    let goods = this.model.newEvents.shoppingCarts.goodInShoppingCart;
                    if (goods.length) {
                        _.map(goods, (product) => {
                            if (product['product_stock_id'] === this.confirmSelected['product_stock_id']) {
                                this.$command('CHANGE_BREAKFAST_BUY_NUM_COMMAND',product,product['buy_num'] + 1)
                            } else {
                                this.$command('ADD_GOODS_TO_BREAKFAST_CART_COMMAND',this.confirmSelected['product_stock_id'],1)
                            }
                        })
                    } else {
                        this.$command('ADD_GOODS_TO_BREAKFAST_CART_COMMAND',this.confirmSelected['product_stock_id'],1)
                    }
                }

				this.$emit('close')
            }
        }
	}
</script>

<style>
    #select_spec {
        background: rgba(17, 17, 17, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #select_spec_container {
        position: relative;
        width: 630rpx;
        background: #fff;
        border-radius: 10rpx;
    }

    #select_spec_container #closeIcon{
        border: 6rpx solid #fff;
        background: #fff;
        position: absolute;
        right: -16rpx;
        top: -16rpx;
        border-radius: 50%;
        width: 64rpx;
        height: 64rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #select_spec_container .closeIcon{
        font-size: 64rpx;
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
    }

    #select_spec_container #select_spec_header{
        width: 100%;
        height: 108rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36rpx;
        color: #111;
    }

    #select_spec_container #select_spec_banner{
        width: 100%;
        height: 338rpx;
    }

    #select_spec_container #select_spec_banner img{
        width: 100%;
        height: 100%;
    }

    #select_spec_container #select_spec_info{
        height: 133rpx;
        display: flex;
        padding: 0 32rpx;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    #select_spec_container #select_spec_info h4{
        font-size: 32rpx;
        color: #111111;
        font-weight: normal;
        margin: 25rpx 0;
    }

    #select_spec_container #select_spec_info .select_spec_info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100% ;
    }

    #select_spec_container #select_spec_info .select_spec_info span{
        font-size: 28rpx;
        color: #757575;
    }

    #select_spec_container #select_spec_choose{
        padding: 0 32rpx;
        height: 170rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    #select_spec_container #select_spec_choose #choose_items {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        font-size: 28rpx;
        color: #757575;
        width: 100%;
    }

    #select_spec_container #select_spec_choose #choose_items .left{
        width: 115rpx;
    }

    #select_spec_container #select_spec_choose #choose_items .right{
        width: 476rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        margin-left: 20rpx;
    }


    #select_spec_container #select_spec_choose #choose_items .right button{
        border-radius: 10rpx;
        padding: 0 21rpx;
        height: 48rpx;
        line-height: 50rpx;
        color: #757575;
        font-size: 28rpx;
        margin: 0 10rpx 10rpx 0 !important;
        border: 2rpx solid #ccc;
        background: #fff;
    }

    #select_spec_container #select_spec_choose #choose_items .right .active{
        background: linear-gradient(to right,#FDE068,#FFCC00);
        border: 2rpx solid #ffcc00;
        color: #fff;
    }

    #select_spec_container #select_spec_choose #choose_items button:first-child{
        margin-left: 20rpx;
    }

    #select_spec_container #select_spec_confirm{
        height: 130rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f2f2f2;
        padding: 0 32rpx;
    }

    #select_spec_container #select_spec_confirm #select_spec_amount{
        padding: 30rpx 0;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }

    #select_spec_container #select_spec_confirm #select_spec_amount h4{
        font-size: 36rpx;
        color: #ffcc00;
    }

    #select_spec_container #select_spec_confirm #select_spec_amount span {
        font-size: 22rpx;
        color: #757575;
    }

    #select_spec_container #select_spec_confirm button{
        width: 273rpx;
        height: 80rpx;
        padding: 0 20rpx;
        display: flex;
        justify-content: space-between;
        color: #fff;
        font-size: 32rpx;
        background: linear-gradient(to right,#FDE068,#FFCC00);
        border-radius: 10rpx;
        margin: 0;
        line-height: 90rpx!important;
    }

    #select_spec_container #select_spec_confirm button i {
        color: #fff;
        font-size: 48rpx;
    }

</style>
