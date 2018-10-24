<template>
  <div class="menu-wrapper">
    <div id="tab_select">
      <ul>
        <li class="menu-item search"  @click="jump('search')">
          <i class="i-icon search-icon"></i>
          <span class="search-txt category-name">搜索</span>
        </li>
        <li class="menu-item new-product " :class="{ tab_select_now : cur == 'new' }" @click = "tabSelect('new')">
          <i class="i-icon new-product-icon"></i>
          <span class="new-txt category-name">新品套餐</span>
        </li>
        <li v-for = "(tab, index) in categories" :class = "{tab_select_now : cur == index}"  :key = "index" @click = "tabSelect(tab.id, index)"><span class = "category-name">{{ tab.name }}</span></li>
      </ul>
    </div>
  </div>
</template>


<script>
   import FoodsList from '@/components/FoodsList';
  export default {
    components : {
       'm-list': FoodsList,
    },
    data () {
      return {
        navName: "Menus",
        cur:0,
      }
    },
    computed : {
      categories() {
        return this.$store.getters['model.categories/categories'];
      }
    },
    methods : {
      tabSelect (id, index) {
        this.cur = index;
        this.$emit('menusChange', index);
      },
      jump(router){
        this.$command('router',router,'push');
      }
    },
    created () {
    }
  }
</script>

<style scoped>
.menu-wrapper{
  width:120rpx;
  height:100%;
  overflow-y: auto;

}
#tab_select {
  overflow: hidden;
  width:100%;
}

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
#tab_select ul li {
  display: table;
  width:120rpx;
  height: 108rpx;
  text-align: center;
  font-size: 28rpx;
  font-weight:400;
  box-sizing: border-box;
  box-shadow: 4rpx 0rpx 10rpx rgba(205,205,205,0.3);

}

#tab_select ul li .category-name{
  width:56rpx;
  display: inline-block;
  line-height: 40rpx;
  margin-top:7px;
}
  
#tab_select ul li.tab_select_now {
  color: #FECE00;
  border-left:6rpx solid #fece00;
  background-color: #fafafa;
}
#tab_content {
  padding-top: 74rpx;
}
.tab_content_now {
  display: block;
} 
</style>