<!--suppress ALL -->
<template>
    <div>
        <!-- 轮播图 -->
        <swiper class="swiper" circular="true" indicator-dots="true" autoplay="true" interval="5000" duration="1000" beforeColor="red"
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
	export default {
		props: {
			imgUrls: {
				type: Array,
				default: function () {
					return []
				}
			}
		},
		data () {
			return {}
		},
		mounted () {
			console.log(this.imgUrls, '_________________________________-');
		}
	}
</script>

<style>
    .swiper {
        width: 750 rpx;
        height: 400 rpx;
        /*	border:1rpx solid red;*/
    }

    .swiper image {
        width: 100%;
        height: 100%;
    }

    .swiper indicator-dots {
        color: red;
    }

    .swiper-pagination-bullet {
        background: red
    }

    .swiper-pagination-bullet-active {
        background: yellow
    }
</style>
