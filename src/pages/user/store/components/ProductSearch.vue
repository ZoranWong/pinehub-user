<!--suppress ALL -->
<template>
    <ul id="products">
<!--        <li v-for="item in products">-->
<!--            {{item['display_name']}}-->
<!--        </li>-->
    </ul>
</template>

<script>
	export default {
		name: 'ProductSearch',
        props: {
            products: {
                default: null,
                type: Array
            }
        },
	}
</script>

<style>
    #products{
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        padding: 0 20rpx;
        z-index: 9999;
        max-height: 800rpx;
        overflow: auto;
    }

    #products li{
        box-sizing: border-box;
        width: 100%;
        height: 80rpx;
        padding: 0 60rpx;
        font-size: 24rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1rpx solid #f2f2f2;
    }
</style>






