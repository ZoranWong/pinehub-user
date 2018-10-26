<template>
	<div class="search-wrapper">
		<mp-title :title="title"></mp-title>
		<div class="search-box clearfix">
			<input class="search-input  fl" type="text" v-model="search" placeholder="请输入商品名称">
			<i class="search-icon fr" @click = "searchMerchandise"></i>
		</div>
		<div class="goods">
			<m-list  :height="listHeight" :width="listwidth"   :list="merchandises"
        		:addMerchandiseToCart = "addCart"  :reduceMerchandiseToCart = "reduceCart" categoryId="search" >
       		</m-list>
		</div>

	</div>
</template>

<script>

	import MpTitle from '@/components/MpTitle';
	import MerchandiseList from '@/components/MerchandiseList'
	export default {
		data() {
			return {
				title: "搜索商品",
				search:"",
				activityId: 0,
    		screenHeight: '',
    		result:null,
				scrollTop: 0
			};
		},
		components: {
			'mp-title': MpTitle,
			'm-list': MerchandiseList,
		},
		computed: {
	      merchandises(){
	        return this.$store.getters['model.search.merchandises/list'];
	      },
	      currentPage () {
	       let page = this.$store.state['model.search.merchandises'].currentPage;
	       console.log(page, "当前页数")
	       return page;
	      }

    },
    watch:{
    },
    methods:{
			loadMerchandises(page, search){
				this.$command('GET_MERCHANDISE_LIST',
				'model.search.merchandises/setList',
				'today',
				this.categoryId,
				page,
				search);
				console.log('加载', search)
			},
			next() {
				this.loadMerchandises(this.currentPage  + 1, this.search);
			},
			addCart(shopId, count,  merchandiseId){
				this.$command('ADD_MERCHANDISE_TO_CART', merchandiseId, count, shopId);
			},
			reduceCart(shopId, count, merchandiseId){
				this.$command('REDUCE_MERCHANDISE_TO_CART',merchandiseId,count, shopId);
			},
			emptyCart(storeId){
				this.$command('EMPTY_MERCHANDISES_TO_CART',storeId);
			},
			searchMerchandise(search){
				this.scrollTop = 0;
				this.$command('CLEAR_MERCHANDISE', 'model.search.merchandises');
				this.loadMerchandises(1, this.search);
			}
  	}
	}
</script>

<style scoped>
	.search-wrapper{
		background: #f2f2f2;
		padding: 20rpx;
		box-sizing: border-box;
		position: relative;
	}
	.search-box{
		width:710rpx;
		height: 70rpx;
		line-height: 70rpx;
		background:#ffffff;
		border-radius: 10rpx;
		position:fixed;
		top:20rpx;
		left:20rpx;
		z-index: 33;

	}
	.search-input{
		width:560rpx;
		height: 70rpx;
		line-height: 70rpx;
		margin-left: 40rpx;
		font-size:29rpx;
	}
	.search-icon{
		width:41rpx;
		height: 42rpx;
		background:url(../../../static/images/search.png) no-repeat;
		background-size: contain;
		margin: 14rpx 40rpx 14rpx 0rpx;

	}
	.goods{

		margin-top: 70rpx;
	}
</style>
