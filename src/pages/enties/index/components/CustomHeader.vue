<!--suppress ALL -->
<template>
    <div id="custom_header" :style="{'background': background}" >
        <div id="status_bar" :style="{'height': statusBarHeight + 'px'}" ></div>
        <div id="nav_bar" :style="{'height': navHeight + 'px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}" >
            <div id="nav_title" :style="{color: '#111', fontSize: '36rpx'}">
                {{title}}
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'CustomHeader',
        props: ['title','needReturn','backColor'],
        data () {
            return {
                barHeight: 0,
                needBackHome: false,
                background: ''
            }
        },
        computed : {
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            }
        },
        mounted () {
            let pages =  getCurrentPages();
            let options = pages[pages.length - 1]['options']
            this.needBackHome = options.backHome ? true : false;
            this.background = this.backColor ? this.backColor : '#f6f6f6'
            this.$command('GET_BAR_HEIGHT')
        }
    }
</script>

<style>
    #custom_header{
        width: 100%;
        z-index: 9999;
    }

    #status_bar {}

    #nav_bar{
        box-sizing: border-box;
        padding: 0 40rpx;
        position: relative;
    }

    #nav_bar #back_icon{
        position: absolute;
        left: 20rpx;
        z-index: 999999;
    }

    .backHome{
        font-size: 28rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #nav_bar #back_icon .iconfont{
        font-size: 32rpx;
        color: #111111!important;
    }

    .backHome .iconfont {
        margin-right: 10rpx;
    }

    #nav_bar #nav_title{
        font-size: 32rpx;
        color: #111;
    }

</style>
