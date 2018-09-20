<template>
  <!-- <div class="goods" >
     <menus></menus>
     <m-list @show-cart = "hdlShowCart"></m-list>
  </div> -->
  <div class="goods" >
     <ul class="menu-wrapper" >
      <li class="menu-item search" :class="{'current':currentIndex===$index}">
        <i class="i-icon search-icon"></i>
        <span class="search-txt">搜索</span>
      </li>
      <li class="menu-item new-product ">
        <i class="i-icon new-product-icon"></i>
        <span class="new-txt text-yellow-cf">新品套餐</span>
      </li>
      <li class="menu-item classic-set-meal">
        <span class="categories">经典套餐</span>
      </li>
      <li class="menu-item utrition-collocation">
        <span class="categories">营养搭配</span>
      </li>
      <li class="menu-item snack-dessert">
        <span class="categories">小食甜品</span>
      </li>
      <li class="menu-item drink">
        <span class="categories">饮品</span>
      </li>
    </ul>
    <!-- v-el:foods-wrapper v-el:menu-wrapper-->
    <div class="foods-wrapper" >
      <ul>
        <li class="foods-item clearfix bgff food-list-hook">
          <div class="foods-item-left fl">
            <img class="merchandises-pic" src="../../static/upload/cheese-cake.png">
          </div>
          <div class="foods-item-right fr">
            <h4 class="merchandises-name" >
                    芝士蛋糕
            </h4>
            <p class="sell-num">已售<span class="text-yellow-cc">1888</span>份</p>
            <p class="sell-price">20.00元/份</p>
            <p class="origin-price">36.00元/份</p>
            <i class="i-icon plus-icon" @click="cartShow"></i>
          </div>
        </li>
        <li class="foods-item clearfix bgff">
          <div class="foods-item-left fl">
            <img class="merchandises-pic" src="../../static/upload/cheese-cake.png">
            </div>
            <div class="foods-item-right fr">
            <h4 class="merchandises-name" >
                    芝士蛋糕
            </h4>
            <p class="sell-num">已售<span class="text-yellow-cc">1888</span>份</p>
            <p class="sell-price">20.00元/份</p>
            <p class="origin-price">36.00元/份</p>
            <i class="i-icon plus-icon"></i>
          </div>
        </li>
        <li class="foods-item clearfix bgff">
          <div class="foods-item-left fl">
            <img class="merchandises-pic" src="../../static/upload/cheese-cake.png">
            </div>
            <div class="foods-item-right fr">
            <h4 class="merchandises-name" >
                    芝士蛋糕
            </h4>
            <p class="sell-num">已售<span class="text-yellow-cc">1888</span>份</p>
            <p class="sell-price">20.00元/份</p>
            <p class="origin-price">36.00元/份</p>
            <i class="i-icon plus-icon"></i>
          </div>
        </li>
        <li class="foods-item clearfix bgff">
          <div class="foods-item-left fl">
            <img class="merchandises-pic" src="../../static/upload/cheese-cake.png">
            </div>
            <div class="foods-item-right fr">
            <h4 class="merchandises-name" >
                    芝士蛋糕
            </h4>
            <p class="sell-num">已售<span class="text-yellow-cc">1888</span>份</p>
            <p class="sell-price">20.00元/份</p>
            <p class="origin-price">36.00元/份</p>
            <i class="i-icon plus-icon"></i>
          </div>
        </li>      
      </ul>
    </div>
  </div>
</template>

<script>
import FoodsList from './FoodsList';
import menus from './Menus';

export default {
	data(){
		return{
     listHeight:[],
     scrollY:0
		}
	},
  components:{
    'm-list': FoodsList,
     menus: menus,
  },
  computed:{
    currentIndex(){
      for(let i = 0; i< this.listHeight.length;i++){
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if(! height2 ||(this.scrollY >=height1 && this.scrollY< height2)){
          return i;
        }
      }
      return 0;
    }
  },
  created(){
    this._initScroll();
    this._calculateHeight();
  },
  methods: {
    cartShow:function(){
        this.$emit('show-cart')
      },
    hdlShowCart() {
      this.$emit('show-cart');
    },
    _initScroll(){
        this.meunScroll = new BScroll(this.$els.menuWrapper, {});
        this.foodsScroll = new BScroll(this.$els.foodsWrapper,{
          probeType:3
        });

        this.foodsScroll.on('scroll',(pos) =>{
          this.scrollY =Math.abs(Matn.round(pos.y));
        });
    },
    _calculateHeight(){
       let foodList  =  this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
       let height = 0;
       this.listHeight.push(height);
       for(let i = 0; i< foodList.length; i++){
           let item = foodList[i];
           height += item.clienHeight;
           this.listHeight.push(height)
       }
    }
  }
 }
