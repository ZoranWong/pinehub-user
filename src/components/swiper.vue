<template>
	<div>
		<!-- 轮播图 -->
    	<swiper class="swiper" indicator-dots="true"  autoplay="true" interval="5000" duration="1000" beforeColor="red"
    		afterColor="coral">
   		 	<block v-for="(item, index) in imgUrls" :index="index" :key="key">
        		<swiper-item>
            		<image :src="item" class="slide-image" mode="aspectFill"/>
        		</swiper-item>
    		</block>
		</swiper>
		
	</div>
</template>

<script>
export default{
	data(){
		return{
			imgUrls: [
          			'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg',
          			'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg',
          			
        	],
        	
		}
	}
}
</script>

<style>
.swiper{
	width:750rpx;
	height: 400rpx;
/*	border:1rpx solid red;*/
}
.swiper image{
	width:100%;
	height: 100%;
}
.swiper indicator-dots{
   color: red;
}
.swiper-pagination-bullet{background:red}
.swiper-pagination-bullet-active{background:yellow}
</style>