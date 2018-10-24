<template>
	<div class="search-wrapper">
		<mp-title :title="title"></mp-title>
		<div class="search-box clearfix">
			<input class="search-input  fl" type="text" v-model="search" placeholder="请输入商品名称">
			<i class="search-icon fr"></i>
		</div>
		<!-- <m-list  :height="listHeight" :width="listwidth" :next="next" :list="merchandises"   ></m-list> -->
	</div>
</template>

<script>
	
	import MpTitle from '@/components/MpTitle';
	import FoodsList from '@/components/FoodsList';
	export default {
		data() {
			return {
				title: "搜索商品",
				search:"",
				activityId: 0, 
          		screenHeight: ''
				}
		},
		components: {
			'mp-title': MpTitle,
			'm-list': FoodsList,
			
		},
		// computed: {
  //    	 	merchandises(){
  //       		return this.$store.getters['model.activity.merchandises/list'];
  //     		}
  //  		},
   	// 	methods:{
    //   		next() {
    //     		this.$command('GET_MERCHANDISE_LIST', 'model.activity.merchandises/setList', 'activity', this.activityId, this.currentPage + 1, this.pageCount);
    //   		}
  		//  },
	   // created () {
	    
	   //  	this.screenHeight = (750 / wx.getSystemInfoSync().windowWidth  * wx.getSystemInfoSync().windowHeight) + 'rpx';
	   // 	}
	   mounted(){
	   	console.log('搜索商品--index.vue')
	   	this.$command('SEARCH_MERCHANDISES')
	   }

		
	}
</script>

<style scoped>
	.search-wrapper{
		background: #f2f2f2;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.search-box{
		width:710rpx;
		height: 70rpx;
		line-height: 70rpx;
		background:#ffffff;
		border-radius: 10rpx;
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
</style>