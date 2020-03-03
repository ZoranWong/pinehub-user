<!--suppress ALL -->
<template>
    <swiper class="swiper" indicator-dots="true" autoplay="true" interval="3000" duration="500">
        <block v-for="(item, index) in images" :key="index">
            <swiper-item>
                <image :src="item" class="slide-image" mode="aspectFill"/>
            </swiper-item>
        </block>
    </swiper>
</template>

<script>
	export default {
		name: 'swiper',
		props: {
			images: {
				type: Array,
                default: function () {
                    return []
				}
			}
		},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500
			};
		},
        mounted () {
		}
	}
</script>

<style>
    .swiper {
        height: 376rpx !important;
    }
    image {
        height: 100%;
        width: 100%;
    }
</style>
