<!--suppress ALL -->
<template>
    <div id="user_store" class="body">
        <mp-title :title="title"></mp-title>
        <div id="store_header">
            <input type="text" placeholder="请输入商品名称" id="store_search">
            <i class="iconfont">&#xe65c;</i>
        </div>
        <div id="store_goods">
            <ul id="store_goods_type">
                <li
                  v-for="item in categories"
                  :key="item.id"
                  :class="item.id === activeTab ? 'active': ''"
                  @click="tabSelect(item.id)"
                >
                    {{item.name}}
                </li>
            </ul>
            <ul id="store_goods_items">
                <li v-for="item in goods" :key="index"  @click="redirectTo('user.goodDetail', {query: {type:'mall', good_id: item.id}})">
                    <div class="thumb_img">
                        <img :src="item.main_image" alt="">
                    </div>
                    <div id="store_good_info">
                        <div class="store_good_info_title">
                            <h3>{{item.name}}</h3>
                            <span>{{item.unit}}</span>
                        </div>
                        <div id="store_good_info_entities">
                            <span>销量:{{item.sell_num}}</span>
                            <span>库存:{{item.stock}}</span>
                        </div>
                        <span id="store_good_info_spec" v-if="item.specifications.length">规格：{{item.spec}}</span>
                        <div id="store_good_info_price">
                            <span>{{item.sell_price_format}}</span>
                            <em>{{item.origin_price_format}}</em>
                            <i class="iconfont" v-if="item.stock" @click.stop="addToShoppingCart(item)">&#xe6d8;</i>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <ShoppingCart :type="'mall'"/>
        <SelectSpecification
            :selectSpec="selectSpec"
            :item="selectItem"
            :type="'mall'"
            @close="closeSelectSpec" />
        <ChooseSelfRaisingPoint v-if="showPoints" @close="closePoints" />
    </div>
