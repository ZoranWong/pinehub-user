<!--suppress ALL -->
<template>
    <div id="custom_header" :style="{'background': background}" >
        <div id="status_bar" :style="{'height': statusBarHeight + 'px'}" ></div>
        <div id="nav_bar" :style="{'height': navHeight + 'px'}" >
            <div id="back_icon" v-if="needReturn" @click="back" >
                <span  class="backHome"  v-if="needBackHome"><i class="iconfont"  >&#xe664;</i>回到首页</span>
                <img class="leftArrow" src="../../static/icons/leftArrow.png" v-else alt="">
            </div>
            <div id="nav_title">
                {{title}}
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'CustomHeader',
        props: ['title','needReturn', 'backColor', 'backUrl', 'needClear'],
        data () {
            return {
                barHeight: 0,
                background: '',
                needBackHome: false,
                needClear: false
            }
        },
        watch: {
            backColor () {
                this.background = this.backColor
            }
        },
        methods:{
            async back(){
                if (this.backUrl) {
                    this.$emit('back');
                    return
                }
                if (this.needBackHome) {
                    this.$command('REDIRECT_TO','index','replace')
                } else {
                    if (this.needClear) {
                        await this.$command('REDIRECT_TO','user.shoppingCart','replace')
                        this.model.user.order.payment.dispatch('clearIds');
                    } else {
                        this.$command('REDIRECT_TO','','back')
                    }
                }
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
            console.log('----- 头部渲染 -----');
            let pages =  getCurrentPages();
            let options = pages[pages.length - 1]['options']
            this.needBackHome = options.backHome ? true : false;
            this.needClear = options['needClear'] ? true : false;
            if (this.backColor) {
                this.background = this.backColor
            } else {
                this.background = this.title === '首页' ? '#ffcc00' : 'linear-gradient(270deg,rgba(255,204,0,1),rgba(253,224,104,1))'
            }
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
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    #nav_bar #back_icon{
        position: absolute;
        left: 20rpx;
        z-index: 999999;
        min-width: 44px;
        height: 44px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
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

    .leftArrow{
        width: 22rpx;
        height: 41rpx;
    }

</style>