</script>

<style>
.goods{
  display: flex;
  width:100%;
  height: 1334rpx;
  overflow: hidden;
  box-sizing: border-box;
  /*position: absolute;
  top:488rpx;
  bottom:98rpx;*/
 /* border:1px solid blue;*/
}

.menu-wrapper{
  flex:0 0 120rpx;
  width:120rpx;
  box-sizing: border-box;
  height: 100%;
}
.menu-item{
  display: table;
  width:120rpx;
  text-align: center;
  font-size: 28rpx;
  font-weight:400;
  box-sizing: border-box;
  background-color: #ffffff;
 /* border-bottom: 1px solid red;*/
 box-shadow: 4rpx 0rpx 10rpx rgba(205,205,205,0.3);

}
.current{
  position:relative;
  z-index:10;
  margin-top:2rpx;
  background:red;
  font-weight:700;
}
.current span{
  border:none;
}
/*.menu-item span{
  display: table-cell;
  width:66rpx;
}*/
.search{
  height:130rpx;
  box-sizing: border-box;
  text-align: center;
  border-bottom-right-radius:10rpx;
  padding:28rpx 0rpx;
}
.search-icon{
  display: inline-block;
  width:40rpx;
  height: 40rpx;
  background: url("../../static/images/search-icon.png") no-repeat;
  background-size: contain;
  margin:0rpx 40rpx 10rpx;
}
.new-product{
  height: 216rpx;
  width: 120rpx;
  border-left:6rpx solid #fece00;
  text-indent: 40rpx;
  padding:28rpx 0rpx;

}
.new-product-icon
{
  width:58rpx;
  height: 66rpx;
  background:url("../../static/images/new-product-icon.png") no-repeat;
  background-size: contain;
  margin:0rpx 28rpx 20rpx;
}
.classic-set-meal,.utrition-collocation,.snack-dessert{
  height:108rpx;
  padding:12rpx 20rpx;
  border-bottom:2rpx solid #e0e0e0;
  box-sizing: border-box;
  text-indent: 2rpx;
}
.classic-set-meal{
   border-top-right-radius:10rpx;
}
.drink {
   height:108rpx;
   padding-top: 38rpx;
}


.foods-wrapper{
  flex:1;
  overflow-y: auto;
  height: 718rpx;

}
.foods-wrapper::-webkit-scrollbar {
  width: 1px; 
  background-color: rgba(217,217,217,0.3); 
}
.foods-wrapper ul{
  width:100%;
  padding:20rpx 30rpx 20rpx 20rpx;
  box-sizing: border-box;
  overflow-y: auto;
}
.foods-item{
   width:580rpx;
   height:326rpx;
   border-radius: 20rpx;
   box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
   margin-bottom: 20rpx;
   padding: 38rpx 40rpx;
   box-sizing: border-box;
   position: relative;
}
.foods-item-left{
  width: 43%;
  height: 100%;
  /*box-sizing: border-box;
  border:2rpx solid red;*/
}
.merchandises-pic{
  width:250rpx;
  height:250rpx;

}
.merchandises-pic img{
  width:100%;
  height:100%;
}
.foods-item-right{
 width: 46%;
 height: 100%;
 line-height: 40rpx;
 
}
.foods-item-right h4{
  font-size:32rpx;
  font-weight: 400;
}
.sell-num{
  font-size:22rpx;
}
.sell-price{
  font-size: 28rpx;
  font-weight: 400;
  margin-top: 30rpx;
}
.origin-price{
  text-decoration: line-through;
  font-size:20rpx;
}
.plus-icon{
  width:48rpx;
  height: 48rpx;
  background:url(../../static/images/plus-icon.png) no-repeat;
  background-size: contain;
  position: absolute;
  bottom: 58rpx;
  right:40rpx;
}



</style>