</template>
<script>
	import MpTitle from '@/components/MpTitle';
	import ShoppingCart from '@/components/ShoppingCart';
	import ChooseSelfRaisingPoint from '@/components/ChooseSelfRaisingPoint';
	import SelectSpecification from '@/components/SelectSpecification';
	import _ from 'underscore'

  export default {
      components: {
          'mp-title': MpTitle,
          ShoppingCart,
          SelectSpecification,
		  ChooseSelfRaisingPoint,
      },
      data() {
          return {
              title: '商城',
              navName: 'store',
              activeTab:'',
			  selectSpec:false,
			  selectItem:{}
          };
      },
      watch: {
		  activeTab(val) {
			  if(val){
                  this.$command('LOAD_STORE_COMMAND',val,1)
              }
          }
      },
      computed: {
          categories(){
			  let categories = this.model.user.store.categories;
            if(categories && categories.length){
                this.activeTab = categories[0].id
            }
          	 return categories;
          },
          goods(){
			  return this.model.user.store.goods
          },
          showPoints () {
			  return this.model.user.store.showPoints
          }
      },
      methods: {
		  closePoints () {
             this.showPoints = false
          },
          tabSelect(id){
              this.activeTab = id;
			  console.log(this.activeTab);
			  this.$command('LOAD_STORE_COMMAND',id, 1)
          },
          setData(data){
              this.data = data
          },
        addToShoppingCart(item){
			if (item.specifications.length) {
                this.selectItem = item;
                this.selectSpec = true
            } else {
                let goods = this.model.user.store.goodInShoppingCart;
				if (goods.length) {
					_.map(goods, (product) => {
						product['product_stock_id'] === item['product_entities'][0]['product_stock_id']?
							this.$command('CHANGE_BUY_NUM_COMMAND',product,product['buy_num'] + 1,'mall')
							:
							this.$command('ADD_GOODS_TO_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1,'mall')
					})
                } else {
					this.$command('ADD_GOODS_TO_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1,'mall')
                }

            }
        },
		  closeSelectSpec(){
              this.selectSpec = false
          },
		  redirectTo (router, options = {}) {
			  this.$command('REDIRECT_TO', router, 'push', options);
		  },
      },
      created() {
      },
      mounted() {
		 this.$command('LOAD_STORE_CATEGORIES_COMMAND')
	  }
	}
</script>

<style>
	page {
        height: 100%;
        background: #f2f2f2;
    }

	#footNavHeight {
        height: 109rpx;
	}

    #user_store{
        height: 100%;
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

  #store_header{
      box-sizing: border-box;
      width: 100%;
      height: 108rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background: #fff;
      border-bottom: 2rpx solid #f2f2f2;
      position: fixed;
      top: 0;
  }

  #store_header #store_search {
      width: 630rpx;
      height: 70rpx;
      background: #f2f2f2;
      border-radius: 10rpx;
      padding: 0 40rpx;
      font-size: 28rpx;
  }

  #store_header i{
      position: absolute;
      right: 70rpx;
      top: 34rpx;
      font-size: 40rpx;
      color: #757575;
  }

  #store_goods {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      margin-bottom: 120rpx;
      margin-top: 108rpx;
  }

  #store_goods #store_goods_type {
      flex: 1;
      position: fixed;
      left: 0;
      height: 1250rpx;
      overflow: scroll;
  }

  #store_goods #store_goods_type li {
    width: 150rpx;
    height: 120rpx;
    font-size: 28rpx;
    color: #111111;
    display: flex;
    justify-content: center;
    align-items: center;
      font-weight: bold;
  }

  #store_good_info_spec{
      font-size: 22rpx;
      color: #757575;
  }

  #store_goods #store_goods_type .active{
      background: #fff;
      border-left: 12rpx solid #ffcc00;
  }

  #store_goods #store_goods_items{
      width: 600rpx;
      background: #fff;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
  }

  #store_goods #store_goods_items li{
    width: 560rpx;
    padding: 20rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 2rpx solid #f2f2f2;
  }

    #store_goods #store_goods_items .thumb_img{
        margin-right: 30rpx;
        width: 190rpx;
        height: 190rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #store_goods #store_goods_items .thumb_img img{
        width: 100%;
        height: 100%;
    }


  #store_goods #store_goods_items #store_good_info{
      flex: 1;
  }

    #store_goods #store_goods_items .store_good_info_title{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #store_goods #store_goods_items .store_good_info_title span{
        font-size: 24rpx;
        color: #757575;
        margin-right: 40rpx;
    }

  #store_goods #store_goods_items #store_good_info h3{
      font-size: 28rpx;
      color: #111111;
      margin: 10rpx 0;
      width: 200rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }

  #store_goods #store_goods_items #store_good_info #store_good_info_entities span{
      font-size: 22rpx;
      color: #757575;
  }

  #store_goods #store_goods_items #store_good_info #store_good_info_entities span:last-child{
      margin-left: 30rpx;
  }

  #store_goods #store_goods_items #store_good_info #store_good_info_price{
      width: 100%;
      margin-top: 26rpx;
      display: flex;
      justify-content: flex-start;
      padding-right: 20rpx;
      align-items: center;
  }

  #store_goods #store_goods_items #store_good_info #store_good_info_price span{
      font-size: 32rpx;
      display: inline-block;
      height: 100%;
      color: #ffcc00;
  }

  #store_goods #store_goods_items #store_good_info #store_good_info_price em {
      font-size: 22rpx;
      color: #757575;
      display: inline-block;
      height: 100%;
      text-decoration: line-through;
      margin-left: 70rpx;
  }

  #store_goods #store_goods_items #store_good_info #store_good_info_price i{
      background: linear-gradient(to right,#FDE068,#FFCC00);
      -webkit-background-clip: text;
      color: transparent;
      font-size: 48rpx;
      margin-right: 20rpx;
      margin-left: 70rpx;
  }

</style>
