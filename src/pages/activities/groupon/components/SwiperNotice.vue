<!--suppress ALL -->
<template>
    <div class="swiperNotices">
        <swiper class="swiper" circular="true" :indicator-dots="false" autoplay="true" interval="3000" duration="1000" :vertical="true">
            <block v-for="(item, index) in notices" :index="index" :key="index">
                <swiper-item class="swiperNoticeItem">
                    <image :src="item.img" class="slide-image" mode="aspectFill"/>
                    <h4>{{item.title}}</h4>
                </swiper-item>
            </block>
        </swiper>
    </div>
</template>

<script>
    export default {
        name: "SwiperNotice",
        data () {
            return {
                notices: [
                    {
                        img: 'https://kingdomcloud.oss-cn-hangzhou.aliyuncs.com/2020/02/08/生日蛋糕.png',
                        title: '张强刚刚下单购买了面包！'
                    },
                    {
                        img: 'https://kingdomcloud.oss-cn-hangzhou.aliyuncs.com/2020/02/08/生日蛋糕.png',
                        title: '王学红刚刚下单购买了面包！'
                    },
                    {
                        img: 'https://kingdomcloud.oss-cn-hangzhou.aliyuncs.com/2020/02/08/生日蛋糕.png',
                        title: '曹文君刚刚下单购买了面包！'
                    },
                    {
                        img: 'https://kingdomcloud.oss-cn-hangzhou.aliyuncs.com/2020/02/08/生日蛋糕.png',
                        title: '叶长旺刚刚下单购买了面包！'
                    },
                    {
                        img: 'https://kingdomcloud.oss-cn-hangzhou.aliyuncs.com/2020/02/08/生日蛋糕.png',
                        title: '余晓东刚刚下单购买了面包！'
                    },
                    {
                        img: 'https://kingdomcloud.oss-cn-hangzhou.aliyuncs.com/2020/02/08/生日蛋糕.png',
                        title: '高罗刚刚下单购买了面包！'
                    },
                ]
            }
        }
    }
</script>

<style>
    .swiperNotices{
        width: 498rpx;
        height: 50rpx;
        background:linear-gradient(0deg,rgba(252,210,100,1),rgba(252,236,125,1));
        border-radius:25rpx;
    }

    .swiperNotices .swiper{
        width: 498rpx!important;
        height: 50rpx!important;
    }

    .swiperNoticeItem{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        /*display:inline-block;*/
        padding: 6rpx;
        box-sizing: border-box;
    }

    .swiperNoticeItem image{
        width: 38rpx;
        height: 38rpx;
        border-radius: 50%;
    }

    .swiperNoticeItem h4{
        display: inline;
        font-size: 22rpx;
        color: #111;
        margin-left: 11rpx;
        font-weight: normal;
    }
</style>
