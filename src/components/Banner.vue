<!--suppress ALL -->
<template>
    <div class="detailBanner">
        <!-- 轮播图 -->
        <swiper class="swiper" circular="true" :indicator-dots="false" autoplay="true" interval="5000" duration="1000" beforeColor="red"
                afterColor="coral" @animationfinish="bannerChange">
            <block v-for="(item, index) in imgUrls" :index="index" :key="key">
                <swiper-item>
                    <image :src="item" class="slide-image" mode="aspectFill"/>
                </swiper-item>
            </block>
        </swiper>
        <div class="dots">
            <span>{{current}}</span> / {{imgUrls.length}}
        </div>
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
			return {
                current: 1
            }
		},
        methods: {
            bannerChange (e) {
                let event = e.mp.detail;
                this.current = event.current + 1;
            }
        },
		mounted () {
		}
	}
</script>

<style>
    .swiper {
        width: 750rpx;
        height: 400rpx;
        /*	border:1rpx solid red;*/
    }

    .detailBanner .swiper{
        width: 375px!important;
        height: 375px!important;
    }

    .detailBanner{
        position: relative;
    }

    .detailBanner .dots{
        width: 100rpx;
        height: 42rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 21rpx;
        position: absolute;
        right: 30rpx;
        bottom: 30rpx;
        z-index: 10000;
        background: rgba(17,17,17,0.2);
        font-size: 22rpx;
        color: #fff;
        font-weight: bold;
    }

    .detailBanner .dots span{
        font-size: 28rpx;
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
