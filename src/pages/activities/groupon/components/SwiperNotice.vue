<!--suppress ALL -->
<template>
    <div class="swiperNotices">
        <swiper class="swiper" circular="true" :indicator-dots="false" autoplay="true" interval="3000" duration="1000" :vertical="true">
            <block v-for="(item, index) in notices" :index="index" :key="index">
                <swiper-item class="swiperNoticeItem">
                    <image :src="item.image" class="slide-image" mode="aspectFill"/>
                    <h4>{{item.name}}刚刚购买了{{item['productDesc']}}</h4>
                </swiper-item>
            </block>
        </swiper>
    </div>
</template>

<script>
    import {mocks} from "../grouponList/mock/mock";
    import _ from 'underscore'
    export default {
        name: "SwiperNotice",
        data () {
            return {
                notices: []
            }
        },
        watch: {
            products (val) {
                if (val.length) {
                    this.handleMock(val)
                }
            },
            notices (val) {
                if (val.length) {
                    _.map(val, mock => {
                        let text = '';
                        _.map(mock.products, product => {
                            text += `${product.name}、`
                        })
                        text = text.substring(0, text.length - 1);
                        mock.productDesc = text;
                    })
                }
            }
        },
        computed :{
            products () {
                return this.model.groupon.products
            }
        },
        methods: {
            getRandom (min, max) {
                switch(arguments.length){
                    case 1:
                        return parseInt(Math.random()*min+1,10);
                        break;
                    case 2:
                        return parseInt(Math.random()*(max-min+1)+min,10);
                        break;
                    default:
                        return 0;
                        break;
                }
            },
            handleMock (products) {

                _.map(mocks, mock => {
                    let random = this.getRandom(2,5)
                    let p = [];
                    for (let i = 0; i < random; i++) {
                        p.push(products[Math.floor(Math.random() * (products.length - 1))])
                        if (!p.length) {

                        }
                    }
                    mock.products = p;
                })
                this.notices = mocks;
            }
        },
        mounted() {

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
        width: 400rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline;
        font-size: 22rpx;
        color: #111;
        margin-left: 11rpx;
        font-weight: normal;
    }
</style>
