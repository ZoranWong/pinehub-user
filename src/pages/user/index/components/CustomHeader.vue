<!--suppress ALL -->
<template>
    <div>
        <div :class=" backColor === '#049473' ? 'custom_header custom_header_one' : 'custom_header custom_header_two' " >
            <div class="status_bar" :style="{'height': statusBarHeight + 'px'}" ></div>
            <div class="nav_bar" :style="{'height': navHeight + 'px'}" >
                <div class="back_icon" v-if="needReturn" >

                    <span  class="backHome" @click="backHome" v-if="needBackHome"><i class="iconfont"  >&#xe664;</i>回到首页</span>
                    <i class="iconfont" @click="back" v-else>&#xe679;</i>
                </div>
                <div class="nav_title">
                    {{title}}
                </div>
            </div>
        </div>
    </div>


</template>

<script>
	export default {
		name: 'CustomHeader',
        props: ['title','needReturn', 'backColor'],
        data () {
		    return {
		    	barHeight: 0,
                background: '',
                needBackHome: false
            }
        },
        watch: {
		    backColor () {
                this.background = this.backColor
            }
        },
        methods:{
		    back(){
		    	this.$command('REDIRECT_TO','','back')
            },
            backHome () {
                this.$command('REDIRECT_TO','index','replace')
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
            if (this.backColor) {
                this.background = this.backColor
            } else {
                this.background = this.title === '首页'? '#ffcc00' : 'linear-gradient(270deg,rgba(255,204,0,1),rgba(253,224,104,1))'
            }
			this.$command('GET_BAR_HEIGHT')
		}
	}
</script>

<style>
    @keyframes fade-in-one {
        0% {opacity: 0.5;}/*初始状态 透明度为0*/
        10% {opacity: 0.5;}/*初始状态 透明度为0*/
        20% {opacity: 0.5;}/*初始状态 透明度为0*/
        30% {opacity: 0.6;}/*初始状态 透明度为0*/
        40% {opacity: 0.7;}/*初始状态 透明度为0*/
        50% {opacity: 0.8;}/*初始状态 透明度为0*/
        60% {opacity: 0.9;}/*初始状态 透明度为0*/
        70% {opacity: 1;}/*过渡状态 透明度为0*/
        80% {opacity: 0.7;}/*过渡状态 透明度为0*/
        90% {opacity: 0.5;}/*过渡状态 透明度为0*/
        100% {opacity: 0.5;}/*结束状态 透明度为1*/
    }

    @keyframes fade-in-one {
        0% {background: rgba(4,148,115,0.5);}/*初始状态 透明度为0*/
        10% {background: rgba(4,148,115,0.6);}/*初始状态 透明度为0*/
        20% {background: rgba(4,148,115,0.7);}/*初始状态 透明度为0*/
        30% {background: rgba(4,148,115,0.8);}/*初始状态 透明度为0*/
        40% {background: rgba(4,148,115,1);}/*初始状态 透明度为0*/
        50% {background: rgba(4,148,115,1);}/*初始状态 透明度为0*/
        60% {background: rgba(4,148,115,1);}/*初始状态 透明度为0*/
        70% {background: rgba(4,148,115,0.8);}/*初始状态 透明度为0*/
        80% {background: rgba(4,148,115,0.6);}/*初始状态 透明度为0*/
        90% {background: rgba(4,148,115,0.5);}/*初始状态 透明度为0*/
    }

    @keyframes fade-in-two {
        0% {background: rgba(236,139,104,0.6);}/*初始状态 透明度为0*/
        10% {background: rgba(236,139,104,0.7);}/*初始状态 透明度为0*/
        20% {background: rgba(236,139,104,0.8);}/*初始状态 透明度为0*/
        30% {background: rgba(236,139,104,1);}/*初始状态 透明度为0*/
        40% {background: rgba(236,139,104,1);}/*初始状态 透明度为0*/
        50% {background: rgba(236,139,104,1);}/*初始状态 透明度为0*/
        60% {background: rgba(236,139,104,1);}/*初始状态 透明度为0*/
        70% {background: rgba(236,139,104,1);}/*初始状态 透明度为0*/
        80% {background: rgba(236,139,104,0.8);}/*初始状态 透明度为0*/
        90% {background: rgba(236,139,104,0.6);}/*初始状态 透明度为0*/
        100% {background: rgba(236,139,104,0.4);}/*初始状态 透明度为0*/
    }

    .custom_header{
        width: 100%;
        z-index: 9999;
    }

    .custom_header_one{
        animation: fade-in-one 3s;
    }

    .custom_header_two{
        animation: fade-in-two 3s;
    }

    .custom_header_two{

    }

    .status_bar {}

    .nav_bar{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .nav_bar .back_icon{
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

    .nav_bar .back_icon .iconfont{
        font-size: 32rpx;
        color: #111111!important;
    }

    .backHome .iconfont {
        margin-right: 10rpx;
    }

    .nav_bar .nav_title{
        font-size: 32rpx;
        color: #111;
    }

</style>
